import React from 'react';
import { Link } from 'gatsby';
import Header from '../components/header';
import Footer from '../components/footer';

export default function ArticleTemplate({ pageContext }) {
  const { article } = pageContext;

  // Build SEO-rich JSON-LD snippet
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline:      article.title,
    author:        { '@type': 'Person', name: article.author },
    datePublished: article.datePublished,
    image:         [article.imageUrl],
    publisher:     {
      '@type': 'Organization',
      name:    article.publisherName,
      logo:    { '@type': 'ImageObject', url: article.publisherLogo },
    },
    articleBody:   article.body,
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-3xl mx-auto my-20 px-4">
        <h1 className="text-4xl font-bold text-accent mb-6">{article.title}</h1>
        <p className="text-sm text-gray-400 mb-4">
          By <span className="text-accent font-semibold">{article.author}</span> on{' '}
          <time dateTime={article.datePublished}>{article.datePublished}</time>
        </p>
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full rounded-lg mb-8 drop-shadow-lg"
          />
        )}
        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{
            __html: article.body
              .split('\n\n')
              .map((p) => `<p>${p}</p>`)
              .join(''),
          }}
        />
        <div className="mt-12">
          <Link to="/blog" className="text-accent hover:underline">
            ← Back to Blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}