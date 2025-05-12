import React, { useEffect, useRef, useState } from "react";
import "./LoadingCircle.scss";

const LoadingCircle = ({ onFinish }) => {
  const [count, setCount] = useState(1);
  const intervalRef = useRef();

  // Kenara çok yakın yarıçap
  const r = 110;
  const strokeWidth = 1.5;
  const circumference = 2 * Math.PI * r;
  const arcLength = (circumference / 2) - 8; 
  const gapLength = 16; //iki parca arasinda bosluq

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 400);
          return prev;
        }
      });
    }, 18);

    return () => clearInterval(intervalRef.current);
  }, [onFinish]);

  const formatted = count.toString().padStart(3, "0");

  // strokeDasharray ile iki ayrı parça ve aralarında boşluk
  const dashArray = `${arcLength} ${gapLength} ${arcLength} ${gapLength}`;

  return (
    <div className="kaito-loading-bg">
      <div className="kaito-loading-spinner">
        <svg width="260" height="260" viewBox="0 0 260 260" className="kaito-loading-svg">
          <defs>
            <radialGradient id="kaitoBlueGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00bfff" />
              <stop offset="100%" stopColor="#000428" />
            </radialGradient>
            <filter id="blurMe" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>
          {/* Mavi, hafif blur gradient dolgu */}
          <circle
            cx="130"
            cy="130"
            r="85"
            fill="url(#kaitoBlueGradient)"
            filter="url(#blurMe)"
            opacity="0.95"
          />
          {/* Dönen kenar çizgisi (iki parça, arada boşluk) */}
          <circle
            className="kaito-loading-arc"
            cx="130"
            cy="130"
            r={r}
            fill="none"
            stroke="#fff"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset="0"
          />
        </svg>
        <div className="kaito-loading-count">{formatted}</div>
      </div>
    </div>
  );
};

export default LoadingCircle;