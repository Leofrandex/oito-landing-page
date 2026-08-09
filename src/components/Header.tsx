'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import GlassSurface from './GlassSurface';
import Button from '@/components/ui/Button';
import { WHATSAPP_URL } from '@/lib/constants';
import styles from './Header.module.css';

const links = [
  { href: '/#casos', label: 'Casos' },
  { href: '/#soluciones', label: 'Soluciones' },
  { href: '/#metodologia', label: 'Metodología' },
  { href: '/#faq', label: 'FAQ' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  /* Escape cierra el menú y devuelve el foco al hamburguesa: sin esto, al
   * cerrar con teclado el foco se quedaba huérfano en un panel invisible. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const handleHashClick =
    (href: string, onClick?: () => void) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith('/#') && pathname === '/') {
        e.preventDefault();
        const id = href.split('#')[1];
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.getElementById(id)?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
        history.pushState(null, '', href.slice(1));
      }
      onClick?.();
    };

  const navLinks = (onClick?: () => void) =>
    links.map((l) => (
      <Link
        key={l.href}
        href={l.href}
        className={clsx(
          styles.navLink,
          !l.href.includes('#') && pathname === l.href && styles.active
        )}
        onClick={handleHashClick(l.href, onClick)}
      >
        {l.label}
      </Link>
    ));

  const desktopCta = (
    <Button variant="primary" size="sm" external href={WHATSAPP_URL} onClick={() => setOpen(false)}>
      WhatsApp
    </Button>
  );

  const mobileCta = (
    <Button variant="primary" external href={WHATSAPP_URL} onClick={() => setOpen(false)}>
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
          <Link href="/" className={styles.logo} aria-label="oito, inicio">
            <span className="wordmark">oito</span>
          </Link>

          <nav className={styles.desktopNav}>
            {navLinks()}
            {desktopCta}
          </nav>

          <button
            ref={hamburgerRef}
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
      {/* Velo: cierra al tocar fuera. Se transiciona por opacidad (no display),
        * si no el fade no llegaría a verse. */}
      <div
        className={clsx(styles.scrim, open && styles.scrimOpen)}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      {/* `inert` saca los enlaces del orden de tabulación y del árbol de
        * accesibilidad mientras el panel está fuera de pantalla, sin recurrir a
        * display:none (que mataría la transición). */}
      <nav className={clsx(styles.mobileNav, open && styles.open)} inert={!open}>
        {navLinks(() => setOpen(false))}
        {mobileCta}
      </nav>
    </header>
  );
}
