const columns = [
  { number: '01', title: 'ACADEMIC AND OPERATIONS', items: ['Event Planning and Execution', 'Project Coordination', 'Workshop and Hackathon Management', 'Community Management', 'University and Industry Collaboration'] },
  { number: '02', title: 'TECHNICAL AND DATA', items: ['Python for Data Analysis', 'Machine Learning Basics', 'Data Analysis and Reporting', 'Problem Solving', 'Linux and System Administration'] },
  { number: '03', title: 'RECRUITMENT AND MARKETING', items: ['Talent Acquisition Support', 'Social Media and Content', 'Community Building', 'Partnership Outreach', 'Event Promotion'] },
];

export default function Practice() {
  return (
    <section className="section-row page-section" id="practice">
      <div className="section-heading"><span className="section-number">03</span><h2>PRACTICE</h2><p>Skills and areas I work on.</p></div>
      <div className="section-content practice-columns">
        {columns.map((column) => (
          <div className="practice-column" key={column.number}>
            <h3><span>{column.number}</span> {column.title}</h3>
            {column.items.map((item) => <p key={item}>{item}</p>)}
          </div>
        ))}
      </div>
    </section>
  );
}
