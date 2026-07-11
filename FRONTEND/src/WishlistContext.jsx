import React, { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    // Load existing wishlist from local storage or start empty
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Save to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (placeId) => {
        if (!wishlist.includes(placeId)) {
            setWishlist((prev) => [...prev, placeId]);
        }
    };

    const removeFromWishlist = (placeId) => {
        setWishlist((prev) => prev.filter(id => id !== placeId));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);