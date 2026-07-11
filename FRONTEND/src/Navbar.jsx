import image from "./assets/image.png";
import "./Nav.css";
import { BsSearch } from 'react-icons/bs';
import { FaUser, FaHeart, FaCrown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";
// 1. IMPORT THE CONTEXT HERE
import { useWishlist } from "./WishlistContext";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userName, setUserName] = useState("");
const [isPremium, setIsPremium] = useState(false);
    // 2. GET THE WISHLIST FROM CONTEXT
    const { wishlist } = useWishlist();

    useEffect(() => {

    const fetchUser = async () => {

        const token = localStorage.getItem("token");
        const storedName = localStorage.getItem("userName");

        setIsLoggedIn(!!token);

        if (storedName) {
            setUserName(storedName);
        }


        if(token){

            try{

                const response = await axios.get(
                    "http://localhost:3000/api/auth/profile",
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );


                setIsPremium(response.data.user.isPremium);


            }catch(error){

                console.log(error);

            }

        }

    };


    fetchUser();


}, [location]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search triggered!");
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <nav id="navbar" className="d-flex justify-content-between align-items-center">
            <img id="logo" src={image} alt="Logo" style={{ cursor: 'pointer' }} onClick={() => navigate("/")} />

            <form id="search-wrap" onSubmit={handleSearch}>
                <span id="search-icon">
                    <BsSearch size={18} />
                </span>
                <input
                    type="text"
                    placeholder="Search any place..."
                    id="search1"
                />
                <button type="submit" id="search-btn">
                    Go
                </button>
            </form>

            <div className="d-flex justify-content-between align-items-center gap-3">
                <button className="button" onClick={() => navigate("/")}>
                    Home
                </button>

                {!isLoggedIn && (
                    <>
                        <button className="button" onClick={() => navigate("/user-login")}>
                            Sign in
                        </button>
                        <button className="button" onClick={() => navigate("/signUp")}>
                            Sign up
                        </button>
                    </>
                )}

                <button className="button" id="prem" onClick={() => navigate("/premium")}>
                    <FaCrown style={{ fontSize: '13px' }} />
                    Premium
                </button>
            </div>

            <div className="d-flex gap-3 align-items-center">

                {/* 3. UPDATED HEART BUTTON WITH RED BADGE AND ROUTING */}
                <button
                    className="icon-btn heart"
                    aria-label="Saved places"
                    id="love"
                    style={{ position: 'relative' }}
                    onClick={() => navigate("/wishlist")}
                >
                    <FaHeart />
                    {/* Only show the badge if there is at least 1 item saved */}
                    {wishlist?.length > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            background: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '10px',
                            fontWeight: 'bold'
                        }}>
                            {wishlist.length}
                        </span>
                    )}
                </button>

                {/* User Avatar Container */}
                <div style={{ position: 'relative' }}>
                    <button
                        className="icon-btn avatar"
                        aria-label="User profile"
                        id="user"
                        onClick={() => isLoggedIn ? setIsDropdownOpen(!isDropdownOpen) : navigate("/user-login")}
                        style={
    isPremium
        ? {
            backgroundColor: '#FFD700',
            color: '#5c3b00',
            borderColor: '#FFD700',
            boxShadow: '0 0 15px gold'
        }
        : isLoggedIn
        ? {
            backgroundColor: 'cadetblue',
            color: 'white',
            borderColor: 'cadetblue',
            boxShadow: '0 0 12px rgba(95, 158, 160, 0.8)'
        }
        : {}
}
                    >
                       {isPremium ? <FaCrown /> : <FaUser />}
                    </button>

                    {isLoggedIn && isDropdownOpen && (
                        <div
                            className="dropdown-menu show shadow"
                            style={{
                                position: 'absolute',
                                top: '120%',
                                right: 0,
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                padding: '10px 0',
                                display: 'flex',
                                flexDirection: 'column',
                                minWidth: '150px',
                                zIndex: 1000
                            }}
                        >
                            <button
                                className="dropdown-item"
                                style={{ border: 'none', background: 'none', padding: '8px 16px', textAlign: 'left', cursor: 'pointer' }}
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    navigate("/user-dashboard");
                                }}
                            >
                                <strong>{userName || "My Profile"}</strong>
                            </button>

                            <hr style={{ margin: '5px 0' }} />

                            <button
                                className="dropdown-item text-danger"
                                style={{ border: 'none', background: 'none', padding: '8px 16px', textAlign: 'left', cursor: 'pointer', color: 'red' }}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;