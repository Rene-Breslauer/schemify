// src/schemas/shopifySnippets.js

export const shopifySchemas = {
    Store: `
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@graph": [
    {
        "@type": "Organization",
        "name": {{ shop.name | json }},
        "url": {{ shop.url | json }},
        "logo": {{ shop.logo | img_url: '200x200' | json }},
        "sameAs": [
        {% if shop.facebook %}
            {{ shop.facebook | json }}{% if shop.instagram or shop.twitter %},{% endif %}
        {% endif %}
        {% if shop.instagram %}
            {{ shop.instagram | json }}{% if shop.twitter %},{% endif %}
        {% endif %}
        {% if shop.twitter %}
            {{ shop.twitter | json }}
        {% endif %}
        ]
    },
    {
        "@type": "WebSite",
        "url": {{ shop.url | json }},
        "name": {{ shop.name | json }},
        "potentialAction": {
        "@type": "SearchAction",
        "target": {{ shop.url | append: '/search?q={search_term_string}' | json }},
        "query-input": "required name=search_term_string"
        }
    }
    ]
}
</script>
    `,
  
    Product: `
<script type="application/ld+json">
{
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": {{ product.title | json }},
    "image": [
    {% for img in product.images %}
        {{ img.src | img_url: '800x800' | prepend: '"' | append: '"' }}{% unless forloop.last %},{% endunless %}
    {% endfor %}
    ],
    "description": {{ product.description | strip_newlines | json }},
    "sku": {{ product.selected_or_first_available_variant.sku | json }},
    "brand": {
    "@type": "Brand",
    "name": {{ shop.name | json }}
    },
    "offers": {
    "@type": "Offer",
    "url": {{ shop.url | append: product.url | json }},
    "priceCurrency": {{ shop.currency | json }},
    "price": {{ product.price | money_without_currency | json }},
    "availability": "https://schema.org/{% if product.available %}InStock{% else %}OutOfStock{% endif %}"
    }{% if product.reviews_count > 0 %},
    "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": {{ product.reviews_rating | round: 1 }},
    "reviewCount": {{ product.reviews_count }}
    },
    "review": [
    {% for review in product.reviews %}
        {
        "@type": "Review",
        "author": {{ review.author | json }},
        "datePublished": {{ review.published_at | date: "%Y-%m-%d" | json }},
        "reviewBody": {{ review.body | strip_newlines | json }},
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": {{ review.rating }},
            "bestRating": "5",
            "worstRating": "1"
        }
        }{% unless forloop.last %},{% endunless %}
    {% endfor %}
    ]
    {% endif %}
}
</script>
    `,
  
    Collection: `
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": {{ collection.title | json }},
    {% if collection.description != blank %}
    "description": {{ collection.description | strip_newlines | json }},
    {% endif %}
    "url": {{ shop.url | append: collection.url | json }},
    "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
        {% for product in collection.products %}
        {
            "@type": "ListItem",
            "position": {{ forloop.index }},
            "url": {{ shop.url | append: product.url | json }},
            "image": {{ product.featured_image.src | img_url: '300x300' | prepend: '"' | append: '"' }},
            "name": {{ product.title | json }}
        }{% unless forloop.last %},{% endunless %}
        {% endfor %}
    ]
    }
}
</script>
    `,
  
    Blog: `
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": {{ blog.title | json }},
    "description": {{ blog.description | strip_newlines | json }},
    "url": {{ shop.url | append: blog.url | json }},
    "blogPost": [
    {% for article in blog.articles %}
        {
        "@type": "BlogPosting",
        "headline": {{ article.title | json }},
        "url": {{ shop.url | append: article.url | json }},
        "datePublished": {{ article.published_at | date: "%Y-%m-%d" | json }},
        "author": {
            "@type": "Person",
            "name": {{ article.author | json }}
        }
        }{% unless forloop.last %},{% endunless %}
    {% endfor %}
    ]
}
</script>
    `,
  
    Article: `
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": {{ article.title | json }},
    "author": {
    "@type": "Person",
    "name": {{ article.author | json }}
    },
    "datePublished": {{ article.published_at | date: "%Y-%m-%d" | json }},
    "image": [
    {% if article.image %}
        {{ article.image.src | img_url: '1024x1024' | prepend: '"' | append: '"' }}
    {% endif %}
    ],
    "articleBody": {{ article.content | strip_html | strip_newlines | json }},
    "publisher": {
    "@type": "Organization",
    "name": {{ shop.name | json }},
    "logo": {
        "@type": "ImageObject",
        "url": {{ shop.logo | img_url: '200x200' | json }}
    }
    }
}
</script>
    `
  };
  

