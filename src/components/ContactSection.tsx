import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    emailjs.init({ publicKey: "CAVxDqIEUmgoDxzVZ" });
  }, []);

  const handleSubmit = () => {
    const fnameEl = document.getElementById('fname') as HTMLInputElement;
    const lnameEl = document.getElementById('lname') as HTMLInputElement;
    const emailEl = document.getElementById('email') as HTMLInputElement;
    const phoneEl = document.getElementById('phone') as HTMLInputElement;
    const goalEl = document.getElementById('goal') as HTMLSelectElement;

    const fname = fnameEl.value.trim();
    const lname = lnameEl.value.trim();
    const email = emailEl.value.trim().toLowerCase();
    
    let phoneRaw = phoneEl.value;
    const phone = phoneRaw.replace(/[^\d+]/g, ''); 
    
    const goal = goalEl.value;

    const invalids = [
      { el: fnameEl, val: fname },
      { el: lnameEl, val: lname },
      { el: emailEl, val: email },
      { el: goalEl,  val: goal  }
    ].filter(f => !f.val);

    if (invalids.length) {
      invalids.forEach(f => {
        const el = f.el;
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
            { duration: 320, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }
          );
        }
        const clear = () => { 
          el.style.borderColor = ''; 
          el.removeEventListener('input', clear); 
          el.removeEventListener('change', clear); 
        };
        el.addEventListener('input',  clear);
        el.addEventListener('change', clear);
      });
      return; 
    }

    setStatus('submitting');

    const templateParams = {
      fname: fname,
      lname: lname,
      email: email,
      phone: phone || "No proporcionado",
      goal: goal
    };

    emailjs.send('service_pw0nme3', 'template_8y6tblu', templateParams)
      .then(function() {
        if (!prefersReducedMotion && formRef.current && successRef.current) {
          formRef.current.animate(
            [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-12px)' }],
            { duration: 280, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', fill: 'forwards' }
          ).finished.then(() => {
            setStatus('success');
            if (successRef.current) {
              successRef.current.animate(
                [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
                { duration: 480, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
              );
            }
          });
        } else {
          setStatus('success');
        }
      }, function(error) {
        console.error("[Apex Form] Error de conexión al intentar procesar la solicitud.", error);
        alert("Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.");
        setStatus('idle');
      });
  };

  return (
    <section className="form-section" id="form">
      <div className="form-inner">
        <div>
          <p className="eyebrow reveal" data-delay="0" style={{ marginBottom: '1rem' }}>Free Performance Assessment</p>
          <h2 className="form-heading reveal" data-delay="60">Your First<br />Session<br /><span style={{ color: '#00BFFF' }}>Is Free.</span></h2>
          <p className="form-subhead reveal" data-delay="120">
            Book your complimentary <strong>InBody scan + movement assessment</strong> with an elite coach. No commitment. No initiation fees. Just results.
          </p>
          <ul className="features-list" id="featuresList">
            <li className="reveal-child"><span>InBody scan</span> — full body composition analysis</li>
            <li className="reveal-child"><span>Movement assessment</span> — biomechanical baseline</li>
            <li className="reveal-child"><span>Custom training roadmap</span> — built for your goals</li>
            <li className="reveal-child"><span>Zero pressure</span> — no sales pitch, ever</li>
          </ul>
        </div>

        <div>
          {status !== 'success' && (
            <div className="lead-form reveal" data-delay="0" id="leadForm" ref={formRef}>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="fname">First Name</label>
                  <input type="text" id="fname" name="fname" placeholder="Marcus" autoComplete="given-name" required />
                </div>
                <div className="field">
                  <label htmlFor="lname">Last Name</label>
                  <input type="text" id="lname" name="lname" placeholder="Torres" autoComplete="family-name" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="you@company.com" autoComplete="email" required />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" placeholder="+1 (305) 000-0000" autoComplete="tel" />
              </div>
              <div className="field">
                <label htmlFor="goal">Primary Goal</label>
                <select id="goal" name="goal" required defaultValue="">
                  <option value="" disabled>Select your focus</option>
                  <option value="performance">Athletic Performance</option>
                  <option value="body-comp">Body Composition</option>
                  <option value="recovery">Recovery & Longevity</option>
                  <option value="strength">Strength & Power</option>
                  <option value="conditioning">Conditioning</option>
                </select>
              </div>
              <button 
                type="button" 
                className="submit-btn js-magnetic" 
                id="submitBtn" 
                onClick={handleSubmit}
                style={{ pointerEvents: status === 'submitting' ? 'none' : 'auto' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                <span>{status === 'submitting' ? 'Enviando...' : 'Claim Your Free Assessment'}</span>
              </button>
              <p className="form-legal">No commitment. Zero initiation fees. Flat-rate pricing — no hidden fees.</p>
            </div>
          )}

          <div 
            className="success-state" 
            id="successState" 
            ref={successRef}
            style={{ display: status === 'success' ? 'flex' : 'none' }}
          >
            <div className="success-icon" aria-hidden="true">✓</div>
            <h3>You're In.</h3>
            <p>The Apex Team will contact you within 24 hours to lock in your session.</p>
            <p className="free-badge" style={{ marginTop: '0.5rem' }}>Apex Performance Team</p>
          </div>
        </div>
      </div>
    </section>
  );
}
