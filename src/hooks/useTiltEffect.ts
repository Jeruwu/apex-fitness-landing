import { useEffect } from 'react';

export function useTiltEffect() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isTouch || prefersReducedMotion) return;

    const cleanupFns: Array<() => void> = [];

    document.querySelectorAll('.js-tilt').forEach(card => {
      const el = card as HTMLElement;
      const TILT_MAX = 6;
      let rafTilt: number | null = null;
      let tX = 0, tY = 0, cX = 0, cY = 0;

      function tiltLoop() {
        cX += (tX - cX) * 0.1;
        cY += (tY - cY) * 0.1;
        el.style.transform = `perspective(800px) rotateX(${cY}deg) rotateY(${cX}deg) translateZ(4px)`;
        const dist = Math.abs(tX - cX) + Math.abs(tY - cY);
        if (dist > 0.01) rafTilt = requestAnimationFrame(tiltLoop);
        else rafTilt = null;
      }

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width  - 0.5;
        const py = (e.clientY - rect.top)  / rect.height - 0.5;
        tX =  px * TILT_MAX * 2;
        tY = -py * TILT_MAX;
        if (!rafTilt) rafTilt = requestAnimationFrame(tiltLoop);
      };

      const handleMouseLeave = () => {
        tX = 0; tY = 0;
        if (!rafTilt) rafTilt = requestAnimationFrame(tiltLoop);
      };

      el.addEventListener('mousemove', handleMouseMove as any);
      el.addEventListener('mouseleave', handleMouseLeave);

      cleanupFns.push(() => {
        el.removeEventListener('mousemove', handleMouseMove as any);
        el.removeEventListener('mouseleave', handleMouseLeave);
        if (rafTilt) cancelAnimationFrame(rafTilt);
      });
    });

    return () => cleanupFns.forEach(fn => fn());
  }, []);
}
