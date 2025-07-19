import { useEffect, useState } from "react";
import API_URL from "./config";
const PendingFriends = () => {
  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 3;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    fetchPendingRequests(page, limit);
  }, [page]);

  const fetchPendingRequests = (page = 1, limit = 3) => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/pendingFriends`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, page, limit }),
    })
      .then(response => response.json())
      .then((data) => {
        if (data) {
          setRequests(data.results || []);
          setTotal(data.total || 0);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const acceptRequest = async (id) => {
    console.log("accept button");
    try {
      const res = await fetch(`${API_URL}/acceptRequest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("API error:", error);
      alert("An error occurred while accepting the request");
    }

    fetchPendingRequests(page, limit);
  };

  const rejectRequest = async (id) => {
    console.log("reject button");
    try {
      const res = await fetch(`${API_URL}/rejectRequest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error("API error:", error);
      alert("An error occurred while rejecting the request");
    }

    fetchPendingRequests(page, limit);
  };

  return (
    <div className="container ">
      <h5>Pending Friend Requests</h5>
      <div className="mt-3">
        {requests.length === 0 ? (
          <div className="text-muted">No pending requests.</div>
        ) : (
          requests.map((request) => (
            <div
              key={request._id}
              className="panel justify-content-between align-items-center border p-2 rounded mb-2"
            >
              <span>{request.semail}</span>
              <div>
                <div>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => acceptRequest(request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => rejectRequest(request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))

        )}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            disabled={page <= 1}
            onClick={() => setPage(Math.max(page - 1, 1))}
            className="btn btn-primary"
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingFriends;