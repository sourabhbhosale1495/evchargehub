import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!terms) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    try {

      setLoading(true);

      await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
        role: "USER"
      });

      setSuccess("Account created successfully! Redirecting to login...");

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setError(err.message || "Registration failed. Please try again.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="auth-page">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-10">

            <div className="auth-card">

              {/* Left Side */}
              <div className="auth-brand-panel">

                <div className="auth-brand-icon">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>

                <h1>
                  Welcome to
                  <br />
                  <span>EVChargeHub.</span>
                </h1>

                <p>
                  Join our smart EV charging network and
                  make every charging experience simple.
                </p>

                <div className="auth-benefit">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Access charging stations near you</span>
                </div>

                <div className="auth-benefit">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Reserve charging slots</span>
                </div>

                <div className="auth-benefit">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Manage your EV and bookings</span>
                </div>

              </div>

              {/* Right Side */}
              <div className="auth-form-panel">

                <div className="auth-form-header">

                  <span>GET STARTED</span>

                  <h2>Create your account</h2>

                  <p>
                    Register to start using EVChargeHub.
                  </p>

                </div>

                <form onSubmit={handleRegister}>

                  {/* Error */}
                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}

                  {/* Success */}
                  {success && (
                    <div className="alert alert-success">
                      {success}
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="auth-field">

                    <label>Full Name</label>

                    <div className="auth-input">

                      <i className="bi bi-person"></i>

                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                    </div>

                  </div>

                  {/* Email */}
                  <div className="auth-field">

                    <label>Email Address</label>

                    <div className="auth-input">

                      <i className="bi bi-envelope"></i>

                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                    </div>

                  </div>

                  {/* Password */}
                  <div className="auth-field">

                    <label>Password</label>

                    <div className="auth-input">

                      <i className="bi bi-lock"></i>

                      <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                    </div>

                  </div>

                  {/* Confirm Password */}
                  <div className="auth-field">

                    <label>Confirm Password</label>

                    <div className="auth-input">

                      <i className="bi bi-shield-lock"></i>

                      <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                      />

                    </div>

                  </div>

                  {/* Terms */}
                  <div className="terms-row">

                    <label>

                      <input
                        type="checkbox"
                        checked={terms}
                        onChange={(e) =>
                          setTerms(e.target.checked)
                        }
                      />

                      <span>
                        I agree to the
                        <a href="#terms">
                          {" "}Terms & Conditions
                        </a>
                      </span>

                    </label>

                  </div>

                  {/* Register */}
                  <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={loading}
                  >

                    {loading
                      ? "Creating Account..."
                      : "Create Account"
                    }

                    {!loading && (
                      <i className="bi bi-arrow-right ms-2"></i>
                    )}

                  </button>

                </form>

                <p className="auth-register-text">

                  Already have an account?

                  <Link to="/login">
                    {" "}Sign in
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Register;
