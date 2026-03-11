"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Rólam", href: "#about" },
  { label: "Projektek", href: "#projects" },
  { label: "Képességek", href: "#skills" },
  { label: "Kapcsolat", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "apple-glass" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[980px] mx-auto px-6 flex items-center justify-between h-12">
        {/* Logo */}
        <Link
          href="#"
          className="text-[17px] font-semibold tracking-tight text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
        >
          Portfolio
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[13px] text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center justify-center bg-[#0071e3] text-white text-[13px] font-medium px-4 py-1.5 rounded-full hover:bg-[#0077ed] transition-colors"
        >
          Felveszel?
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menü"
        >
          <span
            className={`block w-5 h-0.5 bg-[#1d1d1f] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#1d1d1f] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#1d1d1f] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden apple-glass border-t border-black/5 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[17px] text-[#1d1d1f] hover:text-[#0071e3] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-[#0071e3] text-white text-[15px] font-medium px-5 py-2.5 rounded-full mt-2 hover:bg-[#0077ed] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Felveszel?
          </a>
        </div>
      )}
    </header>
  );
}
