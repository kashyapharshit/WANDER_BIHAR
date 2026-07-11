import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the navigation hook
import './admin.css';
import bgVideo from "../assets/video.mp4";

function AdminDashboard() {
    // 2. Initialize the hook
    const navigate = useNavigate();

    return (
        <div className="admin-container">
            <video
                className="bg-video"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={bgVideo} type="video/mp4" />
            </video>

            {/* Note: The <marquee> tag is deprecated in modern HTML, 
                but it will still work in most browsers for now! */}
            <h1><marquee>Welcome To Admin Dashboard</marquee></h1>
            <h2>What do you want to Change/Update?</h2>

            {/* Button Container */}
            <div className="button-group">
                <button
                    className="admin-btn btn-user"
                    // 3. Replace console.log with navigate('your-path-here')
                    onClick={() => navigate('/admin/manage-users')}
                >
                    Manage Users
                </button>

                <button
                    className="admin-btn btn-location"
                    onClick={() => navigate('/admin/manage-location')}
                >
                    Manage Location
                </button>

                <button
                    className="admin-btn btn-feature"
                    onClick={() => navigate('/admin/manage-features')}
                >
                    Manage Features
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;