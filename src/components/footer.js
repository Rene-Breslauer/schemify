import React, { useState } from 'react';
import { Link } from 'gatsby';

export default function Footer() {
    return (
      <footer className="bg-black text-gray-300 py-12 relative border-t border-[rgba(175,252,65,0.2)]">
        <div class="
            absolute inset-0
            bg-gradient-to-br from-black/80 via-black/50 to-black/80
            backdrop-blur-lg
        "></div>
        <div class="
            absolute inset-0
            bg-[radial-gradient(circle_at_top_left,_rgba(175,252,65,0.2)_0%,_transparent_60%)]
            filter blur-2xl
            opacity-50
            mix-blend-screen
        "></div>
        <div className="relative w-full z-1 max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">About Us</h3>
            <p className="text-sm leading-relaxed">
              We provide tools to generate Schema.org JSON‑LD and rich text snippets, making
              your Shopify store more discoverable and developer-friendly.
            </p>
          </div>
  
          {/* Quick Links */}
          <div className="hidden">
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/features" className="hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>
  
          {/* Resources */}
          <div className="hidden">
            <h3 className="text-xl font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/docs" className="hover:text-white">Documentation</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/support" className="hover:text-white">Support</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
  
          {/* Contact & Social */}
          <div className="flex flex-col justify-end w-full md:w-fit mr-0 ml-auto">
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
            <p className="text-sm">Email: <a href="mailto:schemifydev@gmail.com" className="hover:text-white">schemifydev@gmail.com</a></p>
            {/* <div className="mt-4 flex space-x-4">
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 19c11 0 16-9 16-16v-1A11.5 11.5 0 0 0 24 2.5a11.2 11.2 0 0 1-3.3.9A5.8 5.8 0 0 0 23.3.4a11.6 11.6 0 0 1-3.7 1.4A5.8 5.8 0 0 0 16.5 0c-3.2 0-5.8 2.6-5.8 5.8 0 .5.1 1 .2 1.4A16.6 16.6 0 0 1 1.3.7a5.8 5.8 0 0 0 1.8 7.7A5.6 5.6 0 0 1 .8 7v.1c0 2.8 2 5.1 4.6 5.6a5.8 5.8 0 0 1-2.6.1A5.8 5.8 0 0 0 7.5 17a11.7 11.7 0 0 1-7.2 2.5A11.2 11.2 0 0 1 0 19 16.4 16.4 0 0 0 8 20"/></svg>
              </a>
              <a href="https://github.com" aria-label="GitHub" className="hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5A12 12 0 0 0 0 12.7c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.2.8-.5v-2c-3.3.7-4-1.4-4-1.4-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1 .1 1.6 1 1.6 1 .9 1.5 2.3 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0C18 4.9 19 5.1 19 5.1c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2.1v3c0 .4.3.6.8.5A12 12 0 0 0 24 12.7 12 12 0 0 0 12 .5"/></svg>
              </a>
            </div> */}
          </div>
        </div>
        <div className="relative z-1 mt-8 text-center text-sm text-white">
          &copy; {new Date().getFullYear()} schemify.dev. All rights reserved.
        </div>
      </footer>
    );
  }