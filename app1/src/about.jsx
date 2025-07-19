import { useState,useEffect } from "react";

function About(){
    const [data,setData]=useState([]);
    // const [text1,setText1]=useState("");

        function fetchData(text){
            fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response=>response.json())
            .then(res=>setData(filter(res,text)))
            .catch(error =>console.log(error));
            
        }
        function filter(list,text){
            return list.filter(item =>
                item.title.toLowerCase().includes(text.toLowerCase())
            );


        }
        useEffect(()=>{
            fetchData(" ");
        },[])


    return(
        <>
        <div className="d-flex justify-content-center my-3">
            <input type="text" className="form-control w-50" placeholder="Enter here" onKeyUp={e=>fetchData(e.target.value)}/>
        </div>
        {data.map((item)=>(
            <div className=" row" key={item.id} style={{ marginBottom: "10px",marginLeft:"5px" }}>
                <div className="col-md-2">
                    {item.id}
                </div>
                <div className="col-md-5">
                    {item.title}
                </div>
                <div className="col-md-5">
                    {item.body}
                </div>
            </div>

        ))}
        </>
    )
}
export default About;