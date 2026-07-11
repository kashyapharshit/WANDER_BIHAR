// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from "axios";
// function EditFeature() {
//     const location = useLocation();
//     const navigate = useNavigate();

//     // Grab the data passed from the ManageFeatures page
//     const passedData = location.state?.featureData;

//     const [formData, setFormData] = useState({
//         id: '',
//         category: 'Feature',
//         title: '',
//         icon: '',
//         description: '',
//         price: '',
//         topBadge: '',
//         bullets: '' // We will convert the array to a string for easy editing
//     });

//     // Populate the form when the component loads
//     useEffect(() => {
//         if (passedData) {
//             setFormData({
//                 ...passedData,
//                 // Convert nulls to empty strings so React input fields don't complain
//                 icon: passedData.icon || '',
//                 description: passedData.description || '',
//                 price: passedData.price || '',
//                 badge: passedData.badge || '',
//                 // Convert the bullets array into a string separated by newlines
//                 bullets: passedData.bullets ? passedData.bullets.join('\n') : ''
//             });
//         } else {
//             // Kick them back to the manage page if they didn't click a feature to get here
//             navigate('/admin/manage-features');
//         }
//     }, [passedData, navigate]);

//     // Handle standard input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Handle form submission
// const handleSubmit = async (e) => {
//     e.preventDefault();

//   const finalDataToSave = {
//     category: "core features",
//     title: formData.title.toLowerCase(),
//     icon: formData.icon,
//     price: formData.price ? Number(formData.price) : null,
//     topBadge: formData.badge,
//     description: formData.description,
//     bulletPoints: formData.bullets
//         .split("\n")
//         .map(item => item.trim())
//         .filter(item => item !== "")
// };

//     try {

//         let url = "";

//         if(formData.category === "Feature") {

            
// url = `http://localhost:3000/api/premium/features/${formData.id}`;

//         } 
//         else if(formData.category === "Plan") {

            
// url = `http://localhost:3000/api/premium/plans/${formData.id}`;
//         }


//         const response = await axios.put(url, finalDataToSave);


//         if(response.data.success){

//             alert(`Successfully updated: ${formData.title}`);
//             navigate("/admin/manage-features");

//         }


//     } catch(error){

//         console.log(error);
//         alert("Update failed");

//     }
// };

//     return (
//         <div style={{ backgroundColor: "#1b140f", minHeight: "100vh", color: "#faf5ec", padding: "60px 20px", display: 'flex', justifyContent: 'center' }}>
//             <div style={{ maxWidth: "700px", width: "100%", backgroundColor: "#241b14", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", border: "1px solid #3a2a1c" }}>

//                 <h2 style={{ fontFamily: "Fraunces", fontStyle: "italic", marginBottom: "30px", borderBottom: "1px solid #c9a227", paddingBottom: "10px", color: "#faf5ec" }}>
//                     Edit {formData.category === 'Plan' ? 'Pricing Plan' : 'Premium Feature'}
//                 </h2>

//                 <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

//                     {/* Top Row: ID and Category */}
//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
//                         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                             <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>ID (Read-Only)</label>
//                             <input
//                                 type="text"
//                                 value={formData.id}
//                                 disabled
//                                 style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#140f0a", color: "#8a7c68", cursor: "not-allowed" }}
//                             />
//                         </div>
//                         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                             <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Category</label>
//                             <select
//                                 name="category"
//                                 value={formData.category}
//                                 onChange={handleChange}
//                                 style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff", cursor: "pointer" }}
//                             >
//                                 <option value="Feature">Core Feature</option>
//                                 <option value="Plan">Pricing Plan</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* Title and Icon */}
//                     <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "20px" }}>
//                         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                             <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Title</label>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={formData.title}
//                                 onChange={handleChange}
//                                 required
//                                 style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }}
//                             />
//                         </div>
//                         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                             <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Icon (Emoji)</label>
//                             <input
//                                 type="text"
//                                 name="icon"
//                                 value={formData.icon}
//                                 onChange={handleChange}
//                                 placeholder="e.g. 🤖"
//                                 style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff", textAlign: "center" }}
//                             />
//                         </div>
//                     </div>

//                     {/* Price and Badge */}
//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
//                         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                             <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Price (Leave blank if none)</label>
//                             <input
//                                 type="text"
//                                 name="price"
//                                 value={formData.price}
//                                 onChange={handleChange}
//                                 placeholder="e.g. ₹99"
//                                 style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }}
//                             />
//                         </div>
//                         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                             <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Top Badge (Leave blank if none)</label>
//                             <input
//                                 type="text"
//                                 name="badge"
//                                 value={formData.badge}
//                                 onChange={handleChange}
//                                 placeholder="e.g. MOST POPULAR"
//                                 style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff" }}
//                             />
//                         </div>
//                     </div>

//                     {/* Description Textarea */}
//                     <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                         <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>Description</label>
//                         <textarea
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             rows="2"
//                             placeholder="A brief description of this feature..."
//                             style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff", resize: "vertical" }}
//                         />
//                     </div>

//                     {/* Bullets Textarea */}
//                     <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//                         <label style={{ color: "#c9a227", fontWeight: "600", fontSize: "14px" }}>
//                             Bullet Points <span style={{ color: "#8a7c68", fontWeight: "400", fontSize: "12px" }}>(Put each point on a new line)</span>
//                         </label>
//                         <textarea
//                             name="bullets"
//                             value={formData.bullets}
//                             onChange={handleChange}
//                             rows="5"
//                             placeholder="Unlimited 360° Tours&#10;AI Travel Guide&#10;Premium Destinations"
//                             style={{ padding: "12px", borderRadius: "8px", border: "1px solid #3a2a1c", backgroundColor: "#1b140f", color: "#fff", resize: "vertical", lineHeight: "1.6" }}
//                         />
//                     </div>

//                     {/* Buttons */}
//                     <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
//                         <button
//                             type="button"
//                             onClick={() => navigate('/admin/manage-features')}
//                             style={{ flex: 1, padding: "14px", backgroundColor: "transparent", border: "1px solid #b5502e", color: "#b5502e", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             style={{ flex: 2, padding: "14px", backgroundColor: "#b5502e", border: "none", color: "#fff", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
//                         >
//                             Save Changes
//                         </button>
//                     </div>

//                 </form>
//             </div>
//         </div>
//     );
// }

// export default EditFeature;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function EditFeature() {
    const location = useLocation();
    const navigate = useNavigate();

    const passedData = location.state?.featureData;

    const [formData, setFormData] = useState({
        id: "",
        category: "Feature",
        title: "",
        icon: "",
        description: "",
        price: "",
        badge: "",
        bullets: ""
    });

    useEffect(() => {
        if (!passedData) {
            navigate("/admin/manage-features", {
    state: {
        updated: true
    }
});
            return;
        }

        setFormData({
            id: passedData.id || "",
            category:
                passedData.category === "pricing plan"
                    ? "Plan"
                    : "Feature",

            title: passedData.title || "",
            icon: passedData.icon || "",
            description: passedData.description || "",
            price: passedData.price || "",
            badge: passedData.topBadge || "",
            bullets: passedData.bulletPoints
                ? passedData.bulletPoints.join("\n")
                : ""
        });

    }, [passedData, navigate]);

    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Decide API from ID instead of category
        const isFeature = formData.id.startsWith("feat-");

        const API_URL = isFeature
            ? "http://localhost:3000/api/premium/features"
            : "http://localhost:3000/api/premium/plans";

        const payload = {
            category: isFeature
                ? "core features"
                : "pricing plan",

            title: formData.title,
            icon: formData.icon || "",

            description: formData.description,

            price:
                formData.price === ""
                    ? null
                    : Number(String(formData.price).replace(/[^\d.]/g, "")),

            topBadge: formData.badge,

            bulletPoints: formData.bullets
                .split("\n")
                .map(item => item.trim())
                .filter(item => item !== "")
        };

        console.log("Updating ID:", formData.id);
        console.log("API:", API_URL);
        console.log("Payload:", payload);

        const response = await fetch(`${API_URL}/${formData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Update failed");
        }
alert(data.message);

navigate("/admin/manage-features", {
    replace: true,
    state: {
        refresh: true
    }
});

    } catch (error) {
        console.error("Update Error:", error);
        alert(error.message);
    }
};
    return (
       
             
    <div
        style={{
            backgroundColor: "#1b140f",
            minHeight: "100vh",
            color: "#faf5ec",
            padding: "60px 20px",
            display: "flex",
            justifyContent: "center"
        }}
    >
        <div
            style={{
                maxWidth: "700px",
                width: "100%",
                backgroundColor: "#241b14",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                border: "1px solid #3a2a1c"
            }}
        >
            <h2
                style={{
                    fontFamily: "Fraunces",
                    fontStyle: "italic",
                    marginBottom: "30px",
                    borderBottom: "1px solid #c9a227",
                    paddingBottom: "10px",
                    color: "#faf5ec"
                }}
            >
                Edit{" "}
                {formData.category === "Plan"
                    ? "Pricing Plan"
                    : "Premium Feature"}
            </h2>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}
            >
                {/* ID & Category */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}
                    >
                        <label
                            style={{
                                color: "#c9a227",
                                fontWeight: 600
                            }}
                        >
                            ID
                        </label>

                        <input
                            type="text"
                            value={formData.id}
                            disabled
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #3a2a1c",
                                background: "#140f0a",
                                color: "#888"
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}
                    >
                        <label
                            style={{
                                color: "#c9a227",
                                fontWeight: 600
                            }}
                        >
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #3a2a1c",
                                background: "#1b140f",
                                color: "#fff"
                            }}
                        >
                            <option value="Feature">
                                Core Feature
                            </option>

                            <option value="Plan">
                                Pricing Plan
                            </option>
                        </select>
                    </div>
                </div>

                {/* Title & Icon */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "3fr 1fr",
                        gap: "20px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}
                    >
                        <label
                            style={{
                                color: "#c9a227",
                                fontWeight: 600
                            }}
                        >
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #3a2a1c",
                                background: "#1b140f",
                                color: "#fff"
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}
                    >
                        <label
                            style={{
                                color: "#c9a227",
                                fontWeight: 600
                            }}
                        >
                            Icon
                        </label>

                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            placeholder="🤖"
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #3a2a1c",
                                background: "#1b140f",
                                color: "#fff",
                                textAlign: "center"
                            }}
                        />
                    </div>
                </div>

                {/* Price & Badge */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "20px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}
                    >
                        <label
                            style={{
                                color: "#c9a227",
                                fontWeight: 600
                            }}
                        >
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="99"
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #3a2a1c",
                                background: "#1b140f",
                                color: "#fff"
                            }}
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}
                    >
                        <label
                            style={{
                                color: "#c9a227",
                                fontWeight: 600
                            }}
                        >
                            Top Badge
                        </label>

                        <input
                            type="text"
                            name="badge"
                            value={formData.badge}
                            onChange={handleChange}
                            placeholder="MOST POPULAR"
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                border: "1px solid #3a2a1c",
                                background: "#1b140f",
                                color: "#fff"
                            }}
                        />
                    </div>
                </div>


                                   {/* Description */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"
                    }}
                >
                    <label
                        style={{
                            color: "#c9a227",
                            fontWeight: 600
                        }}
                    >
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Enter description..."
                        style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #3a2a1c",
                            background: "#1b140f",
                            color: "#fff",
                            resize: "vertical"
                        }}
                    />
                </div>

                {/* Bullet Points */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"
                    }}
                >
                    <label
                        style={{
                            color: "#c9a227",
                            fontWeight: 600
                        }}
                    >
                        Bullet Points
                    </label>

                    <textarea
                        name="bullets"
                        value={formData.bullets}
                        onChange={handleChange}
                        rows={6}
                        placeholder={`Unlimited 360° Tours
AI Travel Guide
Premium Destinations`}
                        style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #3a2a1c",
                            background: "#1b140f",
                            color: "#fff",
                            resize: "vertical",
                            lineHeight: "1.6"
                        }}
                    />
                </div>

                {/* Buttons */}
                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        marginTop: "15px"
                    }}
                >
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/manage-features")
                        }
                        style={{
                            flex: 1,
                            padding: "14px",
                            borderRadius: "8px",
                            border: "1px solid #b5502e",
                            background: "transparent",
                            color: "#b5502e",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        style={{
                            flex: 2,
                            padding: "14px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#b5502e",
                            color: "#fff",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
);

}

export default EditFeature;