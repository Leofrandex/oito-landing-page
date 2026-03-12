'use client';

import { Fragment, useRef, useState } from 'react';
import { ParticleCard, GlobalSpotlight } from './MagicBento';
import {
    ChevronRight, TrendingUp, Clock, Target, ShieldCheck, Zap,
    Brain, CalendarCheck, MessageCircleQuestion, Database, MessageCircleHeart,
    Upload, Sparkles, Share2, CreditCard, FileText, Bell, Users, Bot, UserCheck,
    ShoppingCart, BrainCircuit, Truck, UserPlus, FileSignature, Video,
    Layout, Eye, Mail, FileInput, CloudUpload, Star, PenTool, ThumbsUp,
    XCircle, CheckCircle2, MousePointerClick, Undo2, Headphones, ScanEye, SearchCheck, BarChart3
} from 'lucide-react';
import styles from './Portfolio.module.css';

// Type definition for a Case
interface Case {
    id: number;
    title?: string;
    description?: string;
    categories?: string[];
    mainIcon?: any;
    timeframe?: string;
    kpis?: { label: string; value: string; icon: any }[];
    isTextOnly?: boolean;
    textContent?: string;
}

const cases: Case[] = [
    {
        id: 2,
        title: 'Calificador de Leads',
        description: 'Cualifica prospectos y agenda reuniones.',
        categories: ['Ventas', 'CRM', 'Comunicación'],
        mainIcon: Target,
        timeframe: '2 - 3 Semanas',
        kpis: [
            { label: 'Productividad ventas', value: '+50%', icon: Target },
            { label: 'Velocidad contacto', value: '3x', icon: Zap }
        ]
    },
    {
        id: 3,
        title: 'Soporte al Cliente',
        description: 'Resuelve dudas frecuentes 24/7 sin intervención humana.',
        categories: ['Atención al Cliente', 'Operaciones', 'Comunicación'],
        mainIcon: Headphones,
        timeframe: '3 - 4 Semanas',
        kpis: [
            { label: 'Tiempo de respuesta', value: '-60%', icon: Clock },
            { label: 'Casos resueltos', value: '45%', icon: Bot }
        ]
    },
    {
        id: 11,
        title: 'Gestión de CRM',
        description: 'Mantiene tu base de datos centralizada, limpia y sin esfuerzo manual.',
        categories: ['Ventas', 'CRM', 'Administración'],
        mainIcon: Database,
        timeframe: '2 - 3 Semanas',
        kpis: [
            { label: 'Trabajo manual', value: '-85%', icon: Clock },
            { label: 'Calidad de datos', value: '100%', icon: ShieldCheck }
        ]
    },
    {
        id: 5,
        title: 'Stock Inteligente',
        description: 'Controla inventario en tiempo real y predice quiebres',
        categories: ['Inventario & Logística', 'Operaciones', 'Análisis de Datos'],
        mainIcon: ShoppingCart,
        timeframe: '4 Semanas',
        kpis: [
            { label: 'Ventas perdidas', value: '-25%', icon: TrendingUp },
            { label: 'Revisión manual', value: '-80%', icon: Eye }
        ]
    },
    {
        id: 12,
        isTextOnly: true
    },
    {
        id: 7,
        title: 'Generación de Documentos',
        description: 'Extrae datos y genera reportes legales al instante.',
        categories: ['Legal', 'Administración', 'Operaciones'],
        mainIcon: FileSignature,
        timeframe: '2 - 3 Semanas',
        kpis: [
            { label: 'Tiempo de cierre', value: '-70%', icon: Zap },
            { label: 'Errores manuales', value: '0', icon: ShieldCheck }
        ]
    },
    {
        id: 4,
        title: 'Cobranza automatizada',
        description: 'Detecta fechas de vencimiento y envía recordatorios de pago directamente al WhatsApp del cliente.',
        categories: ['Finanzas', 'Ventas', 'Administración'],
        mainIcon: CreditCard,
        timeframe: '2 Semanas',
        kpis: [
            { label: 'Errores facturación', value: '-95%', icon: ShieldCheck },
            { label: 'Mejora ciclo caja', value: '10 días', icon: TrendingUp }
        ]
    },
    {
        id: 9,
        title: 'Sistema de Reportes',
        description: 'Visualiza tus métricas clave y rendimiento en tiempo real.',
        categories: ['Administración', 'Análisis de Datos', 'Operaciones'],
        mainIcon: BarChart3,
        timeframe: '2 - 3 Semanas',
        kpis: [
            { label: 'Tiempo admin', value: '-90%', icon: Clock },
            { label: 'Precisión datos', value: '100%', icon: ShieldCheck }
        ]
    },
    {
        id: 10,
        title: 'Gestión de Reseñas',
        description: 'Responde reseñas positivas cuidando tu reputación.',
        categories: ['Marketing', 'Atención al Cliente', 'Comunicación'],
        mainIcon: Star,
        timeframe: '1 - 2 Semanas',
        kpis: [
            { label: 'Reseñas respondidas', value: '100%', icon: Clock },
            { label: 'Calificación', value: '+15%', icon: Star }
        ]
    }
];

export default function Portfolio() {
    const gridRef = useRef<HTMLDivElement>(null);
    const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});

    const toggleCard = (id: number) => {
        setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section id="portfolio" className={`${styles.portfolio} bento-section`} ref={gridRef}>
            <GlobalSpotlight gridRef={gridRef} glowColor="9, 188, 138" />
            <div className={styles.contentContainer}>
                <div className={styles.bentoGrid}>
                    <ParticleCard
                        className={`${styles.bentoCard} ${styles.bentoCard0} magic-bento-card magic-bento-card--border-glow`}
                        glowColor="9, 188, 138"
                        particleCount={0}
                        style={{ '--glow-color': '9, 188, 138' } as any}
                    >
                        <div className={styles.introCard}>
                            <h2 className={styles.introTitle}>
                                Lo que <span className={styles.oitoBrand}>oito</span> puede hacer por ti
                            </h2>
                            <p className={styles.introDesc}>
                                Descubre cómo la IA transforma la eficiencia operativa de tu negocio. Haz clic en las tarjetas para ver cómo solucionamos problemas comunes reduciendo tiempos y aumentando la productividad.
                            </p>
                            <div className={styles.introTags}>
                                <span className={styles.introTag}><Bot size={18} /> Agentes de Soporte</span>
                                <span className={styles.introTag}><Target size={18} /> Calificador de Leads</span>
                                <span className={styles.introTag}><FileInput size={18} /> Documentos en Tiempo Récord</span>
                                    <span className={styles.introTag}><CreditCard size={18} /> Cobranza y Facturación</span>
                                </div>
                                <div className={styles.introClickPrompt}>
                                    <MousePointerClick size={16} />
                                    <span>Clickea en cada tarjeta para saber más</span>
                                </div>
                            </div>
                    </ParticleCard>

                    {cases.map((_case, i) => {
                        const index = i + 1;
                        
                        if (_case.isTextOnly) {
                            return (
                                <div key={_case.id} className={`${styles[`bentoCard${index}`]} ${styles.textCardContainer}`}>
                                    <h2 className={styles.textCardTitle}>
                                        <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
                                            Soluciones <span className={styles.gradientText}>reales</span>
                                        </span>
                                        <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
                                            con resultados <span className={styles.gradientText}>reales</span>
                                        </span>
                                    </h2>
                                </div>
                            );
                        }

                        const isFlipped = !!flippedCards[_case.id];

                        return (
                            <ParticleCard
                                key={_case.id}
                                className={`${styles.bentoCard} ${styles[`bentoCard${index}`]} magic-bento-card magic-bento-card--border-glow ${styles.flipContainer}`}
                                glowColor="9, 188, 138"
                                particleCount={0}
                                style={{ '--glow-color': '9, 188, 138' } as any}
                            >
                                <div className={`${styles.flipInner} ${isFlipped ? styles.isFlipped : ''}`} onClick={() => toggleCard(_case.id)}>
                                    
                                    {/* Cara Frontal */}
                                    <div className={styles.flipFront}>
                                        <div className={styles.cardHeader}>
                                            <h3 className={styles.cardTitle}>{_case.title}</h3>
                                            <p className={styles.cardDescription}>{_case.description}</p>
                                            <div className={styles.categoryTags}>
                                                {_case.categories?.map((cat, idx) => (
                                                    <span key={idx} className={styles.categoryTag}>{cat}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className={styles.mainIconWrapper}>
                                            {_case.mainIcon && <_case.mainIcon size={56} className={styles.mainIcon} strokeWidth={1.5} />}
                                            <div className={styles.flipPrompt}>
                                                <MousePointerClick size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cara Trasera */}
                                    <div className={styles.flipBack}>
                                        <h4 className={styles.backSectionTitle}>Resultados Reales</h4>
                                        <div className={styles.kpiColumnBack}>
                                            {_case.kpis?.map((kpi, idx) => (
                                                <div key={idx} className={styles.kpiItem}>
                                                    <div className={styles.kpiIconWrapper}>
                                                        <kpi.icon size={20} className={styles.kpiIcon} />
                                                    </div>
                                                    <div className={styles.kpiContent}>
                                                        <span className={styles.kpiValue}>{kpi.value}</span>
                                                        <span className={styles.kpiLabel}>{kpi.label}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className={styles.backSectionTime}>
                                            <Clock size={14} className={styles.timeIcon} />
                                            <span className={styles.timeText}>Implementación en {_case.timeframe}</span>
                                        </div>
                                        
                                        <div className={styles.flipPrompt}>
                                            <Undo2 size={16} />
                                        </div>
                                    </div>

                                </div>
                            </ParticleCard>
                        );
                    })}
                </div>

                <div className={styles.footerText}>
                    Y muchos más...
                </div>
            </div>
        </section>
    );
}
