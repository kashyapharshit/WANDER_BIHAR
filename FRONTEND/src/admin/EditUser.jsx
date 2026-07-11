import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const API_BASE = "http://localhost:3000/api/auth"; // change to your backend URL

function EditUser() {
    const location = useLocation();
    const navigate = useNavigate();

    const passedData = location.state?.userData;

    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        email: '',
        role: 'User',
        status: 'Active',
        createdAt: ''
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (passedData) {
            setFormData(passedData);
        } else {
            navigate('/admin/manage-users');
        }
    }, [passedData, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`${API_BASE}/users/${formData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                    status: formData.status,
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to update user");
            }

            alert(`${formData.name}'s profile has been updated!`);
            navigate('/admin/manage-users');
        } catch (err) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ backgroundColor: "#1b140f", minHeight: "100vh", color: "#faf5ec", padding: "60px 20px", display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: "600px", width: "100%", backgroundColor: "#241b14", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", border: "1px solid #3a2a1c" }}>

                <h2 style={{ fontFamily: "Fraunces", fontStyle: "italic", marginBottom: "30px", borderBottom: "1px solid #c9a227", paddingBottom: "10px", color: "#faf5ec" }}>
                    Edit User Profile
                </h2>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>User ID</label>
                            <input
                                type="text"
                                value={formData._id}
                                disabled
                                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#140f0a", color: "#8a7c68", cursor: "not-allowed" }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Join Date</label>
                            <input
                                type="text"
                                value={formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : ''}
                                disabled
                                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#140f0a", color: "#8a7c68", cursor: "not-allowed" }}
                            />
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }}
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff", cursor: "pointer" }}
                            >
                                <option value="Premium_user">Premium user</option>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Account Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff", cursor: "pointer" }}
                            >
                                <option value="Active">Active</option>
                                <option value="Banned">Banned</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/manage-users')}
                            style={{ flex: 1, padding: "14px", backgroundColor: "transparent", border: "1px solid #b5502e", color: "#b5502e", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            style={{ flex: 2, padding: "14px", backgroundColor: "#b5502e", border: "none", color: "#fff", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
                        >
                            {saving ? "Updating..." : "Update User"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditUser;