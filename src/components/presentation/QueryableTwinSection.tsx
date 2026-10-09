import React from 'react';
import { Box, Network, Activity, ArrowRight, Layers, Cpu, ShieldCheck } from 'lucide-react';

interface QueryableTwinSectionProps {
  onEnterTwin: () => void;
  onOpenKnowledgeGraph: () => void;
  onOpenOperations: () => void;
}

export const QueryableTwinSection: React.FC<QueryableTwinSectionProps> = ({
  onEnterTwin,
  onOpenKnowledgeGraph,
  onOpenOperations
}) => {
  return (
    <section className="section-padding bg-[#0D1A27] border-t border-[#243647]">
      <div className="container">
        {/* Section Head: Text-Led and Spacious */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold text-cyan tracking-wider uppercase block mb-2">
            Cognitive Foundations &bull; Architecture Differentiator
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-main tracking-tight leading-tight mb-4">
            A twin you can query, <br className="hidden sm:inline" />
            <span className="text-gradient">not just scenery.</span>
          </h2>
          <p className="text-base text-muted leading-relaxed">
            Most digital twins are a 3D viewer with a database behind it. NeuroSymbioMine is the
            other way round: a cognitive graph of the operation that happens to render in 3D.
            Every question, tour, simulation, and alert traverses the same interconnected model.
          </p>
        </div>

        {/* 3 Horizontally Aligned Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Panel 1: Your Mine in 3D */}
          <article className="cyber-panel p-6 bg-[#13202D] border border-[#243647] flex flex-col justify-between hover:border-[#19C8D8] transition-colors">
            <div>
              <div className="w-10 h-10 rounded bg-[#172635] border border-[#243647] flex items-center justify-center text-cyan mb-4">
                <Box className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-main mb-2">
                Your mine in 3D
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                Terraced open-pit terrain from drone photogrammetry and mine surveys. The pit benches,
                the crusher hub, the overland conveyor, and the haul roads. Every row of the asset
                register becomes an interactive, placed, typed twin.
              </p>
            </div>
            <button
              onClick={onEnterTwin}
              className="text-xs font-mono font-bold text-cyan hover:underline flex items-center gap-1.5 pt-4 border-t border-[#1C2836]"
            >
              EXPLORE 3D ENVIRONMENT <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </article>

          {/* Panel 2: A Graph, Not a Folder Tree */}
          <article className="cyber-panel p-6 bg-[#13202D] border border-[#243647] flex flex-col justify-between hover:border-[#25C9AB] transition-colors">
            <div>
              <div className="w-10 h-10 rounded bg-[#172635] border border-[#243647] flex items-center justify-center text-teal mb-4">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-main mb-2">
                A graph, not a folder tree
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                Machinery, haul ramps, sensors, work orders, and historical incidents are linked the way
                they connect on site. A haul truck knows its active switchback gradient, its bearing
                vibration history, and its destination crusher.
              </p>
            </div>
            <button
              onClick={onOpenKnowledgeGraph}
              className="text-xs font-mono font-bold text-teal hover:underline flex items-center gap-1.5 pt-4 border-t border-[#1C2836]"
            >
              TRAVERSE MINE CORTEX GRAPH <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </article>

          {/* Panel 3: Telemetry, Live and Typed */}
          <article className="cyber-panel p-6 bg-[#13202D] border border-[#243647] flex flex-col justify-between hover:border-[#E4A12D] transition-colors">
            <div>
              <div className="w-10 h-10 rounded bg-[#172635] border border-[#243647] flex items-center justify-center text-amber mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-main mb-2">
                Telemetry, live and typed
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-4">
                Payload, diesel reserves, differential temperature, road strain, and vibration:
                134 data streams on the sandbox fleet, each typed, trended, and attached to the twin.
                Rigs articulate because the machine reported it.
              </p>
            </div>
            <button
              onClick={onOpenOperations}
              className="text-xs font-mono font-bold text-amber hover:underline flex items-center gap-1.5 pt-4 border-t border-[#1C2836]"
            >
              VIEW LIVE DASHBOARD <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </article>
        </div>
      </div>
    </section>
  );
};
