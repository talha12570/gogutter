import { useEffect } from 'react';

const setMetaTag = (key: 'name' | 'property', tagName: string, content: string) => {
  let tag = document.querySelector(`meta[${key}="${tagName}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(key, tagName);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

interface SeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
}

export function Seo({ title, description, canonicalPath, keywords }: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMetaTag('name', 'description', description);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');

    if (canonicalPath) {
      const baseUrl = window.location.origin;
      setCanonical(`${baseUrl}${canonicalPath}`);
      setMetaTag('property', 'og:url', `${baseUrl}${canonicalPath}`);
    }
  }, [title, description, canonicalPath, keywords]);

  return null;
}
