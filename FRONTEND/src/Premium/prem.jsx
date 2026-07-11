import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgVideo from "../assets/video.mp4";

function Prem() {
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                // Fetching from your Express backend on port 3000
                const response = await fetch("http://localhost:3000/api/premium/plans");
                const data = await response.json();

                if (data.success) {
                    setPlans(data.data);
                }
            } catch (error) {
                console.error("Error fetching plans:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    return (
        <div
            className="hero"
            style={{
                position: "relative",
                minHeight: "100vh",
                overflow: "hidden",
            }}
        >
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

            {/* Overlay */}
            <div className="overlay"></div>

            {/* Content */}
            <div
                className="container py-5 text-white"
                style={{
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {/* Hero Section */}
                <section className="text-center mb-5">
                    <h1 className="display-3 fw-bold">
                        Wander Bihar Premium
                    </h1>

                    <p className="lead">
                        Unlock exclusive travel experiences and explore Bihar like never before.
                    </p>
                </section>

                {/* Dynamic Plans */}
                <section className="row g-5 mb-5 justify-content-center">
                    {loading ? (
                        <div className="text-center"><p>Loading plans...</p></div>
                    ) : (
                        plans.map((plan) => (
                            <div className="col-md-5" key={plan.id || plan._id}>
                                <div className={`glass-card p-5 text-center h-100 ${plan.topBadge ? 'border border-warning' : ''}`}>

                                    {/* Render Top Badge if available */}
                                    {plan.topBadge && (
                                        <span className="badge bg-warning text-dark mb-3">
                                            {plan.topBadge.toUpperCase()}
                                        </span>
                                    )}

                                    <h2 className="text-capitalize">{plan.title}</h2>

                                    <h1 className="display-4 fw-bold text-warning">
                                        ₹{plan.price}
                                    </h1>

                                    <p className="mt-2">{plan.description}</p>

                                    <ul className="list-unstyled mt-4">
                                        {plan.bulletPoints.map((point, index) => (
                                            <li key={index}>✅ {point}</li>
                                        ))}
                                    </ul>

                                    <button
                                        className="btn btn-outline-warning mt-3"
                                        onClick={() => navigate("/payment")}
                                    >
                                        Select Plan
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </section>

                {/* Benefits Section */}
                <section className="mb-5">
                    <h2 className="text-center mb-5">
                        Premium Benefits
                    </h2>

                    <div className="row justify-content-center g-5">
                        <div className="col-md-5">
                            <div className="glass-card p-4 text-center h-100">
                                <h4>🌐 360° Tours</h4>
                                <p>Explore Bihar virtually.</p>
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="glass-card p-4 text-center h-100">
                                <h4>🤖 AI Guide</h4>
                                <p>Smart travel assistance.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-5">
                    <h2>Ready To Explore Bihar?</h2>

                    <button
                        className="btn btn-lg btn-warning px-5 mt-3 fw-bold"
                        onClick={() => navigate("/payment")}
                    >
                        Start Premium
                    </button>
                </section>
            </div>
        </div>
    );
}

export default Prem;