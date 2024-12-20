import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../app/features/crud/CrudSlice";
import PostsCard from "./PostsCard";

const Posts = () => {
  const Dispatch = useDispatch();
  const Posts = useSelector((state) => state.posts.data);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === "idle") {
      Dispatch(fetchData());
    }
  }, [Dispatch, status]);

  return (
    <div>
      <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Add Post
      </button>

      {status === "loading" && <h1>Loading...</h1>}
      {status === "succeeded" &&
        Posts.map((post) => (
          <div className="flex flex-wrap justify-center gap-2">
            <PostsCard key={post.id} title={post.title} body={post.body} />
          </div>
        ))}
    </div>
  );
};

export default Posts;
