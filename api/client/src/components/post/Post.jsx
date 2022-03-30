import './post.css'
import {Link} from "react-router-dom";

export default function Post({post}) {
  // console.log("start");
  // console.log(post.categories);
  const link = "/post/" + post._id;
  const PF = "https://daffodil-blog.herokuapp.com/images/";
  
  return (
    <div className="post">
      {
        post.photo && (
          <Link className="link" to={link}>
            <img className="postImg" 
            src={PF + post.photo}
            alt=""/>
          </Link>
        )
      }
      <div className="postInfo">
        <div className="postCats">
          { 
            post.categories.map((c,key)=>(
              <span className="postCat" key={key}> {c.name} </span>      
            ))
          }  
        </div>
        <span className="postTitle">
          <Link className="link" to={link}>{post.title}</Link>
        </span>
        <hr/>
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  )
}
