import React, { useState } from 'react';

import API_URL from './config';


const FriendRequest = () => {
  const [remail, setRemail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const data = { remail, token };

    fetch(`${API_URL}/sendRequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        alert(result.message);
        setRemail('');
      })
      .catch(err => {
        console.error("Error:", err);
        alert("Something went wrong.");
      });
  };

  return (
    <div className="panel">
        <h5>Send Friend Request</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter user ID"
            value={remail}
            onChange={(e) => setRemail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning">Send</button>
      </form>
    </div>
  );
};

export default FriendRequest;