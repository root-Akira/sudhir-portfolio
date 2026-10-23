import { useEffect, useState } from 'react';

const indexLinks = [
  { href: '#profile', label: '01' },
  { href: '#work', label: '02' },
  { href: '#practice', label: '03' },
  { href: '#projects', label: '04' },
  { href: '#contact', label: '05' },
];

export default function SideIndex() {
  const [activeId, setActiveId] = useState('#profile');

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return;
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId('#' + entry.target.id);
        }
      });
    }, { rootMargin: '-25% 0px -60% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="side-index" aria-label="Section index">
      {indexLinks.map((link) => (
        <a key={link.href} href={link.href} className={activeId === link.href ? 'active' : undefined}>{link.label}</a>
      ))}
    </aside>
  );
}
