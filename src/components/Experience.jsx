import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { profile, projects, skills, education, certifications, hackathons } from '../data/portfolio';

/* ═══════ UTILITIES ═══════ */

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(e0, e1, v) {
  const t = clamp01((v - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

function sectionOpacity(progress, start, end) {
  return smoothstep(start, start + 0.04, progress) * (1 - smoothstep(end - 0.04, end, progress));
}

function revealStyle(opacity) {
  return {
    opacity,
    filter: `blur(${(1 - opacity) * 12}px)`,
    pointerEvents: opacity > 0.4 ? 'auto' : 'none',
  };
}

/* Camera Z mapping: 6 sections */
const SECTION_Z = [0, -24, -48, -72, -96, -120];
function progressToZ(p) {
  return 14 + (SECTION_Z[5] - 14) * p;
}

/* ═══════ PARTICLE FIELD — 3000 particles ═══════ */

function ParticleField({ count = 3000 }) {
  const ref = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#0a1e3d'),
      new THREE.Color('#00A3FF'),
      new THREE.Color('#22D3EE'),
      new THREE.Color('#0a1628'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 30 + Math.random() * 40;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = (Math.random() - 0.5) * 260 - 40;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.003;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════ HERO SCULPTURE — Torus Knot ═══════ */

function HeroSculpture() {
  const ref = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * 0.08;
    ref.current.rotation.y = t * 0.12;
    if (materialRef.current) {
      materialRef.current.distort = 0.2 + Math.sin(t * 0.5) * 0.08;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={ref} position={[5.5, 0.5, SECTION_Z[0]]}>
        <torusKnotGeometry args={[2.2, 0.7, 256, 48, 2, 3]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#0a1e3d"
          roughness={0.1}
          metalness={0.98}
          distort={0.2}
          speed={1.2}
        />
      </mesh>
    </Float>
  );
}

/* ═══════ TECH SPHERE — Skills section ═══════ */

function TechSphere() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <mesh ref={ref} position={[-5.5, 0, SECTION_Z[1]]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <MeshDistortMaterial
          color="#0a2847"
          roughness={0.1}
          metalness={0.95}
          distort={0.35}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/* ═══════ PRISM — Education section ═══════ */

function Prism() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * 0.12;
    ref.current.rotation.y = t * 0.08;
    ref.current.rotation.z = t * 0.06;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.35}>
      <mesh ref={ref} position={[6, 0, SECTION_Z[2]]}>
        <octahedronGeometry args={[2.5, 0]} />
        <MeshDistortMaterial
          color="#0c1a3a"
          roughness={0.08}
          metalness={0.98}
          distort={0.15}
          speed={1}
        />
      </mesh>
    </Float>
  );
}

/* ═══════ ORBITAL — Projects section ═══════ */

function Orbital() {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.2;
      ringRef.current.rotation.x = 0.8;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.08} floatIntensity={0.3}>
      <group position={[-5, 0, SECTION_Z[3]]}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 1]} />
          <MeshDistortMaterial
            color="#081530"
            roughness={0.1}
            metalness={0.96}
            distort={0.25}
            speed={1.5}
          />
        </mesh>
        <mesh ref={ringRef}>
          <torusGeometry args={[3.5, 0.02, 16, 120]} />
          <meshStandardMaterial
            color="#00A3FF"
            emissive="#00A3FF"
            emissiveIntensity={1.5}
            transparent
            opacity={0.3}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ═══════ GATEWAY — Contact section ═══════ */

function Gateway() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outerRef.current) outerRef.current.rotation.z = t * 0.12;
    if (innerRef.current) innerRef.current.rotation.z = -t * 0.18;
  });

  return (
    <group position={[0, 0, SECTION_Z[5] - 8]}>
      <mesh ref={outerRef} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[4, 0.025, 16, 120]} />
        <meshStandardMaterial
          color="#00A3FF"
          emissive="#00A3FF"
          emissiveIntensity={2}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={innerRef} rotation={[-0.5, 0.3, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#22D3EE"
          emissive="#22D3EE"
          emissiveIntensity={2}
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#88ccff"
          emissive="#00A3FF"
          emissiveIntensity={4}
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ═══════ DATA STREAM — Decorative lines ═══════ */

function DataStream() {
  const geometry1 = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const v = new Float32Array([-20, -6, 10, 20, -6, -140]);
    geo.setAttribute('position', new THREE.BufferAttribute(v, 3));
    return geo;
  }, []);

  const geometry2 = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const v = new Float32Array([18, 8, 5, -18, 8, -130]);
    geo.setAttribute('position', new THREE.BufferAttribute(v, 3));
    return geo;
  }, []);

  return (
    <>
      <line geometry={geometry1}>
        <lineBasicMaterial color="#00A3FF" transparent opacity={0.06} depthWrite={false} />
      </line>
      <line geometry={geometry2}>
        <lineBasicMaterial color="#22D3EE" transparent opacity={0.04} depthWrite={false} />
      </line>
    </>
  );
}

/* ═══════ CAMERA ═══════ */

function CameraRig({ progress, pointer }) {
  useFrame((state) => {
    const targetZ = progressToZ(progress);
    const mouseX = pointer.current.x * 0.8;
    const mouseY = pointer.current.y * 0.5;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, mouseX, 3, state.delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, mouseY, 3, state.delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 3, state.delta);

    state.camera.lookAt(state.camera.position.x * 0.2, state.camera.position.y * 0.2, state.camera.position.z - 18);
  });

  return null;
}

/* ═══════ LIGHTING ═══════ */

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.06} color="#E8F1FF" />
      <directionalLight position={[8, 12, 8]} intensity={0.6} color="#0066cc" />
      <directionalLight position={[-8, -3, -5]} intensity={0.2} color="#22D3EE" />
      <directionalLight position={[0, 5, -15]} intensity={0.15} color="#E8F1FF" />

      <pointLight position={[5, 2, SECTION_Z[0]]} intensity={4} color="#00A3FF" distance={20} decay={2} />
      <pointLight position={[-5, 1, SECTION_Z[1]]} intensity={4} color="#22D3EE" distance={20} decay={2} />
      <pointLight position={[6, 1, SECTION_Z[2]]} intensity={4} color="#0088dd" distance={20} decay={2} />
      <pointLight position={[-5, 1, SECTION_Z[3]]} intensity={4} color="#00A3FF" distance={20} decay={2} />
      <pointLight position={[0, 1, SECTION_Z[4]]} intensity={4} color="#22D3EE" distance={20} decay={2} />
      <pointLight position={[0, 0, SECTION_Z[5] - 8]} intensity={6} color="#22D3EE" distance={25} decay={2} />
    </>
  );
}

/* ═══════ HTML OVERLAY — Sections ═══════ */

export function ProductSpecsOverlay({ progress, onProjectSelect }) {
  const heroOp = sectionOpacity(progress, 0, 0.14);
  const aboutOp = sectionOpacity(progress, 0.16, 0.30);
  const skillsOp = sectionOpacity(progress, 0.32, 0.46);
  const projOp = sectionOpacity(progress, 0.48, 0.64);
  const eduOp = sectionOpacity(progress, 0.66, 0.82);
  const contactOp = sectionOpacity(progress, 0.84, 1.0);

  return (
    <div className="sections-overlay">
      {/* ── HERO ── */}
      <div className="section section--hero" style={revealStyle(heroOp)}>
        <div className="section__card" style={{ maxWidth: '100%', display: 'flex', alignItems: 'center', gap: 'clamp(2rem, 5vw, 6rem)' }}>
          <div className="hero-content">
            <span className="hero-badge">✦ AI/ML Full Stack Engineer</span>
            <h1 className="hero-title">CRAFTING<br/>INTELLIGENT<br/>SYSTEMS</h1>
            <p className="hero-desc">{profile.summary}</p>
            <div className="hero-actions">
              <a href={`mailto:${profile.email}`} className="btn-primary" style={{ pointerEvents: heroOp > 0.4 ? 'auto' : 'none', textDecoration: 'none' }}>Let's Connect</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost" style={{ pointerEvents: heroOp > 0.4 ? 'auto' : 'none', textDecoration: 'none' }}>LinkedIn →</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo-wrapper">
              <img src="./hero-1.jpg" alt={profile.name} className="hero-photo" />
              <div className="hero-photo-glow" />
            </div>
            <div className="hero-stats">
              <div className="glass-stat"><span className="glass-stat__number">4+</span><span className="glass-stat__label">Projects</span></div>
              <div className="glass-stat"><span className="glass-stat__number">8+</span><span className="glass-stat__label">Technologies</span></div>
              <div className="glass-stat"><span className="glass-stat__number">AI/ML</span><span className="glass-stat__label">Specialist</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <div className="section section--right" style={revealStyle(aboutOp)}>
        <div className="section__card" style={{ textAlign: 'right' }}>
          <span className="section__label">About Me</span>
          <h2 className="section__title">Who I Am</h2>
          <div className="section__line" style={{ marginLeft: 'auto' }} />
          <p className="section__desc" style={{ marginLeft: 'auto' }}>
            I'm Siddhartha Panchakarla — an AI/ML Full Stack Engineer passionate about building production-grade systems that combine Generative AI, event-driven architecture, and resilient distributed design. Currently pursuing B.Tech in Computer Science, I bring real-world project experience in LLM integration, real-time data flows, and cross-platform application delivery.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
            <div className="glass-card" style={{ textAlign: 'left', maxWidth: '320px', flex: '1' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue)' }}>Location</span><br/>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{profile.location}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue)' }}>Education</span><br/>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>B.Tech CSE</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue)' }}>Focus</span><br/>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>AI/ML + Full Stack</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--blue)' }}>Status</span><br/>
                  <span style={{ fontSize: '0.9rem', color: 'var(--cyan)' }}>Available</span>
                </div>
              </div>
            </div>
            <img
              src="./hero-2.jpg"
              alt="Siddhartha at work"
              style={{
                width: '140px',
                height: '180px',
                objectFit: 'cover',
                objectPosition: 'top center',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                flexShrink: 0,
              }}
            />
          </div>
        </div>
      </div>

      {/* ── SKILLS ── */}
      <div className="section section--left" style={revealStyle(skillsOp)}>
        <div className="section__card">
          <span className="section__label">Technical Architecture</span>
          <h2 className="section__title">Core Engine</h2>
          <div className="section__line" />
          <p className="section__desc">
            Full-stack systems engineered for sub-second latency, event-driven flows, and resilient distributed architecture.
          </p>
          <div className="skills-grid">
            {skills.map(s => (
              <span key={s.id} className="skill-tag">{s.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROJECTS ── */}
      <div className="section section--right" style={revealStyle(projOp)}>
        <div className="section__card" style={{ textAlign: 'right' }}>
          <span className="section__label">Selected Work</span>
          <h2 className="section__title">Projects</h2>
          <div className="section__line" style={{ marginLeft: 'auto' }} />
          <p className="section__desc" style={{ marginLeft: 'auto' }}>
            Production-grade systems built for real-world scale and reliability.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {projects.map(p => (
              <button
                key={p.id}
                onClick={() => onProjectSelect(p)}
                className="project-btn"
                style={{ pointerEvents: projOp > 0.4 ? 'auto' : 'none', textAlign: 'right', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row-reverse' }}
              >
                <span>{p.title}</span>
                <span className="arrow" style={{ fontSize: '0.9em', opacity: 0.3, transition: 'all 0.3s ease' }}>↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── EDUCATION & EXTRAS ── */}
      <div className="section section--left" style={revealStyle(eduOp)}>
        <div className="section__card">
          <span className="section__label">Foundation</span>
          <h2 className="section__title">Education & Extras</h2>
          <div className="section__line" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <div>
              {education.map(edu => (
                <div key={edu.id} className="edu-item">
                  <h3>{edu.degree}</h3>
                  <div className="edu-meta">{edu.institution} · {edu.year}</div>
                  <p className="edu-detail">{edu.details}</p>
                </div>
              ))}

              <h3 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.8rem', color: 'var(--text)' }}>Certifications</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.6 }}>
                {certifications.map(c => (
                  <li key={c.id} style={{ marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--blue)' }}>•</span> {c.title} <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>({c.date})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--text)' }}>Hackathons & Workshops</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.6 }}>
                {hackathons.map((h, i) => (
                  <li key={i} style={{ marginBottom: '0.6rem' }}>
                    <span style={{ color: 'var(--cyan)' }}>•</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div className="section section--center" style={revealStyle(contactOp)}>
        <div className="contact-card">
          <img
            src="./hero-3.jpg"
            alt="Siddhartha"
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'cover',
              objectPosition: 'top center',
              borderRadius: '50%',
              border: '2px solid var(--glass-border)',
              boxShadow: '0 0 30px var(--blue-glow)',
              margin: '0 auto 1.5rem',
              display: 'block',
            }}
          />
          <span className="section__label">Connect</span>
          <h2 className="section__title">Let's Build Together</h2>
          <div className="section__line" style={{ margin: '0 auto 2rem' }} />
          <div className="contact-info">
            <span>{profile.email}</span>
            <span>{profile.phone}</span>
            <span>{profile.location}</span>
          </div>
          <div className="contact-links" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <a href={`mailto:${profile.email}`} className="contact-link" style={{ pointerEvents: contactOp > 0.4 ? 'auto' : 'none' }}>Email</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link" style={{ pointerEvents: contactOp > 0.4 ? 'auto' : 'none' }}>LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-link" style={{ pointerEvents: contactOp > 0.4 ? 'auto' : 'none' }}>GitHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════ MAIN CANVAS ═══════ */

export function Experience({ progress }) {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      className="experience-canvas"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ fov: 50, near: 0.1, far: 250 }}
      onPointerMove={(e) => {
        pointer.current.x = clamp01(e.clientX / window.innerWidth) * 2 - 1;
        pointer.current.y = -(clamp01(e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      <color attach="background" args={['#030B1A']} />
      <fog attach="fog" args={['#030B1A', 25, 90]} />

      <Lighting />

      <Suspense fallback={null}>
        <CameraRig progress={progress} pointer={pointer} />
        <ParticleField count={3000} />

        <HeroSculpture />
        <TechSphere />
        <Prism />
        <Orbital />
        <Gateway />
        <DataStream />
      </Suspense>

      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} height={300} intensity={1.2} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.15} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
