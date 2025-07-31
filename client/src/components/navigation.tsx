import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, Flame, ShoppingBag, BookOpen } from "lucide-react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "SERVICES" },
    { href: "#gallery", label: "BUILDS" },
    { href: "#about", label: "ABOUT" },
    { href: "#contact", label: "CONTACT" },
  ];

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-tcc-black/90 backdrop-blur-gritty border-b-2 border-rust/40">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-tcc-orange via-yellow-400 to-tcc-orange"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with industrial styling - clickable to scroll to top */}
            <button 
              onClick={() => scrollToSection("#home")}
              className="flex items-center group cursor-pointer"
            >
              <div className="flex-shrink-0 relative">
                <img src="/images/logo_tcc-primary.png" alt="Turkey Creek Cycles" className="h-40 w-auto filter drop-shadow-lg group-hover:drop-shadow-xl transition-all" />
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-tcc-orange transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            </button>

            {/* Desktop Navigation with industrial styling */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navLinks.map((link, index) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="group relative px-4 py-3 font-oswald text-sm text-chrome hover:text-tcc-orange transition-all duration-300"
                    style={{
                      clipPath: index % 2 === 0 
                        ? 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'
                        : 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 100%, 8px 100%)'
                    }}
                  >
                    <span className="relative z-10 flex items-center">
                      {link.label}
                    </span>
                    <div className="absolute inset-0 bg-steel/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-tcc-orange transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons with extreme styling */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="#"
                className="group relative bg-tcc-orange hover:bg-tcc-orange-bright text-tcc-black px-6 py-3 font-oswald font-bold text-sm transition-all duration-300 overflow-hidden transform hover:scale-105"
                style={{
                  clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'
                }}
              >
                <span className="relative z-10 flex items-center">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  SWAG STORE
                </span>
                <div className="absolute inset-0 flame-gradient opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </a>
              <a
                href="#"
                className="group relative border-2 border-chrome hover:border-tcc-orange text-chrome hover:text-tcc-orange px-6 py-3 font-oswald font-bold text-sm transition-all duration-300 backdrop-blur-gritty transform hover:scale-105"
                style={{
                  clipPath: 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 100%, 8px 100%)'
                }}
              >
                <span className="relative z-10 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  BLOG
                </span>
              </a>
            </div>

            {/* Mobile menu button with industrial styling */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-2 text-chrome hover:text-tcc-orange transition-colors"
              >
                <div className="relative">
                  {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                  <div className="absolute -inset-1 border border-steel rounded opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu with extreme styling */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-tcc-black/95 backdrop-blur-gritty"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 bg-tcc-dark-gray border-l-4 border-tcc-orange shadow-2xl">
            {/* Mobile header */}
            <div className="flex items-center justify-between p-6 border-b border-steel/30">
              <img src="/images/logo_tcc-primary.png" alt="TCC Logo" className="h-10 w-auto" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-chrome hover:text-tcc-orange transition-colors border border-steel rounded"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile navigation */}
            <nav className="p-6 space-y-3">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="group block w-full text-left p-4 text-chrome hover:text-tcc-orange transition-all duration-300 font-oswald border border-steel/30 hover:border-tcc-orange/50 hover:bg-steel/20"
                  style={{
                    clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)'
                  }}
                >
                  <span className="flex items-center">
                    <span className="font-bold tracking-wider">{link.label}</span>
                  </span>
                </button>
              ))}
            </nav>

            {/* Mobile CTA buttons */}
            <div className="p-6 space-y-4 border-t border-steel/30">
              <a
                href="#"
                className="block bg-tcc-orange hover:bg-tcc-orange-bright text-tcc-black px-6 py-4 font-oswald font-bold text-center transition-all transform hover:scale-105"
                style={{
                  clipPath: 'polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)'
                }}
              >
                <ShoppingBag className="w-5 h-5 inline mr-2" />
                SWAG STORE
              </a>
              <a
                href="#"
                className="block border-2 border-chrome hover:border-tcc-orange text-chrome hover:text-tcc-orange px-6 py-4 font-oswald font-bold text-center transition-all backdrop-blur-gritty transform hover:scale-105"
                style={{
                  clipPath: 'polygon(0% 0%, calc(100% - 12px) 0%, 100% 100%, 12px 100%)'
                }}
              >
                <BookOpen className="w-5 h-5 inline mr-2" />
                BLOG
              </a>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="h-0.5 bg-gradient-to-r from-transparent via-tcc-orange to-transparent"></div>
              <div className="text-center mt-3">
                <span className="font-marker text-sm text-copper">"We Build Legends"</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
