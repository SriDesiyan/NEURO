import React from 'react';
import { ArrowRight, Play, ShieldCheck, Cpu, Layers, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onEnterTwin: () => void;
  onWatchDemonstration: () => void;
  onRunScenario?: () => void;
  onViewDecisionEngine?: () => void;
  onExploreArchitecture: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onEnterTwin,
  onWatchDemonstration,
  onRunScenario,
  onViewDecisionEngine,
  onExploreArchitecture
}) => {
  return (
    <section id="overview" className="relative pt-28 pb-16 overflow-hidden">
      {/* Background glow and subtle cyber grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#19C8D8]/5 via-[#25C9AB]/3 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="container relative z-10">
        {/* Official Banner Hero Integration */}
        <div className="mb-10 rounded-xl overflow-hidden border border-[#243647] shadow-2xl bg-[#0D1A27]">
          <img
            src="/assets/branding/neon-mining-digital-twin-banner.png"
            alt="NeuroSymbioMine Official Project Banner - Cognitive Evolutionary Digital Twin for Mines"
            className="w-full h-auto object-cover max-h-[340px]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Vision & Primary Calls to Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-[#13202D] border border-[#243647] text-xs font-mono">
              <span className="flex items-center gap-1.5 text-cyan font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                CIL–IMiN Hackathon 2026
              </span>
              <span className="text-dim">&bull;</span>
              <span className="text-muted">Prop. #VMDIGITW-2026-0015</span>
              <span className="text-dim">&bull;</span>
              <span className="text-teal font-semibold">Chennai Institute of Technology</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-main">
              THE MINE THAT <br />
              <span className="text-gradient">LEARNS, SIMULATES</span> <br />
              &amp; EVOLVES.
            </h1>

            <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
              NeuroSymbioMine transforms conventional static mining digital twins into cognitive
              operational systems that learn from historical incidents, monitor live spatial conditions,
              simulate parallel futures through <strong>Phantom Twins</strong>, and recommend explainable
              actions for safer and more productive mining.
            </p>

            {/* Call to Actions (TASK 5 Required Controls) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onEnterTwin}
                className="btn btn-primary text-xs sm:text-sm px-5 py-3 font-mono tracking-wider flex items-center gap-2 group"
                title="Explore the interactive 3D mine twin"
              >
                EXPLORE THE TWIN
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onWatchDemonstration}
                className="btn btn-cyan text-xs sm:text-sm px-4 py-3 font-mono tracking-wider flex items-center gap-2"
                title="Watch the 4 verified video demonstrations"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                WATCH DEMONSTRATION
              </button>

              {onRunScenario && (
                <button
                  onClick={onRunScenario}
                  className="btn btn-secondary text-xs sm:text-sm px-4 py-3 font-mono tracking-wider flex items-center gap-2"
                  title="Run Phantom Twins scenario"
                >
                  <Activity className="w-3.5 h-3.5 text-teal" />
                  RUN A SCENARIO
                </button>
              )}

              {onViewDecisionEngine && (
                <button
                  onClick={onViewDecisionEngine}
                  className="btn btn-ghost text-xs sm:text-sm px-4 py-3 font-mono tracking-wider flex items-center gap-2"
                  title="View the Decision Evolution Engine"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan" />
                  VIEW DECISION ENGINE
                </button>
              )}
            </div>

            <p className="text-xs font-mono text-dim flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              Local simulation active &bull; 4 verified project videos &bull; Ready for MQTT &amp; FastAPI IoT ingestion
            </p>
          </div>

          {/* Right Column: High-Impact Operational Preview Cards */}
          <div className="lg:col-span-5 space-y-3">
            {/* Card 1: Cognitive Intelligence Summary */}
            <div className="cyber-panel p-4 bg-[#13202D] border border-[#243647]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan flex items-center gap-1.5 font-bold">
                  <Cpu className="w-3.5 h-3.5" /> MINE CORTEX ENGINE
                </span>
                <span className="cyber-badge badge-teal text-[10px]">COGNITIVE</span>
              </div>
              <p className="text-xs text-muted mb-3 leading-snug">
                Contextual reasoning cross-correlating 134 telemetry streams with 5 years of historical
                geotechnical and maintenance memory.
              </p>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono border-t border-[#1C2836] pt-2.5">
                <div>
                  <div className="text-[10px] text-dim">Telemetry Ingress</div>
                  <div className="font-bold text-main">4,820 /s</div>
                </div>
                <div>
                  <div className="text-[10px] text-dim">Fleet Availability</div>
                  <div className="font-bold text-teal">94.2%</div>
                </div>
                <div>
                  <div className="text-[10px] text-dim">Active Hazards</div>
                  <div className="font-bold text-amber">1 Monitored</div>
                </div>
              </div>
            </div>

            {/* Card 2: Phantom Twins Predictive Simulation */}
            <div className="cyber-panel p-4 bg-[#13202D] border border-[#243647]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-teal flex items-center gap-1.5 font-bold">
                  <Activity className="w-3.5 h-3.5" /> PHANTOM TWINS (A / B / C)
                </span>
                <span className="cyber-badge badge-cyan text-[10px]">SIMULATING</span>
              </div>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded bg-[#0D1A27] border border-[#1C2C3C]">
                  <span className="text-main">Scenario A (Baseline)</span>
                  <span className="text-red font-bold">Risk: 86% (High)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#0E2325] border border-teal/40">
                  <span className="text-teal font-semibold">Scenario B (Predictive PM)</span>
                  <span className="text-teal font-bold">Risk: 14% [Best]</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#0D1A27] border border-[#1C2C3C]">
                  <span className="text-muted">Scenario C (Route Diversion)</span>
                  <span className="text-amber font-bold">Risk: 39% (Med)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
