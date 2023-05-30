import { useEffect } from "react";
import "./index.css";
import useStore from "./store/client/useStore";
import { useAddPost } from "./store/server/features/posts/mutations";
import { useGetPost, useGetPosts } from "./store/server/features/posts/queries";
import { isEmpty } from "./utils/helpers";

export default function App() {
  const counter = useStore((state) => state.counter);
  const incrementCounter = useStore((state) => state.incrementCounter);
  const decrementCounter = useStore((state) => state.decrementCounter);

  const { isLoading: isGetPostsLoading, data: getPostsData } = useGetPosts();
  const { data: getPostData } = useGetPost(counter);

  const addPost = useAddPost();

  useEffect(() => {
    const unsubscribe = useStore.subscribe((newState) => {
      console.log("State changed:", newState);
    });

    return () => {
      unsubscribe(); // Unsubscribe from state changes when component unmounts
    };
  }, []);

  return (
    <div className="App">
      <h1>React Query + Zustand</h1>
      <h2>Counter</h2>
      <div>
        <button onClick={decrementCounter}>-</button>
        &nbsp; &nbsp;
        <span>{counter}</span>
        &nbsp; &nbsp;
        <button onClick={incrementCounter}>+</button>
      </div>
      {!isEmpty(getPostData) ? (
        <>
          <h4>{getPostData?.title}</h4>
          <p>{getPostData?.body}</p>
        </>
      ) : (
        <p>Increase counter between 1 - 100 to see data.</p>
      )}
      <button
        onClick={() =>
          addPost.mutate({
            id: 1,
            userId: 1,
            title: "test",
            body: "test",
          })
        }
      >
        Add New Post {addPost.isLoading && "..."}
      </button>
      <hr />
      <div>
        {isGetPostsLoading ? (
          <p>Loading...</p>
        ) : (
          getPostsData?.map((post) => (
            <div key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
