import prof1 from "../../assets/prof-1.png"
import prof2 from "../../assets/prof-2.png"

const Feedback = () => {
    return(
        <>
        <section className="feed-sec">
        <div>
            {/* icons */}
            <p></p>
        </div>
        <h1>Our Students Feedback</h1>
        <p>You'll find something to spark your curiosity and enhance</p>

        <div>
            <img src={prof1} alt="" />
            <div>
                {/* icons */}
                <div>
                    <p>Contrary to popular belief, Lorem Ipsum is not</p>
                    <p>simply random text. It has roots in a piece of  </p>
                    <p>classical Latin literature from 45 BC, making it</p>
                    <p>over 2000 years old.</p>
                </div>
                <div>
                    <img src={prof2} alt="" />
                </div>
                <div>
                    <h3>Emma Elizabeth</h3>
                    <p>Assistant Teacher</p>
                </div>
                <div>
                    {/* icons */}
                </div>
            </div>
        </div>
        </section>
        </>
    )
}

export default Feedback;
