import { EnvelopeIcon, XIcon, InstagramIcon } from './SocialIcons.jsx';

const isDesktop = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const GMAIL_COMPOSE = 'https://mail.google.com/mail/?view=cm&fs=1&to=sudhirtiwari2209@gmail.com';

function handleGetInTouch(e) {
  if (isDesktop) {
    e.preventDefault();
    window.open(GMAIL_COMPOSE, '_blank', 'noopener');
  }
}

export default function Contact() {
  return (
    <section className="contact-section page-section" id="contact">
      <div className="contact-side"><span className="section-number">05</span><h2>CONTACT</h2><p>Let's connect and build something meaningful.</p></div>
      <div className="contact-main"><h2>Let's work together.</h2><div className="contact-details"><div><span className="social-label"><EnvelopeIcon /></span><a href="mailto:sudhirtiwari2209@gmail.com">sudhirtiwari2209@gmail.com</a></div><div><span className="social-label"><XIcon /></span><a href="https://x.com/Sudhir0922?s=20" target="_blank" rel="noreferrer">x.com/Sudhir0922</a></div><div><span className="social-label"><InstagramIcon /></span><a href="https://www.instagram.com/this_sudhirtiwari?psln=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer">instagram.com/this_sudhirtiwari</a></div></div><a className="contact-button" href="mailto:sudhirtiwari2209@gmail.com" onClick={handleGetInTouch}>GET IN TOUCH <span>→</span></a></div>
      <footer><span>SUDHIR TIWARI&nbsp; / &nbsp;PORTFOLIO 2026</span><span>DEORIA, UTTAR PRADESH, INDIA&nbsp; / &nbsp;OPEN TO RELOCATION</span></footer>
    </section>
  );
}
