import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  noindex?: boolean;
}

export function useSEO({ title, description, noindex = false }: SEOProps) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', window.location.href);

    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.content = 'noindex, follow';
    } else if (robotsMeta) {
      robotsMeta.content = 'index, follow';
    }

    return () => {
      if (noindex && robotsMeta?.parentNode) {
        robotsMeta.content = 'index, follow';
      }
    };
  }, [title, description, noindex]);
}
