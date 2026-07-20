import { redirect } from 'next/navigation';

/* Página oculta temporalmente (2026-07-19): el servicio de desarrollo web
 * se conversa por WhatsApp. Los componentes Dev* y ServiceHero se conservan
 * para cuando la página vuelva a publicarse. */
export const metadata = {
  robots: { index: false, follow: false },
};

export default function DesarrolloWebPage() {
  redirect('/');
}
