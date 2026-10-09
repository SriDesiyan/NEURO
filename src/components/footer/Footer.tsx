import React from 'react';
import { PROJECT_METADATA } from '../../data/teamData';
import { ArrowUp, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080D] border-t border-[#1E2D3D] py-12 text-xs font-mono">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-[#141F2B]">
          {/* Brand info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#101923] border border-cyan/40 p-1 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  <polygon points="50,4 92,26 92,74 50,96 8,74 8,26" fill="#132130" stroke="#18D4E8" strokeWidth="6" />
                  <circle cx="50" cy="50" r="10" fill="#18D4E8" />
                </svg>
              </div>
              <span className="font-heading font-extrabold text-base text-main">
                Neuro<span className="text-cyan">Symbio</span><span className="text-teal">Mine</span>
              </span>
            </div>

            <p className="text-muted leading-relaxed max-w-md font-sans text-xs">
              {PROJECT_METADATA.tagline}
            </p>

            <div className="flex items-center gap-2 text-dim text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-teal" />
              <span>{PROJECT_METADATA.competition} &bull; Proposal #{PROJECT_METADATA.registrationNo}</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-main font-bold uppercase tracking-wider block mb-1">
              Modules &amp; Layers
            </span>
            <ul className="space-y-1.5 text-muted">
              <li><a href="#twin" className="hover:text-cyan transition-colors">3D Digital Twin</a></li>
              <li><a href="#dashboard" className="hover:text-cyan transition-colors">Operations Dashboard</a></li>
              <li><a href="#pulse" className="hover:text-cyan transition-colors">Pulse Layer Ingestion</a></li>
              <li><a href="#cortex" className="hover:text-cyan transition-colors">Mine Cortex Graph</a></li>
              <li><a href="#memory" className="hover:text-cyan transition-colors">Digital Memory Timeline</a></li>
            </ul>
          </div>

          {/* Scenarios & Team */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-main font-bold uppercase tracking-wider block mb-1">
              Simulation &amp; Project
            </span>
            <ul className="space-y-1.5 text-muted">
              <li><a href="#phantom" className="hover:text-cyan transition-colors">Phantom Twins (A/B/C)</a></li>
              <li><a href="#decisions" className="hover:text-cyan transition-colors">Decision Evolution Engine</a></li>
              <li><a href="#architecture" className="hover:text-cyan transition-colors">8-Tier Architecture</a></li>
              <li><a href="#team" className="hover:text-cyan transition-colors">Research Team</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between text-dim gap-4">
          <div>
            &copy; {new Date().getFullYear()} NeuroSymbioMine &bull; Chennai Institute of Technology. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-cyan transition-colors"
          >
            BACK TO TOP <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
