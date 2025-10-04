import React,{ useEffect, useRef} from "react";

const BioBackground: React.FC =() =>{
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas =canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize",resizeCanvas);
            
