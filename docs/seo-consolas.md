# Consolas de búsqueda — pasos del usuario

## Google Search Console (hacer tras publicar en oitove.com)
1. Entrar a https://search.google.com/search-console con la cuenta Google del negocio.
2. Añadir propiedad → "Prefijo de URL" → `https://oitove.com`.
3. Método de verificación "Etiqueta HTML": copiar SOLO el valor de `content="..."`.
4. En Vercel → Settings → Environment Variables: `NEXT_PUBLIC_GSC_VERIFICATION` = ese valor → redeploy.
5. Volver a Search Console → Verificar.
6. Sitemaps → enviar `https://oitove.com/sitemap.xml`.
7. A los pocos días: revisar Cobertura (la única URL indexable es `/`).

## Bing Webmaster Tools (opcional, alimenta a Copilot)
1. https://www.bing.com/webmasters → "Importar desde Google Search Console" (un clic, hereda la verificación).
2. Enviar el mismo sitemap.

## IndexNow (opcional)
Con Bing Webmaster activo, usar "URL Submission" manual tras deploys con cambios de contenido. Automatizarlo queda fuera de alcance mientras el sitio sea estático.
