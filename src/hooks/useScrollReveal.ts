import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';

    function animateIn(el: Element, delay = 0) {
      const translateY = prefersReducedMotion ? 0 : 20;
      el.animate(
        [
          { opacity: 0, transform: `translateY(${translateY}px)` },
          { opacity: 1, transform: 'translateY(0px)' }
        ],
        {
          duration: prefersReducedMotion ? 200 : 620,
          delay,
          easing: EASE_OUT_EXPO,
          fill: 'forwards'
        }
      );
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (el.classList.contains('is-revealed')) return;
          
          el.classList.add('is-revealed');
          const delay = parseInt(el.dataset.delay || '0', 10);
          animateIn(el, delay);
          revealObserver.unobserve(el);
        });
      },
      { threshold: 0.05, rootMargin: '0px' }
    );

    const childObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const parent = entry.target as HTMLElement;
          if (parent.classList.contains('is-revealed')) return;
          
          parent.classList.add('is-revealed');
          const children = parent.querySelectorAll('.reveal-child');
          children.forEach((child, i) => {
            animateIn(child, i * 70);
          });
          childObserver.unobserve(parent);
        });
      },
      { threshold: 0.05, rootMargin: '0px' }
    );

    const observeElements = () => {
      document.querySelectorAll('.reveal:not(.is-revealed)').forEach(el => revealObserver.observe(el));
      document.querySelectorAll('#featuresList:not(.is-revealed), #servicesGrid:not(.is-revealed), #reviewsGrid:not(.is-revealed), #methodSteps:not(.is-revealed), #pricingGrid:not(.is-revealed)').forEach(el => childObserver.observe(el));
    };

    observeElements();

    // Use MutationObserver for Vite HMR and dynamic elements
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });
    
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      revealObserver.disconnect();
      childObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
