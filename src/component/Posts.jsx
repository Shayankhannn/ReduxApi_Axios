import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchData } from "../app/features/crud/CrudSlice"
import PostsCard from "./PostsCard"

const Posts = () => {

    const Dispatch = useDispatch()
    const Posts = useSelector((state) => state.posts.data)
    const status = useSelector((state) => state.posts.status)


    useEffect(()=>{
    if(status === 'idle'){
        Dispatch(fetchData())
    }
   
},[Dispatch,status])

  return (
    <div >
    {status === 'loading' && <h1>Loading...</h1>}
    {status === 'succeeded' && ( Posts.map((post)=>
     <div className="flex flex-wrap justify-center gap-6">
    <PostsCard key={post.id} title={post.title} body={post.body} />
    </div>
   ) )}
    </div>
  )
}

export default Posts