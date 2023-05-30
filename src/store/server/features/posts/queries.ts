import { useQuery } from "react-query";
import { Post } from "./interfaces";

const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
};

const getPost = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
};

export const useGetPosts = () => useQuery<Post[]>("posts", getPosts);
export const useGetPost = (postId: number) =>
  useQuery<Post>(["post", postId], () => getPost(postId), {
    keepPreviousData: true,
  });
