'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import GlassSurface from './GlassSurface';
import Button from '@/components/ui/Button';
import { WHATSAPP_URL } from '@/lib/constants';
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
    links.map((l) => (
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
    <Button variant="primary" size="sm" external href={WHATSAPP_URL} onClick={() => setOpen(false)}>
      WhatsApp
    </Button>
  );

  return (
    <header className={styles.header}>
      <GlassSurface
        height={60}
        borderRadius={30}
        backgroundOpacity={0.18}
        saturation={1.6}
        distortionScale={-160}
        displace={3}
        className={styles.bar}
      >
        <div className={styles.container}>
          <Link href="/" className={styles.logo} aria-label="oito — inicio">
            <span className="wordmark">oito</span>
          </Link>

          <nav className={styles.desktopNav}>
            {navLinks()}
            {cta}
          </nav>

          <button
            className={styles.hamburger}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </GlassSurface>

      {/* Mobile overlay kept outside GlassSurface (backdrop-filter would trap fixed positioning). */}
      <nav className={clsx(styles.mobileNav, open && styles.open)}>
        {navLinks(() => setOpen(false))}
        {cta}
      </nav>
    </header>
  );
}
