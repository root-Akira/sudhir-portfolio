import { useEffect, useRef, useState } from 'react';
import DinoGame from './DinoGame.jsx';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <section className="hero page-section" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">PROJECT COORDINATION / DATA</p>
        <h1 id="hero-title">Sudhir<br />Tiwari</h1>
        <p className="location">Deoria, Uttar Pradesh, India&nbsp; / &nbsp;Open to relocation</p>
        <DinoGame />
        <p className="positioning">I keep academic projects on schedule,<br className="desktop-break" /> and I read the numbers while doing it.</p>
      </div>
      <div className="hero-portrait-wrap">
        <img
          ref={imgRef}
          className={`hero-portrait${loaded ? ' is-loaded' : ''}`}
          src="/sudhir-portrait.jpg"
          alt="Black and white portrait of Sudhir Tiwari"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
        <div className="availability-stamp">OPEN TO<br />INTERNATIONAL<br />ROLES</div>
      </div>
    </section>
  );
}
