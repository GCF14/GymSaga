export interface Content {
    type: string;
    data: string;
    _id: string;
}
  
export interface Post {
    _id: string;
    username: string;
    content: {
      type: 'text' | 'image' | 'video';
      data?: string;
      file?: {
        data: Buffer;
        contentType: string;
      };
    }[];
    numOfLikes: number;
    likedBy: string[];
    comments: string[];
    edited: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface PostCardProps {
    username: string;
    content: {
        type: 'text' | 'image' | 'video';
        data?: string;
        file?: {
            data: Buffer;
            contentType: string;
        };
    }[];
}