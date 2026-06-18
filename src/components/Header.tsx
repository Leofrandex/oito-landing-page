// src/components/Header.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import GlassSurface from './GlassSurface';
import styles from './Header.module.css';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/desarrollo-web', label: 'Desarrollo' },
  { href: '/automatizacion-ia', label: 'Automatización' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = (onClick?: () => void) =>
    links.map(l => (
      <Link
        key={l.href}
        href={l.href}
        className={clsx(styles.navLink, pathname === l.href && styles.active)}
        onClick={onClick}
      >
        {l.label}
      </Link>
    ));

  const cta = (
    <a
      href="https://wa.me/584241344659"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.cta}
      onClick={() => setOpen(false)}
    >
      WhatsApp
    </a>
  );

  return (
    <header className={styles.header}>
      <GlassSurface
        height={62}
        borderRadius={31}
        backgroundOpacity={0.18}
        saturation={1.6}
        distortionScale={-160}
        blur={9}
        displace={3}
        className={styles.bar}
      >
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="oito inicio">
            <Image src="/oito_logo_2.png" alt="oito" width={75} height={35} priority />
          </Link>

          <nav className={styles.desktopNav}>
            {navLinks()}
            {cta}
          </nav>

          <button
            className={styles.hamburger}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </GlassSurface>

      {/* Mobile overlay nav — kept OUTSIDE GlassSurface so its position:fixed
          is relative to the viewport (backdrop-filter would otherwise trap it). */}
      <nav className={clsx(styles.mobileNav, open && styles.open)}>
        {navLinks(() => setOpen(false))}
        {cta}
      </nav>
    </header>
  );
}
