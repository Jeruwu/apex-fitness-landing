export default function ServicesSection() {
  return (
    <section id="training" className="services-section">
      <div className="services-inner">
        <div className="section-header reveal" data-delay="0">
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>What We Offer</p>
          <h2 className="section-title">Built Around<br /><span style={{ color: '#00BFFF' }}>Your Training.</span></h2>
          <p className="section-sub">Three programs. Zero fluff. Every one designed to deliver measurable results — not just keep you busy.</p>
        </div>

        <div className="services-grid" id="servicesGrid">
          <div className="service-card reveal-child js-tilt" data-delay="0">
            <div className="service-card-accent" style={{ background: 'linear-gradient(135deg,rgba(0,191,255,0.18),transparent 70%)' }}></div>
            <div className="service-icon-wrap" style={{ borderColor: 'rgba(0,191,255,0.25)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4v16M18 4v16M6 12h12M3 8h3M18 8h3M3 16h3M18 16h3"/></svg>
            </div>
            <div className="service-tag" style={{ color: '#00BFFF', borderColor: 'rgba(0,191,255,0.2)' }}>Personal Training</div>
            <h3 className="service-name">Elite 1-on-1<br />Coaching</h3>
            <p className="service-desc">Data-driven programming built around your exact biomechanics. Every session tracked, every variable optimized.</p>

            <div className="service-divider"></div>
            <ul className="service-features">
              <li>InBody baseline on Day 1</li>
              <li>Custom programming — updated weekly</li>
              <li>Access via member app</li>
            </ul>
            <a href="#form" className="service-cta">Start Training</a>
          </div>

          <div className="service-card service-card--featured reveal-child js-tilt" data-delay="80">
            <div className="service-card-accent" style={{ background: 'linear-gradient(135deg,rgba(0,191,255,0.22),rgba(57,255,20,0.08) 70%)' }}></div>
            <div className="featured-badge">Most Popular</div>
            <div className="service-icon-wrap" style={{ borderColor: 'rgba(0,191,255,0.4)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/><path d="M7.5 4.5l9 0"/></svg>
            </div>
            <div className="service-tag" style={{ color: '#00BFFF', borderColor: 'rgba(0,191,255,0.2)' }}>Group Conditioning</div>
            <h3 className="service-name">High-Intensity<br />Group Sessions</h3>
            <p className="service-desc">Capped at 10 people. The energy of a group. The attention of a personal coach. Maximum output, zero compromise.</p>

            <div className="service-divider" style={{ background: 'rgba(0,191,255,0.15)' }}></div>
            <ul className="service-features">
              <li>Capped at 10 athletes</li>
              <li>Coach-led every session</li>
              <li>Flexible scheduling</li>
            </ul>
            <a href="#form" className="service-cta service-cta--primary">Claim Your Spot</a>
          </div>

          <div className="service-card reveal-child js-tilt" data-delay="160">
            <div className="service-card-accent" style={{ background: 'linear-gradient(135deg,rgba(57,255,20,0.12),transparent 70%)' }}></div>
            <div className="service-icon-wrap" style={{ borderColor: 'rgba(57,255,20,0.25)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 12s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/></svg>
            </div>
            <div className="service-tag" style={{ color: '#39FF14', borderColor: 'rgba(57,255,20,0.2)' }}>Recovery Zone</div>
            <h3 className="service-name">Recovery<br />& Longevity</h3>
            <p className="service-desc">Cold plunge. Infrared sauna. The recovery protocols used by pro athletes — available to you every day.</p>

            <div className="service-divider"></div>
            <ul className="service-features">
              <li>Cold plunge & infrared sauna</li>
              <li>Unlimited access</li>
              <li>Zero initiation fees</li>
            </ul>
            <a href="#form" className="service-cta">Access Recovery</a>
          </div>
        </div>

        <div className="diff-strip reveal" data-delay="0">
          <div className="diff-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Flat-rate pricing. No hidden fees.</span>
          </div>
          <div className="diff-sep" aria-hidden="true">·</div>
          <div className="diff-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Zero initiation fees. Cancel anytime.</span>
          </div>
          <div className="diff-sep" aria-hidden="true">·</div>
          <div className="diff-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00BFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Limited memberships. Always uncrowded.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
