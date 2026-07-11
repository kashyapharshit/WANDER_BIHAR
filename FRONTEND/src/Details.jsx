import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Details.css";
import video1 from "./assets/nalanda.mp4";
function Details() {
    const { id } = useParams(); // Gets the unique ID from the URL
    const navigate = useNavigate();

    // Data State
    const [place, setPlace] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Review Pop-up State
    const [showPopup, setShowPopup] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");

    // Fetch place details from your MongoDB via API
    useEffect(() => {
        const fetchPlaceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/locations/place/${id}`);
                console.log("response", response)
                setPlace(response.data.data || response.data);
            } catch (err) {
                console.error("Error fetching place details:", err);
                setError("Failed to load details. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchPlaceDetails();
    }, [id]);

    // The 10-Second Interval for the Review Popup
    useEffect(() => {
        if (reviewSubmitted) return;

        const popupInterval = setInterval(() => {
            setShowPopup((prev) => (!prev ? true : prev));
        }, 10000);

        return () => clearInterval(popupInterval);
    }, [reviewSubmitted]);

    // Handle Form Submission
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting review:", { placeId: id, rating, reviewText });
        setReviewSubmitted(true);
        setShowPopup(false);
        alert("Thank you for your review!");
    };

    if (isLoading) return <div className="vh-100 d-flex justify-content-center align-items-center text-white">Loading details...</div>;
    if (error) return <div className="vh-100 d-flex justify-content-center align-items-center text-danger">{error}</div>;
    if (!place) return <div className="vh-100 d-flex justify-content-center align-items-center text-white">Location not found.</div>;

    return (
        <div className="details-page text-white">
            <div className="details-header" style={{ backgroundImage: `url(${place.image})` }}>
                <div className="header-overlay">
                    <h1>{place.title}</h1>
                    <p className="fs-5 text-light">{place.location}</p>
                </div>
            </div>

            <div className="container mt-5 pb-5">
                <div className="row gap-4 gap-md-0">
                    <div className="col-md-5">
                        <h3 className="mb-4" style={{ color: '#e4c76b', fontFamily: 'Fraunces' }}>About this Location</h3>
                        <p style={{ lineHeight: '1.8', color: '#eaeaea' }}>
                            {place.description || "Detailed historical and architectural description coming soon."}
                        </p>

                        <div className="mt-4 p-4 border rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(201, 162, 39, 0.3)' }}>
                            <ul className="list-unstyled mb-0">
                                <li className="mb-3"><strong>Entry Fee:</strong> <span className="float-end text-warning">{place.entry}</span></li>
                                <li className="mb-3"><strong>Category:</strong> <span className="float-end">{place.type}</span></li>
                                <li className="mb-3"><strong>Established:</strong> <span className="float-end">{place.est}</span></li>
                                <li><strong>Current Rating:</strong> <span className="float-end">{place.rating} / 5.0</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <h3 className="mb-4" style={{ color: '#e4c76b', fontFamily: 'Fraunces' }}>Immersive Environment</h3>
                        <div className="video-container shadow-lg">
                            <iframe
                                title="360 Environmental Visualization"
                                width="100%"
                                height="400"
                                src={video1}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr"
                                allowFullScreen
                                className="rounded"
                            ></iframe>
                        </div>
                        <p className="text-muted mt-2 small text-center">Interactive 360° View. Drag to look around the environment.</p>
                    </div>
                </div>
            </div>

            {showPopup && !reviewSubmitted && (
                <div className="review-modal-overlay">
                    <div className="review-modal-content">
                        <h4 className="mb-3">Enjoying {place.title}?</h4>
                        <p className="text-muted mb-4">Let us know your thoughts. Your feedback helps other travelers!</p>

                        <form onSubmit={handleReviewSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-light">Your Rating</label>
                                <select
                                    className="form-control bg-dark text-white border-secondary"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                                    <option value="4">⭐⭐⭐⭐ - Good</option>
                                    <option value="3">⭐⭐⭐ - Average</option>
                                    <option value="2">⭐⭐ - Poor</option>
                                    <option value="1">⭐ - Terrible</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-light">Written Review</label>
                                <textarea
                                    className="form-control bg-dark text-white border-secondary"
                                    rows="3"
                                    placeholder="Describe your experience..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-outline-light" onClick={() => setShowPopup(false)}>
                                    Not Now
                                </button>
                                <button type="submit" className="btn" style={{ backgroundColor: '#c9a227', color: '#1b140f', fontWeight: 'bold' }}>
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Details;