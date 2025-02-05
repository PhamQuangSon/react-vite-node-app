import React, { useEffect, useState } from "react";

const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

const CustomPointer: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  if (isMobileDevice()) {
    return null;
  }

  return (
    <div
      className="fixed bg-sky-600 rounded-full opacity-60 pointer-events-none"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }}
    />
  );
};

export default CustomPointer;
