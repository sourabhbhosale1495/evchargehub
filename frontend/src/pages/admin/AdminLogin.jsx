import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ==========================================
  // HANDLE ADMIN LOGIN
  // ==========================================

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        "https://evchargehub-backend.onrender.com/api/users/login",
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );


      const data = await response.json();

      console.log("Admin Login Response:", data);


      // ==========================================
      // LOGIN FAILED
      // ==========================================

      if (!response.ok) {

        throw new Error(
          data.message ||
          data.error ||
          "Invalid email or password."
        );

      }


      // ==========================================
      // CHECK ADMIN ROLE
      // ==========================================

      if (data.role !== "ADMIN") {

        setError(
          "Access denied. Only administrators can login here."
        );

        return;
      }


      // ==========================================
      // SAVE ADMIN INFORMATION
      // ==========================================

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data)
      );

      localStorage.setItem(
        "isAdmin",
        "true"
      );


      // ==========================================
      // GO TO ADMIN DASHBOARD
      // ==========================================

      navigate("/admin");


    } catch (error) {

      console.error(
        "Admin login error:",
        error
      );

      setError(
        error.message ||
        "Unable to login. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <main className="login-page">

      <div className="container py-5">

        <div
          className="card border-0 shadow-sm mx-auto"
          style={{
            maxWidth: "480px",
            borderRadius: "20px"
          }}
        >

          <div className="card-body p-5">


            {/* ==================================
                HEADER
            ================================== */}

            <div className="text-center mb-4">

              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "65px",
                  height: "65px",
                  background: "#e8f8ef",
                  borderRadius: "16px"
                }}
              >

                <i
                  className="bi bi-shield-lock-fill text-success"
                  style={{ fontSize: "30px" }}
                ></i>

              </div>


              <span className="text-success fw-semibold">
                EVCHARGEHUB ADMIN
              </span>

              <h1 className="fw-bold mt-2">
                Admin Login
              </h1>

              <p className="text-muted">
                Login to manage EVChargeHub
              </p>

            </div>


            {/* ==================================
                ERROR
            ================================== */}

            {error && (

              <div
                className="alert alert-danger"
                role="alert"
              >

                <i className="bi bi-exclamation-circle me-2"></i>

                {error}

              </div>

            )}


            {/* ==================================
                LOGIN FORM
            ================================== */}

            <form onSubmit={handleLogin}>


              {/* EMAIL */}

              <div className="mb-3">

                <label className="form-label">
                  Email Address
                </label>

                <div className="input-group">

                  <span className="input-group-text bg-white">
                    <i className="bi bi-envelope"></i>
                  </span>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter admin email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="mb-4">

                <label className="form-label">
                  Password
                </label>

                <div className="input-group">

                  <span className="input-group-text bg-white">
                    <i className="bi bi-lock"></i>
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                </div>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="btn btn-success btn-lg w-100"
                disabled={loading}
              >

                {loading ? (

                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                    ></span>

                    Logging in...

                  </>

                ) : (

                  <>
                    Login to Admin Panel
                    <i className="bi bi-arrow-right ms-2"></i>
                  </>

                )}

              </button>


            </form>


            {/* ==================================
                BACK TO USER LOGIN
            ================================== */}

            <div className="text-center mt-4">

              <span className="text-muted">
                Are you a user?
              </span>

              {" "}

              <Link
                to="/login"
                className="text-success text-decoration-none fw-semibold"
              >
                User Login
              </Link>

            </div>


          </div>

        </div>

      </div>

    </main>

  );

}

export default AdminLogin;