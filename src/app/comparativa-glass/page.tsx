"use client";

import React, { useState } from "react";
import {
  Brain,
  Zap,
  Sparkles,
  CheckCircle2,
  Layers,
  Activity,
  Sliders,
  Eye,
  Columns,
  Grid,
  Type,
  Maximize2,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Bot,
  RefreshCw,
  Info,
  Network,
  Share2,
  Workflow
} from "lucide-react";

export default function GlassComparisonPage() {
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const [viewMode, setViewMode] = useState<"grid" | "slider" | "mockup">("grid");
  const [bgTexture, setBgTexture] = useState<
    "hilos-reales" | "nodos-circuito" | "glows-locales" | "orbes" | "grid" | "texto" | "clean"
  >("hilos-reales");
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeCardContent, setActiveCardContent] = useState<"ia-workflow" | "pillars" | "metrics" | "form">("pillars");

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#002a2c] text-[#eafff6] selection:bg-[#09bc8a] selection:text-[#002a2c]">
      {/* Top Banner / Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-[#09bc8a]/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09bc8a]/10 border border-[#09bc8a]/30 text-[#09bc8a] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Benchmarking Visual UI / Oito
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit text-white tracking-tight">
              Comparativa de Efectos <span className="text-[#09bc8a]">.glass</span>
            </h1>
            <p className="mt-2 text-base text-[#eafff6]/70 max-w-2xl font-dm-sans">
              Evaluación interactiva con los <strong>objetos reales de la web de Oito</strong>: Hilos WebGL interactivos, Redes de Nodos Vectoriales y Glows Ambientales.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold transition-all shadow-lg backdrop-blur-md"
            >
              <RefreshCw className="w-4 h-4 text-[#09bc8a]" />
              Fondo: <span className="text-[#09bc8a] uppercase font-bold">{themeMode === "dark" ? "Oscuro (Forest)" : "Claro (Cream)"}</span>
            </button>
          </div>
        </div>

        {/* Toolbar Control Panel */}
        <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-[#09bc8a]/20 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
          {/* Selector de Modo de Vista */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-[#eafff6]/60 uppercase tracking-wider mr-1 hidden sm:inline">
              Vista:
            </span>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-[#09bc8a] text-[#002a2c] shadow-md shadow-[#09bc8a]/20"
                  : "bg-white/5 text-[#eafff6]/80 hover:bg-white/10"
              }`}
            >
              <Columns className="w-4 h-4" /> Par a Par
            </button>
            <button
              onClick={() => setViewMode("slider")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "slider"
                  ? "bg-[#09bc8a] text-[#002a2c] shadow-md shadow-[#09bc8a]/20"
                  : "bg-white/5 text-[#eafff6]/80 hover:bg-white/10"
              }`}
            >
              <Sliders className="w-4 h-4" /> Slider Split
            </button>
            <button
              onClick={() => setViewMode("mockup")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "mockup"
                  ? "bg-[#09bc8a] text-[#002a2c] shadow-md shadow-[#09bc8a]/20"
                  : "bg-white/5 text-[#eafff6]/80 hover:bg-white/10"
              }`}
            >
              <Maximize2 className="w-4 h-4" /> Mockup Completo
            </button>
          </div>

          {/* Selector de Fondo de Objetos Reales */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-[#eafff6]/60 uppercase tracking-wider mr-1 hidden sm:inline">
              Fondo Real / Capa:
            </span>
            <button
              onClick={() => setBgTexture("hilos-reales")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                bgTexture === "hilos-reales"
                  ? "bg-[#09bc8a] text-[#002a2c] font-bold shadow-lg shadow-[#09bc8a]/30 border border-[#09bc8a]"
                  : "bg-white/5 text-[#eafff6]/70 hover:bg-white/10"
              }`}
            >
              <Network className="w-3.5 h-3.5 text-[#00ffaa]" /> Hilos WebGL Reales
            </button>
            <button
              onClick={() => setBgTexture("nodos-circuito")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                bgTexture === "nodos-circuito"
                  ? "bg-[#09bc8a] text-[#002a2c] font-bold shadow-lg shadow-[#09bc8a]/30 border border-[#09bc8a]"
                  : "bg-white/5 text-[#eafff6]/70 hover:bg-white/10"
              }`}
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-300" /> Circuito & Nodos
            </button>
            <button
              onClick={() => setBgTexture("glows-locales")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                bgTexture === "glows-locales"
                  ? "bg-[#09bc8a] text-[#002a2c] font-bold shadow-lg shadow-[#09bc8a]/30 border border-[#09bc8a]"
                  : "bg-white/5 text-[#eafff6]/70 hover:bg-white/10"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" /> Glows de Sección
            </button>
            <button
              onClick={() => setBgTexture("orbes")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                bgTexture === "orbes"
                  ? "bg-white/20 text-white border border-[#09bc8a]"
                  : "bg-white/5 text-[#eafff6]/70 hover:bg-white/10"
              }`}
            >
              Orbes Neón
            </button>
            <button
              onClick={() => setBgTexture("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                bgTexture === "grid"
                  ? "bg-white/20 text-white border border-[#09bc8a]"
                  : "bg-white/5 text-[#eafff6]/70 hover:bg-white/10"
              }`}
            >
              Grid
            </button>
          </div>

          {/* Selector de Contenido de Tarjeta */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#eafff6]/60 uppercase tracking-wider mr-1 hidden sm:inline">
              Tarjeta:
            </span>
            <button
              onClick={() => setActiveCardContent("pillars")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCardContent === "pillars"
                  ? "bg-[#09bc8a]/30 text-[#00ffaa] border border-[#09bc8a]"
                  : "bg-white/5 text-[#eafff6]/70"
              }`}
            >
              Pilares Oito
            </button>
            <button
              onClick={() => setActiveCardContent("ia-workflow")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCardContent === "ia-workflow"
                  ? "bg-[#09bc8a]/30 text-[#00ffaa] border border-[#09bc8a]"
                  : "bg-white/5 text-[#eafff6]/70"
              }`}
            >
              Agente IA
            </button>
            <button
              onClick={() => setActiveCardContent("metrics")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCardContent === "metrics"
                  ? "bg-[#09bc8a]/30 text-[#00ffaa] border border-[#09bc8a]"
                  : "bg-white/5 text-[#eafff6]/70"
              }`}
            >
              Métricas
            </button>
          </div>
        </div>
      </div>

      {/* STAGE CONTAINER WITH DYNAMIC BACKGROUND */}
      <div
        className={`max-w-7xl mx-auto rounded-3xl overflow-hidden p-6 sm:p-10 transition-colors duration-500 relative border ${
          bgTexture === "hilos-reales"
            ? "bg-transparent border-[#09bc8a]/30 shadow-2xl"
            : themeMode === "dark"
            ? "bg-[#002a2c] text-[#eafff6] border-[#09bc8a]/20 shadow-2xl shadow-black/80"
            : "bg-[#f4fcf9] text-[#14201f] border-slate-300 shadow-2xl shadow-teal-900/10"
        }`}
      >
        {/* Banner Explicativo cuando están activos los Hilos WebGL Reales */}
        {bgTexture === "hilos-reales" && (
          <div className="relative z-20 mb-6 p-3.5 rounded-xl bg-black/60 border border-[#09bc8a]/40 backdrop-blur-md text-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#00ffaa]">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>
                <strong>Hilos WebGL Reales del Sitio</strong> fluyendo en vivo en la capa inferior de la GPU.
              </span>
            </div>
            <span className="text-[11px] opacity-75 font-mono hidden md:inline">
              Chromium GPU Layer Test (fixed WebGL canvas z-index: 0)
            </span>
          </div>
        )}

        {/* Background Layer: Real Oito Objects & Textures */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* FONDOS REALES 1: Red de Nodos & Circuitos Vectoriales */}
          {bgTexture === "nodos-circuito" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-85">
              <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Cables de circuito con gradiente */}
                <path d="M 100 300 Q 250 100 500 300 T 900 300" stroke="rgba(9, 188, 138, 0.45)" strokeWidth="3" fill="none" strokeDasharray="6 6" />
                <path d="M 150 150 C 350 450 650 50 850 450" stroke="rgba(0, 255, 170, 0.5)" strokeWidth="2.5" fill="none" />
                <path d="M 200 480 L 800 120" stroke="rgba(9, 188, 138, 0.3)" strokeWidth="2" strokeDasharray="10 8" />

                {/* Nodos Concéntricos y Figuras según AGENTS.md */}
                <g transform="translate(250, 180)">
                  <circle r="48" stroke="#09bc8a" strokeWidth="2" fill="rgba(0,67,70,0.4)" />
                  <circle r="36" stroke="#00ffaa" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
                  <circle r="12" fill="#09bc8a" />
                </g>

                <g transform="translate(750, 420)">
                  <circle r="56" stroke="#09bc8a" strokeWidth="2" fill="rgba(0,67,70,0.4)" />
                  <circle r="42" stroke="#00ffaa" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
                  <circle r="14" fill="#00ffaa" />
                </g>

                {/* Nodo Diamante */}
                <g transform="translate(500, 300) rotate(45)">
                  <rect x="-35" y="-35" width="70" height="70" stroke="#09bc8a" strokeWidth="2" fill="rgba(9,188,138,0.15)" />
                  <rect x="-24" y="-24" width="48" height="48" stroke="#00ffaa" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
                  <circle r="10" fill="#09bc8a" />
                </g>

                {/* Bullets & Pulsos de datos */}
                <circle cx="350" cy="225" r="8" fill="#00ffaa" className="animate-ping" />
                <circle cx="650" cy="375" r="8" fill="#09bc8a" className="animate-ping" />
              </svg>
            </div>
          )}

          {/* FONDOS REALES 2: Glows Ambientales de Sección (.section::before) */}
          {bgTexture === "glows-locales" && (
            <>
              {/* Glow mint de sección local (la capa que SÍ capta el backdrop-filter en Chromium) */}
              <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] rounded-full bg-radial from-[#09bc8a]/50 via-[#004346]/40 to-transparent blur-3xl opacity-90 animate-pulse-glow" />
              <div className="absolute bottom-10 right-1/4 w-[450px] h-[300px] rounded-full bg-radial from-[#00ffaa]/40 via-emerald-600/30 to-transparent blur-3xl opacity-80 animate-sphere-1" />
            </>
          )}

          {/* FONDOS SECUNDARIOS: Orbes, Grid, Texto */}
          {bgTexture === "orbes" && (
            <>
              <div className="absolute top-12 left-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-[#09bc8a] via-[#00ffaa] to-cyan-400 blur-2xl opacity-70 animate-sphere-1" />
              <div className="absolute bottom-16 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-500 via-[#004346] to-pink-500 blur-2xl opacity-65 animate-sphere-2" />
            </>
          )}

          {bgTexture === "grid" && (
            <div className="absolute inset-0 opacity-40">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `linear-gradient(${themeMode === "dark" ? "rgba(9, 188, 138, 0.4)" : "rgba(0, 67, 70, 0.3)"} 1px, transparent 1px), linear-gradient(90deg, ${themeMode === "dark" ? "rgba(9, 188, 138, 0.4)" : "rgba(0, 67, 70, 0.3)"} 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>
          )}
        </div>

        {/* Dynamic Foreground Content Area */}
        <div className="relative z-10">
          {/* VISTA 1: PAR A PAR */}
          {viewMode === "grid" && (
            <div>
              <div className="text-center mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#09bc8a]/20 text-[#09bc8a] border border-[#09bc8a]/30">
                  Modo Par a Par — Comparación Simultánea
                </span>
                <p className="text-sm mt-2 opacity-80">
                  Comprueba la distorsión, borde y contraste sobre los objetos reales de la página.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* TARJETA 1: ACTUAL REPO */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm font-extrabold font-outfit uppercase tracking-wider text-[#09bc8a] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#09bc8a] animate-pulse" /> Actual Repositorio ({themeMode === "dark" ? ".glass" : ".glass-light"})
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/40 border border-white/10 font-mono">
                      {themeMode === "dark" ? "Liquid Mint (Gradient + Rim)" : "Liquid Sheen (Gradient + Rim)"}
                    </span>
                  </div>

                  <div
                    className={`p-7 rounded-[22px] glass-hover ${
                      themeMode === "dark" ? "glass text-[#eafff6]" : "glass-light text-[#14201f]"
                    }`}
                  >
                    <CardInnerContent type={activeCardContent} isDark={themeMode === "dark"} titleSuffix="(Actual Repo)" />
                  </div>

                  {/* Detalle CSS de la Actual */}
                  <div className="p-4 rounded-xl bg-black/60 text-xs font-mono border border-white/10 space-y-1 text-slate-300 backdrop-blur-md">
                    <div className="text-[#09bc8a] font-bold">/* CSS Actual Repositorio */</div>
                    <div>background: {themeMode === "dark" ? "linear-gradient(120deg, rgba(9,188,138,.30)...)" : "linear-gradient(120deg, rgba(255,255,255,.30)...)"}</div>
                    <div>backdrop-filter: {themeMode === "dark" ? "blur(11px) saturate(1.5)" : "blur(11px) saturate(1.4)"}</div>
                    <div>borde/rim: pseudo ::after (degradado enmascarado 1.4px)</div>
                    <div>box-shadow: {themeMode === "dark" ? "0 26px 58px -22px rgba(0,0,0,.5) + 2 inset" : "0 20px 44px -20px rgba(0,67,70,.20) + 2 inset"}</div>
                  </div>
                </div>

                {/* TARJETA 2: PROPUESTA NUEVA */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm font-extrabold font-outfit uppercase tracking-wider text-[#00ffaa] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00ffaa] animate-pulse" /> Propuesta Solicitada ({themeMode === "dark" ? ".glass-proposed" : ".glass-light-proposed"})
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/40 border border-white/10 font-mono">
                      {themeMode === "dark" ? "Vidrio Neutro White 3.5%" : "Frosteado Opaco White 40%"}
                    </span>
                  </div>

                  <div
                    className={`p-7 rounded-[26px] glass-hover-proposed ${
                      themeMode === "dark" ? "glass-proposed text-[#eafff6]" : "glass-light-proposed text-[#14201f]"
                    }`}
                  >
                    <CardInnerContent type={activeCardContent} isDark={themeMode === "dark"} titleSuffix="(Propuesta)" />
                  </div>

                  {/* Detalle CSS de la Propuesta */}
                  <div className="p-4 rounded-xl bg-black/60 text-xs font-mono border border-white/10 space-y-1 text-slate-300 backdrop-blur-md">
                    <div className="text-[#00ffaa] font-bold">/* CSS Propuesta Solicitada */</div>
                    <div>background: {themeMode === "dark" ? "rgba(255, 255, 255, 0.035)" : "rgba(255, 255, 255, 0.40)"}</div>
                    <div>backdrop-filter: {themeMode === "dark" ? "blur(7px) saturate(1.35)" : "blur(12px) saturate(1.4)"}</div>
                    <div>border: {themeMode === "dark" ? "1px solid rgba(255, 255, 255, 0.14)" : "1px solid rgba(255, 255, 255, 0.65)"}</div>
                    <div>box-shadow: {themeMode === "dark" ? "0 8px 36px rgba(0,0,0,0.22)..." : "0 12px 30px rgba(0,67,70,0.09)..."}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: SLIDER SPLIT */}
          {viewMode === "slider" && (
            <div className="space-y-6">
              <div className="text-center">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#09bc8a]/20 text-[#09bc8a] border border-[#09bc8a]/30">
                  Modo Slider Split — Cortina sobre Objetos Reales
                </span>
                <p className="text-sm mt-2 opacity-80">
                  Desliza para apreciar cómo reacciona exactamente el mismo objeto de fondo al cambiar de cristal.
                </p>
              </div>

              {/* Slider Control */}
              <div className="flex items-center gap-4 max-w-md mx-auto">
                <span className="text-xs font-bold text-[#09bc8a]">Repo Actual</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#09bc8a]"
                />
                <span className="text-xs font-bold text-[#00ffaa]">Propuesta</span>
              </div>

              <div className="relative w-full min-h-[380px] rounded-[26px] overflow-hidden border border-white/20 shadow-2xl">
                {/* Capa Inferior: Propuesta */}
                <div
                  className={`absolute inset-0 p-8 flex flex-col justify-between ${
                    themeMode === "dark" ? "glass-proposed text-[#eafff6]" : "glass-light-proposed text-[#14201f]"
                  }`}
                >
                  <CardInnerContent type={activeCardContent} isDark={themeMode === "dark"} titleSuffix="[PROPUESTA NUEVA]" />
                  <div className="mt-4 text-xs font-bold text-[#00ffaa] uppercase tracking-wider text-right">
                    Vista: Propuesta Solicitada
                  </div>
                </div>

                {/* Capa Superior Recortada: Repo Actual */}
                <div
                  className={`absolute inset-0 p-8 flex flex-col justify-between overflow-hidden border-r-2 border-[#09bc8a] ${
                    themeMode === "dark" ? "glass text-[#eafff6]" : "glass-light text-[#14201f]"
                  }`}
                  style={{ width: `${sliderPos}%` }}
                >
                  <div style={{ width: "100%", minWidth: "600px" }}>
                    <CardInnerContent type={activeCardContent} isDark={themeMode === "dark"} titleSuffix="[ACTUAL REPO]" />
                  </div>
                  <div className="mt-4 text-xs font-bold text-[#09bc8a] uppercase tracking-wider">
                    Vista: Repo Actual
                  </div>
                </div>

                {/* Handle Divider Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-[#09bc8a] cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_#09bc8a]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-7 h-7 rounded-full bg-[#002a2c] border-2 border-[#09bc8a] text-[#09bc8a] flex items-center justify-center text-xs font-bold shadow-lg">
                    ↔
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 3: MOCKUP COMPLETO */}
          {viewMode === "mockup" && (
            <div className="space-y-12">
              <div className="text-center">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#09bc8a]/20 text-[#09bc8a] border border-[#09bc8a]/30">
                  Modo Mockup Completo — Sección Pilares de Oito
                </span>
              </div>

              {/* MOCKUP CON ACTUAL REPO */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-outfit text-[#09bc8a] flex items-center gap-2">
                  1. Pilares Oito — Estilo Actual (.glass)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PillarsCard title="Productividad" icon={Zap} glassClass="glass" desc="Eliminamos labores manuales repetitivas para que tu equipo se enfoque en crecer el negocio." />
                  <PillarsCard title="Integración" icon={Workflow} glassClass="glass" desc="Unificamos tus software y bases de datos para que la información fluya sin cuellos de botella." />
                  <PillarsCard title="IA Agéntica" icon={Brain} glassClass="glass" desc="Desplegamos agentes que razonan y ejecutan flujos completos de forma autónoma." />
                </div>
              </div>

              {/* MOCKUP CON PROPUESTA NUEVA */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-xl font-bold font-outfit text-[#00ffaa] flex items-center gap-2">
                  2. Pilares Oito — Propuesta Solicitada (.glass-proposed)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PillarsCard title="Productividad" icon={Zap} glassClass="glass-proposed" desc="Eliminamos labores manuales repetitivas para que tu equipo se enfoque en crecer el negocio." />
                  <PillarsCard title="Integración" icon={Workflow} glassClass="glass-proposed" desc="Unificamos tus software y bases de datos para que la información fluya sin cuellos de botella." />
                  <PillarsCard title="IA Agéntica" icon={Brain} glassClass="glass-proposed" desc="Desplegamos agentes que razonan y ejecutan flujos completos de forma autónoma." />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

{/* Componentes auxiliares para renderizado de contenido de las tarjetas */}
function PillarsCard({ title, icon: Icon, glassClass, desc }: { title: string; icon: any; glassClass: string; desc: string }) {
  return (
    <div className={`p-6 ${glassClass} glass-hover`}>
      <div className="w-12 h-12 rounded-full bg-[#002a2c] border-2 border-[#09bc8a]/50 text-[#09bc8a] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(9,188,138,0.25)]">
        <Icon size={24} strokeWidth={1.6} />
      </div>
      <h4 className="text-lg font-bold font-outfit mb-2 text-white">{title}</h4>
      <p className="text-sm opacity-85 leading-relaxed text-[#eafff6]/90">{desc}</p>
    </div>
  );
}

function CardInnerContent({ type, isDark, titleSuffix }: { type: string; isDark: boolean; titleSuffix: string }) {
  if (type === "pillars") {
    return (
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#002a2c] border-2 border-[#09bc8a]/60 text-[#09bc8a] flex items-center justify-center shadow-[0_0_24px_rgba(9,188,138,0.3)]">
          <Brain size={26} strokeWidth={1.6} />
        </div>
        <h3 className="text-xl font-bold font-outfit leading-tight">IA Agéntica & Automatización</h3>
        <p className="text-sm opacity-85 leading-relaxed">
          Desplegamos agentes que razonan y ejecutan flujos completos de forma autónoma conectando WhatsApp, Make y CRM. {titleSuffix}
        </p>
        <div className="pt-2 flex items-center gap-3 text-xs font-bold text-[#09bc8a]">
          <span className="glow-circle" /> Integración Oito v4
        </div>
      </div>
    );
  }

  if (type === "metrics") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="glow-circle" />
            <span className="text-xs font-bold uppercase tracking-wider opacity-75">Resultados Reales</span>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#09bc8a]/20 text-[#09bc8a] font-bold">KPI LIVE</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-extrabold font-outfit text-[#09bc8a]">+84%</div>
            <div className="text-xs opacity-75">Eficiencia de Respuesta</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="text-2xl font-extrabold font-outfit text-[#00ffaa]">1,420</div>
            <div className="text-xs opacity-75">Horas Ahorradas/Mes</div>
          </div>
        </div>

        <p className="text-xs opacity-70 leading-relaxed">
          Sincronización automatizada de prospectos desde WhatsApp Business hacia HubSpot y Google Sheets. {titleSuffix}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#09bc8a]/20 text-[#09bc8a]">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold font-outfit text-lg leading-none">Motor de Automatización IA</h4>
            <span className="text-xs opacity-60 font-mono">Workflow Pipeline v4.2</span>
          </div>
        </div>
        <span className="p-1.5 rounded-full bg-[#09bc8a]/10 text-[#09bc8a]">
          <ShieldCheck className="w-4 h-4" />
        </span>
      </div>

      <p className="text-sm leading-relaxed opacity-85">
        Prueba de transparencia y distorsión de la receta glass sobre capas dinámicas de fondo. Evalúa la nitidez de la tipografía Outfit y DM Sans. {titleSuffix}
      </p>

      <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
        <span className="flex items-center gap-1.5 text-[#09bc8a] font-semibold">
          <CheckCircle2 className="w-4 h-4" /> Integrado con WhatsApp & CRM
        </span>
        <span className="font-bold text-[#09bc8a] flex items-center gap-1 cursor-pointer hover:underline">
          Ver detalles <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
