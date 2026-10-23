const projects = [
  { number: '01', title: 'Diamond Price Prediction', description: <>Built a model to predict diamond prices using key features<br className="desktop-break" /> and compared multiple algorithms for best performance.</>, method: 'Random Forest' },
  { number: '02', title: 'Food Delivery Time Prediction', description: <>Built a deep learning model using LSTM to predict food delivery<br className="desktop-break" /> time based on historical data and key factors.</>, method: 'LSTM' },
  { number: '03', title: 'Email Spam Classifier', description: <>Developed a text classification model to detect spam emails<br className="desktop-break" /> using NLP techniques and linear models.</>, method: 'NLP with Linear Models' },
];

export default function Projects() {
  return (
    <section className="section-row page-section" id="projects">
      <div className="section-heading"><span className="section-number">04</span><h2>PROJECTS</h2><p>Selected technical work and practice projects.</p></div>
      <div className="section-content project-list">
        {projects.map((project) => (
          <a className="project-entry" href="#contact" key={project.number}>
            <span className="project-number">{project.number}</span>
            <div className="project-main">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <div className="project-method"><span>METHOD</span><strong>{project.method}</strong></div>
            <span className="project-arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
