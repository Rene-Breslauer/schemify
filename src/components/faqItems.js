import React, { useState } from 'react';

// FAQ entries specific to the Schema Generator site, optimized for SEO
const faqs = [
  {
    question: 'What is the SEO Rich Text Generator?',
    answer: 'The SEO Rich Text Generator is a free web tool that helps you create SEO-friendly structured data markup (JSON-LD) and Shopify snippets for Store, Product, Collection, Blog, and Article pages. Generate schema.org compliant JSON-LD in seconds, paste it into your <head> section, and enhance your site’s search visibility with rich snippets.',
  },
  {
    question: 'Which schema types are supported?',
    answer: 'We support five schema.org types: Store, Product, Collection, Blog, and Article. Each schema includes essential properties—name, description, URL, images, offers, aggregateRating, reviews, and more—to ensure comprehensive structured data and maximum visibility in Google Rich Results.',
  },
  {
    question: 'How do I install the generated schema on my site?',
    answer: 'After generating your JSON-LD snippet, copy the code and paste it between the <head> tags of your HTML template or Shopify theme.liquid file. Save, deploy your site, and verify your structured data with Google’s Rich Results Test or the Schema.org Structured Data Testing Tool.',
  },
  {
    question: 'Can I preview how the schema appears in search results?',
    answer: 'Absolutely. Run your page URL through Google’s Rich Results Test or the Schema.org Validator to preview rich snippets—such as FAQs, product stars, or article previews—and confirm that search engines correctly recognize your structured data.',
  },
  {
    question: 'Is the tool free to use?',
    answer: 'Yes, the SEO Rich Text Generator is 100% free with unlimited schema generations. No signup, subscription, or hidden fees—just instant, SEO-friendly JSON-LD at your fingertips.',
  },
];

export default function FaqItems() {
  const [openIndex, setOpenIndex] = useState(null);

  // Build JSON-LD for FAQPage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* SEO-rich structured data for FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Accordion UI with custom styling and smooth expand/collapse animation */}
      <div className="max-w-2xl mx-auto space-y-4 my-20">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-[rgba(175,252,65,0.2)] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full cursor-pointer flex justify-between items-center px-4 py-3 bg-[radial-gradient(circle_at_top_left,_rgba(175,252,65,0.2)_0%,_transparent_60%)] hover:filter-brightness-125 focus:outline-none backdrop-blur-lg"
                aria-expanded={isOpen}
                aria-controls={`faq-content-${idx}`}
              >
                <span className="font-medium text-accent">
                  {faq.question}
                </span>
                <span className="text-2xl text-accent">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                id={`faq-content-${idx}`}
                className="overflow-hidden transition-max-height duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? '200px' : '0px' }}
              >
                <div className="px-4 py-3 bg-black text-accent">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
