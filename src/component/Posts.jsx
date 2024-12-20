import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchData } from "../app/features/crud/CrudSlice"

const Posts = () => {

    const Dispatch = useDispatch()
    const Posts = useSelector((state) => state.posts.data)
    const status = useSelector((state) => state.posts.status)
const fetchedData = useEffect(()=>{
    if(status === 'idle'){
        Dispatch(fetchData())
    }
    if(status === 'succeeded'){
        console.log(fetchedData)
    }
},[Dispatch,status])

  return (
    <div>{Posts}</div>
  )
}

export default Posts