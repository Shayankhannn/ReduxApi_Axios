import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData } from "../app/features/crud/CrudSlice";
import PostsCard from "./PostsCard";
import PostModal from "./PostModal";

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Modalmode, setModalMode] = useState("add");
  const [selectedPost, setSelectedPost] = useState(null);
  const Dispatch = useDispatch();
  const Posts = useSelector((state) => state.posts.data);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    if (status === "idle") {
      Dispatch(fetchData());
    }
  }, [Dispatch, status]);

  const handleAddModal = () => {
    setIsModalOpen(true);
    setModalMode("add");
    setSelectedPost(null);
  };
  const handleEditModal = (post) => {
    setIsModalOpen(true);
    setModalMode("edit");
    setSelectedPost(post);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onDelete = (id) => {
    window.confirm("Are you sure you want to delete this post?") &&
      Dispatch(deleteData(id));
  };

  return (
    <div>
      <div className="p-5 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Blog App</h1>
      <button
        onClick={handleAddModal}
        className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Post
      </button>
      </div>
      {isModalOpen && (
        <PostModal
          selectedPost={selectedPost}
          Modalmode={Modalmode}
          isopen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
      {status === "loading" && (
        <h1 className="text-5xl flex items-center justify-center ">
          Loading... 💀
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {status === "succeeded" &&
          Posts.map((post) => (
            <div className="p-5" >
              <PostsCard
                key={post.id}
                title={post.title}
                body={post.body}
                onDelete={() => onDelete(post.id)}
                onEdit={() => handleEditModal(post)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Posts;
