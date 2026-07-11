import React from "react";
import video from "./assets/video.mp4";

function Background() {
    return (
        <>


            <div className="position-relative vh-100 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                    style={{ zIndex: -2 }}
                >
                    <source src={video} type="video/mp4" />
                </video>
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        background: "rgba(0,0,0,0.4)",
                        zIndex: -1,
                    }}
                ></div>
            </div>
        </>
    );
}

export default Background;