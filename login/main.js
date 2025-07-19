const signupForm=document.getElementById("signupForm");
// const responseDiv=document.getElementById("response");
const loginForm=document.getElementById("loginForm");




signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name1 = document.getElementById("mname").value;
    const email = document.getElementById("memail").value;
    const pass = document.getElementById("mpass").value;
    const data = { name: name1, email:email, pass:pass};
    // console.log("check1");
    // console.log(name1,rno,marks);
    console.log(data);

    try {
        fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(data=>{
            alert(data.message);  
        })
        .catch(error=>{
            console.log(error)
        }); 

    } catch (err) {
        console.error("Error:", err);
        responseDiv.textContent = "Something went wrong.";
    }
});
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;

    const data = {email:email, pass:pass};
    // console.log("check1");
    // console.log(name1,rno,marks);
    console.log(data);

    try {
        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.token){
                localStorage.setItem("token",data.token);
                location="welcome.html";
            }else{
                alert("error in login");
            }
        })
        .catch(error=>{
            console.log(error)
        }); 

    } catch (err) {
        console.error("Error:", err);
    }
});