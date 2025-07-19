import { useState,useEffect } from "react";
import API_URL from "./config";
import Image_Url from "./image";
function Posts(){
    const [posts,setPosts]=useState([]);
    const[total,setTotal]=useState(0);
    const[page,setPage]=useState(1);
    const limit = 5;
    const totalPages = Math.ceil(total / limit);
    function fetchPosts(page=1,limit=5){
        const token=localStorage.getItem("token");
        fetch(`${API_URL}/fetchPost`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({token,page,limit})
        })
        .then(response=>response.json())
        .then(data=>{
            const posts = data.posts;
           setPosts(data.posts || []);
           setTotal(data.total || 0);
            console.log(posts);
         })
        .catch(error=>{
            console.log(error)
        });

    }
      useEffect(()=>{
            fetchPosts(page,limit);
        },[page]);

    return(
        <>
        <div className="container ">
            <h4> Posts </h4>
            <div className="mt-3">
                {posts.length === 0 ? (
                <div className="text-muted text-danger">No Post</div>
                ) : (
                posts.map((post) => (
                    <div 
                    className=" panel card mb-3d-flex border p-2 rounded mb-2 "
                    >
                   <img
                        //  src={`/login/${post.post}`}
                        src={`${Image_Url}/${post.post}`}
                        className="card-img-top"
                        alt="Post"
                        style={{ maxWidth: "600px", maxHeight: "600px", objectFit: "cover" }}
                    />

                    <div className="card-body py-2">
                        <h6 className="text-muted mb-1">{post.semail}</h6>
                        <p className="card-text mb-0">{post.caption}</p>
                    </div>
                   
                    </div>
                ))
                )}
                <div className="d-flex justify-content-between aligh-item-center mt-3">
                    <button disabled={page <=1}
                    onClick={()=>setPage(Math.max(page-1,1))} 
                    className="btn btn-primary">Prev</button>
                    <span>Page {page}</span>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage(prev => prev + 1)}
                        className="btn btn-primary">Next</button>
                </div>
            </div>
            </div>
        </>
    )
}
export default Posts;