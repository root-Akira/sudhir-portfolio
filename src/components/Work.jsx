import { useState } from 'react';

const roleInfo = {
  zuno: { company: 'Zuno', title: 'Campus Ambassador', date: 'Sep 2023 \u2013 Aug 2024', current: false, bullets: ['Represented the campus community', 'Shared opportunities and programme updates', 'Supported student engagement and outreach'] },
  campus: { company: 'Campustocrypto', title: 'Social Media and Event Manager', date: 'Aug 2024 \u2013 Apr 2025', current: false, bullets: ['Managed social media and event communication', 'Coordinated community activities and event delivery', 'Supported audience growth and engagement'] },
  patterns: { company: 'Patterns', title: 'Talent Acquisition Associate', date: 'May 2025 \u2013 Sep 2025', current: false, bullets: ['Supported recruitment and candidate coordination', 'Helped organise interview timelines', 'Maintained communication across the hiring process'] },
  cutm: { company: 'CUTM', title: 'Project Executive', date: 'Feb 2026 \u2013 Present', current: true, bullets: ['Coordinate academic projects and events', 'Manage timelines and execution', 'Work with students, faculty and external partners', 'Use data to track progress and outcomes'] },
  avalanche: { company: 'Avalanche', title: 'Team1 Contributor', date: 'Jul 2026 \u2013 Present', current: true, bullets: ['Hosted two Avalanche blockchain events in 2026', 'Contributed to community engagement and ecosystem growth'] },
};

const years = ['2023', '2024', '2025', '2026'];

const months = ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'];

const timelineRows = [
  { role: 'zuno', name: 'Zuno', dates: 'Sep 2023 \u2013 Aug 2024' },
  { role: 'campus', name: 'Campustocrypto', dates: 'Aug 2024 \u2013 Apr 2025' },
  { role: 'patterns', name: 'Patterns', dates: 'May 2025 \u2013 Sep 2025' },
  { role: 'cutm', name: 'CUTM', dates: 'Feb 2026 \u2013 Present' },
  { role: 'avalanche', name: 'Avalanche', dates: 'Jul 2026 \u2013 Present' },
];

export default function Work() {
  const [selectedRole, setSelectedRole] = useState('cutm');
  const role = roleInfo[selectedRole];

  return (
    <section className="section-row work-section page-section" id="work">
      <div className="section-heading"><span className="section-number">02</span><h2>WORK</h2><p>Roles, projects and key experiences over time.</p></div>
      <div className="section-content work-content">
        <div className="timeline" aria-label="Career timeline">
          <div className="timeline-years">{years.map((year) => <span key={year}>{year}</span>)}</div>
          <div className="timeline-months">{months.map((month, index) => <span key={month + index}>{month}</span>)}</div>
          {timelineRows.map((row) => (
            <button
              key={row.role}
              className={`timeline-row${row.role === selectedRole ? ' selected' : ''}`}
              onClick={() => setSelectedRole(row.role)}
              aria-pressed={row.role === selectedRole}
            >
              <span className="timeline-name">{row.name}</span>
              <span className="timeline-track"><i className={`bar ${row.role}`}></i></span>
              <span className="timeline-dates">{row.dates}</span>
            </button>
          ))}
          <p className="progress-label">IN PROGRESS <span>→</span></p>
        </div>
        <aside className="role-detail" aria-live="polite">
          <p className="detail-label">{role.current ? 'CURRENT ROLE' : 'PREVIOUS ROLE'}</p>
          <h3 id="detail-company">{role.company}</h3>
          <p className="detail-title" id="detail-title">{role.title}</p>
          <p className="detail-date" id="detail-date">{role.date}</p>
          <div className="detail-rule"></div>
          <ul id="detail-bullets">{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        </aside>
      </div>
    </section>
  );
}
