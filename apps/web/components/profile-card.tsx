import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BoxReveal } from "@/components/magicui/box-reveal";
import EditButton from "@/components/edit-button";
import { BlurFade } from "@/components/magicui/blur-fade";
import BadgeRow from "@/components/badge-row";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect, useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProfileCardProps {
  className?: string;
  isOwner: boolean;
  username: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  className,
  isOwner,
  username,
}) => {
  const { user } = useAuthContext();
  const [bio, setBio] = useState("Loading...");
  const [openProfilePicture, setOpenProfilePicture] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState("/Logo.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openProfilePictureModal, setOpenProfilePictureModal] = useState(false);

  const handleProfilePictureClick = async () => {
    if (isOwner) {
      setOpenProfilePicture(true);
    } else {
      setOpenProfilePictureModal(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image.");
      }

      const uploadData = await uploadResponse.json();

      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/update/${user.userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profilePicture: uploadData.data.secure_url,
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update profile picture.");
      }

      setProfileImage(uploadData.data.secure_url);

      // Dispatch a custom event to notify other components
      const updateEvent = new CustomEvent("profileUpdated", {
        detail: { profilePicture: uploadData.data.secure_url },
      });
      window.dispatchEvent(updateEvent);

      handleClose();
    } catch (error) {
      console.error("Error during upload:", error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        setUploadError("Please select an image file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size exceeds 5MB limit.");
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUploadError(null);
    }
  };

  const handleClose = () => {
    setOpenProfilePicture(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Try to get user by username first
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/byUsername/${username}`
        );

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await userResponse.json();

        // Set bio and profile picture from user data
        setBio(userData.bio || "No bio available.");
        if (userData.profilePicture) {
          setProfileImage(userData.profilePicture);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setBio("Error loading profile data.");
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  return (
    <BlurFade direction="up" className="flex flex-col overflow-hidden">
      <Card className={`h-[calc(100vh-8rem)] ${className}`}>
        <CardHeader>
          <div className="flex justify-center items-center w-full">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BoxReveal boxColor="hsl(var(--primary))" duration={0.5}>
                    <Avatar
                      className="w-24 h-24 cursor-pointer"
                      onClick={handleProfilePictureClick}
                    >
                      <AvatarImage src={profileImage} alt="Avatar" />
                      <AvatarFallback>
                        <span className="material-symbols-rounded large">
                          account_circle
                        </span>
                      </AvatarFallback>
                    </Avatar>
                  </BoxReveal>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Nice picture!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardTitle className="">
            <BoxReveal boxColor="hsl(var(--primary))" duration={0.5}>
              <p className="py-2">{username}</p>
            </BoxReveal>
          </CardTitle>
          <CardDescription className="flex flex-col">
            <BoxReveal boxColor="hsl(var(--primary))" duration={0.5}>
              <div>
                <BadgeRow />
                <div className="mt-2 flex flex-row gap-2">
                  <p>0 Followers</p>
                  <p>0 Following</p>
                </div>
              </div>
            </BoxReveal>
          </CardDescription>
        </CardHeader>
        <CardContent className="grow overflow-hidden">
          <BlurFade>
            <p>{bio}</p>
          </BlurFade>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end items-center w-full">
            {isOwner && <EditButton type="profile" />}
          </div>
        </CardFooter>
      </Card>

      <Dialog open={openProfilePicture} onOpenChange={setOpenProfilePicture}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div
              className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg border-gray-300 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              {previewUrl ? (
                <div>
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={160}
                    height={160}
                    className="mt-2 max-h-40 mx-auto rounded-full object-cover aspect-square"
                    style={{ objectFit: "cover" }}
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Click to change image
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2">Click to select an image</p>
                </div>
              )}
            </div>
          </div>
          {uploadError && (
            <p className="text-red-500 text-sm mt-2">{uploadError}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openProfilePictureModal}
        onOpenChange={setOpenProfilePictureModal}
      >
        <DialogContent className="max-w-2xl h-auto">
          <DialogHeader>
            <DialogTitle>Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Image
              src={profileImage}
              alt="Profile Picture"
              width={240}
              height={240}
              className="mt-2 mx-auto rounded-full object-cover"
              style={{ width: "240px", height: "240px", objectFit: "cover" }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenProfilePictureModal(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </BlurFade>
  );
};

export default ProfileCard;
