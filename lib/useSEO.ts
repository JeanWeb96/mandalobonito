import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
}

export function useSEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', window.location.href);
  }, [title, description]);
}
