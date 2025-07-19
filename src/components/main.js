import React, { useState } from 'react';
import Field from '../snippets/field';
import CopyButton from '../snippets/copyButton';
import { shopifySchemas } from '../schemas/shopifySchemas';
import ReactGA from "react-ga4"

// Supported schema types
const schemaTypes = ['Store', 'Product', 'Collection', 'Blog', 'Article'];

// Dropdown for selecting schema type
function SchemaTypeSelector({ value, onChange }) {
  return (
    <div>
      <label className="block font-semibold mb-4">Schema Type</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full p-2 border rounded"
      >
        {schemaTypes.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

// Main generator component
export default function SchemaGenerator() {
  const [activeTab, setActiveTab] = useState('builder'); // 'builder' or 'shopify'
  const [schemaType, setSchemaType] = useState('Store');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // Store fields
  const [url, setUrl] = useState('');
  const [telephone, setTelephone] = useState('');
  // Product fields
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  // Article fields
  const [author, setAuthor] = useState('');
  const [datePublished, setDatePublished] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // Output
  const [output, setOutput] = useState('');
  const [copiedBuilder, setCopiedBuilder] = useState(false);
  const [copiedShopify, setCopiedShopify] = useState(false);

  // ─── NEW STATE HOOKS ────────────────────────────────────────────────
  // Store
  const [logoUrl, setLogoUrl] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');

  // Product
  const [imageUrls, setImageUrls] = useState('');          // comma‑separated
  const [brand, setBrand] = useState('');
  const [availability, setAvailability] = useState('InStock');
  const [productUrl, setProductUrl] = useState('');

  // Collection
  const [collectionItems, setCollectionItems] = useState(''); // comma‑separated URLs

  // Blog
  const [blogPosts, setBlogPosts] = useState('');           // title|url, comma‑separated

  // Article
  const [publisher, setPublisher] = useState('');
  const [publisherLogo, setPublisherLogo] = useState('');
  const [articleBody, setArticleBody] = useState('');

   // **Missing Store fields**
   const [email, setEmail] = useState('')
   const [streetAddress, setStreetAddress] = useState('')
   const [addressLocality, setAddressLocality] = useState('')
   const [addressRegion, setAddressRegion] = useState('')
   const [postalCode, setPostalCode] = useState('')
   const [openingHours, setOpeningHours] = useState('') // e.g. "Mo–Fr 09:00–18:00"
 
   // ─── Product extras ─────────────────────────────────────────────
   // **Missing Product review fields**
   const [reviewsCount, setReviewsCount] = useState('')
   const [reviewsRating, setReviewsRating] = useState('')
   const [reviewsList, setReviewsList] = useState('') 




  const generateSchema = () => {
    gtag('event', 'generate_json_ld', {
      schema_type: schemaType,
      website_url: url
    });

    const obj = {
      '@context': 'https://schema.org',
      '@type': schemaType,
    };

    switch (schemaType) {
        case "Store":
          Object.assign(obj, {
            name:        name,
            description: description,
            url:         url,
            logo:        logoUrl,
            telephone:   telephone,
            email:       email,
            address: {
              "@type":           "PostalAddress",
              streetAddress,
              addressLocality,
              addressRegion,
              postalCode
            },
            openingHours,               // e.g. "Mo–Fr 09:00–18:00"
            sameAs: [facebook, instagram, twitter].filter(Boolean),
          });
          break;
    
        case "Product":
          Object.assign(obj, {
            name:        name,
            description: description,
            sku:         sku,
            image:       imageUrls.split(/\s*,\s*/),
            brand:       { "@type": "Brand", name: brand },
            offers: {
              "@type":         "Offer",
              url:             productUrl,
              price:           price,
              priceCurrency:   currency,
              availability:    `https://schema.org/${availability}`,
            },
          });
    
          // reviews
          if (+reviewsCount > 0) {
            obj.aggregateRating = {
              "@type":       "AggregateRating",
              ratingValue:  parseFloat(reviewsRating),
              reviewCount:  parseInt(reviewsCount, 10),
            };
    
            obj.review = reviewsList
              .split(/\s*,\s*/)
              .map(entry => {
                const [author, datePublished, reviewBody, rating] =
                  entry.split("|").map(s => s.trim());
                return {
                  "@type":       "Review",
                  author,
                  datePublished,
                  reviewBody,
                  reviewRating: {
                    "@type":      "Rating",
                    ratingValue: Number(rating),
                    bestRating:  "5",
                    worstRating: "1"
                  }
                };
              });
          }
          break;
    
        case "Collection":
          Object.assign(obj, {
            name:        name,
            description: description,
            url:         url,
            mainEntity:  {
              "@type":            "ItemList",
              itemListElement:   collectionItems.split(/\s*,\s*/).map((u, i) => ({
                "@type":   "ListItem",
                position:  i + 1,
                url:       u.trim(),
              }))
            }
          });
          break;
    
        case "Blog":
          Object.assign(obj, {
            name:        name,
            description: description,
            url:         url,
            blogPost:    blogPosts.split(/\s*,\s*/).map(item => {
              const [headline, link] = item.split("|").map(s => s.trim());
              return {
                "@type":   "BlogPosting",
                headline,
                url:       link
              };
            })
          });
          break;
    
        case "Article":
          Object.assign(obj, {
            headline:      name,
            author:        author,
            datePublished: datePublished,
            image:         imageUrl,
            publisher: {
              "@type": "Organization",
              name:     publisher,
              logo: {
                "@type": "ImageObject",
                url:     publisherLogo
              }
            },
            articleBody:   articleBody
          });
          break;
      }
    

    const pretty = JSON.stringify(obj, null, 2);
    const snippet = [
      '<script type="application/ld+json">',
      pretty,
      '</script>',
    ].join('\n');

    setOutput(snippet);
  };

  // Generate Shopify rich text snippet based on selected type
  const getShopifySnippet = () => {
    return shopifySchemas[schemaType] || '';
  };

  const copyToClipboard = (text, isShopify) => {
    gtag('event', 'copied_to_clipboard', {
      schema_type: schemaType,
      website_url: url
    });
    navigator.clipboard.writeText(text);
    if (isShopify) {
      setCopiedShopify(true);
      setTimeout(() => setCopiedShopify(false), 2000);
    } else {
      setCopiedBuilder(true);
      setTimeout(() => setCopiedBuilder(false), 2000);
    }
  };



  return (
    <div className="max-w-7xl mx-auto pt-10 px-4 pb-4 mb-20 min-h-[700px]">
      <h1 className="text-2xl font-bold text-center mb-4">SEO Rich Text Generator</h1>
      <p className="!mx-auto text-center mb-8 text-white">Turn your store, product, or article details into SEO‑friendly Schema.org markup and Shopify snippets with a few clicks. 🚀</p>
      {/* Tabs */}
      <div className="flex border-b border-accent mt-4 mb-8">
        <button
          onClick={() => setActiveTab('builder')}
          className={`px-4 py-2 -mb-px font-semibold cursor-pointer ${activeTab === 'builder' ? 'border-b-4 border-accent' : ''}`}
        >Rich Text Builder</button>
        <button
          onClick={() => setActiveTab('shopify')}
          className={`px-4 py-2 -mb-px font-semibold cursor-pointer ${activeTab === 'shopify' ? 'border-b-4 border-accent' : ''}`}
        >Shopify Rich Text</button>
      </div>
      <div className="flex flex-col md:flex-row gap-8 h-full">
      {/* Tab Panels */}
      {activeTab === 'builder' && (
        <div className="space-y-4 overflow-y-auto w-full md:w-1/2 px-1 pb-2">
          <SchemaTypeSelector value={schemaType} onChange={setSchemaType} />

          {schemaTypes.includes(schemaType) && (
                <>
                    <Field
                    label={schemaType === 'Article' ? 'Headline' : 'Name'}
                    value={name}
                    onChange={setName}
                    placeholder={`Enter ${schemaType} ${schemaType === 'Article' ? 'headline' : 'name'}`}
                    />
                    <Field
                    label="Description"
                    type="textarea"
                    value={description}
                    onChange={setDescription}
                    placeholder="Enter description"
                    />
                </>
                )}

                {schemaType === 'Store' && (
                <>
                    <Field label="URL" value={url} onChange={setUrl} placeholder="https://example.com" />
                    <Field label="Logo URL" value={logoUrl} onChange={setLogoUrl} placeholder="https://example.com/logo.png" />
                    <Field label="Telephone" value={telephone} onChange={setTelephone} placeholder="+1‑555‑123‑4567" />
                    <Field
                    label="Facebook URL"
                    value={facebook}
                    onChange={setFacebook}
                    placeholder="https://facebook.com/yourpage"
                    />
                    <Field
                    label="Instagram URL"
                    value={instagram}
                    onChange={setInstagram}
                    placeholder="https://instagram.com/yourpage"
                    />
                    <Field
                    label="Twitter URL"
                    value={twitter}
                    onChange={setTwitter}
                    placeholder="https://twitter.com/yourpage"
                    />
                </>
                )}

                {schemaType === 'Product' && (
                <>
                    <Field label="SKU" value={sku} onChange={setSku} placeholder="Product SKU" />
                    <Field label="Price" value={price} onChange={setPrice} placeholder="0.00" />
                    <Field label="Currency" value={currency} onChange={setCurrency} placeholder="USD" />
                    <Field
                    label="Image URLs (comma‑separated)"
                    value={imageUrls}
                    onChange={setImageUrls}
                    placeholder="https://…1.jpg, https://…2.jpg"
                    />
                    <Field label="Brand Name" value={brand} onChange={setBrand} placeholder="Brand name" />
                    <Field
                    label="Availability"
                    value={availability}
                    onChange={setAvailability}
                    placeholder="InStock or OutOfStock"
                    />
                    <Field
                    label="Product URL"
                    value={productUrl}
                    onChange={setProductUrl}
                    placeholder="https://example.com/product"
                    />
                </>
                )}

                {schemaType === 'Collection' && (
                <>
                    <Field label="URL" value={url} onChange={setUrl} placeholder="https://example.com/collection" />
                    <Field
                    label="Product URLs (comma‑separated)"
                    value={collectionItems}
                    onChange={setCollectionItems}
                    placeholder="https://…/prod1, https://…/prod2"
                    />
                </>
                )}

                {schemaType === 'Blog' && (
                <>
                    <Field label="URL" value={url} onChange={setUrl} placeholder="https://example.com/blog" />
                    <Field
                    label="Articles (title | URL, comma‑separated)"
                    value={blogPosts}
                    onChange={setBlogPosts}
                    placeholder="Post 1 | https://…, Post 2 | https://…"
                    />
                </>
                )}

                {schemaType === 'Article' && (
                <>
                    <Field label="Author" value={author} onChange={setAuthor} placeholder="Author name" />
                    <Field
                    label="Date Published"
                    value={datePublished}
                    onChange={setDatePublished}
                    placeholder="YYYY-MM-DD"
                    />
                    <Field
                    label="Image URL"
                    value={imageUrl}
                    onChange={setImageUrl}
                    placeholder="https://example.com/image.jpg"
                    />
                    <Field
                    label="Publisher Name"
                    value={publisher}
                    onChange={setPublisher}
                    placeholder="Organization name"
                    />
                    <Field
                    label="Publisher Logo URL"
                    value={publisherLogo}
                    onChange={setPublisherLogo}
                    placeholder="https://example.com/logo.png"
                    />
                    <Field
                    label="Article Body"
                    type="textarea"
                    value={articleBody}
                    onChange={setArticleBody}
                    placeholder="Full article text"
                    />
                </>
                )}

          {activeTab === 'shopify' &&   (
            <>
             <div className="flex flex-col items-start mt-8">
             <p>
             <span className="text-left text-sm font-semibold">How to Install:</span></p>
             <span className="text-left text-sm text-gray-500">
                 <ol className="list-decimal list-inside">
                 <li>Copy the JSON-LD snippet from the Builder tab.</li>
                 <li>Go to your Shopify admin panel.</li>
                 <li>Navigate to Settings > SEO & Search > Schema.org Markup.</li>
                 <li>Paste the snippet into the field and save.</li>
                 </ol>
             </span>
             </div>
             </>
          )}
            

          <button onClick={generateSchema} className="btn--primary w-full">
            Generate JSON-LD
          </button>
        </div>
      )}

      {activeTab === 'shopify' && (
        <>
          <div className="space-y-4 px-1 pb-2 w-full md:w-1/2">
            <SchemaTypeSelector value={schemaType} onChange={setSchemaType} />
            <div className="flex flex-col mt-8">
            <span className="text-sm font-semibold mb-2">How to install on your Shopify store:</span>
            <ol className="list-decimal list-inside ml-4 space-y-1">
                <li>Copy the JSON‑LD snippet from the Builder tab.</li>
                <li>In your Shopify admin, go to <strong>Online Store → Themes</strong>.</li>
                <li>Next to your live theme, click <strong>Actions → Edit code</strong>.</li>
                <li>In the file list, open <code>layout/theme.liquid</code> (or your main layout file).</li>
                <li>Inside the <code>&lt;head&gt;…&lt;/head&gt;</code> section, paste your JSON‑LD snippet. </li>
                <li>Click <strong>Save</strong> and then preview your store.</li>
                <li>Verify via <a  
                    className="text-blue-500 underline" 
                    href="https://search.google.com/test/rich-results" 
                    target="_blank" rel="noopener noreferrer">
                    Google’s Rich Results Test
                </a>.
                </li>
            </ol>
            </div>
          </div>
          <div className="space-y-4 w-full md:w-1/2">
          <label className="flex justify-between items-center font-semibold mb-1">Shopify Rich Text Snippet
          <div className="flex items-center gap-2">
            {copiedShopify && <span className="ml-2 text-xs">Copied!✨</span>}
            <CopyButton title="Copy Shopify snippet" text={getShopifySnippet()} onClick={() => copyToClipboard(getShopifySnippet(), true)} />
          </div>
          </label>
          <textarea
            readOnly
            rows={8}
            value={getShopifySnippet()}
            className="w-full p-2 border rounded font-mono text-sm bg-gray-100 min-h-[500px]"
          />
          </div>
          
        </>
      )}

      {/* Output panel only for builder */}
      {activeTab === 'builder' && (
        <div className="flex flex-col h-full sticky top-20 w-full md:w-1/2">
          <label className="flex justify-between items-center font-semibold mb-1">
            Generated JSON-LD
            <div className="flex items-center gap-2">
            {copiedBuilder && <span className="ml-2 text-xs">Copied!✨</span>}
            <CopyButton title="Copy JSON‑LD snippet" text={output} onClick={() => copyToClipboard(output, false)} />
            </div>
          </label>
          <textarea
            readOnly
            rows={8}
            value={output}
            className="h-full max-h-[700px] w-full p-2 border font-mono text-sm bg-gray-100 resize-none min-h-[500px]"
          />
          <div className="flex flex-col mt-8">
          <span className="flex text-sm font-semibold mb-2">How to install:</span>
            <ol className="list-decimal list-inside ml-4">
            <li>Copy the JSON‑LD snippet from the Builder tab.</li>
            <li>Open your site’s HTML template (or your CMS/theme header include).</li>
            <li>Paste the snippet anywhere inside the <code>&lt;head&gt;</code> section.</li>
            <li>Save your changes and publish (or rebuild) your site.</li>
            <li>Verify via <a  
                    className="text-blue-500 underline" 
                    href="https://search.google.com/test/rich-results" 
                    target="_blank" rel="noopener noreferrer">
                    Google’s Rich Results Test
                </a>.
            </li>
            </ol>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
