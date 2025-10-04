import React,{ useEffect, useRef} from "react";    //---importing necessary modules--// 
//BioBackground: Animated biological background using canvas 
const BioBackground: React.FC =() =>{
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    //Get Canvas and context 
    const canvas =canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    //Resize canvas to fill window 
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize",resizeCanvas);

    //--DNA Helices---
    // TWO DNA helices, left and right
    const helices=[
      {x: canvas.width*0.2, y: canvas.height /2,baseAngle: -0.35, phase:0 },
      {x: canvas.width *0.8, y: canvas.height /2,baseAngle: 0.35, phase: Math.PI },
    ];  
            

