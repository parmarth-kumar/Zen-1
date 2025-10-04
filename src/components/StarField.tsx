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

      const helixHeight=400;
      const spacing = 10;
      for (let i=0; i<helixHeight; i+=spacing) {
        const phase =i*0.05 +time*0.02; // animate phase 
        const offset = Math.sin(phase) *20;

        //left stand 
        ctx.beginPath();
        ctx.arc(-offset,i-helixHeight /2,2,0, Math.PI *2);
        ctx.fillStyle = "rgba(0,255,255,0.6)";
        ctx.fill();
        //right stand 
        ctx.beginPath();
        ctx.arc(-offset,i-helixHeight /2,2,0, Math.PI *2);
        ctx.fillStyle = "rgba(255,0,255,0.6)";
        ctx.fill();

        //rung (connecting lines)
        ctx.beginPath();
        ctx.moveTo(-offset, i-helixHeight / 2);
        ctx.lineTo(offset, i-helixHeight / 2);
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.restore();
    };
    let time =0;

    //Main animation loop 
    const animate=() => {
      //clear background 
      ctx.fillStyle = "rgba(5,10,20,1)";
      ctx.fillRect(0,0,canvas.width, canvas.height);
      
      
      
        
                
      
        
            



