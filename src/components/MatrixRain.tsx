import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  speed?: number;
  opacity?: number;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ 
  speed = 33, 
  opacity = 0.08 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const letters = '01';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    // Re-calculate drops on resize
    const handleResize = () => {
      resizeCanvas();
      const newColumns = Math.floor(canvas.width / fontSize);
      if (newColumns > drops.length) {
        const extra = Array(newColumns - drops.length).fill(1);
        drops = [...drops, ...extra];
      } else if (newColumns < drops.length) {
        drops = drops.slice(0, newColumns);
      }
    };
    window.addEventListener('resize', handleResize);

    let lastTime = 0;
    const interval = speed; // milliseconds

    const draw = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(draw);

      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      // Draw faint semi-transparent overlay to create fading trails
      ctx.fillStyle = `rgba(5, 8, 7, ${opacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Light green text for binary characters
      ctx.fillStyle = '#00ff88';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random binary char
        const char = letters[Math.floor(Math.random() * letters.length)];
        
        // Highlight head drops with bright white-green
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
        } else {
          ctx.fillStyle = '#00ff88';
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop position once it exceeds screen height with random delay
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', handleResize);
    };
  }, [speed, opacity]);

  return (
    <canvas
      id="matrix"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 bg-[#050807]"
    />
  );
};
