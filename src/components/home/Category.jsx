import './category.css'
import box1 from "../../assets/box-1.svg"
import box2 from "../../assets/box-2.svg"
import box3 from "../../assets/box-3.svg"
import box4 from "../../assets/box-4.svg"
import { HiOutlineLightBulb } from 'react-icons/hi2'
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

const Category = () => {
    return (
        <>
        <section className='category-sec'>
        <div className='top-me'>
        <HiOutlineLightBulb className='bulb-icons'/>
        <p className='top-txt'>Application Features</p>
        </div>
        <div className='explore-num'>
            <h1>Explore Our App Features</h1>
            <p>Tools to learn and practice Armstrong numbers.</p>
        </div>

        <div className='acc-div'>
            <div className='acc-box'>
                <img src={box1} alt="" />
                <h3>Range Search</h3>
                <p>Find by range</p>
            </div>
            <div className='acc-box'>
                <img src={box2} alt="" />
                <h3>Single Check</h3>
                <p>Verify one number</p>
            </div>
            <div className='acc-box'>
                <img src={box3} alt="" />
                <h3>Attempt History</h3>
                <p>View past checks</p>
            </div>
            <div className='acc-box'>
                <img src={box4} alt="" />
                <h3>User Profile</h3>
                <p>Manage your account</p>
            </div>
            <div className='acc-box'>
                <img src={box1} alt="" />
                <h3>Detailed Results</h3>
                <p>View calculation steps</p>
            </div>
            <div className='acc-box'>
                <img src={box2} alt="" />
                <h3>Responsive UI</h3>
                <p>Access on any device</p>
            </div>
        </div>
        <div className='icons-sign'>
           <MdChevronLeft className='arr-icons'/>
            <div>
               <GoDotFill className='dot-icons'/>
               <GoDotFill className='dot-icons'/>
               <GoDotFill className='dot-icons'/>
               <GoDotFill className='dot-iconss'/>
            </div>
           <MdChevronRight className='arr-icons'/>
        </div>
        </section>
        </>
    )
}

export default Category;
