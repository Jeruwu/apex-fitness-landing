export default function ReviewsSection() {
  return (
    <>
      <div className="review-strip" aria-label="Client reviews">
        <div className="ticker-track">
          <div className="ticker-item">
            <span className="ticker-stars">★★★★★</span>
            <span className="ticker-quote">"The data-driven approach to my training broke a 2-year plateau."</span>
            <span className="ticker-author">— Marcus T., 34</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-stars">★★★★★</span>
            <span className="ticker-quote">"Capped at 10 people. The coaches actually watch your form."</span>
            <span className="ticker-author">— Sarah J., 29</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-stars">★★★★★</span>
            <span className="ticker-quote">"They mapped my biomechanical imbalances before I touched a weight."</span>
            <span className="ticker-author">— David R., 42</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-stars">★★★★★</span>
            <span className="ticker-quote">"Apex isn't just a facility. It's a high-performance center."</span>
            <span className="ticker-author">— Elena V., 31</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-stars" style={{ color: '#39FF14' }}>★★★★</span>
            <span className="ticker-quote">"The cold plunges and infrared saunas make recovery immediate."</span>
            <span className="ticker-author">— Michael C., 38</span>
          </div>
          {/* Duplicate for infinite ticker */}
          <div className="ticker-item">
            <span className="ticker-stars">★★★★★</span>
            <span className="ticker-quote">"The data-driven approach to my training broke a 2-year plateau."</span>
            <span className="ticker-author">— Marcus T., 34</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-stars">★★★★★</span>
            <span className="ticker-quote">"Capped at 10 people. The coaches actually watch your form."</span>
            <span className="ticker-author">— Sarah J., 29</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-stars">★★★★★</span>
            <span className="ticker-quote">"They mapped my biomechanical imbalances before I touched a weight."</span>
            <span className="ticker-author">— David R., 42</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-stars">★★★★★</span>
            <span className="ticker-quote">"Apex isn't just a facility. It's a high-performance center."</span>
            <span className="ticker-author">— Elena V., 31</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-stars" style={{ color: '#39FF14' }}>★★★★</span>
            <span className="ticker-quote">"The cold plunges and infrared saunas make recovery immediate."</span>
            <span className="ticker-author">— Michael C., 38</span>
          </div>
        </div>
      </div>

      <section id="reviews" className="reviews-section">
        <div className="reviews-inner">
          <div className="reviews-header reveal" data-delay="0">
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Real Results</p>
            <h2 className="section-title">What Our<br /><span style={{ color: '#00BFFF' }}>Athletes Say.</span></h2>
          </div>

          <div className="reviews-grid" id="reviewsGrid">
            <div className="review-card reveal-child">
              <div className="review-stars">★★★★★</div>
              <blockquote className="review-quote">"The data-driven approach to my training broke a 2-year plateau. I saw measurable strength gains within the first six weeks."</blockquote>
              <div className="review-author">
                <div className="review-avatar" style={{ background: 'linear-gradient(135deg,rgba(0,191,255,0.3),rgba(0,191,255,0.05))' }}>MT</div>
                <div>
                  <div className="review-name">Marcus T.</div>
                  <div className="review-meta">34 · Financial Director</div>
                </div>
              </div>
            </div>

            <div className="review-card review-card--accent reveal-child">
              <div className="review-stars">★★★★★</div>
              <blockquote className="review-quote">"Capped at 10 people. The coaches actually watch your form. Coming from Equinox, the difference in attention is night and day."</blockquote>
              <div className="review-author">
                <div className="review-avatar" style={{ background: 'linear-gradient(135deg,rgba(57,255,20,0.3),rgba(57,255,20,0.05))' }}>SJ</div>
                <div>
                  <div className="review-name">Sarah J.</div>
                  <div className="review-meta">29 · Attorney</div>
                </div>
              </div>
            </div>

            <div className="review-card reveal-child">
              <div className="review-stars">★★★★★</div>
              <blockquote className="review-quote">"They mapped my biomechanical imbalances before I touched a weight. That baseline changed everything about how I train."</blockquote>
              <div className="review-author">
                <div className="review-avatar" style={{ background: 'linear-gradient(135deg,rgba(0,191,255,0.3),rgba(0,191,255,0.05))' }}>DR</div>
                <div>
                  <div className="review-name">David R.</div>
                  <div className="review-meta">42 · CEO</div>
                </div>
              </div>
            </div>

            <div className="review-card reveal-child">
              <div className="review-stars">★★★★★</div>
              <blockquote className="review-quote">"Apex isn't just a facility. It's a high-performance center. The app tracking keeps me accountable between sessions."</blockquote>
              <div className="review-author">
                <div className="review-avatar" style={{ background: 'linear-gradient(135deg,rgba(57,255,20,0.2),rgba(0,191,255,0.1))' }}>EV</div>
                <div>
                  <div className="review-name">Elena V.</div>
                  <div className="review-meta">31 · Surgeon</div>
                </div>
              </div>
            </div>

            <div className="review-card reveal-child">
              <div className="review-stars" style={{ color: '#39FF14' }}>★★★★<span style={{ color: 'rgba(255,255,255,0.15)' }}>★</span></div>
              <blockquote className="review-quote">"The cold plunges and infrared saunas make recovery immediate. I train harder because I know I'll bounce back faster."</blockquote>
              <div className="review-author">
                <div className="review-avatar" style={{ background: 'linear-gradient(135deg,rgba(57,255,20,0.3),rgba(57,255,20,0.05))' }}>MC</div>
                <div>
                  <div className="review-name">Michael C.</div>
                  <div className="review-meta">38 · Pro Athlete</div>
                </div>
              </div>
            </div>

            <div className="review-card review-card--cta reveal-child">
              <div className="review-cta-inner">
                <div className="review-cta-stat">
                  <span className="review-cta-number">5.0</span>
                  <div className="review-cta-stars">★★★★★</div>
                  <span className="review-cta-label">Average Rating</span>
                </div>
                <p className="review-cta-copy">Join athletes who train smarter — not harder.</p>
                <a href="#form" className="service-cta service-cta--primary" style={{ width: '100%', justifyContent: 'center' }}>Book Free Assessment</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
