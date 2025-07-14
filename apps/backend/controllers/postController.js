const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/userModel");

async function getAllPosts(req, res) {
  try {
    // Find all posts
    const posts = await Post.find().sort({ createdAt: -1 });

    // Get all unique usernames from posts
    const usernames = [...new Set(posts.map((post) => post.username))];

    // Fetch user details for all relevant usernames in one query
    // IMPORTANT: Always fetch fresh user data - don't use cached data
    const users = await User.find({ username: { $in: usernames } }).lean();

    // Create a username to user details map for quick lookup
    const userMap = {};
    users.forEach((user) => {
      userMap[user.username] = {
        profilePicture: user.profilePicture || "",
        bio: user.bio || "",
      };
    });

    // Enrich post data with user details
    const enrichedPosts = posts.map((post) => {
      const postObject = post.toObject();
      const userDetails = userMap[post.username] || {};

      return {
        ...postObject,
        profilePicture: userDetails.profilePicture || "",
        bio: userDetails.bio || "",
        date: post.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
    });

    res.status(200).json(enrichedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
}

async function getPost(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid post ID" });
  }

  try {
    const post = await Post.findById(id).populate("comments");

    if (!post) {
      return res.status(404).json({ error: "No such post" });
    }

    // Always fetch fresh user data
    const user = await User.findOne({ username: post.username }).lean();

    const enrichedPost = post.toObject();
    if (user) {
      // Use the latest user data
      enrichedPost.profilePicture = user.profilePicture || "";
      enrichedPost.bio = user.bio || "";
    }

    res.status(200).json(enrichedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createNewPost(req, res) {
  const { text, username, numOfLikes, likedBy } = req.body;
  const files = req.files;
  const content = [];

  if (!text && (!files || files.length === 0)) {
    return res
      .status(400)
      .json({ error: "Please provide at least text, image, or video." });
  }

  if (!username || numOfLikes === undefined || !likedBy) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    if (text && text.trim() !== "") {
      content.push({ type: "text", data: text });
    }

    if (files && files.length > 0) {
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
        });

        content.push({
          type: result.resource_type,
          data: result.secure_url,
        });
      }
    }

    // Create post with only essential data (no duplicated user info)
    const post = await Post.create({
      content,
      username,
      numOfLikes,
      likedBy: JSON.parse(likedBy),
      comments: [],
    });

    // Fetch user data for the response
    const user = await User.findOne({ username }).lean();
    const enrichedPost = post.toObject();

    if (user) {
      enrichedPost.profilePicture = user.profilePicture || "";
      enrichedPost.bio = user.bio || "";
    }

    const io = req.app.get("io");

    if (io) {
      io.to("general_feed").emit("newPost", {
        post: enrichedPost,
        message: `${username} has created a new post!`,
        timestamp: new Date(),
      });

      console.log(`New post by ${username} broadcasted to general_feed`);
    }

    // The response includes user data, but the database doesn't store it
    res.status(200).json(enrichedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such post" });
  }

  const post = await Post.findOneAndDelete({ _id: id });

  if (!post) {
    return res.status(400).json({ error: "No such post" });
  }

  // Emit post deletion to all users
  const io = req.app.get("io");
  if (io) {
    io.to("general_feed").emit("postDeleted", {
      postId: id,
      username: post.username,
      message: "A post has been deleted",
      timestamp: new Date(),
    });

    console.log(`Post ${id} deletion broadcasted to general_feed`);
  }

  res.status(200).json(post);
}

async function updatePost(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such post" });
  }

  const post = await Post.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true },
  ); // Return the updated document

  if (!post) {
    return res.status(400).json({ error: "No such post" });
  }

  // Fetch user data for the updated post
  const user = await User.findOne({ username: post.username }).lean();
  const enrichedPost = post.toObject();

  if (user) {
    enrichedPost.profilePicture = user.profilePicture || "";
    enrichedPost.bio = user.bio || "";
    enrichedPost.date = post.createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Emit post update to all users
  const io = req.app.get("io");
  if (io) {
    io.to("general_feed").emit("postUpdated", {
      post: enrichedPost,
      message: "A post has been updated",
      timestamp: new Date(),
    });

    console.log(`Post ${id} update broadcasted to general_feed`);
  }

  res.status(200).json(enrichedPost);
}

const getPostsByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    // Case-insensitive username search
    const user = await User.findOne({
      username: { $regex: `^${username}$`, $options: "i" },
    }).lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find posts by username
    const posts = await Post.find({ username: user.username }).sort({
      createdAt: -1,
    });

    // Enrich with user data
    const enrichedPosts = posts.map((post) => {
      const postObject = post.toObject();
      return {
        ...postObject,
        profilePicture: user.profilePicture || "",
        bio: user.bio || "",
        date: post.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
    });

    res.status(200).json(enrichedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

async function likePost(req, res) {
  const { id } = req.params;
  const { username, action } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  if (!username || !action || !["like", "unlike"].includes(action)) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    let updatedPost;

    if (action === "like") {
      if (!post.likedBy.includes(username)) {
        updatedPost = await Post.findByIdAndUpdate(
          id,
          {
            $inc: { numOfLikes: 1 },
            $addToSet: { likedBy: username },
          },
          { new: true },
        );
      } else {
        return res
          .status(400)
          .json({ error: "Post already liked by this user" });
      }
    } else {
      if (post.likedBy.includes(username)) {
        updatedPost = await Post.findByIdAndUpdate(
          id,
          {
            $inc: { numOfLikes: -1 },
            $pull: { likedBy: username },
          },
          { new: true },
        );
      } else {
        return res.status(400).json({ error: "Post not liked by this user" });
      }
    }

    const user = await User.findOne({ username: updatedPost.username }).lean();
    const enrichedPost = updatedPost.toObject();

    if (user) {
      enrichedPost.profilePicture = user.profilePicture || "";
      enrichedPost.bio = user.bio || "";
      enrichedPost.date = updatedPost.createdAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    const io = req.app.get("io");
    if (io) {
      io.to("general_feed").emit("postLikeUpdated", {
        post: enrichedPost,
        action,
        username,
        message: `Post ${action}d by ${username}`,
        timestamp: new Date(),
      });
    }

    res.status(200).json(enrichedPost);
  } catch (error) {
    console.error("Error updating post like:", error);
    res.status(500).json({ error: "Error updating post like" });
  }
}

module.exports = {
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
  createNewPost,
  getPostsByUsername,
  likePost,
};
