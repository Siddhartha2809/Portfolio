import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Terminal, Database, Cloud, Code2, Shield, BrainCircuit, Activity, Code, Mail } from 'lucide-react';
import { profile, skills, projects, education, certifications } from './data/portfolio';
import './App.css';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function App() {
  const [expandedProject, setExpandedProject] = useState(null);

  const getSkillIcon = (id) => {
    switch(id) {
      case 'generative-ai': return <BrainCircuit size={24} />;
      case 'python': return <Terminal size={24} />;
      case 'cloud-devops': return <Cloud size={24} />;
      case 'databases': return <Database size={24} />;
      case 'apis': return <Code2 size={24} />;
      case 'security': return <Shield size={24} />;
      default: return <Terminal size={24} />;
    }
  };

  return (
    <div className="app-wrapper">
      <div className="animated-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      {/* Navigation */}
      <motion.nav 
        className="nav-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="logo">{profile.name.split(' ')[0]}</div>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </motion.nav>

      {/* Hero */}
      <motion.section 
        className="hero"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="hero-content">
          <h1>{profile.role}</h1>
          <p>{profile.summary}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Get in touch</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn-secondary">
              <Code size={18} /> GitHub
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <div className="glow-orb" />
          {/* Using hero-2.jpg as it fits the professional tone well */}
          <img src="./hero-2.jpg" alt={profile.name} className="hero-image" />
        </div>
      </motion.section>

      {/* Skills (Bento Grid) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="section-title">Core Competencies</h2>
        <div className="bento-grid">
          {skills.slice(0, 5).map((skill, i) => (
            <div key={skill.id} className={`bento-item ${i === 0 ? 'bento-large' : ''}`}>
              <div className="bento-icon">
                {getSkillIcon(skill.id)}
              </div>
              <h3 className="bento-title">{skill.label}</h3>
              <p className="bento-desc">{skill.detail}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section 
        id="work"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
      >
        <h2 className="section-title">Selected Work</h2>
        <div className="projects-stack">
          {projects.map((p) => (
            <motion.div 
              key={p.id} 
              className="project-card"
              onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
              layout
            >
              <div className="project-header">
                <div>
                  <span className="project-category">{p.category}</span>
                  <motion.h3 layout="position" className="project-title">{p.title}</motion.h3>
                </div>
                <span className="project-year">{p.year}</span>
              </div>
              
              <motion.p layout="position" className="project-overview">{p.overview}</motion.p>
              
              <motion.div layout="position" className="tech-stack">
                {p.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
              </motion.div>

              <AnimatePresence>
                {expandedProject === p.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="project-details">
                      <div className="detail-block">
                        <h4>Highlights</h4>
                        <ul>
                          {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                      </div>
                      <div className="detail-block">
                        <h4>Architecture</h4>
                        <p>{p.architecture}</p>
                        <h4 style={{ marginTop: '1.5rem' }}>Challenges</h4>
                        <p>{p.challenges}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer / Contact */}
      <motion.footer 
        id="contact"
        className="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="footer-text">
          <h2>Let's build something.</h2>
          <p>Currently open to new opportunities in {profile.location}, or remote roles globally.</p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h4>Connect</h4>
            <a href={`mailto:${profile.email}`}><Mail size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: '-3px' }}/>Email</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><Activity size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: '-3px' }}/>LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer"><Code size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: '-3px' }}/>GitHub</a>
          </div>
          <div className="link-group">
            <h4>Education</h4>
            {education.map(e => (
              <div key={e.id} style={{ marginBottom: '1rem' }}>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{e.degree}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{e.year}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.footer>

    </div>
  );
}
