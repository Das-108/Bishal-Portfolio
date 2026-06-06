// import React from 'react';
// import { RiSunFill, RiMoonFill } from 'react-icons/ri';

// const Navbar = ({ toggleDarkMode, isDarkMode }) => {
//   const navItems = [
//     { label: 'Home', id: 'hero' },
//     { label: 'About', id: 'aboutme' },
//     { label: 'Skills', id: 'skills' },
//     { label: 'Certificates', id: 'certificates' },
//     { label: 'Contact', id: 'contact' },
//   ];

//   const handleScroll = (id) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <header className="fixed top-0 w-full z-50 bg-(--bg-primary)/80 backdrop-blur-md border-b border-border transition-colors duration-300">
//       <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="font-heading text-2xl font-semibold" style={{ color: 'var(--text-default)' }}>
//           Bishal Gaihre
//         </div>

//         {/* Nav Links */}
//         <nav className="hidden md:flex space-x-8">
//           {navItems.map(({ label, id }) => (
//             <button
//               key={id}
//               onClick={() => handleScroll(id)}
//               className="text-(--text-default) hover:text-accent transition-colors"
//             >
//               {label}
//             </button>
//           ))}
//         </nav>

//         {/* Dark Mode Toggle */}
//         <button
//           onClick={toggleDarkMode}
//           className="text-2xl text-(--text-default) hover:text-accent transition-colors"
//         >
//           {isDarkMode ? <RiSunFill /> : <RiMoonFill />}
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

"use client";

import React, { useState } from "react";
import { Menu, X, Code2 } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Certificates", href: "#certificates" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-800/40 bg-zinc-950/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo Identity */}
        <a href="#home" className="flex items-center gap-2 font-mono text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
          <Code2 className="w-5 h-5 text-zinc-400" />
          <span>BISHAL.G</span>
        </a>

        {/* Desktop Navigation Link Arrays */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200">
              {link.label}
            </a>
          ))}
          <a href="/assets/Bishal_Gaihre_CV.pdf" download className="text-xs font-mono font-bold bg-white text-zinc-950 px-4 py-2 rounded-md hover:bg-zinc-200 transition-colors">
            RESUME
          </a>
        </nav>

        {/* Responsive Mobile Device Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none" aria-label="Toggle Navigation Menu">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation Context Screen */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-zinc-950 border-b border-zinc-800 px-6 py-6 space-y-4 flex flex-col transition-all">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setIsOpen(false)} className="text-base font-medium text-zinc-400 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
          <a href="/assets/Bishal_Gaihre_CV.pdf" download className="text-sm font-mono font-bold bg-zinc-800 text-white py-3 rounded-md text-center block hover:bg-zinc-700 transition-colors">
            DOWNLOAD RESUME
          </a>
        </div>
      )}
    </header>
  );
}