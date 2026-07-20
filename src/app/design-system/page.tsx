// src/app/design-system/page.tsx
import { notFound } from 'next/navigation';
import DesignSystemClient from './DesignSystemClient';

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <DesignSystemClient />;
}
