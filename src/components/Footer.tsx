export default function Footer() {
  return (
    <>
      <section className="final-cta-section">
        <div className="final-cta-inner reveal" data-delay="0">
          <p className="eyebrow" style={{ marginBottom: '1rem', justifyContent: 'center' }}>Downtown Miami · Brickell · Opening 2026</p>
          <h2 className="final-cta-title">Your Peak<br />Performance<br /><span style={{ color: '#00BFFF' }}>Starts Here.</span></h2>
          <p className="final-cta-sub">Book your free assessment. Meet your coach. Get your data. No commitment — just results.</p>
          <div className="final-cta-actions">
            <a href="#form" className="btn-primary js-magnetic" style={{ fontSize: '0.8rem', padding: '1.1rem 2.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              <span>Book Your Free Assessment</span>
            </a>
            <p className="final-cta-legal">Includes InBody scan · Zero commitment · Zero initiation fees</p>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="nav-logo" style={{ fontSize: '2rem' }}>APEX<span style={{ color: '#00BFFF' }}>.</span></a>
              <p className="footer-tagline">Build elite performance.<br />Eliminate excuses.</p>
              <a href="#form" className="btn-primary js-magnetic" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                <span>Book Free Assessment</span>
              </a>
            </div>
            <div className="footer-links-col">
              <p className="footer-col-label">Training</p>
              <a href="#training">Elite Personal Training</a>
              <a href="#training">Group Conditioning</a>
              <a href="#training">Recovery Zone</a>
            </div>
            <div className="footer-links-col">
              <p className="footer-col-label">Facility</p>
              <a href="#">Downtown Miami · Brickell</a>
              <a href="#">Member App</a>
              <a href="#form">Book Assessment</a>
            </div>
            <div className="footer-links-col">
              <p className="footer-col-label">Contact</p>
              <a href="mailto:team@apexfitnessmia.com">team@apexfitnessmia.com</a>
              <a href="tel:+13050000000">+1 (305) 000-0000</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copy">© 2026 Apex Fitness Miami. All rights reserved.</p>
            <p className="footer-sig">Apex Performance Team</p>
          </div>
        </div>
      </footer>
    </>
  );
}
