import "./footer.css" 
import logo from "../../assets/logo-1.svg"
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
    return(
        <>
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-div">
                        <h2 className="logo-text" style={{color: 'var(--primary)', fontWeight: 'bold', fontSize: '24px'}}>Lehman Ed.</h2>
                    <div className="footer-ed">
                    <p>Lehman Educational Services</p>
                    <p>dedicated to providing high-quality</p>
                    <p>resources for learning Armstrong numbers.</p>
                    </div>
                 

                    <div className="yarra-div">
                       <IoLocationOutline/>
                        <p>Yarra Park, Melbourne, Australia</p>
                    </div>
                    <div className="yarra-div">
                        <FiPhone/>
                        <p>+(61) 485-826-710</p>
                    </div>
                </div>



                <div>
                    <ul>Newsletter</ul>
                        <p className="new-sus">Subscribe Our newsletter get update our new course</p>
                    <div className="search-btn">
                        <input type="search" placeholder="Enter Your Email" />
                        <button>Subscribe</button>
                    </div>
                    <div className="checkbox-div">
                        <input type="checkbox" />
                        <p>I agree to the terms of use and privacy policy.</p>
                    </div>
                </div>

            </div>
        </footer>
        <div className="copyright-div">
                <div>
                   <p>Copyright © 2024 All Rights Reserved by Lehman Educational Services</p>
                </div>
                <div className="copy-innerdiv">
                   <FaFacebookF/>
                   <FaInstagram/>
                   <FaLinkedin/>
                   <FaPinterest/>
                   <FaYoutube/>
                </div>
            </div>
        </>
    )
}

export default Footer;
