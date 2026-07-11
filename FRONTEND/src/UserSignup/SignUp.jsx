import { useState } from "react";
import "./SignUp.css";
import { registerUser } from "../api/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bgVideo from "../assets/video.mp4";
import propic from "../assets/propic.png";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameRegex = /^[A-Za-z ]{2,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    // Name Validation
    if (!nameRegex.test(user.name.trim())) {
      alert("Name should contain only letters and be 2-30 characters long.");
      return;
    }

    // Email Validation
    if (!emailRegex.test(user.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password Validation
    if (!passwordRegex.test(user.password)) {
      alert(
        "Password must be at least 8 characters and include one uppercase, one lowercase, one number, and one special character."
      );
      return;
    }

    // Confirm Password Validation
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await registerUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      console.log(response.data);
      alert("Signup Successful!");
      navigate("/user-login");
    } catch (error) {
      console.error(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Signup Failed!");
      }
    }
  };

  return (
    <>
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="signup-container">
        <div className="signup-card">

          {/* Left Side */}
          <div className="left-side">
            <div className="avatar">
              <img
                src={propic}
                alt="Tourist Avatar"
                style={{ width: "100px", borderRadius: "50%" }}
              />
            </div>

            <h2>Welcome Tourist</h2>

            <p>
              Discover the beauty of Bihar. Create your account to
              start your amazing journey.
            </p>
          </div>

          {/* Right Side */}
          <div className="right-side dark-theme">
            <h1>Sign Up</h1>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={user.name}
                  required
                  maxLength={30}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={user.email}
                  required
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Password</label>

                <div className="input-box">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={user.password}
                    required
                    minLength={8}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />

                  <span
                    className="eye"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>

                <div className="input-box">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={user.confirmPassword}
                    required
                    minLength={8}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        confirmPassword: e.target.value,
                      })
                    }
                  />

                  <span
                    className="eye"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Sign Up
              </button>

              <div className="footer-links">
                <Link to="/user-login">
                  Already have an account? Login
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;