
const PostsCard = ({title,body,onEdit,onDelete}) => {
    return (
        <div className=" w-full h-full  hover:bg-gray-300  bg-white border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
        <h5 className="text-xl font-semibold text-gray-800 mb-3">{title}</h5>
        <p className="text-gray-600 text-base mb-4">{body}</p>
        <div className="flex justify-center gap-2">
          <button onClick={onEdit} className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Edit Post
          </button>
          <button onClick={onDelete} className="px-2  py-1 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            Delete Post
          </button>
        </div>
      </div>
    )
  }
  
  export default PostsCard