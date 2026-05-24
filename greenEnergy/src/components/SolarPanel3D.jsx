import { useState, useRef, useCallback } from 'react';

const STATS = [
  { label: 'Efficiency',   value: '21.4%',   icon: '⚡', offsetX: '-160px', offsetY: '-55px' },
  { label: 'Peak Output',  value: '400W',     icon: '☀️', offsetX: '160px',  offsetY: '-45px' },
  { label: 'CO₂ Saved',   value: '1.2T/yr',  icon: '🌱', offsetX: '155px',  offsetY: '70px'  },
];

export default function SolarPanel3D() {
  const [rot, setRot]         = useState({ x: 0, y: 0 });
  const [shine, setShine]     = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const containerRef          = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x  = e.clientX - rect.left;
    const y  = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    setRot({ x: ((y - cy) / cy) * -18, y: ((x - cx) / cx) * 20 });
    setShine({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  }, []);

  const handleLeave = useCallback(() => {
    setRot({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none w-full"
      style={{ height: '340px', perspective: '900px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
    >

      {/* ── Panel wrapper ── */}
      <div
        style={{
          width: '340px',
          height: '228px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transition: hovered
            ? 'transform 0.06s linear'
            : 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)',
          borderRadius: '14px',
          filter: `drop-shadow(0 20px 40px rgba(5,150,105,0.18))
                   drop-shadow(0 4px 16px rgba(0,0,0,0.12))`,
        }}
      >

        {/* ── Front face ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '14px',
            overflow: 'hidden',
            border: '3px solid rgba(140,180,220,0.4)',
            background: 'linear-gradient(145deg, #0d1b4b 0%, #1435a0 45%, #1a55c5 100%)',
          }}
        >
          {/* Aluminium frame */}
          <div style={{
            position: 'absolute', inset: 0,
            border: '7px solid rgba(200,220,235,0.35)',
            borderRadius: '12px',
            pointerEvents: 'none', zIndex: 10,
          }} />

          {/* Solar cell grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridTemplateRows: 'repeat(5, 1fr)',
            gap: '3px',
            padding: '14px',
            height: '100%',
            width: '100%',
          }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} style={{
                background: `linear-gradient(135deg,
                  hsl(220,${70 + (i % 3) * 5}%,${22 + (i % 4) * 3}%) 0%,
                  hsl(215,${65 + (i % 2) * 4}%,${28 + (i % 5) * 2}%) 100%)`,
                borderRadius: '3px',
                border: '1px solid rgba(80,130,220,0.25)',
                boxShadow: 'inset 0 0 5px rgba(120,180,255,0.08)',
              }} />
            ))}
          </div>

          {/* Mouse-tracked shine */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(
              circle at ${shine.x}% ${shine.y}%,
              rgba(255,255,255,0.2) 0%,
              transparent 55%)`,
            borderRadius: '14px',
            pointerEvents: 'none', zIndex: 11,
            transition: hovered ? 'none' : 'all 0.4s',
          }} />
        </div>

        {/* ── Bottom 3-D edge ── */}
        <div style={{
          position: 'absolute', bottom: '-9px', left: '6px', right: '6px',
          height: '9px',
          background: 'rgba(4, 80, 40, 0.45)',
          transform: 'rotateX(-90deg)',
          transformOrigin: 'top',
          borderRadius: '0 0 8px 8px',
        }} />

        {/* ── Right 3-D edge ── */}
        <div style={{
          position: 'absolute', right: '-9px', top: '6px', bottom: '6px',
          width: '9px',
          background: 'rgba(3, 60, 25, 0.35)',
          transform: 'rotateY(90deg)',
          transformOrigin: 'left',
          borderRadius: '0 8px 8px 0',
        }} />
      </div>

      {/* ── Floating stat bubbles ── */}
      {STATS.map((s) => (
        <div
          key={s.label}
          style={{
            position: 'absolute',
            transform: `translate(${s.offsetX}, ${s.offsetY})`,
            background: '#ffffff',
            border: `1px solid rgba(5,150,105,${hovered ? '0.4' : '0.18'})`,
            borderRadius: '10px',
            padding: '7px 14px',
            boxShadow: hovered
              ? '0 4px 20px rgba(5,150,105,0.15)'
              : '0 2px 8px rgba(0,0,0,0.07)',
            opacity: hovered ? 1 : 0.7,
            transition: 'all 0.35s ease',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '1px' }}>
            {s.icon} {s.label}
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#059669', lineHeight: 1.1 }}>
            {s.value}
          </div>
        </div>
      ))}

      {/* ── Ground glow ── */}
      <div style={{
        position: 'absolute',
        bottom: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '180px',
        height: '18px',
        background: `rgba(5, 150, 105, ${hovered ? '0.22' : '0.10'})`,
        filter: 'blur(14px)',
        borderRadius: '50%',
        transition: 'all 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* ── Hover hint ── */}
      {!hovered && (
        <div style={{
          position: 'absolute',
          bottom: '4px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '11px',
          color: 'rgba(5,150,105,0.45)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          Move mouse over panel ↑
        </div>
      )}
    </div>
  );
}
