export default function PricingSection() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="pricing-inner">
        <div className="pricing-header reveal" data-delay="0">
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Transparent Pricing</p>
          <h2 className="section-title">Flat Rate.<br /><span style={{ color: '#00BFFF' }}>No Hidden Fees.</span></h2>
          <p className="section-sub">No initiation fees. No asterisks. What you see is what you pay.</p>
        </div>

        <div className="pricing-grid" id="pricingGrid">
          <div className="price-card reveal-child">
            <div className="price-card-top">
              <div className="price-tier-label">Recovery Zone</div>
              <div className="price-amount-wrap">
                <span className="price-currency">$</span>
                <span className="price-num">89</span>
                <span className="price-per">/mo</span>
              </div>
              <p className="price-desc">Cold plunge + infrared sauna. Unlimited access. The recovery stack used by pro athletes.</p>
            </div>
            <ul className="price-includes">
              <li>Cold plunge — unlimited</li>
              <li>Infrared sauna — unlimited</li>
              <li>Zero initiation fee</li>
              <li>Cancel anytime</li>
            </ul>
            <a href="#form" className="service-cta" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>Get Access</a>
          </div>

          <div className="price-card price-card--featured reveal-child">
            <div className="price-featured-label">Most Popular</div>
            <div className="price-card-top">
              <div className="price-tier-label" style={{ color: '#00BFFF' }}>Group Conditioning</div>
              <div className="price-amount-wrap">
                <span className="price-currency">$</span>
                <span className="price-num">199</span>
                <span className="price-per">/mo</span>
              </div>
              <p className="price-desc">High-intensity sessions capped at 10. Coach attention without the 1-on-1 price tag.</p>
            </div>
            <ul className="price-includes">
              <li>Unlimited group sessions</li>
              <li>Max 10 athletes per session</li>
              <li>Coach-led every session</li>
              <li>Member app access</li>
              <li>Zero initiation fee</li>
            </ul>
            <a href="#form" className="service-cta service-cta--primary" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>Claim Your Spot</a>
          </div>

          <div className="price-card reveal-child">
            <div className="price-card-top">
              <div className="price-tier-label">Elite Personal Training</div>
              <div className="price-amount-wrap">
                <span className="price-currency">$</span>
                <span className="price-num">150</span>
                <span className="price-per">/session</span>
              </div>
              <p className="price-desc">1-on-1 with an elite coach. Fully customized programming. Maximum accountability.</p>
            </div>
            <ul className="price-includes">
              <li>Full biomechanical assessment</li>
              <li>Custom weekly programming</li>
              <li>Direct coach access</li>
              <li>Progress tracking via app</li>
              <li>InBody scans included</li>
            </ul>
            <a href="#form" className="service-cta" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>Book a Session</a>
          </div>
        </div>

        <div className="guarantee-strip reveal" data-delay="0">
          <div className="guarantee-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Zero initiation fees — ever</span>
          </div>
          <div className="guarantee-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Flat-rate pricing — no surprises</span>
          </div>
          <div className="guarantee-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>First assessment free — no commitment</span>
          </div>
          <div className="guarantee-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Cancel anytime — no lock-in</span>
          </div>
        </div>
      </div>
    </section>
  );
}
