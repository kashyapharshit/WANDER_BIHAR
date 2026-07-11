import axios from "axios";
import "./UserLogin.css";
import bgVideo from "../assets/video.mp4";
import propic from "../assets/propic.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    const handleLogin = async (e) => {
        e.preventDefault();

        // Empty Field Validation
        if (!email.trim() || !password.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        // Email Validation
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Password Validation
        if (!passwordRegex.test(password)) {
            alert(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
            );
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            alert("Login Successful");
            console.log(res.data);

            if (res.data.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/");
            }

        } catch (err) {
            alert(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="user-page">

            {/* Background Video */}
            <video
                className="bg-video"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={bgVideo} type="video/mp4" />
            </video>

            <div className="overlay"></div>

            {/* Login Card */}
            <div className="login-card">

                {/* Left Section */}
                <div className="left-panel">

                    <img
                        src={propic}
                        alt="User"
                        className="profile-image"
                    />

                    <h2>Welcome Tourist</h2>

                    <p>
                        Discover the beauty of Bihar.
                        Login to continue your amazing journey.
                    </p>

                </div>

                {/* Right Section */}
                <div className="right-panel">

                    <h1>Sign in</h1>

                    <form onSubmit={handleLogin}>

                        <div className="input-group">

                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>

                        <div className="input-group">

                            <label>Password</label>

                            <div className="password-box">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="eye-btn"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? "👀" : "👁"}
                                </button>

                            </div>

                        </div>

                        <div className="options">

                            <label>
                                <input type="checkbox" />
                                Remember Me
                            </label>

                            <Link to="/forgot-password">
                                Forgot Password?
                            </Link>

                        </div>

                        <button
                            type="submit"
                            className="login-button"
                        >
                            Login
                        </button>

                        <div className="links">

                            <Link to="/forgot-username">
                                Forgot Username?
                            </Link>

                            <Link to="/signUp">
                                Create Account
                            </Link>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default UserLogin;