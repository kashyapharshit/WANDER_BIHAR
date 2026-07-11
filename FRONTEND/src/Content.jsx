// Content.jsx
import './Content.css';
import video from "./assets/video.mp4"; // your video file

function Content() {
    return (
        <>
            <div className="hero-section">
                <video className="hero-video" autoPlay muted loop playsInline>
                    <source src={video} type="video/mp4" />
                </video>
                <div className="hero-overlay" />
                <div className="hero-text">
                    <span className="wander">Wander</span>
                    <span className="bihar">BIHAR</span>
                    <div class="hero-tagline">
                        <h1 lang="sa" class="sanskrit-text">वसुधैव कुटुम्बकम्</h1>
                        <p className="english-translation">The World is One Family</p>
                    </div>
                    <p className="tagline">— A Journey Through India's Ancient Heart —</p>
                </div>
                <div className="scroll-prompt">
                    <h1 className="scroll-text">Explore</h1>
                    <div className="scroll-arrow">↓</div>
                </div>

            </div>

        </>
    );
}

export default Content;