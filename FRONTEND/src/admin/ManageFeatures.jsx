// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './admin.css'; // Reusing your admin CSS
// import { useEffect, useState } from "react";
// import axios from "axios";

// // Static data extracted exactly from your screenshots


// function ManageFeatures() {
//     const navigate = useNavigate();
//     const [premiumFeatures, setPremiumFeatures] = useState([]);
// const [premiumPlans, setPremiumPlans] = useState([]);
//     useEffect(() => {
//     fetchFeatures();
// }, []);

// const fetchFeatures = async () => {
//     try {
//       const response = await axios.get(
//     "http://localhost:3000/api/premium/features"
// );

// console.log(response.data);
//         const data = response.data.data;

//         setPremiumFeatures(
//             data.filter(item => item.category === "core features")
//         );

//         setPremiumPlans(
//             data.filter(item => item.category === "pricing plan")
//         );

//     } catch (error) {
//         console.log(error);
//     }
// };

//     // A reusable function to render the feature/plan cards
// const renderCard = (item) => (
//     <div className="feature-admin-card" key={item._id}>

//         {item.topBadge && (
//     <div className="card-badge">
//         {item.topBadge}
//     </div>
// )}

//         <div className="feature-card-content">

//             <h3 className="feature-title">
//                 {item.icon && (
//                     <span style={{ marginRight: "10px" }}>
//                         {item.icon}
//                     </span>
//                 )}

//                 {item.title}
//             </h3>


//             {item.price && (
//                 <h2 className="feature-price">
//                     {item.price}
//                 </h2>
//             )}


//             {item.description && (
//                 <p className="feature-desc">
//                     {item.description}
//                 </p>
//             )}


//             <ul className="feature-bullets">
// {item.bulletPoints?.map((bullet, index) => (
//                     <li key={index}>
//                         <span className="check-icon">
//                             ✅
//                         </span>

//                         {bullet}
//                     </li>
//                 ))}

//             </ul>

//         </div>


//         <div className="edit-wrapper">

//             <button
//                 className="card-edit-btn"
//                 aria-label={`Edit ${item.title}`}
//                 onClick={() =>
//                     navigate('/admin/edit-feature', {
//                         state: {
//                             featureData: item
//                         }
//                     })
//                 }
//             >

//                 <svg
//                     className="pencil-icon"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2.5"
//                     viewBox="0 0 24 24"
//                 >

//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                     />

//                 </svg>

//             </button>


//             <span className="edit-tooltip">
//                 Edit {item.category}
//             </span>

//         </div>

//     </div>
// );

//     return (
//         <div style={{ backgroundColor: "#1b140f", minHeight: "100vh", paddingBottom: "60px" }}>
//             {/* Header */}
//             <div className="d-flex text-white w-100 pt-4 pb-2" style={{ padding: "0 5%" }}>
//                 <h1 style={{ color: "#faf5ec", fontFamily: "Fraunces", fontStyle: "italic", fontWeight: "500" }}>
//                     Manage Premium Features
//                 </h1>
//             </div>

//             {/* Features Section */}
//             <div style={{ padding: "20px 5% 40px" }}>
//                 <h2 style={{ color: "#c9a227", fontSize: "1.5rem", marginBottom: "20px", borderBottom: "1px solid #3a2a1c", paddingBottom: "10px" }}>
//                     Core Features
//                 </h2>
//                 <div className="feature-cards-grid">
//                     {premiumFeatures.map(renderCard)}
//                 </div>
//             </div>

//             {/* Pricing Plans Section */}
//             <div style={{ padding: "0 5%" }}>
//                 <h2 style={{ color: "#c9a227", fontSize: "1.5rem", marginBottom: "20px", borderBottom: "1px solid #3a2a1c", paddingBottom: "10px" }}>
//                     Pricing Plans
//                 </h2>
//                 <div className="feature-cards-grid">
//                     {premiumPlans.map(renderCard)}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ManageFeatures;
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './admin.css'; // Reusing your admin CSS

// Static data extracted exactly from your screenshots

function ManageFeatures() {

    const navigate = useNavigate();
    const location = useLocation();

    const [premiumFeatures, setPremiumFeatures] = useState([]);
    const [premiumPlans, setPremiumPlans] = useState([]);

useEffect(() => {


    const fetchData = async()=>{

        try{

            const featureResponse = await fetch(
                "http://localhost:3000/api/premium/features"
            );


            const featureResult = await featureResponse.json();


            setPremiumFeatures(featureResult.data);



            const planResponse = await fetch(
                "http://localhost:3000/api/premium/plans"
            );


            const planResult = await planResponse.json();


            setPremiumPlans(planResult.data);



        }catch(error){

            console.log(error);

        }

    };


    fetchData();


}, [location.state]);

    // A reusable function to render the feature/plan cards
    const renderCard = (item) => (
        <div className="feature-admin-card" key={item.id}>
            {/* Top Badge (if any) */}
           {item.topBadge && 
<div className="card-badge">
    {item.topBadge}
</div>
}

            <div className="feature-card-content">
                {/* Header (Title, Icon, Price) */}
                <h3 className="feature-title">
                    {item.icon && <span style={{ marginRight: "10px" }}>{item.icon}</span>}
                    {item.title}
                </h3>

            {item.price && 
<h2 className="feature-price">
    ₹{item.price}
</h2>
}
                {item.description && <p className="feature-desc">{item.description}</p>}

                {/* Bullet Points */}
                <ul className="feature-bullets">
                   {item.bulletPoints?.map((bullet,index)=>(
                        <li key={index}>
                            <span className="check-icon">✅</span> {bullet}
                        </li>
                    ))}
                </ul>
            </div>

            {/* --- BIG PENCIL EDIT BUTTON --- */}
            <div className="edit-wrapper">
                <button
                    className="card-edit-btn"
                    aria-label={`Edit ${item.title}`}
                   onClick={() => navigate('/admin/edit-feature', { 
    state:{
        featureData:{
            ...item,
            badge:item.topBadge,
            bullets:item.bulletPoints
        }
    }
})}
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
                <span className="edit-tooltip">Edit {item.category}</span>
            </div>
        </div>
    );

    return (
        <div style={{ backgroundColor: "#1b140f", minHeight: "100vh", paddingBottom: "60px" }}>
            {/* Header */}
            <div className="d-flex text-white w-100 pt-4 pb-2" style={{ padding: "0 5%" }}>
                <h1 style={{ color: "#faf5ec", fontFamily: "Fraunces", fontStyle: "italic", fontWeight: "500" }}>
                    Manage Premium Features
                </h1>
            </div>

            {/* Features Section */}
            <div style={{ padding: "20px 5% 40px" }}>
                <h2 style={{ color: "#c9a227", fontSize: "1.5rem", marginBottom: "20px", borderBottom: "1px solid #3a2a1c", paddingBottom: "10px" }}>
                    Core Features
                </h2>
                <div className="feature-cards-grid">
                    {premiumFeatures.map(renderCard)}
                </div>
            </div>

            {/* Pricing Plans Section */}
            <div style={{ padding: "0 5%" }}>
                <h2 style={{ color: "#c9a227", fontSize: "1.5rem", marginBottom: "20px", borderBottom: "1px solid #3a2a1c", paddingBottom: "10px" }}>
                    Pricing Plans
                </h2>
                <div className="feature-cards-grid">
                    {premiumPlans.map(renderCard)}
                </div>
            </div>
        </div>
    );
}

export default ManageFeatures;