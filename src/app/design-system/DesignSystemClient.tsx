// src/app/design-system/DesignSystemClient.tsx
'use client';

import { useState, useRef } from 'react';
import { 
  Copy, 
  Check, 
  Sparkles, 
  Brain, 
  Cpu, 
  Workflow, 
  Zap, 
  ChevronRight, 
  ArrowRight, 
  Terminal, 
  Activity, 
  ShieldCheck,
  Download,
  Video,
  Image,
  Loader2
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import ThreadExporterCanvas, { ThreadExporterHandle } from '@/components/ThreadExporterCanvas';

export default function DesignSystemClient() {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');

  // Sección 8: Estados y Refs de Exportación
  const threadExporterRef = useRef<ThreadExporterHandle>(null);
  const [exportColor, setExportColor] = useState<[number, number, number]>([0.035, 0.737, 0.541]); // Mint por defecto
  const [exportDuration, setExportDuration] = useState<number>(5); // 5 segundos
  const [presetDim, setPresetDim] = useState<'16:9' | '9:16' | '1:1' | '4:5' | 'custom'>('16:9');
  const [exportWidth, setExportWidth] = useState<number>(1920);
  const [exportHeight, setExportHeight] = useState<number>(1080);
  const [isExportingMP4, setIsExportingMP4] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);

  const applyDimensionPreset = (preset: '16:9' | '9:16' | '1:1' | '4:5' | 'custom', w?: number, h?: number) => {
    setPresetDim(preset);
    if (preset === '16:9') { setExportWidth(1920); setExportHeight(1080); }
    else if (preset === '9:16') { setExportWidth(1080); setExportHeight(1920); }
    else if (preset === '1:1') { setExportWidth(1080); setExportHeight(1080); }
    else if (preset === '4:5') { setExportWidth(1080); setExportHeight(1350); }
    else if (preset === 'custom' && w && h) { setExportWidth(w); setExportHeight(h); }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(label);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const handleDownloadPNG = () => {
    const canvas = threadExporterRef.current?.getCanvas();
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'hilos-oito-transparente.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setCopiedValue('PNG Transparente');
      setTimeout(() => setCopiedValue(null), 2500);
    } catch (e) {
      console.error('Error al exportar PNG:', e);
    }
  };

  const handleDownloadMP4 = async () => {
    const canvas = threadExporterRef.current?.getCanvas();
    if (!canvas) return;
    setIsExportingMP4(true);
    setExportProgress(5);

    try {
      // Stream de 30 FPS desde el canvas WebGL
      const stream = canvas.captureStream(30);
      const mimeTypes = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm'
      ];
      const selectedMime = mimeTypes.find(m => MediaRecorder.isTypeSupported(m)) || 'video/webm';

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: selectedMime,
        videoBitsPerSecond: 8000000 // 8 Mbps para alta resolución
      });

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const durationMs = exportDuration * 1000;
      const intervalMs = 100;
      let elapsed = 0;

      const progressInterval = setInterval(() => {
        elapsed += intervalMs;
        const pct = Math.min(Math.round((elapsed / durationMs) * 90), 90);
        setExportProgress(pct);
      }, intervalMs);

      mediaRecorder.onstop = () => {
        clearInterval(progressInterval);
        setExportProgress(98);

        // Crear blob con tipo MIME mp4/webm y forzar descarga como .mp4
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'hilos-oito-transparente.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setExportProgress(100);
        setTimeout(() => {
          setIsExportingMP4(false);
          setExportProgress(0);
          setCopiedValue('Video MP4 Transparente');
          setTimeout(() => setCopiedValue(null), 3000);
        }, 500);
      };

      mediaRecorder.start();
      setTimeout(() => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
        }
      }, durationMs);

    } catch (e) {
      console.error('Error al exportar MP4:', e);
      setIsExportingMP4(false);
      setExportProgress(0);
    }
  };

  const colors = [
    { name: 'Verde Mint (Accent)', hex: '#09bc8a', tw: 'bg-mint', text: 'text-mint', desc: 'Botones CTA, hovers, viñetas iluminadas, acentos activos.' },
    { name: 'Forest Green', hex: '#004346', tw: 'bg-forest', text: 'text-forest', desc: 'Fondo principal de héroes y secciones oscuras especiales.' },
    { name: 'Forest Green Deep', hex: '#002a2c', tw: 'bg-forest-deep', text: 'text-forest-deep', desc: 'Fondo de base general en páginas oscuras y previsualizadores.' },
    { name: 'Cream Mint (Light BG)', hex: '#f4fcf9', tw: 'bg-mint-light border border-mint/10', text: 'text-forest-deep', desc: 'Fondo claro para secciones densas de contenido/lectura.' },
    { name: 'Neon Mint', hex: '#00ffaa', tw: 'bg-neon', text: 'text-neon', desc: 'Acento de brillo extremo, gradientes dinámicos, sombras glow.' },
    { name: 'Charcoal Text', hex: '#333333', tw: 'bg-neutral-700', text: 'text-neutral-700', desc: 'Color de texto de cuerpo principal sobre fondos claros.' },
    { name: 'Dark Base Text', hex: '#1a1a1a', tw: 'bg-neutral-900', text: 'text-neutral-900', desc: 'Títulos principales y H1-H3 sobre fondos claros.' },
    { name: 'Light Text', hex: '#ffffff', tw: 'bg-white border border-neutral-200', text: 'text-white', desc: 'Texto principal en todas las secciones oscuras.' },
  ];

  const bullets = [
    { name: 'Glow Circle', node: <span className="glow-circle mt-1.5 flex-shrink-0" />, code: '<span className="glow-circle" />' },
    { name: 'Glow Ring', node: <span className="glow-ring mt-1 flex-shrink-0" />, code: '<span className="glow-ring" />' },
    { name: 'Glow Diamond', node: <span className="glow-diamond mt-1.5 flex-shrink-0" />, code: '<span className="glow-diamond" />' },
    { name: 'Glow Arrow', node: <span className="glow-arrow flex-shrink-0"><ChevronRight size={18} strokeWidth={2.5} /></span>, code: '<span className="glow-arrow"><ChevronRight size={18} /></span>' },
    { name: 'Glow Cross', node: <span className="glow-cross flex-shrink-0"><Zap size={15} strokeWidth={2} /></span>, code: '<span className="glow-cross"><Zap size={15} /></span>' },
    { name: 'Glow Sparkle', node: <span className="glow-sparkle flex-shrink-0"><Sparkles size={16} strokeWidth={2} /></span>, code: '<span className="glow-sparkle"><Sparkles size={16} /></span>' },
  ];

  return (
    <main className="min-h-screen bg-[#002a2c] text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#004346]/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#09bc8a]/10 rounded-full blur-[120px] pointer-events-none" />

      {copiedValue && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#09bc8a] text-[#002a2c] px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 animate-bounce">
          <Check size={18} />
          <span>Copiado: {copiedValue}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <section className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-bold bg-[#09bc8a]/20 text-[#09bc8a] border border-[#09bc8a]/30 rounded-full uppercase tracking-wider">
              Style Guide
            </span>
            <span className="text-white/40 text-sm">v1.0</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Sistema de Diseño <span className="wordmark text-[#09bc8a]">oito</span>
          </h1>
          <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
            Catálogo interactivo de tokens de diseño, tipografías, componentes de vidrio y viñetas de la marca <b>Oito</b>. Utiliza estas clases y variables para construir interfaces consistentes, accesibles y cinemáticas.
          </p>
        </section>

        {/* 1. Colores */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-white/5 pb-3">
            <h2 className="text-2xl sm:text-3xl font-semibold">1. Paleta de Colores</h2>
            <span className="text-sm text-white/50">Haz clic en un color para copiar su hexadecimal</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {colors.map((color) => (
              <div 
                key={color.name}
                onClick={() => copyToClipboard(color.hex, color.name)}
                className="group cursor-pointer bg-white/5 border border-white/10 hover:border-[#09bc8a]/40 hover:bg-white/10 p-4 rounded-2xl transition duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className={`w-full h-24 rounded-xl ${color.tw} transition duration-200 group-hover:scale-[1.02] shadow-inner flex items-center justify-center`} />
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center justify-between">
                      {color.name}
                      <Copy size={14} className="opacity-0 group-hover:opacity-60 transition" />
                    </h3>
                    <p className="font-mono text-xs text-white/50">{color.hex}</p>
                  </div>
                </div>
                <p className="text-xs text-white/70 mt-3 pt-3 border-t border-white/5">{color.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Tipografía */}
        <section className="space-y-6">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-2xl sm:text-3xl font-semibold">2. Tipografía & Textos</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#09bc8a] border-b border-white/5 pb-2">Especificaciones de Fuentes</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-white/40">Logotipo (Wordmark)</h4>
                  <p className="text-3xl font-normal wordmark text-[#09bc8a] mt-1">oito</p>
                  <p className="text-xs text-white/50 font-mono mt-1">Font family: var(--font-varela-round) · Varela Round (SOLO para la marca)</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white/40">Títulos y Cabeceras (H1 - H6)</h4>
                  <p className="text-2xl font-bold mt-1">Menos carga operativa.</p>
                  <p className="text-xs text-white/50 font-mono mt-1">Font family: var(--font-dm-sans) · DM Sans (600 / 700 / 800)</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white/40">Cuerpo y Descripciones</h4>
                  <p className="text-base text-white/70 mt-1">Tu equipo técnico que construye software y automatiza procesos.</p>
                  <p className="text-xs text-white/50 font-mono mt-1">Font family: var(--font-dm-sans) · DM Sans (400 / 500)</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#09bc8a] border-b border-white/5 pb-2">Escala Responsiva (globals.css)</h3>
              <div className="space-y-3 font-mono text-sm bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Heading 1:</span>
                  <span>4rem / 2.2rem / 1.8rem</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Heading 2:</span>
                  <span>2.5rem / 1.8rem / 1.5rem</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-white/60">Subtitle:</span>
                  <span>1.5rem / 1.125rem / 1.1rem</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-white/60">Body Text:</span>
                  <span>1.125rem / 1rem / 0.95rem</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Glassmorphism */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-3 gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">3. Cristal (Glassmorphism)</h2>
              <p className="text-xs text-white/50">Elemento visual central de Oito. Se superpone a los hilos dinámicos.</p>
            </div>
            <div className="flex items-center bg-white/5 border border-white/10 p-1 rounded-xl">
              <button 
                onClick={() => setPreviewTheme('dark')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${previewTheme === 'dark' ? 'bg-[#004346] text-[#09bc8a] shadow' : 'text-white/60'}`}
              >
                Fondo Oscuro
              </button>
              <button 
                onClick={() => setPreviewTheme('light')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${previewTheme === 'light' ? 'bg-[#f4fcf9] text-[#002a2c] shadow' : 'text-white/60'}`}
              >
                Fondo Claro
              </button>
            </div>
          </div>

          {/* Test area container */}
          <div className={`p-8 sm:p-12 rounded-3xl transition duration-300 relative border ${previewTheme === 'dark' ? 'bg-[#002a2c] border-white/10' : 'bg-[#f4fcf9] border-[#004346]/10'}`}>
            
            {/* Simulated background items (like threads or gradients) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
              <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-[#09bc8a]/30 rounded-full blur-[40px] animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-[#004346]/80 rounded-full blur-[30px]" />
              {/* Line segments simulating threads */}
              <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0,50 Q 150,150 300,50 T 600,100 T 900,50 T 1200,80" fill="none" stroke="#09bc8a" strokeWidth="2" />
                <path d="M 0,100 Q 200,20 400,100 T 800,50 T 1200,120" fill="none" stroke="#004346" strokeWidth="3" />
              </svg>
            </div>

            <div className="grid grid-cols-1 gap-8 relative z-10">
              {/* Glass Card */}
              <div className="space-y-4">
                <h3 className={`text-sm font-bold uppercase tracking-wider ${previewTheme === 'dark' ? 'text-[#09bc8a]' : 'text-[#004346]'}`}>
                  Estilo: Glass (.glass)
                </h3>
                <GlassCard hover={true} className="p-6">
                  <h4 className={`text-xl font-bold ${previewTheme === 'dark' ? 'text-white' : 'text-[#002a2c]'}`}>Tarjeta Interactiva</h4>
                  <p className={`text-sm mt-2 leading-relaxed ${previewTheme === 'dark' ? 'text-white/80' : 'text-neutral-700'}`}>
                    Vidrio transparente optimizado para tarjetas de información y chips. Hover con animación vertical y brillo de borde Verde Mint.
                  </p>
                </GlassCard>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <p className="text-xs font-mono text-[#09bc8a]">&lt;GlassCard hover={'{true}'}&gt; ... &lt;/GlassCard&gt;</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Glow Tech Bullets */}
        <section className="space-y-6">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-2xl sm:text-3xl font-semibold">4. Viñetas Glow Tech</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#09bc8a] border-b border-white/5 pb-2">Previsualización de Estilos</h3>
              <div className="space-y-4">
                {bullets.map((bullet) => (
                  <div key={bullet.name} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-[#09bc8a]">
                      {bullet.node}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{bullet.name}</h4>
                      <p className="text-xs text-white/50 font-mono mt-0.5">{bullet.code}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#09bc8a] border-b border-white/5 pb-2">Ejemplo de Lista en Producción</h3>
              <div className="bg-black/20 border border-white/5 p-6 rounded-2xl space-y-4">
                <div className="flex items-start gap-3">
                  <span className="glow-circle mt-2 flex-shrink-0" />
                  <p className="text-sm text-white/80">
                    <span className="font-semibold text-white">Automatización de CRM:</span> Sincroniza tus leads y procesos de venta automáticamente.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="glow-ring mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-white/80">
                    <span className="font-semibold text-white">Agentes de IA 24/7:</span> Atención al cliente sin fricciones y con respuestas rápidas.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="glow-diamond mt-2 flex-shrink-0" />
                  <p className="text-sm text-white/80">
                    <span className="font-semibold text-white">Integraciones ilimitadas:</span> Conectamos cualquier herramienta mediante APIs nativas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Separadores & Figuras */}
        <section className="space-y-6">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-2xl sm:text-3xl font-semibold">5. Figuras de Nodos y Separadores</h2>
          </div>

          <div className="space-y-8 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
            {/* Shapes */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#09bc8a] border-b border-white/5 pb-2">Estructuras Geométricas SVG (Nodos)</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Concentric Node */}
                <div className="bg-black/20 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" stroke="#09bc8a" strokeWidth="1.5" />
                    <circle cx="20" cy="20" r="13" stroke="#09bc8a" strokeWidth="1" strokeDasharray="4,3" />
                    <circle cx="20" cy="20" r="4" fill="#09bc8a" />
                  </svg>
                  <span className="text-xs font-semibold">Nodo Concéntrico</span>
                </div>

                {/* Triangular Node */}
                <div className="bg-black/20 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 20,4 L 36,32 L 4,32 Z" stroke="#09bc8a" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M 20,9 L 32,30 L 8,30 Z" stroke="#09bc8a" strokeWidth="1" strokeDasharray="4,3" strokeLinejoin="round" />
                    <circle cx="20" cy="24" r="3" fill="#09bc8a" />
                  </svg>
                  <span className="text-xs font-semibold">Nodo Triangular</span>
                </div>

                {/* Octagonal Node */}
                <div className="bg-black/20 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 14,4 L 26,4 L 36,14 L 36,26 L 26,36 L 14,36 L 4,26 L 4,14 Z" stroke="#09bc8a" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="20" cy="20" r="10" stroke="#09bc8a" strokeWidth="1" strokeDasharray="3,2" />
                    <circle cx="20" cy="20" r="4" fill="#09bc8a" />
                  </svg>
                  <span className="text-xs font-semibold">Nodo Octogonal (Oito)</span>
                </div>

                {/* Network nodes */}
                <div className="bg-black/20 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-3">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="2" fill="#09bc8a" />
                    <circle cx="10" cy="10" r="3" stroke="#09bc8a" strokeWidth="1.5" />
                    <circle cx="30" cy="12" r="3" stroke="#09bc8a" strokeWidth="1.5" />
                    <circle cx="15" cy="30" r="3" stroke="#09bc8a" strokeWidth="1.5" />
                    <circle cx="32" cy="28" r="3" stroke="#09bc8a" strokeWidth="1.5" />
                    <line x1="12.5" y1="12.5" x2="18.5" y2="18.5" stroke="#09bc8a" strokeWidth="1" />
                    <line x1="28" y1="13.5" x2="21.5" y2="18.5" stroke="#09bc8a" strokeWidth="1" />
                    <line x1="16.5" y1="27.5" x2="19" y2="21.5" stroke="#09bc8a" strokeWidth="1" />
                    <line x1="30" y1="26.5" x2="21.5" y2="21.5" stroke="#09bc8a" strokeWidth="1" />
                  </svg>
                  <span className="text-xs font-semibold">Red de Nodos</span>
                </div>
              </div>
            </div>

            {/* Dividers */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#09bc8a] border-b border-white/5 pb-2">Separadores de Sección</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs text-white/40 mb-2">1. Línea Discontinua (.divider-dashed)</h4>
                  <div className="divider-dashed relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#09bc8a] border-2 border-[#002a2c] rounded-full shadow" />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs text-white/40 mb-2">2. Hilo Doble (.divider-double)</h4>
                  <div className="divider-double" />
                </div>

                <div>
                  <h4 className="text-xs text-white/40 mb-2">3. Onda Orgánica</h4>
                  <svg className="w-full h-10 text-[#09bc8a]/30" viewBox="0 0 1200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,20 Q150,0 300,20 T600,20 T900,20 T1200,20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Botones */}
        <section className="space-y-6">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-2xl sm:text-3xl font-semibold">6. Botones e Interacciones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#09bc8a] border-b border-white/5 pb-2">CTAs en vivo</h3>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 min-height-[54px] px-8 py-3.5 rounded-full bg-[#09bc8a] text-[#002a2c] font-bold text-sm shadow-[0_0_30px_rgba(9,188,138,0.4)] hover:shadow-[0_0_40px_rgba(0,255,170,0.6)] hover:bg-white hover:scale-[1.02] transition duration-200"
                >
                  Hablemos por WhatsApp
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-2 min-height-[54px] px-6 py-3.5 rounded-full border border-white/20 hover:border-[#09bc8a] hover:bg-white/5 font-semibold text-sm transition duration-200"
                >
                  Saber más
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#09bc8a] border-b border-white/5 pb-2">Clases de Hover</h3>
              <div className="space-y-2 text-xs font-mono text-white/60">
                <p># CTA Primario en Héroe:</p>
                <div className="bg-black/20 p-3 rounded-lg border border-white/5 text-[#09bc8a]">
                  transition: transform 0.2s ease, box-shadow 0.2s ease;<br />
                  hover: scale-[1.02] bg-white shadow-[0_0_40px_rgba(0,255,170,0.6)]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Iconografía */}
        <section className="space-y-6">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-2xl sm:text-3xl font-semibold">7. Iconografía (Lucide 1.5px)</h2>
            <p className="text-xs text-white/50">Iconos premium con trazo delgado de 1.5px.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { icon: <Brain size={24} strokeWidth={1.5} />, name: 'Brain', cat: 'IA' },
                { icon: <Cpu size={24} strokeWidth={1.5} />, name: 'Cpu', cat: 'Tech' },
                { icon: <Sparkles size={24} strokeWidth={1.5} />, name: 'Sparkles', cat: 'IA' },
                { icon: <Workflow size={24} strokeWidth={1.5} />, name: 'Workflow', cat: 'Automatización' },
                { icon: <Zap size={24} strokeWidth={1.5} />, name: 'Zap', cat: 'Velocidad' },
                { icon: <Activity size={24} strokeWidth={1.5} />, name: 'Activity', cat: 'Datos' },
                { icon: <Terminal size={24} strokeWidth={1.5} />, name: 'Terminal', cat: 'Código' },
                { icon: <ShieldCheck size={24} strokeWidth={1.5} />, name: 'ShieldCheck', cat: 'Seguridad' },
              ].map((item) => (
                <div key={item.name} className="bg-black/20 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-2">
                  <div className="text-[#09bc8a]">{item.icon}</div>
                  <span className="text-xs font-bold text-white/80">{item.name}</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-wide">{item.cat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Recursos Visuales & Exportación */}
        <section className="space-y-6">
          <div className="border-b border-white/5 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#09bc8a]/20 text-[#09bc8a] border border-[#09bc8a]/30 rounded-full uppercase tracking-wider">
                  Nuevo
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold">8. Recursos Visuales & Exportación</h2>
              </div>
              <p className="text-xs text-white/50 mt-1">Previsualiza y descarga la animación de hilos en video <b>MP4 con Fondo Transparente</b> o capturas PNG.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
            {/* Visualizer canvas container with checkerboard background */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#09bc8a]">Previsualizador de Transparencia</span>
                  <span className="text-[11px] font-mono text-white/40">Fondo Checkerboard (Alpha)</span>
                </div>
                <div className="relative w-full h-[340px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] bg-[#001719] flex items-center justify-center">
                  <ThreadExporterCanvas
                    ref={threadExporterRef}
                    color={exportColor}
                    width={exportWidth}
                    height={exportHeight}
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#09bc8a] border border-white/10 flex items-center gap-1.5 z-10">
                    <span className="w-2 h-2 rounded-full bg-[#09bc8a] animate-pulse" />
                    WebGL Stream {exportWidth}x{exportHeight}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls panel */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#09bc8a] border-b border-white/5 pb-2">
                  Configuración del Recurso
                </h3>

                {/* Color Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/70 block">Color de Hilos</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setExportColor([0.035, 0.737, 0.541])}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition ${
                        exportColor[0] === 0.035
                          ? 'border-[#09bc8a] bg-[#09bc8a]/10 text-white shadow-[0_0_15px_rgba(9,188,138,0.2)]'
                          : 'border-white/10 bg-black/20 text-white/60 hover:border-white/20'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#09bc8a]" />
                        Verde Mint
                      </span>
                      {exportColor[0] === 0.035 && <Check size={14} className="text-[#09bc8a]" />}
                    </button>

                    <button
                      onClick={() => setExportColor([0.0, 0.263, 0.275])}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold transition ${
                        exportColor[0] === 0.0
                          ? 'border-[#09bc8a] bg-[#09bc8a]/10 text-white shadow-[0_0_15px_rgba(9,188,138,0.2)]'
                          : 'border-white/10 bg-black/20 text-white/60 hover:border-white/20'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#004346]" />
                        Forest Green
                      </span>
                      {exportColor[0] === 0.0 && <Check size={14} className="text-[#09bc8a]" />}
                    </button>
                  </div>
                </div>

                {/* Duration selector */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/70 block">Duración del Video (Loop)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[3, 5, 10].map((sec) => (
                      <button
                        key={sec}
                        onClick={() => setExportDuration(sec)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                          exportDuration === sec
                            ? 'border-[#09bc8a] bg-[#09bc8a]/20 text-[#09bc8a]'
                            : 'border-white/10 bg-black/20 text-white/60 hover:border-white/20'
                        }`}
                      >
                        {sec} Segundos
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dimension Presets & Custom Inputs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-white/70 block">Dimensiones / Formato</label>
                    <span className="text-[10px] font-mono text-[#09bc8a]">{exportWidth} x {exportHeight} px</span>
                  </div>
                  
                  {/* Preset Pills */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {[
                      { id: '16:9', label: '16:9 (HD)' },
                      { id: '9:16', label: '9:16 (Story)' },
                      { id: '1:1', label: '1:1 (Post)' },
                      { id: '4:5', label: '4:5 (Feed)' },
                      { id: 'custom', label: 'Manual' }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => applyDimensionPreset(p.id as '16:9' | '9:16' | '1:1' | '4:5' | 'custom')}
                        className={`py-1.5 px-2 rounded-lg border text-[11px] font-bold text-center transition ${
                          presetDim === p.id
                            ? 'border-[#09bc8a] bg-[#09bc8a]/20 text-[#09bc8a]'
                            : 'border-white/10 bg-black/20 text-white/60 hover:border-white/20'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Custom Width x Height numeric inputs */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[10px] font-mono text-white/50 block mb-1">Ancho (px)</label>
                      <input
                        type="number"
                        min="100"
                        max="3840"
                        value={exportWidth || ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          if (!isNaN(val)) {
                            setExportWidth(val);
                            setPresetDim('custom');
                          }
                        }}
                        onBlur={() => {
                          if (exportWidth < 100) setExportWidth(100);
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#09bc8a]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/50 block mb-1">Alto (px)</label>
                      <input
                        type="number"
                        min="100"
                        max="3840"
                        value={exportHeight || ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          if (!isNaN(val)) {
                            setExportHeight(val);
                            setPresetDim('custom');
                          }
                        }}
                        onBlur={() => {
                          if (exportHeight < 100) setExportHeight(100);
                        }}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#09bc8a]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Download Buttons */}
              <div className="space-y-3 pt-4 border-t border-white/5">
                <button
                  onClick={handleDownloadMP4}
                  disabled={isExportingMP4}
                  className="w-full py-3.5 px-6 rounded-full bg-[#09bc8a] hover:bg-white text-[#002a2c] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(9,188,138,0.3)] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExportingMP4 ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Generando MP4 Transparente... ({exportProgress}%)</span>
                    </>
                  ) : (
                    <>
                      <Video size={18} />
                      <span>Descargar Video MP4 (Fondo Transparente)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadPNG}
                  disabled={isExportingMP4}
                  className="w-full py-3 px-6 rounded-full border border-white/20 hover:border-[#09bc8a] hover:bg-white/5 text-white/80 font-semibold text-xs flex items-center justify-center gap-2 transition duration-200 disabled:opacity-50"
                >
                  <Image size={15} />
                  <span>Capturar PNG Transparente</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
