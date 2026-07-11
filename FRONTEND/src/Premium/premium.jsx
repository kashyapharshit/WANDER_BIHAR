import React, { useState, useEffect } from "react";
import bgVideo from "../assets/video.mp4";
import { useNavigate } from "react-router-dom";
import "./premium.css";
import premvideo from "../assets/360view.mp4";
import chatbot from "../assets/chatbot.mp4";

function Premium() {
    const navigate = useNavigate();
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchFeatures = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/premium/features"
            );

            const data = await response.json();

            if (data.success) {
                setFeatures(data.data);
            }

        } catch (error) {
            console.error("Error fetching features:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchFeatures();

}, []);


const handlePremiumClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first to access Premium");
        navigate("/user-login");
    } else {
        navigate("/prem");
    }
};

    return (
        <div className="premium-hero">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="background-video"
            >
                <source src={bgVideo} type="video/mp4" />
            </video>

            {/* Gradient Overlay for Text Readability */}
            <div className="video-overlay"></div>

            {/* Main Content */}
            <div className="container premium-content">

                {/* Hero Section */}
                <section className="text-center text-white py-5">
                    <span className="badge bg-warning text-dark px-3 py-2 mb-4 fw-bold shadow-sm rounded-pill">
                        PREMIUM EXPERIENCE
                    </span>

                    <h1 className="hero-title mb-4">Wander Bihar</h1>

                    <p className="lead hero-subtitle mb-5">
                        Discover Bihar through immersive 360° Virtual Tours and your own
                        AI-powered Travel Guide.
                    </p>

                    <button
    className="btn premium-btn btn-lg px-5 py-3 fw-bold"
    onClick={handlePremiumClick}
>
    Join Premium
</button>
                </section>

                {/* Features Heading */}
                <section className="text-white py-2">
                    <h2 className="text-center section-title">
                        Explore Before You Travel
                    </h2>
                </section>

                {/* Dynamic Feature Cards */}
                <section className="py-4">
                    <div className="row g-4 justify-content-center">
                        {loading ? (
                            <div className="text-center text-white"><p>Loading features...</p></div>
                        ) : (
                            features.map((feature) => (
                                <div className="col-lg-5 col-md-6 d-flex" key={feature.id || feature._id}>
                                    <div className="glass-card w-100 p-5">
                                        <h2>{feature.icon} {feature.title}</h2>
                                        <p>{feature.description}</p>
                                        <ul className="list-unstyled">
                                            {feature.bulletPoints.map((point, index) => (
                                                <li key={index}>✅ {point}</li>
                                            ))}
                                        </ul>

                                        {/* Fallback to local videos based on keywords in the title */}
                                        <video
                                            id="premVideo"
                                            controls
                                            loop
                                            playsInline
                                            style={{ width: '100%', marginTop: '15px', borderRadius: '10px' }}
                                        >
                                            <source
                                                src={feature.title.toLowerCase().includes("360") ? premvideo : chatbot}
                                                type="video/mp4"
                                            />
                                        </video>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center py-5 mt-4 text-white">
                    <h3 className="section-title">Ready to Experience Bihar Like Never Before?</h3>
                    <p className="lead hero-subtitle mb-4">
                        Explore destinations virtually and get instant guidance from our
                        AI travel assistant.
                    </p>
                   <button
    className="btn premium-btn btn-lg px-5 py-3 fw-bold"
    onClick={handlePremiumClick}
>
    Join Premium Now
</button>
                </section>

            </div>
        </div>
    );
}

export default Premium;