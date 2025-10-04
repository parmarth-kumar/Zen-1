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
    //---NEURON NETWORK ---
    //ARRAY of neuron nodes with random positions and pulse phases 
    const neurons: Array<any>= [];
    for (let i=0; i<40; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() *canvas.height,
        radius: Math.random() *3+2,
        pulse: Math.random() * Math.PI * 2,
      });
    }
    //--- Cells (background blobs)---
    //array of large , softly glowing cells that float around 
    const cells:Array<any>=[];
    for (let i=0; i<8; i++){
      cells.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 80+50,
        dx: Math.random() * 0.2-0.1,
        dy: Math.random() * 0.2-0.1,
      });
    }  

    //Draw a single DNA  helix at (x,y) with given angle and animation time 
    const drawDNAHelix =(x: number,y: number,angle: number , time:number) => {
      ctx.save();
      ctx.translate(x,y);
      ctx.rotate(angle);
      
        
            


