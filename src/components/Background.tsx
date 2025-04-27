import { useEffect, useRef } from "react";

declare global {
  interface Window {
    VANTA: any;
  }
}

export default function VantaBackground() {
  const vantaRef = useRef(null);

  useEffect(() => {
    const effect = window.VANTA.DOTS({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0xffffff, // puncte albe
      color2: 0xffffff, // linii albe
      backgroundColor: 0x1a1a1a,
      spacing: 30.0,
      showLines: true,
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        zIndex: -1,
        filter:
          "drop-shadow(0 0 8px rgba(200, 0, 255, 0.7)) drop-shadow(0 0 20px rgba(200, 0, 255, 0.4))",
      }}
    />
  );
}
