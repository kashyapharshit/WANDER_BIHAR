import React, { useEffect, useState } from "react";
import axios from "axios";

import Content from "../Content";
import Cards from "../Cards";

function UserDashboard() {

    const [isPremium, setIsPremium] = useState(false);


    useEffect(() => {

        const fetchUser = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:3000/api/auth/profile",
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );


                setIsPremium(response.data.user.isPremium);


            } catch(error) {

                console.log(error);

            }

        };


        fetchUser();

    }, []);


    return (
        <div className="dashboard-wrapper">

            <Content />

            <Cards isPremium={isPremium} />

        </div>
    );
}

export default UserDashboard;