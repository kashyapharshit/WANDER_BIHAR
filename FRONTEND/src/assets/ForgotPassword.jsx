import "./ForgotPassword.css";
import bgVideo from "../assets/video.mp4";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleOTP = (e) => {
        e.preventDefault();

        if (email === "") {
            alert("Please enter your registered email.");
        }
        else {
            alert("OTP Sent Successfully!");
            // navigate("/verify-otp");
            navigate("/user-login");
        }
    }

    return (

        <div className="forgot-page">

            <video
                autoPlay
                loop
                muted
                playsInline
                className="bg-video"
            >

                <source src={bgVideo} type="video/mp4" />

            </video>

            <div className="overlay"></div>

            <div className="forgot-card">

                <h1>Forgot Password</h1>

                <p>
                    Enter your registered email address to receive an OTP.
                </p>

                <form onSubmit={handleOTP}>

                    <label>Registered Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit">

                        Send OTP

                    </button>

                </form>

                <Link className="back-link" to="/user-login">

                    ← Back to Login

                </Link>

            </div>

        </div>

    )

}

export default ForgotPassword;