import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  
  const ringRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    // Check for touch device capabilities
    const checkTouch = () => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        setIsTouch(true);
      }
    };
    checkTouch();

    if (isTouch) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleMouseLeave = () => {
      setIsHidden(true);
    };

    // Listeners for scaling active target items
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.closest('.interactive-target');
        
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth lerp trailing cursor animation
    const animateRing = () => {
      setRingPosition((prev) => {
        const ease = 0.15;
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease
        };
      });
      requestRef.current = requestAnimationFrame(animateRing);
    };
    
    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [position, isTouch]);

  if (isTouch || isHidden) return null;

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-brand-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
          backgroundColor: isHovered ? '#00e5ff' : '#00ff66'
        }}
      />
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
        style={{ 
          left: `${ringPosition.x}px`, 
          top: `${ringPosition.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.4 : 1})`,
          borderColor: isHovered ? '#00e5ff' : 'rgba(0, 255, 102, 0.4)',
          backgroundColor: isHovered ? 'rgba(0, 229, 255, 0.05)' : 'transparent'
        }}
      />
    </>
  );
}
