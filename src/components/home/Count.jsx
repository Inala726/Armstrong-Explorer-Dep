import "./count.css"
import CountUp from "react-countup"
import student1 from "../../assets/student1.png"
import student2 from "../../assets/student2.png"
import student3 from "../../assets/student3.png"
import student4 from "../../assets/student4.png"
import { useEffect, useState, useRef } from "react"

// Custom hook for intersection observer
function useInView(options) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isInView];
}

const Count = () => {
    // Handle CJS/ESM interop for react-countup in Vite
    const CountUpComponent = CountUp.default || CountUp;

    const [ref1, inView1] = useInView({ threshold: 0.1 });
    const [ref2, inView2] = useInView({ threshold: 0.1 });
    const [ref3, inView3] = useInView({ threshold: 0.1 });
    const [ref4, inView4] = useInView({ threshold: 0.1 });

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false); 
    const toRotate = ["1500+","1500+","1500+"];
    const [text, setText] = useState("");
    const [delta, setDelta] = useState(300 - Math.random() * 100)
    const period = 2000;
  
    useEffect(() => {
        let ticker = setInterval(() => {
           tick();
        },delta)
  
        return () => {clearInterval(ticker)};
    }, [text])
  
    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0,text.length - 1) : fullText.substring(0, text.length + 1);
   
        setText(updatedText);
        if(isDeleting){
           setDelta(prevDelta => prevDelta/2)
        }
        
        if(!isDeleting && updatedText === fullText){
            setIsDeleting(true);
            setDelta(period);
        }else if(isDeleting && updatedText === ""){
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(2000);
        }
    }

    return (
        <>
        <section className="count-sec">
            <div className="sec-counts" ref={ref1}>
                <img src={student1} alt="" />
                <h1>
                  {inView1 && <CountUpComponent 
                    style={{ fontSize: 23.5 }} 
                    start={0} 
                    end={65972} 
                    duration={2} 
                    delay={0}
                  />}
                </h1>
                <p>Calculations Performed</p>
            </div>
            <div className="sec-count" ref={ref2}>
                <img src={student2} alt="" />
                <h1>
                  {inView2 && <CountUpComponent 
                    style={{ fontSize: 23.5 }} 
                    start={0} 
                    end={53710} 
                    duration={2} 
                    delay={0}
                  />}
                </h1>
                <p>Numbers Checked</p>
            </div>
            <div className="sec-countss" ref={ref3}>
                <img src={student3} alt="" />
                <h1>
                  {inView3 && <CountUpComponent  
                    style={{ fontSize: 23.5 }} 
                    start={0} 
                    end={48972} 
                    duration={2} 
                    delay={0}
                  />}
                </h1>
                <p>Users Registered</p>
            </div>
            <div className="sec-countsss" ref={ref4}>
                <img src={student4} alt="" />
                <h1>
                  {inView4 && <CountUpComponent 
                    style={{ fontSize: 23.5 }} 
                    start={0} 
                    end={500} 
                    duration={2} 
                    delay={0}
                  />}
                </h1>
                <p>Active Sessions</p>
            </div>
        </section>
        </>
    )
}

export default Count;
