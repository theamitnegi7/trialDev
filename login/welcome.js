const requestId=document.getElementById("requestId");
const friendsList=document.getElementById("friendsList");
const postForm=document.getElementById("postForm");


function friends(){
    const token = localStorage.getItem("token");
    try {
        fetch("http://localhost:8000/allFriends", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({token})
        })
        .then(response=>response.json())
        .then(data=>{
            friendsList.innerHTML = '';
            data.forEach(email => {
                const div = document.createElement("div");
                div.className = "alert alert-primary py-1 mb-2";
                div.textContent = email;
                friendsList.appendChild(div);
              }); 
        })
        .catch(error=>{
            console.log(error)
        }); 

    } catch (err) {
        console.error("Error:", err);
        responseDiv.textContent = "Something went wrong.";
    }

}
friends();
function pending(){
    const token = localStorage.getItem("token");
    const pendingRequests = document.getElementById("pendingRequests");
    try {
        fetch("http://localhost:8000/pendingFriends", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({token})
        })
        .then(response=>response.json())
        .then(data=>{
            pendingRequests.innerHTML = '';
           
            data.forEach(request => {
                const semail = request.semail;
                const id = request._id;
        
                const div = document.createElement("div");
                div.className = "request-card";
                div.setAttribute("id", request._id);
        
                div.innerHTML = `
                  <span>${request.semail}</span>
                  <div>
                    <button class="btn btn-sm btn-success me-1" onclick="acceptRequest(this,'${id}')">Accept</button>
                    <button class="btn btn-sm btn-danger" onclick="rejectRequest(this,'${id}')">Reject</button>
                  </div>
                `;
                pendingRequests.appendChild(div);
              });
        })
        .catch(error=>{
            console.log(error)
        }); 

    } catch (err) {
        console.error("Error:", err);
        responseDiv.textContent = "Something went wrong.";
    }
}
pending();
requestId.addEventListener("submit", async (e) => {
    e.preventDefault();

    
    const remail = document.getElementById("friendIdInput").value;
    const token=localStorage.getItem('token');
    const data = {remail:remail, token:token};
    console.log(data);

    try {
        fetch("http://localhost:8000/sendRequest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(data=>{
            alert(data.message);
            remail.value='';
        })
        .catch(error=>{
            console.log(error)
        }); 

    } catch (err) {
        console.error("Error:", err);
        responseDiv.textContent = "Something went wrong.";
    }
});
postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const postImage = document.getElementById("postImage").files[0];
    const postCaption = document.getElementById("postCaption").value;
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("postImage", postImage);
    formData.append("caption", postCaption);
    formData.append("token", token);

    try {
      const response = await fetch("http://localhost:8000/postSave", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      alert(data.message);
      document.getElementById("postForm").reset();
      posts();
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  });

function posts(){
    const token = localStorage.getItem("token");
    const postArea=document.getElementById("postsArea");
    try {
        fetch("http://localhost:8000/fetchPost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({token})
        })
        .then(response=>response.json())
        .then(data=>{
            const posts = data.posts;
            console.log(posts);
            postArea.innerHTML = "";
            posts.forEach(post=>{

                const divcard=document.createElement("div");
                divcard.className="card mb-3";
                divcard.innerHTML=` <img src="${post.post}" class="card-img-top" alt="Post Image">
                                <div class="card-body py-2">
                                    <h6 class="text-muted mb-1">${post.semail}</h6>
                                    <p class="card-text mb-0">${post.caption}</p>
                                </div>`;
                postArea.appendChild(divcard);               

            });
         })
        .catch(error=>{
            console.log(error)
            postArea.innerHTML = `<p class="text-danger">Failed to load posts.</p>`;
        }); 

    } catch (err) {
        console.error("Error:", err);
    }
}
posts();



function acceptRequest(button, id) {
        console.log("accepet button");
    try {
        fetch("http://localhost:8000/acceptRequest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id})
        })
        .then(response=>response.json())
        .then(data=>{
            alert(data.message);
            
        })
        .catch(error=>{
            console.log(error)
        }); 
    } catch (error) {
      console.error("API error:", error);
      alert("An error occurred while accepting the request");
    }
    friends();
    pending();
  }
function rejectRequest(button, id) {
    console.log("reject button");
    try {
        fetch("http://localhost:8000/rejectRequest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id})
        })
        .then(response=>response.json())
        .then(data=>{
            alert(data.message);
            
        })
        .catch(error=>{
            console.log(error)
        }); 
    } catch (error) {
      console.error("API error:", error);
      alert("An error occurred while accepting the request");
    }
    friends();
    pending();
  }
  

