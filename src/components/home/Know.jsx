import './know.css'
import edu1 from "../../assets/edu1.svg"
import edu2 from "../../assets/edu2.svg"
import edu3 from "../../assets/edu3.svg"
import edu4 from "../../assets/edu4.svg"
import edu5 from "../../assets/edu5.svg"
import edu6 from "../../assets/edu6.svg"
import girlp from "../../assets/girl-phone.jpg"
import blueb from "../../assets/icon-star.svg"
import purp1 from "../../assets/purp-btn1.png"
import purp2 from "../../assets/purp-btn2.png"
import prof1 from "../../assets/profile-cir.png"
import { HiOutlineLightBulb } from 'react-icons/hi2'
import { IoMdPlay } from "react-icons/io";

const Know = () => {
    return (
        <>
            <section className='know-sec'>
                <div className='trust-div'>
                    <div className='trust-by'>
                        <p>Trusted by:</p>
                    </div>
                    <div className='edu-div'>
                        <div>
                            <img src={edu1} alt="" />
                        </div>
                        <div>
                            <img src={edu2} alt="" />
                        </div>
                        <div>
                            <img src={edu3} alt="" />
                        </div>
                        <div>
                            <img src={edu4} alt="" />
                        </div>
                        <div>
                            <img src={edu5} alt="" />
                        </div>
                        <div>
                            <img src={edu6} alt="" />
                        </div>
                    </div>

                </div>

                <section className='study-sec'>
                    <div className='headphone'>
                        <div className='positive-box'>
                            <div className='positive-div'>
                                <div className='pos-rev'>
                                    <h1>2.4k</h1>
                                    <p>Positive Review</p>
                                </div>
                                <div className='blueb'>
                                    <img src={blueb} alt="" />
                                </div>
                            </div>
                            <div className='girlp'>
                                <img src={girlp} alt="" />
                            </div>
                        </div>
                        <div className='girlb'>
                            <div className='play-btn'>
                                <IoMdPlay className='play-icon'/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='gate-div'>
                            <HiOutlineLightBulb className='bulb-icons' />
                            <p>About Armstrong Numbers</p>
                        </div>
                        <div className='studyhub'>
                            <h1>What is an Armstrong</h1>
                            <h1>Number?</h1>
                        </div>
                        <div className='passionate'>
                            <p>A number equal to sum of its own</p>
                            <p>digits raised to power of digit count.</p>
                        </div>
                        <div className='learn-me'>
                            <div className='prof-box'>
                                <img src={purp1} alt="" />
                                <div>
                                    <p className='exp-txt'>Interactive Tool</p>
                                    <p className='pass-txt'>Check numbers instantly.</p>
                                </div>
                            </div>
                            <div className='prof-box'>
                                <img src={purp2} alt="" />
                                <div>
                                    <p className='exp-txt'>Detailed History</p>
                                    <p className='pass-txt'>View past calculations.</p>
                                </div>
                            </div>
                        </div>
                        <div className='cir-p'>
                            <div className='prof-cir'>
                                <div>
                                    <img src={prof1} alt="" />
                                </div>
                                <div className='ap-name'>
                                    <p className='exp-txt'>Lehman Educational</p>
                                    <p className='pass-txt'>eProjects Team</p>
                                </div>
                            </div>
                            <button>Try Calculator</button>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}

export default Know;
