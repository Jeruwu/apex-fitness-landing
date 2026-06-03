import { useEffect } from 'react';

export function useScrollToAnchor() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (!id || !id.startsWith('#') || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      
      const nav = document.getElementById('mainNav');
      const navH = nav ? nav.offsetHeight : 0;
      
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      
      // Volvemos a un punto medio (+50). Esto "esconde" la mitad del padding
      // debajo del menú para ahorrar espacio y mostrar lo máximo posible hacia abajo,
      // pero sin llegar a cortar el título de "WHAT WE OFFER" ni el texto superior.
      const top = targetTop - navH + 50;
      
      window.scrollTo({ top, behavior: 'smooth' });
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
}
