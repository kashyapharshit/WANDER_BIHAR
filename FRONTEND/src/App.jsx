import React from 'react';
import './App.css';
import Background from './Background';
import Content from './Content';
import Navbar from './Navbar';
import Footer from './Footer';
import Cards from './Cards';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
// Premium Flow Imports
import Premium from './Premium/premium';
import Prem from './Premium/prem';
import Payment from './Premium/payment';

// Authentication Imports
import UserLogin from './UserLogin/UserLogin';
import ForgotPassword from './UserLogin/ForgotPassword';
import ForgotUsername from './UserLogin/ForgotUsername';
import UserSignup from "./UserSignup/SignUp"

// Admin Dashboard
import AdminDashboard from './admin/AdminDashboard';
import ManageUser from './admin/ManageUser';
import ManageLocation from './admin/ManageLocation';
import ManageFeatures from './admin/ManageFeatures';
import EditLocation from './admin/EditLocation';
import EditUser from './admin/EditUser';
import EditFeature from './admin/EditFeature';

// User Dashboard & Details
import UserDashboard from "./UserDashboard/UserDashboard";
import Details from './Details';
import WishlistPage from "./UserDashboard/WishlistPage";
import { WishlistProvider } from "./WishlistContext"; // Context Import

// Helper component that checks the current URL
function ConditionalFooter() {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return <Footer />;
}

function App() {
  return (
    // WRAP EVERYTHING IN THE WISHLIST PROVIDER
    <WishlistProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* HOME ROUTE */}
          <Route
            path="/"
            element={
              <>
                <Content />
                <Cards />
              </>
            }
          />

          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* FIX: Dynamic Route expecting an ID */}
          <Route path="/place/:id" element={<Details />} />

          {/* PREMIUM PAGES */}
          <Route path="/premium" element={<Premium />} />
          <Route path="/prem" element={<Prem />} />
          <Route path="/payment" element={<Payment />} />

          {/* AUTHENTICATION PAGES */}
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/forgot-username" element={<ForgotUsername />} />
          <Route path="/signUp" element={<UserSignup />} />

          {/* Admin */}
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path="/admin/manage-users" element={<ManageUser />} />
          <Route path="/admin/manage-location" element={<ManageLocation />} />
          <Route path="/admin/manage-features" element={<ManageFeatures />} />
          <Route path="/admin/edit-location" element={<EditLocation />} />
          <Route path="/admin/edit-user" element={<EditUser />} />
          <Route path="/admin/edit-feature" element={<EditFeature />} />

        </Routes>
        <ConditionalFooter />
      </BrowserRouter>
    </WishlistProvider>
  );
}

export default App;