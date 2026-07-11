import bgVideo from "../assets/video.mp4";
import './Payment.css'
import qr from "../assets/qr.png"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    amount:99,
    plan:"Monthly"
});
const handleChange = (e)=>{

    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });

};
    const handlePayment = async (e)=>{

    e.preventDefault();

    try{

        const token = localStorage.getItem("token");


        const response = await axios.post(
            "http://localhost:3000/api/payment/checkout",
            formData,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );


        if(response.data.success){

            alert("Premium Activated Successfully 🎉");

            navigate("/user-dashboard");

        }


    }catch(error){

        console.log(error);

        alert(
            error.response?.data?.message || 
            "Payment failed"
        );

    }

};

    return (
        <div
            style={{
                position: "relative",
                minHeight: "100vh",
                overflow: "hidden",
            }}
        >
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="background-video"
            >
                <source src={bgVideo} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="overlay"></div>

            {/* Content */}
            <div
                className="container py-5"
                style={{
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <h1 className="text-center text-white mb-5">
                    Premium Checkout
                </h1>

                <div
                    className="glass-card p-5 mx-auto"
                    style={{
                        maxWidth: "600px",
                    }}
                >
                    <form onSubmit={handlePayment}>
                        <div className="mb-3">
                            <label className="form-label text-white">
                                Name
                            </label>

                           <input
type="text"
name="name"
className="form-control"
placeholder="Enter your name"
value={formData.name}
onChange={handleChange}
/>
</div>
                        <div className="mb-3">
                            <label className="form-label text-white">
                                Email
                            </label>

                            <input
                            name="email"
                                type="email"
                                className="form-control"

                               
                                placeholder="Enter your email"
                            value={formData.email}
onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-white">
                                Phone Number
                            </label>

                            <input
                            name="phone"
                                type="tel"
                                className="form-control"
                                placeholder="Enter phone number"
                           value={formData.phone}
onChange={handleChange}
                           />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-white">
                                Card Number
                            </label>

                            <input
                                type="text"
                                className="form-control"

                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label text-white">
                                    Expiry Date
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="MM/YY"
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label text-white">
                                    CVV
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="123"
                                />
                            </div>
                        </div>
                        <div className="text-center my-4">
                            <h5 className="text-white mb-3">
                                Scan & Pay via UPI
                            </h5>

                            <img
                                src={qr}
                                alt="UPI QR Code"
                                style={{
                                    width: "200px",
                                    borderRadius: "10px",
                                    background: "white",
                                    padding: "10px",
                                }}
                            />

                            <p className="text-white mt-3">
                                Scan using Google Pay, PhonePe, Paytm, or any UPI app.
                            </p>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-warning w-100 fw-bold mt-3"
                        >
                            Pay Now
                        </button>
                    </form>
                </div>
            </div>
            </div>

    );
};

export default Payment;