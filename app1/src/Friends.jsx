import { useState,useEffect } from "react";
import API_URL from "./config";
function Friends(){
    const [friends,setFriends]=useState([]);
    function fetchFriends(){
        const token=localStorage.getItem("token");

        fetch(`${API_URL}/allFriends`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
            })
            .then(response=>response.json())
            .then((data) => {
            if (data) {
                setFriends(data);
            }
            })
            .catch((error) => {
            console.error("An error occurred:", error);
        });
    }
    useEffect(()=>{
        fetchFriends();
    },[]);
    return(
        <>
            <div className="container ">
            <h4> Friends</h4>
            <div className="mt-3">
                {friends.length === 0 ? (
                <div className="text-muted">No Friends</div>
                ) : (
                friends.map((email) => (
                    <div 
                    className=" panel d-flex justify-content-between align-items-center border p-2 rounded mb-2 "
                    >
                    <span>{email}</span>
                   
                    </div>
                ))
                )}
            </div>
            </div>


        </>
    );
}
export default Friends;