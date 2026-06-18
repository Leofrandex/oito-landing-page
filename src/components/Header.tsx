// src/components/Header.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import styles from './Header.module.css';

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/desarrollo-web', label: 'Desarrollo' },
  { href: '/automatizacion-ia', label: 'Automatización' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className={clsx(styles.header, 'glass')}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="oito inicio">
          <Image src="/oito_logo_2.png" alt="oito" width={75} height={35} priority />
        </Link>
        <button
          className={styles.hamburger}
          onClick={() => setOpen(v => !v)}
          aria-label="Abrir menú" aria-expanded={open}
        >
          <span /><span /><span />
        </button>
        <nav className={clsx(styles.nav, open && styles.open)}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(styles.navLink, pathname === l.href && styles.active)}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/584241344659"
            target="_blank" rel="noopener noreferrer"
            className={styles.cta}
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
