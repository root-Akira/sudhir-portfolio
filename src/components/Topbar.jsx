import { useEffect, useState } from 'react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function scrambleChar() {
  return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
}

function ScrambleText({ text }) {
  const [display, setDisplay] = useState(() => text.split('').map((ch) => (ch === ' ' ? ' ' : scrambleChar())).join(''));

  useEffect(() => {
    let frame = 0;
    const totalFrames = 28;
    const interval = setInterval(() => {
      frame += 1;
      const settled = Math.floor((frame / totalFrames) * (text.length + 1));
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(interval);
        return;
      }
      setDisplay(text.split('').map((ch, index) => (index < settled || ch === ' ' ? ch : scrambleChar())).join(''));
    }, 45);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
}

const navLinks = [
  { href: '#profile', label: '01\u00a0 PROFILE' },
  { href: '#work', label: '02\u00a0 WORK' },
  { href: '#practice', label: '03\u00a0 PRACTICE' },
  { href: '#projects', label: '04\u00a0 PROJECTS' },
  { href: '#contact', label: '05\u00a0 CONTACT' },
];

export default function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <a className="wordmark" href="#top"><ScrambleText text="SUDHIR TIWARI" /></a>
      <nav aria-label="Main navigation" className={open ? 'open' : undefined}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
        ))}
      </nav>
      <button
        className="menu-toggle"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        MENU <span>{open ? '\u2212' : '+'}</span>
      </button>
    </header>
  );
}
