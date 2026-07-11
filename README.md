# Wander Bihar — Full Stack Tourism Platform

A full-stack web application built on the MERN Architecture, transforming Bihar's monumental cultural heritage into an interactive tourism ecosystem. The platform includes public browsing, user authentication, a wishlist system, a premium subscription flow, and a complete admin dashboard for content management. 

Built as an industrial internship project during a **Short-Term Training in Full Stack Development using MERN Stack** at **C-DAC Patna (ACTS)**.

---

## 🎯 Project Vision & Problem Statement

**The Challenge:** Current state-sponsored tourism portals are often static, fragmented, and lack user-centric personalization. Traditional sites offer no personalized user spaces.

**The Solution:** Wander Bihar bridges millennia of heritage with modern digital infrastructure. It transitions the user experience from passive reading to active engagement via tailored profiles, real-time database querying, and highly responsive components. It acts as a unified ecosystem that eliminates fragmented web searches by aggregating logistics and interactive features into a single portal.

---

## 📌 Project Highlights

* 🔐 **Personalized Gateway:** Secure JWT-based authentication ensuring distinct, isolated user sessions.
* 🗺️ **Dynamic UI:** Interface adjusts dynamically upon successful login to reveal specialized user features.
* ❤️ **Wishlist Engine:** Global state management allowing tourists to curate custom itineraries in real time.
* 👑 **Premium Tier:** A simulated subscription flow demonstrating scalable system architecture for future real-world monetization.
* 🛠️ **Centralized Admin Hub:** The operational control center for seamless management of users, locations, and security.
* 📱 **Modern Design:** Responsive UI with immersive environmental visualizations and smooth navigation.

---

## 🏫 Training Details

| Detail | Info |
|---|---|
| **Institute** | Centre for Development of Advanced Computing (C-DAC), Patna |
| **Program** | Advanced Computing Training School (ACTS) — Short-Term Training |
| **Course** | Full Stack Development using MERN Stack (Batch 1) |
| **Duration** | 8th June 2026 – 10th July 2026 (5 Weeks) |
| **Result** |Grade **A+** |
| **Certificate No.** | C-DAC/PAT/2606/16011 |
| **PRN** | 2606807016011 |

---

## 🚀 System Architecture & Tech Stack

**Frontend**
* **React.js:** Drives the user interface with component-driven architecture, delivering lightning-fast rendering and a seamless Single Page Application experience.
* **HTML5, CSS3, Bootstrap:** Core styling and layout.
* **Context API:** Global state management specifically utilized for real-time wishlist updates.

**Backend**
* **Node.js:** High-performance event-driven JavaScript runtime executing server-side functionalities with efficiency.
* **Express.js:** Backend framework building RESTful APIs that control seamless data communication between frontend and database.
* **Security:** JWT (JSON Web Tokens) for session encryption and Bcrypt.js for password hashing.

**Database**
* **MongoDB:** Highly scalable, non-relational document storage managing user credentials, interactive tourist data structures, and individual user wishlists.

---

## ⚙️ Technical Breakdown of CRUD Operations

The four foundational operations powering every user interaction in Wander Bihar:

| CRUD Operation | System Action | Frontend/Backend Mechanism |
|---|---|---|
| **Create** | User Signup & Wishlist Addition | POST requests sending JSON payloads to populate MongoDB collections |
| **Read** | Fetching Heritage Destinations | GET requests streaming division-centric data to render UI elements |
| **Update** | Premium Tier Activation | PUT/PATCH endpoints modifying structural parameters in user profiles |
| **Delete** | Wishlist Item Removal | DELETE requests updating relational document arrays in real time |

---

## ✨ Features

### 👤 User Features
* User registration and secure login gateway.
* Browse tourist destinations grouped by division (e.g., Bhagalpur, Patna, Magadh).
* Curate custom itineraries using the Wishlist feature, backed by `WishlistContext` and `LocalStorage`.
* Immersive 360° virtual site tours allowing users to experience iconic heritage landscapes virtually.
* Access premium-only destinations after subscribing.

### 🛠️ Admin Features
* **User Management & Oversight:** Monitor registered profiles, track active sessions, and maintain platform security.
* **Dynamic Location Management:** Effortless CRUD operations on tourism listings—adding new places, modifying details, or removing destinations.
* **Premium Status Control:** Modify access permissions and authorize user upgrade requests for immersive features.

---

## 🔭 Future Scope & Scalability

Our pipeline includes proposed additions designed for scalable growth:
* **AI-Powered Travel Companion:** A responsive AI delivering immediate contextual histories, answering regional queries, and mapping out automated itineraries.
* **Augmented Reality (AR) Heritage Reconstruction:** Enabling tourists to use smartphone cameras on-site to view 3D digital overlays showing what ancient monuments looked like in their prime.
* **Integrated E-Ticketing & Crowd Management:** Integrating third-party APIs for direct monument ticket booking, paired with real-time crowd analytics to optimize visits.
* **Multilingual Voice Support:** Adding regional dialect and international language voice synthesis to make historical narratives accessible to a wider demographic.
* **Gamified Learning for Students:** Interactive quizzes and digital badges for exploring the history of sites, transforming passive reading into an engaging educational tool.

---

## 📁 Folder Structure

```text
WANDER_BIHAR/
│
├── BACKEND/
│   ├── config/              # Database connection configuration
│   ├── controllers/         # Business logic (auth, location, payment, premium)
│   ├── middlewares/         # JWT auth & admin role verification
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express route definitions
│   ├── index.js             # Entry point / server setup
│   └── package.json
│
└── FRONTEND/
    ├── src/
    │   ├── admin/           # Admin dashboard pages 
    │   ├── Premium/         # Premium landing, plans, and payment pages
    │   ├── UserLogin/       # Login, Forgot Password
    │   ├── UserDashboard/   # Logged-in user dashboard & wishlist page
    │   ├── App.jsx          # Route definitions
    │   ├── WishlistContext.jsx # Global wishlist state (Context API)
    │   └── main.jsx
    └── package.json

⚙️ Installation & Setup
Prerequisites: Node.js (v18+) and MongoDB.
1. Clone the repository
Bash
git clone [https://github.com/kashyapharshit/WANDER_BIHAR.git](https://github.com/kashyapharshit/WANDER_BIHAR.git)
cd WANDER_BIHAR

2. Backend Setup
Bash
cd BACKEND
npm install
Create a .env file inside the BACKEND folder:
Plaintext
PORT=3000
JWT_SECRET=your_secret_key_here
MONGO_URI=mongodb://localhost:27017/Bihar
Start the backend server: node index.js

3. Frontend Setup
Open a new terminal window:
Bash
cd FRONTEND
npm install
npm run dev
4. Access the application
Open your browser to http://localhost:5173. Register a new user, or set a user's role to "admin" in MongoDB to access /admin.


🎓 Acknowledgements & Team
This web application was successfully developed through collaborative teamwork, with members developing assigned modules, resolving integration issues, and contributing to the overall architecture. Sincere thanks to our C-DAC mentors Ms. Neha Giri and Mr. Aniket for their foundational guidance.
The Development Team (C-DAC Patna Interns):
Harshit Kashyap — Team Leader
Shiksha — Developer
Pallavi — Developer
Rashmi — Developer
Anjali — Developer
📄 License
This project was built for educational purposes as part of an industrial training program. Feel free to explore the code for learning purposes.
