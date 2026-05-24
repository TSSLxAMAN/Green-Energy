import React, { useRef } from 'react'
import 'swiper/css';
import ParallaxCarousel from './ParallaxCarousel';
import SolarPanel3D from './SolarPanel3D';
import { useState } from 'react';
import ManualSelection from './ManualSelection';
import LumsumSelection from './LumsumSelection';
import LumsumCard from './LumsumCard';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import ManualCard from './ManualCard';

/* ─────────────────────────────────────────────
   FEATURE CARDS DATA
───────────────────────────────────────────── */
const FEATURES = [
  {
    icon: '⚡',
    title: 'Smart Energy Calculator',
    desc: 'Enter your total wattage or add appliances one by one. We compute your exact solar requirements instantly.',
    accent: '#059669',
    lightBg: '#f0fdf4',
    border: 'rgba(5,150,105,0.2)',
  },
  {
    icon: '☀️',
    title: 'Panel Recommendations',
    desc: 'Compare top solar panels with quantity needed, total cost, and break-even timeline — side by side.',
    accent: '#d97706',
    lightBg: '#fffbeb',
    border: 'rgba(217,119,6,0.2)',
  },
  {
    icon: '💰',
    title: 'Monthly Savings Report',
    desc: 'See exactly how much you save on electricity every month after switching to solar, based on your unit rate.',
    accent: '#2563eb',
    lightBg: '#eff6ff',
    border: 'rgba(37,99,235,0.2)',
  },
];

/* ─────────────────────────────────────────────
   HOME COMPONENT
───────────────────────────────────────────── */
const Home = () => {
  const calcRef = useRef(null);

  const [mode, setMode]     = useState(2);
  const [loading, setLoading] = useState('idle');

  const [LumsumReq, setLumsumReq] = useState({
    totalWatt: '', usagePerDay: '', backUp: '',
    sunlightAvailable: '', electricityRate: '',
  });

  const [ManualReq, setManualReq] = useState({
    totalWatt: '', totalPeakLoad: '', backUp: '', sunlightAvailable: '', electricityRate: '',
  });

  /* ── Lump-sum calculations ── */
  const dailyEnergyReq = LumsumReq.totalWatt * LumsumReq.usagePerDay;
  const solarPanelSize = dailyEnergyReq / LumsumReq.sunlightAvailable;
  const backupLoad     = LumsumReq.totalWatt * LumsumReq.backUp;
  const batteryAh      = backupLoad / 12;
  const dailySaving    = (dailyEnergyReq / 1000) * LumsumReq.electricityRate;

  const calculateReqLumsum = () => {
    const empty = Object.values(LumsumReq).some((v) => v.trim() === '');
    if (empty) { toast.warn('Enter values'); return; }
    setLoading('loading');
    setTimeout(() => setLoading('loaded'), 2000);
  };

  /* ── Manual calculations ── */
  const dailyEnergyReqManual = Number(ManualReq.totalWatt);           // Wh
  const solarPanelSizeManual = dailyEnergyReqManual / Number(ManualReq.sunlightAvailable); // W
  const backupLoadManual     = Number(ManualReq.totalPeakLoad) * Number(ManualReq.backUp); // W × h = Wh
  const batteryAhManual      = backupLoadManual / 12;                 // Ah at 12 V
  const dailySavingManual    = (dailyEnergyReqManual / 1000) * Number(ManualReq.electricityRate); // ₹/day

  const calculateReqManual = () => {
    const { totalPeakLoad: _pk, ...checkFields } = ManualReq;
    const empty = Object.values(checkFields).some((v) => v === '');
    if (empty) { toast.warn('Enter values'); return; }
    setLoading('loading');
    setTimeout(() => setLoading('loaded'), 2000);
  };

  function reset() { setMode(2); setLoading('idle'); }

  /* ─────────────────────────────────────────
     RENDER
  ───────────────────────────────────────── */
  return (
    <>

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section
        className="hero-glow"
        style={{ padding: '72px 24px 80px', position: 'relative', overflow: 'hidden' }}
      >
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '55%', height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(5,150,105,0.4), transparent)',
        }} />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">

            {/* ── Left: text ── */}
            <div className="flex-1 text-center lg:text-left">

              {/* Badge */}
              <div className="inline-flex justify-center lg:justify-start mb-5">
                <span className="stat-badge">
                  🌱 India's Smart Solar Planning Platform
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-5"
                style={{ color: '#064e3b', letterSpacing: '-0.02em' }}
              >
                Power Your Home<br />
                with{' '}
                <span className="gradient-text">Solar Energy</span>
              </h1>

              {/* Description */}
              <p
                className="text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0"
                style={{ color: '#4b5563', lineHeight: '1.75' }}
              >
                Calculate your exact solar requirements, compare top panels with
                pricing and break-even analysis, and discover how much you save
                on electricity every month.
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
                {[
                  { val: '< 1 min',    lbl: 'to get results'     },
                  { val: '50+ panels', lbl: 'in our database'    },
                  { val: '₹0',         lbl: 'commission charged' },
                ].map(({ val, lbl }) => (
                  <div key={lbl} className="text-center">
                    <div className="text-xl font-bold" style={{ color: '#059669' }}>{val}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{lbl}</div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <button
                  className="btn-primary"
                  onClick={() => calcRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Calculate Now →
                </button>
                <button
                  className="btn-outline"
                  onClick={() => calcRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See How It Works
                </button>
              </div>
            </div>

            {/* ── Right: 3D solar panel ── */}
            <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0">
              <SolarPanel3D />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURE CARDS
      ═══════════════════════════════════════ */}
      <section style={{ padding: '0 24px 72px' }}>
        <div className="max-w-7xl mx-auto">

          {/* Section label */}
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2"
               style={{ color: '#059669' }}>
              What We Offer
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#064e3b' }}>
              Everything you need to go solar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: f.lightBg, border: `1px solid ${f.border}` }}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#111827' }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CAROUSEL SECTION
      ═══════════════════════════════════════ */}
      <section style={{ padding: '0 24px 48px' }}>
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(5,150,105,0.15)',
              boxShadow: '0 2px 16px rgba(5,150,105,0.08)',
              padding: '20px',
            }}
          >
            <ParallaxCarousel />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CALCULATOR SECTION
      ═══════════════════════════════════════ */}
      <section ref={calcRef} style={{ padding: '0 24px 80px' }}>
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2"
               style={{ color: '#059669' }}>
              Solar Calculator
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#064e3b' }}>
              Find Your Perfect Solar Setup
            </h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>
              Choose how you want to enter your energy requirements
            </p>
          </div>

          {/* Outer card */}
          <div
            className="rounded-2xl"
            style={{
              background: '#f0fdf4',
              border: '1px solid rgba(5,150,105,0.18)',
              boxShadow: '0 2px 20px rgba(5,150,105,0.08)',
              padding: '24px',
            }}
          >
            {/* Mode panels */}
            <div className="flex flex-col lg:flex-row gap-4 w-full transition-all duration-500">

              {/* ── Manual selection pane ── */}
              <div
                className={`
                  rounded-2xl transition-all duration-500 ease-in-out overflow-hidden
                  ${mode === 0 ? 'w-full' : mode === 1 ? 'w-0 h-0 opacity-0 m-0 p-0' : 'w-full lg:w-1/2 h-48'}
                `}
                style={{
                  background: '#ffffff',
                  border: mode === 0 || mode === 2 ? '1px solid rgba(5,150,105,0.2)' : 'none',
                  boxShadow: '0 1px 8px rgba(5,150,105,0.06)',
                }}
              >
                {mode === 0 ? (
                  <ManualSelection
                    calculateReq={calculateReqManual}
                    setManualReq={setManualReq}
                    ManualReq={ManualReq}
                  />
                ) : (
                  <div className="flex justify-center items-center h-48">
                    <button className="select-mode-btn" onClick={() => setMode(0)}>
                      ＋ Add appliances manually
                    </button>
                  </div>
                )}
                {loading === 'loading' && mode === 0 && (
                  <div className="my-5 px-4">
                    <Skeleton variant="text" height={40} animation="wave" />
                  </div>
                )}
                {loading === 'loaded' && mode === 0 && (
                  <ManualCard
                    dailyEnergyReqManual={dailyEnergyReqManual}
                    solarPanelSizeManual={solarPanelSizeManual}
                    backupLoadManual={backupLoadManual}
                    batteryAhManual={batteryAhManual}
                    dailySavingManual={dailySavingManual}
                  />
                )}
              </div>

              {/* ── Lump-sum pane ── */}
              <div
                className={`
                  rounded-2xl transition-all duration-500 ease-in-out overflow-hidden
                  ${mode === 1 ? 'w-full' : mode === 0 ? 'w-0 h-0 opacity-0 m-0 p-0' : 'w-full lg:w-1/2 h-48'}
                `}
                style={{
                  background: '#ffffff',
                  border: mode === 1 || mode === 2 ? '1px solid rgba(5,150,105,0.2)' : 'none',
                  boxShadow: '0 1px 8px rgba(5,150,105,0.06)',
                }}
              >
                {mode === 1 ? (
                  <LumsumSelection
                    setLumsumReq={setLumsumReq}
                    LumsumReq={LumsumReq}
                    calculateReq={calculateReqLumsum}
                  />
                ) : (
                  <div className="flex justify-center items-center h-48">
                    <button
                      className="select-mode-btn"
                      onClick={() => setMode(1)}
                      disabled={mode === 1}
                    >
                      ＋ Lump-sum requirement
                    </button>
                  </div>
                )}
                {loading === 'loading' && mode === 1 && (
                  <div className="my-5 px-4">
                    <Skeleton variant="text" height={40} animation="wave" />
                  </div>
                )}
                {loading === 'loaded' && mode === 1 && (
                  <LumsumCard
                    dailyEnergyReq={dailyEnergyReq}
                    solarPanelSize={solarPanelSize}
                    backupLoad={backupLoad}
                    batteryAh={batteryAh}
                    dailySaving={dailySaving}
                  />
                )}
              </div>
            </div>

            {/* Back button */}
            {mode !== 2 && (
              <div className="mt-5 text-center">
                <button
                  onClick={reset}
                  className="text-sm font-medium hover:text-green-700 transition-colors"
                  style={{ color: '#059669' }}
                >
                  ← Back to options
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
