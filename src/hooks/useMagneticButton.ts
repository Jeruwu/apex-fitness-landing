import { useEffect } from 'react';

export function useMagneticButton() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isTouch || prefersReducedMotion) return;

    const cleanupFns: Array<() => void> = [];

    document.querySelectorAll('.js-magnetic').forEach(btn => {
      const button = btn as HTMLElement;
      let currentX = 0, currentY = 0;
      let targetX = 0, targetY = 0;
      let rafId: number | null = null;
      const STRENGTH = 0.38;
      const SPRING   = 0.14;
      const FRICTION = 0.82;

      function springLoop() {
        currentX += (targetX - currentX) * SPRING;
        currentY += (targetY - currentY) * SPRING;
        currentX *= FRICTION;
        currentY *= FRICTION;
        button.style.transform = `translate(${currentX}px, ${currentY}px)`;
        const dist = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);
        if (dist > 0.05) rafId = requestAnimationFrame(springLoop);
        else { rafId = null; }
      }

      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        targetX = (e.clientX - cx) * STRENGTH;
        targetY = (e.clientY - cy) * STRENGTH;
        if (!rafId) rafId = requestAnimationFrame(springLoop);
      };

      const handleMouseLeave = () => {
        targetX = 0;
        targetY = 0;
        if (!rafId) rafId = requestAnimationFrame(springLoop);
      };

      button.addEventListener('mousemove', handleMouseMove as any);
      button.addEventListener('mouseleave', handleMouseLeave);

      cleanupFns.push(() => {
        button.removeEventListener('mousemove', handleMouseMove as any);
        button.removeEventListener('mouseleave', handleMouseLeave);
        if (rafId) cancelAnimationFrame(rafId);
      });
    });

    return () => cleanupFns.forEach(fn => fn());
  }, []);
}
