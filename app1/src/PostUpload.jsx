import { useState } from 'react';
import Posts from './Posts';
import API_URL from './config';

const PostUpload = () => {
  const [postImage, setPostImage] = useState(null);
  const [postCaption, setPostCaption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("postImage", postImage);
    formData.append("caption", postCaption);
    formData.append("token", token);

    fetch(`${API_URL}/postSave`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        <Posts/>
        setPostCaption('');
        setPostImage(null);

        e.target.reset();
      })
      .catch(err => {
        alert("Something went wrong.");
      });
  };

  return (
    <div className="panel">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="postImage" className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            id="postImage"
            accept="image/*"
            onChange={(e) => setPostImage(e.target.files[0])}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postCaption" className="form-label">Caption</label>
          <input
            type="text"
            className="form-control"
            id="postCaption"
            value={postCaption}
            onChange={(e) => setPostCaption(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload Post</button>
      </form>
    </div>
  );
};

export default PostUpload;