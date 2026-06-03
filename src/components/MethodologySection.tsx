export default function MethodologySection() {
  return (
    <section id="methodology" className="method-section">
      <div className="method-inner">
        <div className="method-left reveal" data-delay="0">
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>How It Works</p>
          <h2 className="section-title">Four Steps.<br /><span style={{ color: '#00BFFF' }}>Zero Guesswork.</span></h2>
          <p className="section-sub">Every Apex athlete follows the same evidence-based process. From your first scan to your peak performance — nothing is left to chance.</p>
          <a href="#form" className="btn-primary js-magnetic" style={{ marginTop: '2.5rem', display: 'inline-flex' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <span>Start With a Free Assessment</span>
          </a>
        </div>

        <div className="method-steps" id="methodSteps">
          <div className="method-step reveal-child">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3 className="step-title">InBody Assessment</h3>
              <p className="step-desc">Your first session is free. We map your body composition, movement patterns, and biomechanical baselines. No assumptions, only data.</p>
              <div className="step-tag">Free · No commitment</div>
            </div>
          </div>

          <div className="method-step reveal-child">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3 className="step-title">Custom Programming</h3>
              <p className="step-desc">Your elite coach builds a program around your exact data — not a template. Updated weekly based on your tracked performance.</p>
              <div className="step-tag">Data-driven · Weekly updates</div>
            </div>
          </div>

          <div className="method-step reveal-child">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3 className="step-title">Train & Track</h3>
              <p className="step-desc">Every session logged in your member app. Every variable monitored. You see your progress in real numbers — not just how you feel.</p>
              <div className="step-tag">Member app · Real-time tracking</div>
            </div>
          </div>

          <div className="method-step reveal-child">
            <div className="step-number">04</div>
            <div className="step-content">
              <h3 className="step-title">Recover & Optimize</h3>
              <p className="step-desc">Cold plunge and infrared sauna access keeps your recovery as dialed as your training. Performance is built between sessions too.</p>
              <div className="step-tag">Cold plunge · Infrared sauna</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
