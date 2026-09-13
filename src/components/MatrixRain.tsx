import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  speed?: number;
  opacity?: number;
  color?: string;
  bgColor?: string;
  headColor?: string;
  className?: string;
}

function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(5, 8, 7, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ 
  speed = 33, 
  opacity = 0.08,
  color = '#00ff88',
  bgColor = '#050807',
  headColor = '#ffffff',
  className = "fixed top-0 left-0 w-full h-full pointer-events-none z-0"
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (canvas.parentElement && !className.includes('fixed')) {
        canvas.width = canvas.parentElement.clientWidth || 300;
        canvas.height = canvas.parentElement.clientHeight || 150;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();

    const letters = '01';
    const fontSize = 12;
    let columns = Math.max(1, Math.floor(canvas.width / fontSize));
    let drops = Array(columns).fill(1);

    const handleResize = () => {
      resizeCanvas();
      const newColumns = Math.max(1, Math.floor(canvas.width / fontSize));
      if (newColumns > drops.length) {
        const extra = Array(newColumns - drops.length).fill(1);
        drops = [...drops, ...extra];
      } else if (newColumns < drops.length) {
        drops = drops.slice(0, newColumns);
      }
    };
    window.addEventListener('resize', handleResize);

    let lastTime = 0;
    const interval = speed;

    const draw = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(draw);

      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      ctx.fillStyle = hexToRgba(bgColor, opacity);
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = letters[Math.floor(Math.random() * letters.length)];
        
        if (Math.random() > 0.97) {
          ctx.fillStyle = headColor;
        } else {
          ctx.fillStyle = color;
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [speed, opacity, color, bgColor, headColor, className]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
    />
  );
};

