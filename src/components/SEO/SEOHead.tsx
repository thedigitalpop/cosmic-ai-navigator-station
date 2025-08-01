import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'podcast' | 'episode';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  podcastData?: {
    episodeNumber?: number;
    duration?: string;
    audioUrl?: string;
  };
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "AI Navigator Station - Digital Pop's Podcast",
  description = "Join Ryan Poplin on AI Navigator Station as we explore the cutting-edge world of artificial intelligence, digital marketing, and business transformation.",
  keywords = "AI, artificial intelligence, digital marketing, business, podcast, Ryan Poplin, Digital Pop",
  image = "/podcast-og-image.jpg",
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = "Ryan Poplin",
  podcastData
}) => {
  // Construct full title
  const fullTitle = title.includes("AI Navigator Station") ? title : `${title} | AI Navigator Station`;
  
  // Construct structured data for episodes
  const structuredData = podcastData ? {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": title,
    "description": description,
    "url": url,
    "datePublished": publishedTime,
    "dateModified": modifiedTime,
    "author": {
      "@type": "Person",
      "name": author
    },
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": "AI Navigator Station",
      "description": "Digital Pop's podcast exploring AI, digital marketing, and business transformation",
      "url": typeof window !== 'undefined' ? window.location.origin : ''
    },
    ...(podcastData.episodeNumber && { "episodeNumber": podcastData.episodeNumber }),
    ...(podcastData.duration && { "duration": podcastData.duration }),
    ...(podcastData.audioUrl && { 
      "associatedMedia": {
        "@type": "AudioObject",
        "contentUrl": podcastData.audioUrl,
        "duration": podcastData.duration
      }
    }),
    ...(image && { "image": image })
  } : {
    "@context": "https://schema.org",
    "@type": type === 'website' ? "WebSite" : "WebPage",
    "name": title,
    "description": description,
    "url": url,
    ...(image && { "image": image })
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'episode' ? 'article' : type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="AI Navigator Station" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@digitalpop" />
      <meta name="twitter:site" content="@digitalpop" />

      {/* Podcast-specific meta tags */}
      {podcastData?.audioUrl && (
        <>
          <meta property="og:audio" content={podcastData.audioUrl} />
          <meta property="og:audio:type" content="audio/mpeg" />
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;