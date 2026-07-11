import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditLocation() {
    const location = useLocation();
    const navigate = useNavigate();

    // Grab the data passed from the ManageLocation page
    const passedData = location.state?.placeData;

    // Set up form state. If someone navigates here directly without clicking a card,
    // it defaults to empty strings to prevent crashes.
    const [formData, setFormData] = useState({
        _id: '',
        title: '',
        location: '',
        image: '',
        entry: '',
        rating: '',
        type: '',
        est: '',
        premium: false
    });

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    // Populate the form when the component loads
    useEffect(() => {
        if (passedData) {
            // Keep _id in state - we need it to tell the backend WHICH place to update
            setFormData(passedData);
        } else {
            // Kick them back to the manage page if they didn't click a card to get here
            navigate('/admin/manage-location');
        }
    }, [passedData, navigate]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission - THIS now actually talks to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData._id) {
            setError("Missing place ID - cannot update. Please go back and try again.");
            return;
        }

        setIsSaving(true);
        setError(null);

        try {
            const response = await axios.put(
                `http://localhost:3000/api/locations/place/${formData._id}`,
                formData
            );

            if (response.data.success) {
                alert("Location updated successfully!");
                navigate('/admin/manage-location');
            } else {
                throw new Error(response.data.message || "Failed to update location");
            }
        } catch (err) {
            console.error("Axios update error:", err);
            setError(err.response?.data?.message || err.message || "Something went wrong");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ backgroundColor: "#1b140f", minHeight: "100vh", color: "#faf5ec", padding: "60px 20px", display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: "600px", width: "100%", backgroundColor: "#241b14", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>

                <h2 style={{ fontFamily: "Fraunces", fontStyle: "italic", marginBottom: "30px", borderBottom: "1px solid #c9a227", paddingBottom: "10px" }}>
                    Edit Location Details
                </h2>

                {error && (
                    <div style={{ backgroundColor: "#3a1c1c", border: "1px solid #b5502e", color: "#f5c6c6", padding: "12px", borderRadius: "8px", marginBottom: "20px" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                    {/* Title */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }}
                        />
                    </div>

                    {/* Location */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Location (City, Region)</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }}
                        />
                    </div>

                    {/* Image URL */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }}
                        />
                    </div>

                    {/* Stats Grid for smaller inputs */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Entry Fee</label>
                            <input type="text" name="entry" value={formData.entry} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Rating</label>
                            <input type="text" name="rating" value={formData.rating} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Type</label>
                            <input type="text" name="type" value={formData.type} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Established</label>
                            <input type="text" name="est" value={formData.est} onChange={handleChange} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }} />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/manage-location')}
                            disabled={isSaving}
                            style={{ flex: 1, padding: "14px", backgroundColor: "transparent", border: "1px solid #b5502e", color: "#b5502e", borderRadius: "8px", fontWeight: "bold", cursor: isSaving ? "not-allowed" : "pointer", opacity: isSaving ? 0.6 : 1 }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            style={{ flex: 2, padding: "14px", backgroundColor: "#b5502e", border: "none", color: "#fff", borderRadius: "8px", fontWeight: "bold", cursor: isSaving ? "not-allowed" : "pointer", opacity: isSaving ? 0.6 : 1 }}
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditLocation;