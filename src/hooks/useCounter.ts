import { useEffect } from 'react';

export function useCounter() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCounter(el: Element, target: number, duration = 1200) {
      if (prefersReducedMotion) { el.textContent = target.toString(); return; }
      const start = performance.now();
      function step(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toString();
      }
      requestAnimationFrame(step);
    }

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.count || '0', 10);
          if (!isNaN(target)) animateCounter(el, target);
          statObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

    return () => statObserver.disconnect();
  }, []);
}
