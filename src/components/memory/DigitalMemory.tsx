import React, { useState } from 'react';
import { HISTORICAL_INCIDENTS } from '../../data/historicalEvents';
import { HistoricalIncident } from '../../types/mine';
import {
  Database,
  History,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface DigitalMemoryProps {
  onReplayIncident: (incident: HistoricalIncident) => void;
}

export const DigitalMemory: React.FC<DigitalMemoryProps> = ({ onReplayIncident }) => {
  const [selectedIncident, setSelectedIncident] = useState<HistoricalIncident>(HISTORICAL_INCIDENTS[0]);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const filteredIncidents = HISTORICAL_INCIDENTS.filter((inc) => {
    if (filterSeverity === 'ALL') return true;
    return inc.severity === filterSeverity;
  });

  return (
    <section id="memory" className="section-padding bg-[#070C12] border-t border-[#1E2D3D]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge badge-amber text-[11px]">TEMPORAL MEMORY STORE</span>
              <span className="text-xs font-mono text-dim">Case-Based Reasoning Repository</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-main">
              Digital Memory: Learning From Past Mine Incidents
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              NeuroSymbioMine does not start from a blank slate. It indexes operational incident
              records, learns causal signatures, and automatically synthesizes preventative policies.
            </p>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center bg-[#101923] p-1 rounded border border-[#1E2D3D] text-xs font-mono">
            {['ALL', 'critical', 'warning', 'info'].map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1 rounded uppercase transition-colors ${
                  filterSeverity === sev
                    ? 'bg-amber text-[#070C12] font-bold'
                    : 'text-muted hover:text-main'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Incident Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Incident Timeline Cards */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
            {filteredIncidents.map((inc) => {
              const isSelected = selectedIncident.id === inc.id;
              return (
                <div
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#152332] border-cyan shadow-[0_0_15px_rgba(24,212,232,0.2)]'
                      : 'bg-[#101923] border-[#1C2836] hover:border-[#2D4054] hover:bg-[#14202C]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-cyan tracking-wider">
                      {inc.id}
                    </span>
                    <span
                      className={`cyber-badge text-[10px] ${
                        inc.severity === 'critical'
                          ? 'badge-red'
                          : inc.severity === 'warning'
                          ? 'badge-amber'
                          : 'badge-teal'
                      }`}
                    >
                      {inc.severity.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-main mb-1 leading-snug">{inc.title}</h4>

                  <div className="flex items-center justify-between text-[11px] font-mono text-dim mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-dim" /> {inc.date}
                    </span>
                    <span className="text-muted font-semibold">{inc.assetId}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Incident Case Dossier & Learned Rule */}
          <div className="lg:col-span-7 cyber-panel bg-[#101923] p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1E2D3D]">
                <div>
                  <span className="text-xs font-mono text-cyan block mb-0.5">
                    INCIDENT CASE RECORD: {selectedIncident.id}
                  </span>
                  <h3 className="text-lg font-heading font-extrabold text-main">
                    {selectedIncident.title}
                  </h3>
                </div>

                {/* Replay State CTA Button */}
                <button
                  onClick={() => onReplayIncident(selectedIncident)}
                  className="btn btn-secondary btn-sm font-mono text-xs text-cyan border-cyan/40 hover:bg-cyan/10 flex items-center gap-1.5"
                  title="Replay simulated conditions at the time of this failure"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> REPLAY STATE
                </button>
              </div>

              {/* Summary */}
              <div className="text-xs text-muted leading-relaxed">
                {selectedIncident.summary}
              </div>

              {/* Observed Telemetry vs Response Taken */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded bg-[#0B131C] border border-[#1E2D3D]">
                  <span className="text-amber font-mono font-bold text-[11px] block mb-1">
                    TRIGGER TELEMETRY PATTERN
                  </span>
                  <p className="text-muted text-[11px]">{selectedIncident.triggerTelemetry}</p>
                </div>

                <div className="p-3 rounded bg-[#0B131C] border border-[#1E2D3D]">
                  <span className="text-teal font-mono font-bold text-[11px] block mb-1">
                    DOWNTIME &amp; CONSEQUENCE
                  </span>
                  <p className="text-muted text-[11px]">{selectedIncident.downtimeRecorded}</p>
                </div>
              </div>

              {/* Synthesized Learned Policy Highlight */}
              <div className="p-3.5 rounded bg-[#132537] border border-cyan/40 space-y-1.5">
                <div className="flex items-center gap-1.5 text-cyan font-mono text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> LEARNED COGNITIVE RULE
                </div>
                <p className="text-xs font-mono text-main leading-relaxed">
                  {selectedIncident.learnedRule}
                </p>
                <div className="text-[11px] font-mono text-teal pt-1">
                  Enforced Policy: <strong>{selectedIncident.policyApplied}</strong>
                </div>
              </div>
            </div>

            {/* Verification Note */}
            <div className="pt-4 border-t border-[#1E2D3D] text-[11px] font-mono text-dim flex items-center justify-between">
              <span>Repository verified against CIL mining equipment operating procedures.</span>
              <span className="text-teal">5/5 Cases Synthesized</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
