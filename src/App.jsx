import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Activity, Code, Mail, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { profile, projects, education, certifications, hackathons } from './data/portfolio';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './App.css';

function Particles() {
  const count = 3000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorArray = [
    new THREE.Color('#0A192F'),
    new THREE.Color('#00A3FF'),
    new THREE.Color('#22D3EE')
  ];

  for (let i = 0; i < count; i++) {
    const r = 30 + Math.random() * 30;
    const theta = Math.random() * Math.PI * 2;
    positions[i * 3] = r * Math.cos(theta);
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = r * Math.sin(theta);

    const color = colorArray[Math.floor(Math.random() * colorArray.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const pointsRef = useRef();

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function ParticlesBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 40], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  );
}

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        // Slight delay on ring for smooth trailing effect
        setTimeout(() => {
          if (ringRef.current) {
            ringRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          }
        }, 50);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="custom-cursor">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}

export default function App() {
  const [expandedProject, setExpandedProject] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="app-container">
      <CustomCursor />
      <div className="bg-image" />
      <div className="bg-overlay" />
      <ParticlesBackground />
      
      {/* HERO SECTION */}
      <div className="hero-section">
      
      {/* LEFT COLUMN */}
      <motion.div 
        className="left-col"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="logo-area">
          <div className="logo-icon">S</div>
          <span className="logo-text">Siddhartha</span>
        </div>

        <div className="hero-text-content">
          <div className="pill-badge">
            <span style={{ color: '#fff' }}>✦</span>
            {profile.role}
          </div>
          
          <h1 className="main-title">
            CRAFTING<br />
            INTELLIGENT<br />
            SYSTEMS
          </h1>
          
          <p className="sub-desc">
            {profile.summary}
          </p>
        </div>

        <div className="scroll-indicator">
          SCROLL TO EXPLORE
        </div>
      </motion.div>

      {/* CENTER COLUMN */}
      <motion.div 
        className="hero-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img src="./hero-1.png" alt={profile.name} className="hero-photo" />
        
        <motion.button 
          className="explore-btn" 
          onClick={() => scrollToSection('work-section')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play size={24} fill="currentColor" />
          <span>Explore<br/>Projects</span>
        </motion.button>
      </motion.div>

      {/* RIGHT COLUMN */}
      <motion.div 
        className="right-col"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className="header-actions">
          <motion.button 
            onClick={() => scrollToSection('contact-section')} 
            className="btn-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.button>
        </div>

        <div className="glass-cards-container">
          
          {/* Card 1: Core Focus */}
          <motion.div className="glass-card" whileHover={{ y: -5 }}>
            <div className="card-header">
              <div className="card-title">
                <Activity size={16} className="card-icon" />
                <span>Core Focus</span>
              </div>
              <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.6rem', borderRadius: '100px' }}>
                Active
              </span>
            </div>
            <p className="card-desc">
              Building resilient, distributed architectures and AI-driven workflows.
            </p>
            <div className="chart-placeholder">
              <div className="chart-line" />
              <span className="chart-label">Generative AI</span>
            </div>
          </motion.div>

          {/* Card 2: Technical Stack */}
          <motion.div className="glass-card" whileHover={{ y: -5 }}>
            <div className="card-header">
              <div className="card-title">
                <Code size={16} className="card-icon" />
                <span>Primary Stack</span>
              </div>
            </div>
            <p className="card-desc">
              Event-driven real-time data flows and cross-platform applications.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Node / React</span>
                <span className="stat-value">95%</span>
              </div>
              <div className="stat-visual" />
              <div className="stat-item" style={{ textAlign: 'right' }}>
                <span className="stat-label">System Design</span>
                <span className="stat-value">90%</span>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
      </div> {/* End hero-section */}

      {/* CONTENT SECTIONS (Scrollable) */}
      
      {/* Education Section */}
      <motion.section 
        className="content-section" 
        id="education-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <h2 className="section-heading">Foundation <span>&</span> Certs</h2>
        <div className="grid-2">
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--bg-gradient-mid)' }}>Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="timeline-item">
                <div className="timeline-date">{edu.year}</div>
                <h4 className="timeline-title">{edu.degree}</h4>
                <div className="timeline-org">{edu.institution}</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{edu.details}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--bg-gradient-mid)' }}>Certifications & Extras</h3>
            {certifications.map(c => (
              <div key={c.id} className="timeline-item">
                <div className="timeline-date">{c.date}</div>
                <h4 className="timeline-title">{c.title}</h4>
              </div>
            ))}
            <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Hackathons</h4>
            <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
              {hackathons.map((h, i) => (
                <li key={i} style={{ marginBottom: '0.8rem', fontSize: '0.85rem', color: 'var(--text-secondary)', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '-1rem', color: 'var(--bg-gradient-mid)' }}>•</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Projects Overview Section */}
      <motion.section 
        id="work-section" 
        className="content-section" 
        style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <h2 className="section-heading">Selected <span>Work</span></h2>
        <div className="grid-2" style={{ gridTemplateColumns: '1fr' }}>
          {projects.map(p => (
            <motion.div 
              key={p.id} 
              className="glass-card" 
              style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              onClick={() => setExpandedProject(expandedProject === p.id ? null : p.id)}
              whileHover={{ scale: 1.01 }}
              layout
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: '#00A3FF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {p.category}
                </span>
                {expandedProject === p.id ? <ChevronUp size={20} color="var(--text-secondary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
              </div>
              
              <motion.h3 layout="position" style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '1.4rem' }}>{p.title}</motion.h3>
              
              <motion.p layout="position" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.overview}</motion.p>
              
              <AnimatePresence>
                {expandedProject === p.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <h4 style={{ color: '#00A3FF', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>Key Highlights</h4>
                      <ul style={{ paddingLeft: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                        {p.highlights.map((h, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{h}</li>)}
                      </ul>
                      
                      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 250px' }}>
                          <h4 style={{ color: '#00A3FF', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>Architecture</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>{p.architecture}</p>
                        </div>
                        <div style={{ flex: '1 1 250px' }}>
                          <h4 style={{ color: '#00A3FF', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>Challenges</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>{p.challenges}</p>
                        </div>
                      </div>

                      {p.links && p.links.map((l, i) => (
                        <a key={i} href={l.href} style={{ display: 'inline-block', marginRight: '1rem', color: '#00A3FF', textDecoration: 'none', borderBottom: '1px solid #00A3FF', fontSize: '0.85rem' }}>
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div layout="position" className="tech-tags" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {p.tech.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact-section" 
        className="content-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUpVariant}
      >
        <h2 className="section-heading">Let's <span>Connect</span></h2>
        <div className="contact-grid">
          <a href={`mailto:${profile.email}`} className="contact-item">
            <div className="contact-icon"><Mail size={24} /></div>
            <div className="contact-info">
              <h4>Email</h4>
              <p>{profile.email}</p>
            </div>
          </a>
          <div className="contact-item">
            <div className="contact-icon"><MapPin size={24} /></div>
            <div className="contact-info">
              <h4>Location</h4>
              <p>{profile.location}</p>
            </div>
          </div>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-item">
            <div className="contact-icon"><Activity size={24} /></div>
            <div className="contact-info">
              <h4>LinkedIn</h4>
              <p>View Profile</p>
            </div>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="contact-item">
            <div className="contact-icon"><Code size={24} /></div>
            <div className="contact-info">
              <h4>GitHub</h4>
              <p>View Repos</p>
            </div>
          </a>
        </div>
      </motion.section>
    </div>
  );
}
