import "./Footer.css";
import { FaHeart } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <footer id="footer">
            <div id="footer-top">

                <div id="footer-brand">
                    <h3 id="footer-title">Wander Bihar</h3>
                    <p id="footer-tagline">— A Journey Through India's Ancient Heart —</p>
                    <p id="footer-description">
                        Discover the cradle of civilization. Explore ancient temples,
                        sacred rivers, and timeless heritage of Bihar.
                    </p>
                </div>

                <div id="footer-links">
                    <h4>Quick Links</h4>
                    <a href="#" className="footer-link">Places</a>
                    <a href="#" className="footer-link">About</a>
                    <a href="#" className="footer-link">Contact</a>
                </div>

                <div id="footer-links">
                    <h4>Explore</h4>
                    <a href="#" className="footer-link">Bhagalpur Division</a>
                    <a href="#" className="footer-link">Darbhanga Division</a>
                    <a href="#" className="footer-link">Kosi Division</a>
                    <a href="#" className="footer-link">Magadh Division</a>
                    <a href="#" className="footer-link">Munger Division</a>
                    <a href="#" className="footer-link">Patna Division</a>
                    <a href="#" className="footer-link">Purnia Division</a>
                    <a href="#" className="footer-link">Saran Division</a>
                    <a href="#" className="footer-link">Tirhut Division</a>
                </div>

                <div id="footer-social">
                    <h4>Follow Us</h4>
                    <div id="footer-social-icons">
                        <button className="social-btn"><FaFacebook /></button>
                        <button className="social-btn"><FaInstagram /></button>
                        <button className="social-btn"><FaTwitter /></button>
                        <button className="social-btn"><FaYoutube /></button>
                    </div>
                </div>

            </div>

            <div id="footer-bottom">
                <p>Made with <FaHeart style={{ color: 'red', margin: '0 4px' }} /> for Bihar © 2026</p>
            </div>
        </footer>
    );
}

export default Footer;