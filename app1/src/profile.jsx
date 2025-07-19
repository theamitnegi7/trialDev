import { useState,useEffect } from "react";
import API_URL from "./config";
import Image_Url from "./image";
function Profile(){
    const [profile,setProfile]=useState(null)
    const token = localStorage.getItem("token");
    const [showModal, setShowModal] = useState(false);

    function fetchProfile(){
        fetch(`${API_URL}/profile`,{
            method:"Post",
            headers:{ "Content-Type": "application/json"},
            body:JSON.stringify({token})
        })
        .then(res=>res.json())
        .then(data=>{
            setProfile(data)
        })
        .catch(err => {
        console.error("Error fetching profile:", err);
            });
    }
    function handleUpdate (e){
    e.preventDefault();
    const formData= new FormData();
    formData.append("name", e.target.name.value);
    formData.append("token",token);
    console.log("hii");
    if (e.target.profileImage.files[0]) {
      formData.append("profileImage", e.target.profileImage.files[0]);
    }

    try {
        fetch(`${API_URL}/update`, {
            method: "POST",
            body: formData
        })
        .then(response=>response.json())
        .then(data=>{
            alert(data.message);
            setShowModal(false)
            fetchProfile();
        })
        .catch(error=>{
            console.log(error)
        }); 

    } catch (err) {
        console.error("Error:", err);
    }

  };
    useEffect(() => {
        fetchProfile();
    }, []);
    if (!profile) return <div className="text-center mt-5">Loading profile...</div>;
    return(
        <>
        {/* <div 
                    className=" panel card flex-row align-items-center border p-2 rounded mb-2 "
                    >
                   <img
                        src={`http://localhost:8000/${profile.profileImage}`}
                        className="card-img-top"
                        alt="Post"
                        style={{ maxWidth: "100px", maxHeight: "70px", objectFit: "cover" }}
                    />

                    <div className="card-body py-2">
                        <h5 className="fw-bold mb-0">{profile.name}</h5>
                    </div>
                     <button className="btn btn-primary ms-auto" onClick={() => setShowModal(true)}>
                    Edit Profile
                    </button>
                   
                    </div> */}
                    <div className="panel card border shadow-sm p-3 rounded mb-3 bg-light" style={{ position: "relative" }}>
                        <div className="d-flex align-items-center">
                            <div className="me-3 d-flex align-items-center justify-content-center rounded overflow-hidden border" style={{ width: "130px", height: "90px" }}>
                                <img
                                    src={`${Image_Url}/${profile.profileImage}`}
                                    className="img-fluid"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>

                            <div className="card-body py-2">
                                <h3 className="fw-semibold mb-1">{profile.name}</h3>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <button
                                className="btn btn-outline-primary btn-sm "onClick={() => setShowModal(true)}>
                                <i className="bi bi-pencil-square me-1"></i>Edit Profile
                            </button>
                        </div>
                    </div>
                    {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form onSubmit={handleUpdate}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Profile</h5>
                                    <button type="button" className="btn-close"
                                        onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" name="name"placeholder="Enter name" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Profile Image</label>
                                            <input type="file" className="form-control" name="profileImage" accept="image/*" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default Profile;