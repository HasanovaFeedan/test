import React from "react";
import "./GridLines.css";

const GridLines = () => (
  <svg
    className="grid-svg"
    width="100%"
    height="100%"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
      pointerEvents: "none",
    }}
  >
    {/* YATAY - SAĞ və SOL */}
    <line className="grid-line draw-right delay-0" x1="50%" y1="50%" x2="100%" y2="50%" />
    <line className="grid-line draw-left delay-0" x1="50%" y1="50%" x2="0" y2="50%" />

    {/* DİKEY - YUXARI və AŞAĞI */}
    <line className="grid-line draw-down delay-1" x1="50%" y1="50%" x2="50%" y2="100%" />
    <line className="grid-line draw-up delay-1" x1="50%" y1="50%" x2="50%" y2="0" />

    {/* Əlavə xətlər də aşağıda eyni qaydada təyin edilə bilər */}
    <line className="grid-line draw-right delay-0" x1="50%" y1="25%" x2="100%" y2="25%" />
    <line className="grid-line draw-left delay-0" x1="50%" y1="25%" x2="0" y2="25%" />
    <line className="grid-line draw-right delay-0" x1="50%" y1="75%" x2="100%" y2="75%" />
    <line className="grid-line draw-left delay-0" x1="50%" y1="75%" x2="0" y2="75%" />

    <line className="grid-line draw-down delay-1" x1="25%" y1="50%" x2="25%" y2="100%" />
    <line className="grid-line draw-up delay-1" x1="25%" y1="50%" x2="25%" y2="0" />
    <line className="grid-line draw-down delay-1" x1="75%" y1="50%" x2="75%" y2="100%" />
    <line className="grid-line draw-up delay-1" x1="75%" y1="50%" x2="75%" y2="0" />
  </svg>
);

export default GridLines;
