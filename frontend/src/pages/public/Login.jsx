import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {

      const data = await loginUser({ email: email.trim(), password });

      /*
       * Save logged-in user
       */
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data)
      );

      /*
       * Check role
       */
      if (
        data.role &&
        data.role.toUpperCase() === "ADMIN"
      ) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");

      } else {
        localStorage.setItem("isAdmin", "false");
        navigate("/dashboard");

      }

    } catch (error) {

      setError(
        error.message ||
        "Login failed. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <main className="login-page">

      <div className="login-container">

        {/* ==============================
            LEFT SIDE
        ============================== */}

        <div className="login-left">

          <div className="login-brand-icon">
            <i className="bi bi-lightning-charge-fill"></i>
          </div>

          <span className="login-small-title">
            EVCHARGEHUB
          </span>

          <h1>
            Welcome<br />
            <span>Back</span>
          </h1>

          <p>
            Login to manage your EV charging
            bookings and find nearby charging
            stations.
          </p>

          <div className="login-feature">

            <div className="login-feature-icon">
              <i className="bi bi-ev-front-fill"></i>
            </div>

            <div>
              <strong>Smart EV Charging</strong>

              <span>
                Book your charging slot easily.
              </span>
            </div>

          </div>

        </div>


        {/* ==============================
            RIGHT SIDE
        ============================== */}

        <div className="login-right">

          <div className="login-form-header">

            <h2>
              Login to your account
            </h2>

            <p>
              Enter your details to continue.
            </p>

          </div>


          {/* ERROR */}

          {error && (

            <div className="login-error">

              <i className="bi bi-exclamation-circle"></i>

              <span>
                {error}
              </span>

            </div>

          )}


          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="login-form-group">

              <label>
                Email Address
              </label>

              <div className="login-input-wrapper">

                <i className="bi bi-envelope"></i>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="login-form-group">

              <label>
                Password
              </label>

              <div className="login-input-wrapper">

                <i className="bi bi-lock"></i>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >

              {loading ? (

                <>
                  <span className="spinner-border spinner-border-sm"></span>

                  Logging in...
                </>

              ) : (

                <>
                  Login

                  <i className="bi bi-arrow-right"></i>
                </>

              )}

            </button>

          </form>


          {/* REGISTER */}

          <div className="login-register">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create Account
            </Link>

          </div>


          {/* BACK HOME */}

          <Link
            to="/"
            className="login-back-home"
          >

            <i className="bi bi-arrow-left"></i>

            Back to Home

          </Link>

        </div>

      </div>

    </main>

  );
}

export default Login;
