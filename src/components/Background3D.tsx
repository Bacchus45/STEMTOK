import React, { useRef, useEffect } from 'react';

interface Background3DProps {
  variant?: 'main' | 'profile' | 'studio' | 'insights';
}

export const Background3D: React.FC<Background3DProps> = ({ variant = 'main' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animated particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 80; i++) {
      const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [variant]);

  const getBackgroundGradient = () => {
    switch (variant) {
      case 'profile':
        return 'from-purple-900 via-blue-900 to-indigo-900';
      case 'studio':
        return 'from-emerald-900 via-teal-900 to-cyan-900';
      case 'insights':
        return 'from-orange-900 via-red-900 to-pink-900';
      default:
        return 'from-purple-900 via-blue-900 to-indigo-900';
    }
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${getBackgroundGradient()}`}>
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
};