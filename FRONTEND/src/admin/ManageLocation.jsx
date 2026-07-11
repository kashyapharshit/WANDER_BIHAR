import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Cards.css'; // Importing your existing CSS so it looks exactly the same

function ManageLocation() {
    // 1. Initialize the navigation hook
    const navigate = useNavigate();

    // 2. State management for API data
    const [divisionsData, setDivisionsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. Fetch locations from backend on component mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/locations");
                if (response.data.success) {
                    setDivisionsData(response.data.data);
                } else {
                    throw new Error(response.data.message || "Failed to load locations");
                }
            } catch (err) {
                console.error("Axios fetch error:", err);
                setError(err.response?.data?.message || err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLocations();
    }, []);

    // 4. Loading and Error states
    if (isLoading) return <div className="text-center text-white mt-5">Loading Manage Locations...</div>;
    if (error) return <div className="text-center text-danger mt-5">Error: {error}</div>;

    return (
        <div style={{ backgroundColor: "#1b140f", minHeight: "100vh" }}>
            {/* Header for Admin Page */}
            <div className="d-flex text-white w-100 pt-4 pb-2" style={{ padding: "0 5%" }}>
                <h1 style={{ color: "#faf5ec", fontFamily: "Fraunces", fontStyle: "italic", fontWeight: "500" }}>Manage Locations</h1>
            </div>

            {/* Map over the fetched divisions */}
            {divisionsData.map((division) => (
                <div className="div" id="background" key={division._id}>
                    {/* Header Section */}
                    <div className="d-flex text-white align-items-center w-100 mb-3">
                        <h2>{division.name}</h2>
                    </div>

                    {/* Cards Grid */}
                    <div
                        className="cards-grid w-100 d-flex flex-nowrap justify-content-around overflow-auto"
                        style={{ gap: "1.5rem" }}
                    >
                        {/* Map over the specific places inside that division */}
                        {division.places.map((place) => (
                            <div className="temple-card" key={place._id}>
                                <div className="card-top-bar"></div>
                                <div className="card-image-wrapper">
                                    <img
                                        src={place.image}
                                        alt={place.title}
                                        className="card-image"
                                    />
                                    <span className="card-status-badge">
                                        <span className="status-dot"></span>
                                        Open
                                    </span>

                                    {/* --- BIG PENCIL EDIT BUTTON --- */}
                                    <div className="edit-wrapper">
                                        <button
                                            className="card-edit-btn"
                                            aria-label="Edit Location"
                                            onClick={() => navigate('/admin/edit-location', { state: { placeData: place } })}
                                        >
                                            <svg
                                                className="pencil-icon"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <span className="edit-tooltip">Edit Location</span>
                                    </div>
                                    {/* ------------------------------- */}

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
                                        <div className="card-stat">
                                            <p className="stat-label">Rating</p>
                                            <p className="stat-value">{place.rating}</p>
                                        </div>
                                        <div className="card-stat">
                                            <p className="stat-label">Type</p>
                                            <p className="stat-value">{place.type}</p>
                                        </div>
                                        <div className="card-stat">
                                            <p className="stat-label">Est.</p>
                                            <p className="stat-value">{place.est}</p>
                                        </div>
                                    </div>
                                    <button className="discover-btn">Discover More →</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ManageLocation;