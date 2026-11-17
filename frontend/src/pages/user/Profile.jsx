import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(loggedInUser));
    } catch (error) {
      console.error("Error reading user:", error);
      localStorage.removeItem("loggedInUser");
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="mb-4">
        <span className="text-success fw-semibold">
          MY ACCOUNT
        </span>

        <h1 className="fw-bold mt-2">
          My Profile
        </h1>

        <p className="text-muted">
          View your account information.
        </p>
      </div>

      <div
        className="card shadow-sm border-0"
        style={{ maxWidth: "700px" }}
      >
        <div className="card-body p-4">

          <div className="text-center mb-4">
            <div
              className="mx-auto d-flex align-items-center justify-content-center"
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                backgroundColor: "#e8f8ef",
                color: "#00a651",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <h3 className="fw-bold mt-3 mb-1">
              {user.name}
            </h3>

            <span className="badge bg-success">
              {user.role || "USER"}
            </span>
          </div>

          <hr />

          <div className="row mt-4">

            <div className="col-md-6 mb-4">
              <small className="text-muted">
                Full Name
              </small>

              <h6 className="mt-1">
                {user.name}
              </h6>
            </div>

            <div className="col-md-6 mb-4">
              <small className="text-muted">
                Email Address
              </small>

              <h6 className="mt-1">
                {user.email}
              </h6>
            </div>

            <div className="col-md-6 mb-4">
              <small className="text-muted">
                User ID
              </small>

              <h6 className="mt-1">
                {user.id}
              </h6>
            </div>

            <div className="col-md-6 mb-4">
              <small className="text-muted">
                Account Type
              </small>

              <h6 className="mt-1">
                {user.role || "USER"}
              </h6>
            </div>

          </div>

          <div className="d-flex gap-2 mt-3">

            <button
              className="btn btn-success"
              onClick={() => navigate("/dashboard")}
            >
              ← Back to Dashboard
            </button>

            <button
              className="btn btn-outline-success"
              onClick={() => navigate("/my-bookings")}
            >
              My Bookings
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Profile;