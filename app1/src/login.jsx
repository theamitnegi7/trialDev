import loginImage from './istockphoto-1195415965-170667a.jpg'; 
import API_URL from './config';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Modal, Button } from "react-bootstrap";

function Login() {
    const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const handleClose = () => setShowSignup(false);
  const handleShow = () => setShowSignup(true);
  const handleLogin =(e)=>{
    e.preventDefault();
    const lemail=e.target.lemail.value;
    const lpassword=e.target.lpassword.value;
    const data={email:lemail, pass:lpassword};
    try {
        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.token){
                localStorage.setItem("token",data.token);
                navigate("/info");
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

  };
  const handleSignup =(e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("pass", e.target.password.value);
    if (e.target.profileImage.files[0]) {
      formData.append("profileImage", e.target.profileImage.files[0]);
    }

    try {
        fetch(`${API_URL}/signup`, {
            method: "POST",
            body: formData
        })
        .then(response=>response.json())
        .then(data=>{
            alert(data.message);  
            handleClose();
            // navigate("/info");
        })
        .catch(error=>{
            console.log(error)
        }); 

    } catch (err) {
        console.error("Error:", err);
    }

  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-start justify-content-center bg-light pt-5">
      <div className="row w-75 shadow-lg rounded overflow-hidden">
        {/* Left side - Image */}
       <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={loginImage}
            alt="login"
            className="img-fluid h-100 w-100 object-fit-cover"
          />
        </div>

        {/* Right side - Login Card */}
        <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center">
          <h2 className="mb-4 text-center">Login</h2>
          <form onSubmit={ handleLogin}>
            <div className="mb-3">
              <label>Email address</label>
              <input type="email"  name="lemail"className="form-control" placeholder="Enter email" on />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password"  name="lpassword" className="form-control" placeholder="Enter password" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={handleShow}>Sign up</span>
          </p>
        </div>
      </div>
      {/* Signup Modal */}
      <Modal show={showSignup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSignup} encType="multipart/form-data">
            <div className="mb-3">
              <label>Name</label>
              <input type="text" className="form-control" name="name"placeholder="Enter name" />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" name="email" placeholder="Enter email" />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" className="form-control" name="password" placeholder="Create password" />
            </div>
            <div className="mb-3">
              <label>Profile Image</label>
              <input type="file" className="form-control" name="profileImage" accept="image/*" />
            </div>
            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>
          </form>
        </Modal.Body>
      </Modal>
      </div>
     ) }
     export default Login;