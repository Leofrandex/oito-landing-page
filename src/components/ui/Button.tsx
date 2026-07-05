import Link from 'next/link';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'default' | 'sm';
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
  children: ReactNode;
};

/** CTA compartido (design-system §3). Render polimórfico: <a> externo, <Link> interno o <button>. */
export default function Button({
  variant = 'primary',
  size = 'default',
  href,
  external = false,
  onClick,
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = clsx(styles.button, styles[variant], size === 'sm' && styles.sm, className);

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}
