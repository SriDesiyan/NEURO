import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, ChevronDown, Cpu, Database, Layers, Brain, Radio, Network } from 'lucide-react';

interface NavbarProps {
  onEnterTwin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnterTwin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPlatformDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const platformSubItems = [
    { label: 'Pulse Layer (Sensor Ingress)', href: '#pulse', icon: <Radio className="w-3.5 h-3.5 text-cyan" /> },
    { label: 'Mine Cortex (Knowledge Graph)', href: '#cortex', icon: <Network className="w-3.5 h-3.5 text-teal" /> },
    { label: 'Digital Memory (Learned Rules)', href: '#memory', icon: <Database className="w-3.5 h-3.5 text-amber" /> },
    { label: 'Phantom Twins (Parallel Simulation)', href: '#phantom', icon: <Layers className="w-3.5 h-3.5 text-cyan" /> },
    { label: 'Decision Evolution Engine', href: '#decisions', icon: <Brain className="w-3.5 h-3.5 text-teal" /> },
    { label: '8-Tier Technical Architecture', href: '#architecture', icon: <Cpu className="w-3.5 h-3.5 text-cyan" /> },
  ];

  const handleSubLinkClick = (href: string) => {
    setPlatformDropdownOpen(false);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080E14]/95 backdrop-blur-md border-b border-[#243647] shadow-xl py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <a href="#overview" className="flex items-center gap-3 text-decoration-none group">
          <div className="w-9 h-9 rounded bg-[#13202D] border border-[#243647] group-hover:border-[#19C8D8] p-0.5 flex items-center justify-center transition-colors">
            <img
              src="/assets/branding/neurosymbiomine-emblem.png"
              alt="NeuroSymbioMine Emblem"
              className="w-full h-full object-contain rounded"
              onError={(e) => {
                // Fallback to SVG if image not yet loaded
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg tracking-tight text-main leading-tight group-hover:text-cyan transition-colors">
              Neuro<span className="text-cyan">Symbio</span><span className="text-teal">Mine</span>
            </span>
            <span className="font-mono text-[9px] tracking-wider text-dim uppercase">
              Cognitive Digital Twin &bull; CIT
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-mono font-medium tracking-wide">
          <a href="#overview" className="text-muted hover:text-cyan transition-colors uppercase whitespace-nowrap">
            Overview
          </a>
          <a href="#twin" className="text-muted hover:text-cyan transition-colors uppercase whitespace-nowrap">
            Digital Twin
          </a>
          <a href="#demonstrations" className="text-muted hover:text-cyan transition-colors uppercase whitespace-nowrap">
            Demonstrations
          </a>
          <a href="#dashboard" className="text-muted hover:text-cyan transition-colors uppercase whitespace-nowrap">
            Operations
          </a>

          {/* Platform Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setPlatformDropdownOpen(true)}
            onMouseLeave={() => setPlatformDropdownOpen(false)}
          >
            <button
              onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}
              className="flex items-center gap-1 text-muted hover:text-cyan transition-colors uppercase py-1 whitespace-nowrap"
              aria-expanded={platformDropdownOpen}
            >
              <span>Platform</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${platformDropdownOpen ? 'rotate-180 text-cyan' : ''}`} />
            </button>

            {/* Dropdown Menu Panel */}
            {platformDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#0D1A27]/95 backdrop-blur-md border border-[#243647] rounded-lg shadow-2xl p-1.5 z-50 animate-fadeIn">
                <div className="space-y-1">
                  {platformSubItems.map((sub) => (
                    <button
                      key={sub.label}
                      onClick={() => handleSubLinkClick(sub.href)}
                      className="w-full text-left px-3 py-2 rounded text-xs font-mono text-muted hover:text-cyan hover:bg-[#1D3042] flex items-center gap-2.5 transition-colors"
                    >
                      {sub.icon}
                      <span className="truncate">{sub.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="#team" className="text-muted hover:text-cyan transition-colors uppercase whitespace-nowrap">
            Team
          </a>
        </nav>

        {/* Primary CTA and Hackathon Badge */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-[#13202D] border border-[#243647] text-[11px] font-mono text-dim">
            <ShieldCheck className="w-3.5 h-3.5 text-teal" />
            <span>CIL–IMiN 2026</span>
          </div>

          <button
            onClick={onEnterTwin}
            className="btn btn-primary btn-sm font-mono tracking-wider text-xs"
          >
            ENTER DIGITAL TWIN
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={onEnterTwin}
            className="btn btn-primary btn-sm font-mono text-[11px] px-2.5 py-1"
          >
            ENTER TWIN
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded bg-[#13202D] border border-[#243647] text-main hover:text-cyan"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1A27] border-b border-[#243647] px-6 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#243647]">
            <a href="#overview" onClick={() => setMobileMenuOpen(false)} className="text-xs font-mono py-1.5 text-muted hover:text-cyan uppercase">
              Overview
            </a>
            <a href="#twin" onClick={() => setMobileMenuOpen(false)} className="text-xs font-mono py-1.5 text-muted hover:text-cyan uppercase">
              Digital Twin
            </a>
            <a href="#demonstrations" onClick={() => setMobileMenuOpen(false)} className="text-xs font-mono py-1.5 text-muted hover:text-cyan uppercase">
              Demonstrations
            </a>
            <a href="#dashboard" onClick={() => setMobileMenuOpen(false)} className="text-xs font-mono py-1.5 text-muted hover:text-cyan uppercase">
              Operations
            </a>
            <a href="#team" onClick={() => setMobileMenuOpen(false)} className="text-xs font-mono py-1.5 text-muted hover:text-cyan uppercase">
              Team
            </a>
          </div>

          <div className="pt-2">
            <span className="text-[10px] font-mono text-cyan uppercase font-bold tracking-wider block mb-2">
              Platform Modules
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {platformSubItems.map((sub) => (
                <button
                  key={sub.label}
                  onClick={() => handleSubLinkClick(sub.href)}
                  className="w-full text-left py-1 text-xs font-mono text-muted hover:text-cyan flex items-center gap-2"
                >
                  {sub.icon}
                  <span>{sub.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
