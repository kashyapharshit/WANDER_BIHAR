import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const API_BASE = "http://localhost:3000/api/auth"; // change to your backend URL

function ManageUser() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/users`);
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId, userName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${userName}?`);
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${API_BASE}/users/${userId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete user");

            setUsers(users.filter(user => user._id !== userId));
            alert(`${userName} has been deleted.`);
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return <div style={{ color: "#faf5ec", padding: "40px" }}>Loading users...</div>;
    }

    if (error) {
        return <div style={{ color: "red", padding: "40px" }}>Error: {error}</div>;
    }

    return (
        <div style={{ backgroundColor: "#1b140f", minHeight: "100vh", paddingBottom: "60px" }}>
            <div className="d-flex text-white w-100 pt-4 pb-4" style={{ padding: "0 5%" }}>
                <h1 style={{ color: "#faf5ec", fontFamily: "Fraunces", fontStyle: "italic", fontWeight: "500" }}>
                    Manage Users
                </h1>
            </div>

            <div style={{ padding: "0 5%" }}>
                <div className="user-table-container">
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="fw-bold" style={{ color: "#c9a227" }}>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td style={{ color: "#8a7c68" }}>{user.email}</td>
                                    <td>
                                        <span className={`role-badge ${user.role === 'Admin' ? 'role-admin' : 'role-user'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-dot ${user.status === 'Active' ? 'dot-active' : 'dot-banned'}`}></span>
                                        {user.status}
                                    </td>
                                    <td style={{ color: "#8a7c68" }}>
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                                    </td>

                                    <td className="action-cell">
                                        <div className="action-wrapper">
                                            <button
                                                className="action-btn edit-btn"
                                                onClick={() => navigate('/admin/edit-user', { state: { userData: user } })}
                                            >
                                                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </button>
                                            <span className="action-tooltip">Edit User</span>
                                        </div>

                                        <div className="action-wrapper">
                                            <button
                                                className="action-btn delete-btn"
                                                onClick={() => handleDelete(user._id, user.name)}
                                            >
                                                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                            <span className="action-tooltip">Delete User</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "#8a7c68" }}>
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageUser;