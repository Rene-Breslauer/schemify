import React, { useState } from 'react';
import { Link } from 'gatsby';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigation = [
    { name: 'FAQ', to: '/faq' },
    { name: 'Blog', to: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-blend-hard-light shadow-[0_0_40px_rgba(175,252,65,0.1)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800 text-accent text-decoration-none">
              schemify.dev
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="flex space-x-8
          ">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                'Open'
              ) : (
                'Close'
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
