import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Cards.css"; // Go up one folder
import { useWishlist } from "../WishlistContext"; // Go up one folder

function WishlistPage() {
    const [savedPlaces, setSavedPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { wishlist, removeFromWishlist } = useWishlist();

    useEffect(() => {
        const fetchAndFilterLocations = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/locations");

                if (response.data.success) {
                    const allPlaces = response.data.data.flatMap(division => division.places);
                    const favorited = allPlaces.filter(place => wishlist.includes(place._id));
                    setSavedPlaces(favorited);
                } else {
                    throw new Error("Failed to load locations");
                }
            } catch (err) {
                console.error("Axios fetch error:", err);
                setError(err.response?.data?.message || err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndFilterLocations();
    }, [wishlist]);

    const handleProtectedAction = (action) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Login-First");
            navigate("/user-login");
        } else {
            action();
        }
    };

    if (isLoading) return <div className="text-center text-white mt-5">Loading Wishlist...</div>;
    if (error) return <div className="text-center text-danger mt-5">Error: {error}</div>;

    return (
        <div className="div" id="background" style={{ minHeight: '100vh', padding: '2rem' }}>
            <div className="d-flex text-white align-items-center w-100 mb-4">
                <h2>My Wishlist</h2>
            </div>

            {savedPlaces.length === 0 ? (
                <h4 className="text-white text-center mt-5">Your wishlist is currently empty.</h4>
            ) : (
                <div className="cards-grid w-100 d-flex flex-wrap justify-content-start" style={{ gap: "1.5rem" }}>
                    {savedPlaces.map((place) => (
                        <div className="temple-card" key={place._id}>
                            <div className="card-top-bar"></div>
                            <div className="card-image-wrapper">
                                <img src={place.image} alt={place.title} className="card-image" />
                                <span className="card-status-badge"><span className="status-dot"></span>Open</span>
                                <div className="fav-wrapper">
                                    <button
                                        className="card-favorite-btn" aria-label="Remove from favourites"
                                        onClick={() => removeFromWishlist(place._id)}
                                    >
                                        <svg className="heart-icon" fill="red" stroke="red" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="card-header">
                                    <div>
                                        <h4 className="card-title">{place.title}</h4>
                                        <p className="card-location">{place.location}</p>
                                    </div>
                                    <div className="card-entry">
                                        <p className="card-entry-label">Entry</p>
                                        <p className="card-entry-value">{place.entry}</p>
                                    </div>
                                </div>
                                <div className="card-stats">
                                    <div className="card-stat"><p className="stat-label">Rating</p><p className="stat-value">{place.rating}</p></div>
                                    <div className="card-stat"><p className="stat-label">Type</p><p className="stat-value">{place.type}</p></div>
                                    <div className="card-stat"><p className="stat-label">Est.</p><p className="stat-value">{place.est}</p></div>
                                </div>

                                {place.premium ? (
                                    <button className="discover-btn" onClick={() => handleProtectedAction(() => navigate(`/place/${place._id}`))}>
                                        Discover More →
                                    </button>
                                ) : (
                                    <button className="discover-btn premium-locked" onClick={() => handleProtectedAction(() => navigate("/premium"))}>
                                        🔒 Get Premium to Access
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WishlistPage;