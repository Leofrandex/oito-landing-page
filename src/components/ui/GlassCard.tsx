// src/components/ui/GlassCard.tsx
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type GlassCardProps = {
  variant?: 'glass' | 'strong';
  hover?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function GlassCard({
  variant = 'glass',
  hover = false,
  as: Tag = 'div',
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <Tag
      className={clsx(variant === 'strong' ? 'glass-strong' : 'glass', hover && 'glass-hover', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
