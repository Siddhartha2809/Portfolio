import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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

/* Camera Z mapping: sections at z = 0, -24, -48, -72, -96 */
const SECTION_Z = [0, -24, -48, -72, -96];
function progressToZ(p) {
  return 14 + (SECTION_Z[4] - 14) * p;
}

/* ═══════ STAR DUST — Minimal background stars ═══════ */

function StarDust({ count = 1500 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 30 + Math.random() * 50;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = (Math.random() - 0.5) * 200 - 40;
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#c4b5fd"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════ HERO SCULPTURE — Intro ═══════
   A slowly rotating torus knot with metallic distortion.
   Positioned right-of-center so the intro text on the left reads cleanly. */

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
      <mesh ref={ref} position={[5, 0.5, SECTION_Z[0]]}>
        <torusKnotGeometry args={[2.2, 0.7, 256, 48, 2, 3]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#1e1145"
          roughness={0.12}
          metalness={0.98}
          distort={0.2}
          speed={1.2}
        />
      </mesh>
    </Float>
  );
}

/* ═══════ TECH SPHERE — Skills section ═══════
   A morphing sphere with high metallic sheen. Left of center. */

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
          color="#0c2d4a"
          roughness={0.1}
          metalness={0.95}
          distort={0.35}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

/* ═══════ PRISM — Education section ═══════
   A rotating octahedron. Clean geometric feel. Right of center. */

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
          color="#2a1042"
          roughness={0.08}
          metalness={0.98}
          distort={0.15}
          speed={1}
        />
      </mesh>
    </Float>
  );
}

/* ═══════ ORBITAL — Projects section ═══════
   An icosahedron with orbital ring. Left of center. */

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
            color="#1a0a30"
            roughness={0.1}
            metalness={0.96}
            distort={0.25}
            speed={1.5}
          />
        </mesh>
        <mesh ref={ringRef}>
          <torusGeometry args={[3.5, 0.02, 16, 120]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
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

/* ═══════ GATEWAY — Contact section ═══════
   Concentric rings around a glowing core. Centered. */

function Gateway() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (outerRef.current) outerRef.current.rotation.z = t * 0.12;
    if (innerRef.current) innerRef.current.rotation.z = -t * 0.18;
  });

  return (
    <group position={[0, 0, SECTION_Z[4] - 8]}>
      <mesh ref={outerRef} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[4, 0.025, 16, 120]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={2}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={innerRef} rotation={[-0.5, 0.3, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2}
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#8b5cf6"
          emissiveIntensity={4}
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ═══════ ACCENT LINE — Thin luminous line in the environment ═══════ */

function AccentLine({ start, end, color = '#8b5cf6' }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array([...start, ...end]);
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    return geo;
  }, [start, end]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.08}
        depthWrite={false}
      />
    </line>
  );
}

/* ═══════ CAMERA ═══════ */

function CameraRig({ progress, pointer }) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const targetZ = progressToZ(progress);
    const mouseX = pointer.current.x * 0.8;
    const mouseY = pointer.current.y * 0.5;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, mouseX, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, mouseY, 3, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3, delta);

    camera.lookAt(camera.position.x * 0.2, camera.position.y * 0.2, camera.position.z - 18);
  });

  return null;
}

/* ═══════ LIGHTING — Cinematic 3-point ═══════ */

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.08} color="#e2e8f0" />
      {/* Key light — warm violet from top-right */}
      <directionalLight position={[8, 12, 8]} intensity={0.7} color="#7c3aed" />
      {/* Fill light — cool cyan from left */}
      <directionalLight position={[-8, -3, -5]} intensity={0.25} color="#06b6d4" />
      {/* Rim light — soft white from behind */}
      <directionalLight position={[0, 5, -15]} intensity={0.15} color="#e2e8f0" />

      {/* Per-section key lights */}
      <pointLight position={[5, 2, SECTION_Z[0]]} intensity={4} color="#8b5cf6" distance={20} decay={2} />
      <pointLight position={[-5, 1, SECTION_Z[1]]} intensity={4} color="#22d3ee" distance={20} decay={2} />
      <pointLight position={[6, 1, SECTION_Z[2]]} intensity={4} color="#a78bfa" distance={20} decay={2} />
      <pointLight position={[-5, 1, SECTION_Z[3]]} intensity={4} color="#8b5cf6" distance={20} decay={2} />
      <pointLight position={[0, 0, SECTION_Z[4] - 8]} intensity={6} color="#22d3ee" distance={25} decay={2} />
    </>
  );
}

/* ═══════ HTML OVERLAY — Clean professional sections ═══════ */

export function ProductSpecsOverlay({ progress, onProjectSelect }) {
  const introOp = sectionOpacity(progress, 0, 0.18);
  const skillsOp = sectionOpacity(progress, 0.20, 0.38);
  const eduOp = sectionOpacity(progress, 0.40, 0.58);
  const projOp = sectionOpacity(progress, 0.60, 0.80);
  const contactOp = sectionOpacity(progress, 0.83, 1.0);

  return (
    <div className="sections-overlay">
      {/* ── INTRO ── */}
      <div className="section section--left" style={revealStyle(introOp)}>
        <div className="section__card">
          <img src="/profile.jpg" alt={profile.name} className="section__profile-image" />
          <span className="section__label">Portfolio</span>
          <h1 className="section__title">{profile.name}</h1>
          <div className="section__line" />
          <p className="section__desc">{profile.summary}</p>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <a href={`mailto:${profile.email}`} className="contact-link" style={{ pointerEvents: introOp > 0.4 ? 'auto' : 'none' }}>Get in Touch</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link" style={{ pointerEvents: introOp > 0.4 ? 'auto' : 'none' }}>LinkedIn</a>
          </div>
        </div>
      </div>

      {/* ── SKILLS ── */}
      <div className="section section--right" style={revealStyle(skillsOp)}>
        <div className="section__card" style={{ textAlign: 'right' }}>
          <span className="section__label">Technical Architecture</span>
          <h2 className="section__title">Core Engine</h2>
          <div className="section__line" style={{ marginLeft: 'auto' }} />
          <p className="section__desc" style={{ marginLeft: 'auto' }}>
            Full-stack systems engineered for sub-second latency, event-driven flows, and resilient distributed architecture.
          </p>
          <div className="skills-grid" style={{ justifyContent: 'flex-end' }}>
            {skills.map(s => (
              <span key={s.id} className="skill-tag">{s.label}</span>
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
                    <span style={{ color: 'var(--violet)' }}>•</span> {c.title} <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>({c.date})</span>
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
                style={{ pointerEvents: projOp > 0.4 ? 'auto' : 'none', textAlign: 'right', flexDirection: 'row-reverse' }}
              >
                <span>{p.title}</span>
                <span className="arrow">↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div className="section section--center" style={revealStyle(contactOp)}>
        <div className="contact-card">
          <span className="section__label">Connect</span>
          <h2 className="section__title">Let's Build Together</h2>
          <div className="section__line" style={{ margin: '0 auto 2rem' }} />
          <div className="contact-info">
            <span>{profile.email}</span>
            <span>{profile.phone}</span>
            <span>{profile.location}</span>
          </div>
          <div className="contact-links">
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
      camera={{ fov: 50, near: 0.1, far: 200 }}
      onPointerMove={(e) => {
        pointer.current.x = clamp01(e.clientX / window.innerWidth) * 2 - 1;
        pointer.current.y = -(clamp01(e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      <color attach="background" args={['#08060f']} />
      <fog attach="fog" args={['#08060f', 20, 80]} />

      <Lighting />

      <Suspense fallback={null}>
        <CameraRig progress={progress} pointer={pointer} />
        <StarDust count={1500} />

        {/* One refined sculpture per section */}
        <HeroSculpture />
        <TechSphere />
        <Prism />
        <Orbital />
        <Gateway />

        {/* Subtle ambient accent lines */}
        <AccentLine start={[-20, -6, 10]} end={[20, -6, -120]} color="#8b5cf6" />
        <AccentLine start={[18, 8, 5]} end={[-18, 8, -110]} color="#22d3ee" />
      </Suspense>

      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1} />
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.15} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
