(function () {
  'use strict';
  
  // 1. Inicialización de EmailJS con la llave real
  emailjs.init({ publicKey: "CAVxDqIEUmgoDxzVZ" }); 

  /* ─── Mark body as JS-ready so reveal states activate ─── */
  document.documentElement.classList.add('js-ready');

  /* ─── Custom easing (matches CSS vars) ─── */
  const EASE_OUT_EXPO  = 'cubic-bezier(0.16, 1, 0.3, 1)';
  const EASE_IN_OUT    = 'cubic-bezier(0.77, 0, 0.175, 1)';
  const EASE_STANDARD  = 'cubic-bezier(0.23, 1, 0.32, 1)';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ─── 1. NAV slide-in on load ─── */
  requestAnimationFrame(() => {
    document.getElementById('mainNav').classList.add('nav-ready');
  });

  /* ─── 2. Dashboard entrance ─── */
  function initDashboard() {
    const rows = document.querySelectorAll('.metric-row');
    const tl   = document.getElementById('tlStrip');

    rows.forEach((row, i) => {
      setTimeout(() => {
        row.classList.add('m-ready');
        const fill = row.querySelector('.metric-fill');
        if (fill) {
          const target = parseInt(fill.dataset.width, 10);
          setTimeout(() => { fill.style.width = target + '%'; }, 120);
        }
      }, 300 + i * 180);
    });

    setTimeout(() => {
      if (tl) tl.classList.add('m-ready');
      const dots = tl ? tl.querySelectorAll('.tl-dot') : [];
      dots.forEach((dot, i) => {
        setTimeout(() => dot.style.opacity = '1', i * 60);
      });
    }, 300 + rows.length * 180 + 200);
  }

  const dashboardEl = document.querySelector('.dashboard');
  if (dashboardEl) {
    const dashObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        initDashboard();
        dashObs.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    dashObs.observe(dashboardEl);
  }

  /* ─── 3. Smooth anchor scroll ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('mainNav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ─── 4. Intersection Observer — reveals ─── */
  function animateIn(el, delay = 0) {
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
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0, 10);
        animateIn(el, delay);
        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const childObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const parent = entry.target;
        const children = parent.querySelectorAll('.reveal-child');
        children.forEach((child, i) => {
          animateIn(child, i * 70);
        });
        childObserver.unobserve(parent);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
  );

  const featuresList = document.getElementById('featuresList');
  if (featuresList) childObserver.observe(featuresList);

  /* ─── 6. Counter animation ─── */
  function animateCounter(el, target, duration = 1200) {
    if (prefersReducedMotion) { el.textContent = target; return; }
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (!isNaN(target)) animateCounter(el, target);
        statObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

  /* ─── 7. Magnetic button effect ─── */
  if (!isTouch && !prefersReducedMotion) {
    document.querySelectorAll('.js-magnetic').forEach(btn => {
      let currentX = 0, currentY = 0;
      let targetX = 0, targetY = 0;
      let rafId = null;
      const STRENGTH = 0.38;
      const SPRING   = 0.14;
      const FRICTION = 0.82;

      function springLoop() {
        currentX += (targetX - currentX) * SPRING;
        currentY += (targetY - currentY) * SPRING;
        btn.style.transform = `translate(${currentX}px, ${currentY}px)`;
        const dist = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);
        if (dist > 0.05) rafId = requestAnimationFrame(springLoop);
        else { rafId = null; }
      }

      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top  + rect.height / 2;
        targetX = (e.clientX - cx) * STRENGTH;
        targetY = (e.clientY - cy) * STRENGTH;
        if (!rafId) rafId = requestAnimationFrame(springLoop);
      });

      btn.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
        if (!rafId) rafId = requestAnimationFrame(springLoop);
      });
    });
  }

  /* ─── 8. Form submit con EmailJS Integrado ─── */
  document.getElementById('submitBtn').addEventListener('click', handleSubmit);

  function handleSubmit() {
      // 1. EXTRAER Y NORMALIZAR (Limpieza segura de datos)
      const fname = document.getElementById('fname').value.trim();
      const lname = document.getElementById('lname').value.trim();
      const email = document.getElementById('email').value.trim().toLowerCase();
      
      // Filtro para dejar solo números y el signo + en el teléfono
      let phoneRaw = document.getElementById('phone').value;
      const phone = phoneRaw.replace(/[^\d+]/g, ''); 
      
      const goal  = document.getElementById('goal').value;

      // 2. VALIDAR TODOS LOS CAMPOS REQUERIDOS
      const invalids = [
        { id: 'fname', val: fname },
        { id: 'lname', val: lname },
        { id: 'email', val: email },
        { id: 'goal',  val: goal  }
      ].filter(f => !f.val);

      // Si falta algún campo obligatorio, vibra en rojo y detiene el envío
      if (invalids.length) {
        invalids.forEach(f => {
          const el = document.getElementById(f.id);
          el.style.borderColor = 'rgba(255,80,80,0.7)';
          if (!prefersReducedMotion) {
            el.animate(
              [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(-4px)' },
                { transform: 'translateX(4px)' },
                { transform: 'translateX(0)' }
              ],
              { duration: 320, easing: EASE_STANDARD }
            );
          }
          const clear = () => { el.style.borderColor = ''; el.removeEventListener('input', clear); el.removeEventListener('change', clear); };
          el.addEventListener('input',  clear);
          el.addEventListener('change', clear);
        });
        return; 
      }

      // 3. ENVÍO CON EMAILJS Y MANEJO DE ESTADO UX
      const submitBtn = document.getElementById('submitBtn');
      const btnSpan = submitBtn.querySelector('span');
      const originalText = btnSpan.innerText;
      
      btnSpan.innerText = "Enviando...";
      submitBtn.style.pointerEvents = "none";

      const templateParams = {
          fname: fname,
          lname: lname,
          email: email,
          phone: phone || "No proporcionado",
          goal: goal
      };

      emailjs.send('service_pw0nme3', 'template_8y6tblu', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            const form    = document.getElementById('leadForm');
            const success = document.getElementById('successState');

            if (!prefersReducedMotion) {
              form.animate(
                [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-12px)' }],
                { duration: 280, easing: EASE_IN_OUT, fill: 'forwards' }
              ).finished.then(() => {
                form.style.display = 'none';
                success.style.display = 'flex';
                success.animate(
                  [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
                  { duration: 480, easing: EASE_OUT_EXPO, fill: 'forwards' }
                );
              });
            } else {
              form.style.display = 'none';
              success.style.display = 'flex';
            }

        }, function(error) {
            console.error("[Apex Form] Error de conexión al intentar procesar la solicitud.", error);
            alert("Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.");
            btnSpan.innerText = originalText;
            submitBtn.style.pointerEvents = "auto";
        });
    }

  /* ─── 9. Stagger grids ─── */
  ['servicesGrid', 'reviewsGrid', 'methodSteps', 'pricingGrid'].forEach(id => {
    const grid = document.getElementById(id);
    if (!grid) return;
    const gridObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const children = entry.target.querySelectorAll('.reveal-child');
          children.forEach((child, i) => animateIn(child, i * 90));
          gridObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    gridObserver.observe(grid);
  });

  /* ─── 10. 3D Tilt for service cards ─── */
  if (!isTouch && !prefersReducedMotion) {
    document.querySelectorAll('.js-tilt').forEach(card => {
      const TILT_MAX = 6;
      let rafTilt = null;
      let tX = 0, tY = 0, cX = 0, cY = 0;

      function tiltLoop() {
        cX += (tX - cX) * 0.1;
        cY += (tY - cY) * 0.1;
        card.style.transform = `perspective(800px) rotateX(${cY}deg) rotateY(${cX}deg) translateZ(4px)`;
        const dist = Math.abs(tX - cX) + Math.abs(tY - cY);
        if (dist > 0.01) rafTilt = requestAnimationFrame(tiltLoop);
        else rafTilt = null;
      }

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width  - 0.5;
        const py = (e.clientY - rect.top)  / rect.height - 0.5;
        tX =  px * TILT_MAX * 2;
        tY = -py * TILT_MAX;
        if (!rafTilt) rafTilt = requestAnimationFrame(tiltLoop);
      });

      card.addEventListener('mouseleave', () => {
        tX = 0; tY = 0;
        if (!rafTilt) rafTilt = requestAnimationFrame(tiltLoop);
      });
    });
  }

  /* ─── 12. Nav scroll state ─── */
  const nav = document.getElementById('mainNav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 60 && lastScroll <= 60) {
      nav.style.borderBottom = '1px solid rgba(255,255,255,0.07)';
      nav.style.background = 'rgba(13,13,13,0.97)';
    } else if (y <= 60 && lastScroll > 60) {
      nav.style.borderBottom = '';
      nav.style.background = '';
    }
    lastScroll = y;
  }, { passive: true });

  /* ─── 12b. Mobile hamburger menu ─── */
  (function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    function openMenu() {
      navLinks.classList.add('nav-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      navLinks.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    }

    function toggleMenu() {
      navLinks.classList.contains('nav-open') ? closeMenu() : openMenu();
    }

    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'navLinks');

    hamburger.addEventListener('click', toggleMenu);

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) closeMenu();
    });

    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('nav-open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }
    });
  })();

  /* ─── 13. Dashboard Carousel ─── */
  (function initCarousel() {
    const profiles = [
      {
        name: 'Marcus T.', age: 34, initials: 'MT', weeks: 12,
        bf:   { before: 24.1, after: 17.7, fill: 73 },
        lean: { before: 71.2, after: 76.0, fill: 82 },
        vo2:  { before: 47.2, after: 58.4, fill: 88 },
        note: 'Real results \u00b7 InBody-verified \u00b7 12 weeks'
      },
      {
        name: 'Sarah J.', age: 29, initials: 'SJ', weeks: 10,
        bf:   { before: 28.6, after: 21.3, fill: 68 },
        lean: { before: 54.1, after: 57.8, fill: 76 },
        vo2:  { before: 41.0, after: 51.4, fill: 80 },
        note: 'Attorney \u00b7 Body composition \u00b7 10 weeks'
      },
      {
        name: 'David R.', age: 42, initials: 'DR', weeks: 16,
        bf:   { before: 22.4, after: 15.2, fill: 78 },
        lean: { before: 79.8, after: 84.3, fill: 87 },
        vo2:  { before: 44.5, after: 56.8, fill: 85 },
        note: 'CEO \u00b7 Performance peak \u00b7 16 weeks'
      },
      {
        name: 'Elena V.', age: 31, initials: 'EV', weeks: 12,
        bf:   { before: 31.2, after: 23.8, fill: 71 },
        lean: { before: 48.6, after: 52.1, fill: 74 },
        vo2:  { before: 38.4, after: 47.9, fill: 77 },
        note: 'Surgeon \u00b7 Endurance focus \u00b7 12 weeks'
      },
      {
        name: 'Michael C.', age: 38, initials: 'MC', weeks: 8,
        bf:   { before: 18.9, after: 14.1, fill: 82 },
        lean: { before: 82.4, after: 86.7, fill: 91 },
        vo2:  { before: 52.3, after: 62.1, fill: 93 },
        note: 'Pro athlete \u00b7 Power cycle \u00b7 8 weeks'
      },
      {
        name: 'Priya N.', age: 27, initials: 'PN', weeks: 12,
        bf:   { before: 27.3, after: 20.4, fill: 70 },
        lean: { before: 46.2, after: 49.5, fill: 73 },
        vo2:  { before: 36.1, after: 45.0, fill: 74 },
        note: 'Engineer \u00b7 First cycle \u00b7 12 weeks'
      },
      {
        name: 'James O.', age: 45, initials: 'JO', weeks: 16,
        bf:   { before: 26.8, after: 18.3, fill: 75 },
        lean: { before: 74.5, after: 79.2, fill: 83 },
        vo2:  { before: 40.8, after: 52.6, fill: 82 },
        note: 'CFO \u00b7 Longevity program \u00b7 16 weeks'
      },
      {
        name: 'Camila R.', age: 33, initials: 'CR', weeks: 12,
        bf:   { before: 29.5, after: 22.1, fill: 72 },
        lean: { before: 51.3, after: 55.8, fill: 79 },
        vo2:  { before: 39.7, after: 49.3, fill: 78 },
        note: 'Architect \u00b7 Strength build \u00b7 12 weeks'
      },
      {
        name: 'Kevin T.', age: 36, initials: 'KT', weeks: 10,
        bf:   { before: 21.6, after: 15.9, fill: 76 },
        lean: { before: 77.1, after: 81.4, fill: 86 },
        vo2:  { before: 46.0, after: 55.7, fill: 84 },
        note: 'Surgeon \u00b7 Conditioning \u00b7 10 weeks'
      },
      {
        name: 'Aaliya M.', age: 30, initials: 'AM', weeks: 12,
        bf:   { before: 32.4, after: 24.6, fill: 69 },
        lean: { before: 44.7, after: 48.2, fill: 72 },
        vo2:  { before: 34.9, after: 44.1, fill: 73 },
        note: 'Designer \u00b7 Full transformation \u00b7 12 weeks'
      }
    ];

    let currentIdx = 0;
    let carouselTimer = null;
    let isTransitioning = false;

    const dotsContainer = document.getElementById('carouselDots');
    const inner         = document.getElementById('dashInner');
    const prevBtn       = document.getElementById('carouselPrev');
    const nextBtn       = document.getElementById('carouselNext');
    if (!dotsContainer || !inner) return;

    const els = {
      avatar:    document.getElementById('dashAvatar'),
      name:      document.getElementById('dashName'),
      cycle:     document.getElementById('dashCycle'),
      badge:     document.getElementById('dashBadge'),
      m1Delta:   document.getElementById('m1Delta'),
      m1Before:  document.getElementById('m1Before'),
      m1After:   document.getElementById('m1After'),
      m1Fill:    document.getElementById('m1Fill'),
      m2Delta:   document.getElementById('m2Delta'),
      m2Before:  document.getElementById('m2Before'),
      m2After:   document.getElementById('m2After'),
      m2Fill:    document.getElementById('m2Fill'),
      m3Delta:   document.getElementById('m3Delta'),
      m3Before:  document.getElementById('m3Before'),
      m3After:   document.getElementById('m3After'),
      m3Fill:    document.getElementById('m3Fill'),
      tlEnd:     document.getElementById('tlEnd'),
      footnote:  document.getElementById('dashFootnote')
    };

    profiles.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to profile ' + (i + 1));
      dotsContainer.appendChild(dot);
    });

    function updateDots(idx) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.className = 'carousel-dot' + (i === idx ? ' active' : '');
      });
    }

    function writeProfile(p) {
      if (els.avatar)   els.avatar.textContent   = p.initials;
      if (els.name)     els.name.textContent      = p.name;
      if (els.cycle)    els.cycle.textContent     = p.weeks + '-Week Transformation';
      if (els.badge)    els.badge.textContent     = 'Week ' + p.weeks;

      if (els.m1Delta) {
        const diff = (p.bf.before - p.bf.after).toFixed(1);
        els.m1Delta.textContent = '\u25BC \u2212' + diff + '%';
      }
      if (els.m1Before) els.m1Before.textContent = p.bf.before.toFixed(1);
      if (els.m1After)  els.m1After.textContent  = p.bf.after.toFixed(1);

      if (els.m2Delta) {
        const diff = (p.lean.after - p.lean.before).toFixed(1);
        els.m2Delta.textContent = '\u25B2 +' + diff + ' kg';
      }
      if (els.m2Before) els.m2Before.textContent = p.lean.before.toFixed(1);
      if (els.m2After)  els.m2After.textContent  = p.lean.after.toFixed(1);

      if (els.m3Delta) {
        const diff = (p.vo2.after - p.vo2.before).toFixed(1);
        els.m3Delta.textContent = '\u25B2 +' + diff;
      }
      if (els.m3Before) els.m3Before.textContent = p.vo2.before.toFixed(1);
      if (els.m3After)  els.m3After.textContent  = p.vo2.after.toFixed(1);

      if (els.tlEnd)    els.tlEnd.textContent     = 'Week ' + p.weeks;
      if (els.footnote) els.footnote.textContent  = p.note;

      [
        { el: els.m1Fill, w: p.bf.fill },
        { el: els.m2Fill, w: p.lean.fill },
        { el: els.m3Fill, w: p.vo2.fill }
      ].forEach(({ el, w }) => {
        if (!el) return;
        el.style.transition = 'none';
        el.style.width = '0%';
        void el.offsetWidth;
        el.style.transition = '';
        requestAnimationFrame(() => { el.style.width = w + '%'; });
      });
    }

    function goTo(idx, animate) {
      if (isTransitioning) return;
      currentIdx = ((idx % profiles.length) + profiles.length) % profiles.length;
      updateDots(currentIdx);

      if (!animate || prefersReducedMotion) {
        writeProfile(profiles[currentIdx]);
        return;
      }

      isTransitioning = true;
      inner.classList.add('fade-out');
      inner.classList.remove('fade-in');

      setTimeout(() => {
        writeProfile(profiles[currentIdx]);
        inner.classList.remove('fade-out');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            inner.classList.add('fade-in');
            isTransitioning = false;
          });
        });
      }, 240);
    }

    function startTimer() {
      clearInterval(carouselTimer);
      carouselTimer = setInterval(() => goTo(currentIdx + 1, true), 4500);
    }

    function resetAndGo(idx) {
      goTo(idx, true);
      startTimer();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => resetAndGo(currentIdx - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => resetAndGo(currentIdx + 1));

    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.carousel-dot');
      if (!dot) return;
      const idx = Array.from(dotsContainer.children).indexOf(dot);
      if (idx !== -1 && idx !== currentIdx) resetAndGo(idx);
    });

    const panel = document.getElementById('dashPanel');
    if (panel) {
      panel.addEventListener('mouseenter', () => clearInterval(carouselTimer));
      panel.addEventListener('mouseleave', startTimer);
      panel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') resetAndGo(currentIdx + 1);
        if (e.key === 'ArrowLeft')  resetAndGo(currentIdx - 1);
      });
    }

    writeProfile(profiles[0]);
    startTimer();
  })();

})();
