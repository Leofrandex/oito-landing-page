// src/components/ui/GlassCard.tsx
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type GlassCardProps = {
  hover?: boolean;
  /** Superficie según el fondo: false = `.glass` (oscuro), true = `.glass-light` (claro). */
  light?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function GlassCard({
  hover = false,
  light = false,
  as: Tag = 'div',
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <Tag
      className={clsx(light ? 'glass-light' : 'glass', hover && 'glass-hover', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
