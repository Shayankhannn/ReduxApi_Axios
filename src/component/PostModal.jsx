import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { addPost, updatePost } from "../app/features/crud/CrudSlice";

const PostModal = ({
  isopen,
  onClose,
  Modalmode ,
  selectedPost ,
}) => {
  const Dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  if (!isopen) return null;

  useEffect(() => {
    if (  Modalmode === "edit" && selectedPost) {
      setTitle(selectedPost.title);
      setBody(selectedPost.body);

    }
    // else if(Modalmode === "add"){
    //   setTitle("");
    //   setBody("");
    // }
  },[selectedPost,Modalmode]) 
const handleFormSubmit = (e) => {
  e.preventDefault();
  if(title.trim()  && body.trim() ){
  if(Modalmode === "add"){
    const newPost = {
      title: title,
      body: body,
      id: Date.now(),
    }
    Dispatch(addPost(newPost))
  }else if(Modalmode === "edit"){
    const updatedPost = {
    
      ...selectedPost,
      title: title,
      body: body,
    
  }
  Dispatch(updatePost(updatedPost))
}
onClose();
};
};

  return createPortal(
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="flex justify-center items-center h-full">
          <div className="bg-white w-1/3 h-auto rounded-lg shadow-lg p-4 relative">
            <div className="absolute top-0 right-0 m-4   text-1xl cursor-pointer font-bold">
              <button onClick={onClose}>X</button>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              {Modalmode === "add" ? "Add Post" : "Update Post"}
            </h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                className="border border-gray-300 rounded-lg p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Body"
                className="border border-gray-300 rounded-lg p-2"
                value={body}
                rows={4}
                onChange={(e) => setBody(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg p-2"
              >
                {Modalmode === "add" ? "Add Post" : "Update Post"}
              </button>
              <button onClick={onClose}
                type="button"
                className="bg-blue-500 text-white rounded-lg p-2"
              >
                Close Modal
              </button>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal-modal")
  );
};

export default PostModal;
