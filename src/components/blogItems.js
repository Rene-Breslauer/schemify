import React from 'react';
import { Link } from 'gatsby';
import { articles } from '../data/articleData';

// Dynamically build articles array from all exports in articleData.js


export default function BlogItems() {
  // SEO-rich JSON-LD for the blog listing page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'SEO Rich Text Generator Blog',
    url: 'https://schemify.dev/blog',
    mainEntity: articles.map((a) => ({
      '@type': 'BlogPosting',
      headline:      a.title,
      datePublished: a.datePublished,
      url:           `https://schemify.dev${a.slug}`,
      author:        { '@type': 'Organization', name: a.publisherName },
      image:         a.imageUrl,
      description:   a.excerpt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto my-20 space-y-12">
        <h1 className="text-4xl font-bold text-accent">Blog</h1>
        <ul className="space-y-12">
          {articles.map((a) => (
            <li
              key={a.slug}
              className="border border-[rgba(175,252,65,0.2)] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <Link to={`/article/${a.slug}`} className="block">
                <img
                  src={a.imageUrl}
                  alt={a.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-[radial-gradient(circle_at_top_left,_rgba(175,252,65,0.2)_0%,_transparent_60%)]">
                  <h2 className="text-2xl font-semibold text-accent mb-1">
                    {a.title}
                  </h2>
                  <time className="text-sm">
                    {a.datePublished}
                  </time>
                  {/* <p className="mt-2">{a.excerpt}…</p> */}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
