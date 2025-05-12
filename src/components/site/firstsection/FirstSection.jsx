import React, { useState, useEffect, useRef } from "react";
import LoadingCircle from "./LoadingCircle";
import "./firstSection.scss";
import GridLines from "./GridLines";

const TypingText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let timeout;
    let i = 0;

    const type = () => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
        timeout = setTimeout(type, 40);
      }
    };

    const startTimeout = setTimeout(() => {
      type();
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearTimeout(startTimeout);
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
};
//reng deyisececek yazma efekti
// const LetterAnimation = ({ text, delay = 0 }) => {
//   const [letterStates, setLetterStates] = useState(
//     text.split('').map(() => false)
//   );    


//   useEffect(() => {
//     let timeouts = [];
//     let currentIndex = 0;

//     const startTimeout = setTimeout(() => {
//       const showNextLetter = () => {
//         if (currentIndex < text.length) {
//           setLetterStates(prev => {
//             const newStates = [...prev];
//             newStates[currentIndex] = true;
//             return newStates;
//           });
//           currentIndex++;
//           const timeout = setTimeout(showNextLetter, 50);
//           timeouts.push(timeout);
//         }
//       };
//       showNextLetter();
//     }, delay);

//     timeouts.push(startTimeout);

//     return () => {
//       timeouts.forEach(timeout => clearTimeout(timeout));
//     };
//   }, [text, delay]);

//   return (
//     <span className="letter-animation-container">
//       {text.split('').map((char, index) => (
//         <span 
//           key={index} 
//           className="animated-letter"
//           style={{ 
//             color: letterStates[index] ? 'white' : 'black',
//             transition: 'color 0.3s ease'
//           }}
//         >
//           {char}
//         </span>
//       ))}
//     </span>
//   );
// };

function FirstSection() {
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const blurCircleRef = useRef(null);
  const plusCircleRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      if (blurCircleRef.current) {
        blurCircleRef.current.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
      }
      if (plusCircleRef.current) {
        plusCircleRef.current.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getResponsiveStyles = () => {
    if (windowWidth <= 768) {
      return {
        containerStyle: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px',
          position: 'absolute',
          top: '50%',
          left: '5%',
          transform: 'translateY(-50%)',
          width: '100%'
        },
        textStyle: {
          fontSize: '0.8rem',
          position: 'relative',
          left: 'auto',
          right: 'auto',
          textAlign: 'left',
          width: 'auto',
          maxWidth: '300px'
        }
      };
    }
    return {
      containerStyle: {
        position: 'relative'
      },
      textStyle: {
        fontSize: '0.85rem'
      }
    };
  };

  const styles = getResponsiveStyles();

  if (loading) {
    return (
      <div className="loading-center-fix">
        <LoadingCircle onFinish={() => setLoading(false)} />
      </div>
    );
  }

  return (
   <div>
     <div className="container" style={{ position: "relative" }}>
      <GridLines />
      <svg className="background-svg" viewBox="0 0 600 600" ref={svgRef}>
        <defs>
          <linearGradient id="animatedBlueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ced1" />
            <stop offset="100%" stopColor="#000080" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-0.1 0"
              to="0.1 0"
              dur="4s"
              repeatCount="indefinite"
              additive="sum"
            />
          </linearGradient>

          <clipPath id="rightHalf">
            <path d="M300,20 A280,280 0 0,1 300,580 L300,300 Z" />
          </clipPath>

          <clipPath id="leftHalf">
            <path d="M300,20 A280,280 0 0,0 300,580 L300,300 Z" />
          </clipPath>

          <filter id="blurFilter">
            <feGaussianBlur stdDeviation="30" />
          </filter>
        </defs>

        {/* sag yarim daire */}
        <circle
          id="blueRightCircle"
          cx="300"
          cy="300"
          r="280"
          fill="url(#animatedBlueGradient)"
          clipPath="url(#rightHalf)"
          style={{
            filter: "brightness(1)",
            transformOrigin: "center center",
            transition: "transform 0.3s ease",
          }}
        />

        {/* Sol yarim daire */}
        <circle
          cx="300"
          cy="300"
          r="280"
          fill="url(#animatedBlueGradient)"
          clipPath="url(#leftHalf)"
          filter="url(#blurFilter)"
          style={{ filter: "brightness(1)" }}
        >
          <animate
            attributeName="opacity"
            values="1;1;0"
            keyTimes="0;0.5;1"
            dur="2s"
            begin="0s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
          />
        </circle>

        {/* col daireler */}
        <circle cx="300" cy="300" r="280" stroke="white" strokeWidth="0.4" fill="none" className="animated-stroke" />
        <circle cx="300" cy="20" r="280" stroke="white" strokeWidth="0.3" fill="none" className="animated-stroke from-top" />
        <circle cx="300" cy="580" r="280" stroke="white" strokeWidth="0.3" fill="none" className="animated-stroke from-bottom" />
        <circle cx="20" cy="300" r="280" stroke="white" strokeWidth="0.3" fill="none" className="animated-stroke from-left" />
        <circle cx="580" cy="300" r="280" stroke="white" strokeWidth="0.3" fill="none" className="animated-stroke from-right" />
{/* balaca daireler */}
        <circle cx="160" cy="300" r="140" stroke="white" strokeWidth="0.3" fill="none" className="animated-stroke delay3" />
        <circle cx="300" cy="160" r="140" stroke="white" strokeWidth="0.3" fill="none" className="animated-stroke delay3" />
        <circle cx="440" cy="300" r="140" stroke="white" strokeWidth="0.3" fill="none" className="animated-stroke delay3" />
        <circle cx="300" cy="440" r="140" stroke="white" strokeWidth="0.3" fill="none" className="animated-stroke delay3" />
      </svg>

      <div className="bottom-right">BACK TO TOP</div>

      <div className="line-texts" style={styles.containerStyle}>
        <div 
          className="corner-text motion" 
          style={styles.textStyle}
        >
          <TypingText text="{MOTION DESIGN}" delay={1000} />
        </div>
        <div 
          className="corner-text web" 
          style={styles.textStyle}
        >
          <TypingText text="{WEB DEVELOPMENT}" delay={1500} />
        </div>
        <div 
          className="corner-text visual" 
          style={styles.textStyle}
        >
          <TypingText text="{VISUAL DESIGN}" delay={2000} />
        </div>
        <div 
          className="corner-text art" 
          style={styles.textStyle}
        >
          <TypingText text="{ART DIRECTION}" delay={2500} />
        </div>
      </div>

      <div className="center-text center-text-animate">
        <div className="fade-in-text">
          I CREATE MEANINGFUL DIGITAL EXPERIENCES THROUGH<br />
          AN APPROACH ROOTED IN LOGIC AND INTUITION,<br />
          INTEGRATING FOUR KEY AREAS TO CREATE NEW VALUE.
        </div>
      </div>

      <div className="bottom-left-text">
        <span className="bottom-left-line">Synthesize Approaches,</span>
        <span className="bottom-left-line">Refined <i>Digital</i> Experiences.</span>
        <span className="bottom-left-line"><i>For</i> Vision <i>and</i> Brand.</span>
      </div>

      <div className="blur-circle" ref={blurCircleRef} />
      <div className="center-plus-circle" ref={plusCircleRef} />

    </div>
       <div className="writes-div">
         <h1 className="hi">HELLO</h1>
    
       </div>
   </div>
  );
}

export default FirstSection;
