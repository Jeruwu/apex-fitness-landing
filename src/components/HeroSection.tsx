import { useEffect } from 'react';

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

export default function HeroSection() {
  useEffect(() => {
    // 2. Dashboard entrance
    function initDashboard() {
      const rows = document.querySelectorAll('.metric-row');
      const tl   = document.getElementById('tlStrip');

      rows.forEach((row, i) => {
        setTimeout(() => {
          row.classList.add('m-ready');
          const fill = row.querySelector('.metric-fill') as HTMLElement;
          if (fill) {
            const target = parseInt(fill.dataset.width || '0', 10);
            setTimeout(() => { fill.style.width = target + '%'; }, 120);
          }
        }, 300 + i * 180);
      });

      setTimeout(() => {
        if (tl) tl.classList.add('m-ready');
        const dots = tl ? tl.querySelectorAll('.tl-dot') : [];
        dots.forEach((dot: any, i) => {
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
      
      return () => dashObs.disconnect();
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let currentIdx = 0;
    let carouselTimer: any = null;
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

    // Initialize dots if empty
    if (dotsContainer.children.length === 0) {
      profiles.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to profile ' + (i + 1));
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots(idx: number) {
      dotsContainer?.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.className = 'carousel-dot' + (i === idx ? ' active' : '');
      });
    }

    function writeProfile(p: any) {
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

    function goTo(idx: number, animate: boolean) {
      if (isTransitioning) return;
      currentIdx = ((idx % profiles.length) + profiles.length) % profiles.length;
      updateDots(currentIdx);

      if (!animate || prefersReducedMotion) {
        writeProfile(profiles[currentIdx]);
        return;
      }

      isTransitioning = true;
      inner?.classList.add('fade-out');
      inner?.classList.remove('fade-in');

      setTimeout(() => {
        writeProfile(profiles[currentIdx]);
        inner?.classList.remove('fade-out');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            inner?.classList.add('fade-in');
            isTransitioning = false;
          });
        });
      }, 240);
    }

    function startTimer() {
      clearInterval(carouselTimer);
      carouselTimer = setInterval(() => goTo(currentIdx + 1, true), 4500);
    }

    function resetAndGo(idx: number) {
      goTo(idx, true);
      startTimer();
    }

    const onPrevClick = () => resetAndGo(currentIdx - 1);
    const onNextClick = () => resetAndGo(currentIdx + 1);

    if (prevBtn) prevBtn.addEventListener('click', onPrevClick);
    if (nextBtn) nextBtn.addEventListener('click', onNextClick);

    const onDotClick = (e: MouseEvent) => {
      const dot = (e.target as HTMLElement).closest('.carousel-dot');
      if (!dot) return;
      const idx = Array.from(dotsContainer.children).indexOf(dot);
      if (idx !== -1 && idx !== currentIdx) resetAndGo(idx);
    };
    dotsContainer.addEventListener('click', onDotClick);

    const panel = document.getElementById('dashPanel');
    const onMouseEnter = () => clearInterval(carouselTimer);
    const onMouseLeave = startTimer;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') resetAndGo(currentIdx + 1);
      if (e.key === 'ArrowLeft')  resetAndGo(currentIdx - 1);
    };

    if (panel) {
      panel.addEventListener('mouseenter', onMouseEnter);
      panel.addEventListener('mouseleave', onMouseLeave);
      panel.addEventListener('keydown', onKeyDown);
    }

    writeProfile(profiles[0]);
    startTimer();

    return () => {
      clearInterval(carouselTimer);
      if (prevBtn) prevBtn.removeEventListener('click', onPrevClick);
      if (nextBtn) nextBtn.removeEventListener('click', onNextClick);
      dotsContainer.removeEventListener('click', onDotClick);
      if (panel) {
        panel.removeEventListener('mouseenter', onMouseEnter);
        panel.removeEventListener('mouseleave', onMouseLeave);
        panel.removeEventListener('keydown', onKeyDown);
      }
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <p className="eyebrow reveal" data-delay="0">Downtown Miami · Brickell · Est. 2026</p>

        <div className="h1-wrapper reveal" data-delay="80">
          <h1>
            <span className="line">Train</span>
            <span className="highlight">Without</span>
            <span className="accent">Limits.</span>
          </h1>
        </div>

        <p className="hero-body reveal" data-delay="160">
          Elite coaching. <strong>Data-driven results.</strong> An uncrowded facility built for people who are serious about performance — not just showing up.
        </p>

        <div className="cta-group reveal" data-delay="240">
          <a href="#form" className="btn-primary js-magnetic">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <span>Book Your Free Assessment</span>
          </a>
          <a href="#training" className="btn-ghost">
            See Services
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <p className="free-badge reveal" data-delay="300">Includes InBody scan · Zero commitment · Zero initiation fees</p>

        <div className="stat-bar reveal" data-delay="380">
          <div className="stat">
            <div className="stat-number" data-count="12">0</div>
            <div className="stat-label">Elite Coaches</div>
          </div>
          <div className="stat">
            <div className="stat-number" data-count="10">0</div>
            <div className="stat-label">Max Group Size</div>
          </div>
          <div className="stat">
            <div className="stat-number">5★</div>
            <div className="stat-label">Avg. Rating</div>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="dashboard" id="dashPanel" aria-label="Top Profiles of the Month carousel" tabIndex={0}>
          <div className="carousel-title">Top Profiles of the Month</div>
          <div className="carousel-nav">
            <button className="carousel-arrow" id="carouselPrev" aria-label="Previous profile">&#8249;</button>
            <div className="carousel-dots" id="carouselDots"></div>
            <button className="carousel-arrow" id="carouselNext" aria-label="Next profile">&#8250;</button>
          </div>

          <div className="dash-inner" id="dashInner">
            <div className="dash-header">
              <div className="dash-athlete">
                <div className="dash-avatar" id="dashAvatar">MT</div>
                <div>
                  <div className="dash-name" id="dashName">Marcus T.</div>
                  <div className="dash-cycle" id="dashCycle">12-Week Transformation</div>
                </div>
              </div>
              <div className="dash-badge" id="dashBadge">Week 12</div>
            </div>

            <div className="metric-row" id="m1">
              <div className="metric-top">
                <span className="metric-label">Body Fat</span>
                <span className="metric-delta" id="m1Delta">▼ −6.4%</span>
              </div>
              <div className="metric-values">
                <span className="metric-before" id="m1Before">24.1</span>
                <span className="metric-arrow">→</span>
                <span className="metric-after" id="m1After">17.7</span>
                <span className="metric-unit">%</span>
              </div>
              <div className="metric-track"><div className="metric-fill blue" id="m1Fill" data-width="73"></div></div>
            </div>

            <div className="metric-row" id="m2">
              <div className="metric-top">
                <span className="metric-label">Lean Mass</span>
                <span className="metric-delta" id="m2Delta">▲ +4.8 kg</span>
              </div>
              <div className="metric-values">
                <span className="metric-before" id="m2Before">71.2</span>
                <span className="metric-arrow">→</span>
                <span className="metric-after" id="m2After">76.0</span>
                <span className="metric-unit">kg</span>
              </div>
              <div className="metric-track"><div className="metric-fill green" id="m2Fill" data-width="82"></div></div>
            </div>

            <div className="metric-row" id="m3">
              <div className="metric-top">
                <span className="metric-label">VO₂ Max</span>
                <span className="metric-delta" id="m3Delta">▲ +11.2</span>
              </div>
              <div className="metric-values">
                <span className="metric-before" id="m3Before">47.2</span>
                <span className="metric-arrow">→</span>
                <span className="metric-after" id="m3After">58.4</span>
                <span className="metric-unit">ml/kg/min</span>
              </div>
              <div className="metric-track"><div className="metric-fill white" id="m3Fill" data-width="88"></div></div>
            </div>

            <div className="timeline-strip" id="tlStrip">
              <span className="tl-label">Week 1</span>
              <div className="tl-line"></div>
              <div className="tl-dot past"></div>
              <div className="tl-line"></div>
              <div className="tl-dot past"></div>
              <div className="tl-line"></div>
              <div className="tl-dot past"></div>
              <div className="tl-line"></div>
              <div className="tl-dot past"></div>
              <div className="tl-line"></div>
              <div className="tl-dot past"></div>
              <div className="tl-line"></div>
              <div className="tl-dot active"></div>
              <div className="tl-line"></div>
              <span className="tl-label end" id="tlEnd">Week 12</span>
            </div>

            <p className="dash-footnote" id="dashFootnote">Real results · InBody-verified · 12 weeks</p>
          </div>
        </div>
      </div>
    </section>
  );
}
