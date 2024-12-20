
const PostsCard = ({title,body}) => {
    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
        <h5 className="text-xl font-semibold text-gray-800 mb-3">{title}</h5>
        <p className="text-gray-600 text-base mb-4">{body}</p>
        <div className="flex justify-end">
          <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Read More
          </button>
        </div>
      </div>
    )
  }
  
  export default PostsCard