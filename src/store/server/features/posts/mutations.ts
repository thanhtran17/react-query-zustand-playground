import { useMutation } from "react-query";
import { AddPostData } from "./interfaces";

const addPost = async (body: AddPostData) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const useAddPost = () => useMutation(addPost);
