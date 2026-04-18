import React, { useEffect, useRef } from 'react';

export function DustBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 150
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    resize();

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      depth: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        // Depth creates parallax effect (smaller = further away = slower)
        this.depth = Math.random() * 3 + 1;
        this.size = (Math.random() * 2 + 1) * this.depth; // Increased base size
        this.speedX = (Math.random() * 0.4 - 0.2) * this.depth;
        this.speedY = (Math.random() * -0.5 - 0.1) * this.depth; 
        this.opacity = (Math.random() * 0.5 + 0.3) / this.depth; // Increased opacity range
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Add a gentle wave motion
        this.x += Math.sin(this.y * 0.01) * 0.2 * this.depth;

        // Screen wrap
        if (this.y < -50) {
          this.y = canvas!.height + 50;
          this.x = Math.random() * canvas!.width;
        }
        if (this.x < -50) {
          this.x = canvas!.width + 50;
        }
        if (this.x > canvas!.width + 50) {
          this.x = -50;
        }
        
        // Push slightly away from mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 1.5;
          this.y -= (dy / distance) * force * 1.5;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        
        // Creating a soft glowing dust particle
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(186, 230, 253, ${this.opacity})`); // soft sky blue glow
        gradient.addColorStop(1, `rgba(186, 230, 253, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particlesArray = [];
      // Calculate number of particles based on screen size (roughly 1 particle per 10k pixels)
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 10000);
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      // Draw cursor tracing lines
      for (let i = 0; i < particlesArray.length; i++) {
        const dx = mouse.x - particlesArray[i].x;
        const dy = mouse.y - particlesArray[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(186, 230, 253, ${0.15 * (1 - distance / mouse.radius)})`; // Dimmed from 0.4 to 0.15
          ctx.lineWidth = 1;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Slow pulsing auroras for the classic PS5 menu feel */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/5 blur-[150px]"
        style={{ animation: 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
      ></div>
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[120px]"
        style={{ animation: 'pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s' }}
      ></div>
      <div 
        className="absolute top-[20%] right-[30%] w-[40%] h-[40%] rounded-full bg-sky-400/5 blur-[120px]"
        style={{ animation: 'pulse 15s cubic-bezier(0.4, 0, 0.6, 1) infinite 5s' }}
      ></div>
      
      {/* Dynamic dust particles layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-[0.6] mix-blend-screen"></canvas>
    </div>
  );
}
