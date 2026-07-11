import "./ForgotUsername.css";
import bgVideo from "../assets/video.mp4"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function ForgotUsername() {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.trim() === "") {
            alert("Please enter your registered email.");
            return;
        }

        alert("Your username has been sent to your registered email.");

        // Later backend se connect karenge
        navigate("/user-login");
    };

    return (
        <div className="forgot-page">

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

            {/* Card */}

            <div className="forgot-card">

                <h1>Forgot Username</h1>

                <p>
                    Enter your registered email address to receive your username.
                </p>

                <form onSubmit={handleSubmit}>

                    <label>Registered Email</label>

                    <input
                        type="email"
                        placeholder="Enter your registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit">
                        Get Username
                    </button>

                </form>

                <Link className="back-link" to="/user-login">
                    ← Back to Login
                </Link>

            </div>

        </div>
    );
}

export default ForgotUsername;