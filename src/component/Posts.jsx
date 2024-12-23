import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, fetchData } from "../app/features/crud/CrudSlice";
import PostsCard from "./PostsCard";
import PostModal from "./PostModal";

const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Modalmode,setModalMode] = useState('add');
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
        setModalMode('add');
        setSelectedPost(null);

      };
      const handleEditModal = (post) => {
        setIsModalOpen(true);
        setModalMode('edit');
        setSelectedPost(post);
      }
      const handleModalClose = () => {
        setIsModalOpen(false);  
      };

const onDelete = (id) => {
  Dispatch(deleteData(id));
};

  return (
    <div>
      <button onClick={handleAddModal}  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Add Post
      </button>
      {isModalOpen && 
       <PostModal selectedPost={selectedPost} Modalmode={Modalmode} isopen={isModalOpen} onClose={handleModalClose}/>
      }
      {status === "loading" && <h1 className="text-5xl flex items-center justify-center ">Loading... 💀</h1>}
      {status === "succeeded" &&
        Posts.map((post) => (
          <div className="flex flex-wrap justify-center gap-2">
          <PostsCard key={post.id} title={post.title} body={post.body} onDelete={()=>onDelete(post.id)} onEdit={()=>handleEditModal(post)}/>
          </div>
        ))}
    </div>
  );
};

export default Posts;
