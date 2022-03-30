import Post from "../post/Post"
import "./posts.css"

export default function Posts(props) {
  const posts = props.posts;
  return (
    <div className="posts">
      {
        posts.map((p, key)=>(
          <Post key={key} post={p}/>
        ))
      }
      
    </div>
  )
}
