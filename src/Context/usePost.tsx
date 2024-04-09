import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { PostVehicle } from "../Models/PostVehicle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type PostContextType = {
  post: PostVehicle | null;
  fetchPost: (postId: number) => void; // Accept postId as a parameter
  updatePost: (postId: number, postData: PostVehicle) => void;
};

type Props = { children: React.ReactNode };

const PostContext = createContext<PostContextType>({} as PostContextType);

export const PostProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

const fetchPost = async (postId: number) => {
    try {
        const response = await axios.get(`https://localhost:7228/api/Owner/get-post-vehicle/${postId}`);
        setPost(response.data);
    } catch (error) {
        console.error('Error fetching post:', error);
    }
};

  const updatePost = async (postId: number, postData: PostVehicle) => {
    try {
      const response = await axios.put(`https://localhost:7228/api/Owner/update-post/${postId}`, postData);
      console.log(response.data); // Log success response
      toast.success("Post updated successfully!");
      navigate('/vehicle-post');
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post. Please try again.");
    }
  };

  return (
    <PostContext.Provider value={{ post, fetchPost, updatePost }}>
      {isReady ? children : null}
    </PostContext.Provider>
  );
};

export const usePost = () => React.useContext(PostContext);
