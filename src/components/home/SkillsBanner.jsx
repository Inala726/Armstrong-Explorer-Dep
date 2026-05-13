import "./SkillsBanner.css"
import { Link } from 'react-router-dom';
import woman1 from "../../assets/women-1.png"
import { GoArrowRight } from "react-icons/go";

const SkillsBanner = () => {
    return(
        <>
        <section className="skillbanner-sec">
            <img src={woman1} alt="" />
            <div className="skl-div">
            <div>
                <h1>Learn Armstrong</h1>
                <h1>Numbers Here</h1>
            </div>
            <Link to="/login" style={{textDecoration: 'none'}}>
            <button>
                Login to Application
                <GoArrowRight className="go-icons"/>
                 </button>
            </Link>
            </div>
            
        </section>
        </>
    )
}

export default SkillsBanner;
