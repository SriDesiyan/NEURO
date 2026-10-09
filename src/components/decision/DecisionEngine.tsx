import React, { useState } from 'react';
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Send,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Layers,
  History,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface DecisionEngineProps {
  onInspectAsset: (assetId: string) => void;
  onRunWhatIf: () => void;
}

export const DecisionEngine: React.FC<DecisionEngineProps> = ({
  onInspectAsset,
  onRunWhatIf
}) => {
  const [isDispatched, setIsDispatched] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const pipelineSteps = [
    { step: 1, title: 'State Ingestion', desc: 'Read live spatial coordinates & 134 telemetry streams.' },
    { step: 2, title: 'Memory Retrieval', desc: 'Vector similarity search against past incident memory bank.' },
    { step: 3, title: 'Phantom Twins', desc: 'Simulate 3 forward branching trajectories (A/B/C).' },
    { step: 4, title: 'Impact Evaluation', desc: 'Score risk, cycle delay, fuel burn, and highwall safety.' },
    { step: 5, title: 'Pareto Ranking', desc: 'Multi-objective ranking via transparent weighted scoring.' },
    { step: 6, title: 'Cognitive Synthesis', desc: 'Formulate plain-language explainable recommendation.' },
    { step: 7, title: 'Operator Review', desc: 'Human-in-the-loop validation and audit sign-off.' }
  ];

  const handleExportReport = () => {
    const reportData = {
      project: 'NeuroSymbioMine',
      competition: 'CIL-IMiN Hackathon 2026',
      registration: 'VMDIGITW-2026-0015',
      institution: 'Chennai Institute of Technology',
      timestamp: new Date().toISOString(),
      recommendationId: 'REC-2026-094',
      targetAsset: 'TRK-105',
      action: 'Pre-emptive Summit Maintenance Siding Diversion',
      riskReductionPct: '83.7%',
      correlatedIncident: 'MEM-2026-0088 (Catastrophic Seizure)',
      confidenceScore: 0.942
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NeuroSymbioMine_AuditReport_TRK105.json`;
    a.click();
    URL.revokeObjectURL(url);

    setExportNotice('Audit dossier report downloaded successfully.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <section id="decisions" className="section-padding bg-[#070C12] border-t border-[#1E2D3D]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge badge-teal text-[11px]">COGNITIVE DECISION ENGINE</span>
              <span className="text-xs font-mono text-dim">Transparent Explainable AI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-main">
              Decision Evolution Engine &amp; Action Center
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Transforming complex multi-sensor anomalies into explainable operational recommendations
              with explicit evidence trails, risk trade-offs, and human-in-the-loop validation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="cyber-badge badge-cyan text-xs">
              Explainable Rule Pipeline &bull; Human-in-the-Loop
            </span>
          </div>
        </div>

        {/* 7-Step Cognitive Pipeline Visualization */}
        <div className="mb-10 p-5 rounded-lg bg-[#0C131B] border border-[#1E2D3D] overflow-x-auto">
          <div className="flex items-center justify-between min-w-[760px] gap-2">
            {pipelineSteps.map((p, idx) => (
              <React.Fragment key={p.step}>
                <div className="flex-1 flex flex-col items-center text-center p-2 rounded bg-[#101923] border border-[#1C2A38]">
                  <div className="w-6 h-6 rounded-full bg-cyan/10 border border-cyan/40 text-cyan font-mono text-xs font-bold flex items-center justify-center mb-1.5">
                    {p.step}
                  </div>
                  <span className="font-heading font-bold text-xs text-main tracking-tight block">
                    {p.title}
                  </span>
                  <span className="text-[10px] text-dim leading-tight mt-0.5">
                    {p.desc}
                  </span>
                </div>
                {idx < pipelineSteps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-dim shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Active Recommendation Center Card */}
        <div className="cyber-panel p-6 bg-[#101923] border border-amber/40 corner-accent">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#1E2D3D] mb-4 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#2D1C14] border border-amber/50 flex items-center justify-center text-amber">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="cyber-badge badge-amber text-[10px] font-bold">
                    RECOMMENDED INTERVENTION
                  </span>
                  <span className="text-xs font-mono text-dim">REC-2026-094</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-main mt-0.5">
                  Pre-emptive Diversion of TRK-105 to Summit Maintenance Siding
                </h3>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono text-dim">Confidence Score</div>
              <div className="text-xl font-mono font-extrabold text-teal">94.2%</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            {/* Explanation & Why Selected */}
            <div className="lg:col-span-8 space-y-3 text-xs">
              <div>
                <span className="font-mono font-bold text-cyan text-xs uppercase block mb-1">
                  Why this action was synthesized:
                </span>
                <p className="text-muted leading-relaxed">
                  TRK-105 rear differential vibration velocity has reached <strong>8.7 mm/s</strong> with
                  a thermal rise rate of +0.35°C/min while ascending the 11% Haul Ramp B grade.
                  Historical case matching links this trajectory to <strong>Incident MEM-2026-0088</strong>{' '}
                  (Catastrophic Bearing Seizure) with <strong>91% pattern similarity</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded bg-[#0B131C] border border-[#1E2D3D]">
                  <span className="font-mono font-bold text-teal text-[11px] block mb-1">
                    EXPECTED OPERATIONAL BENEFIT
                  </span>
                  <p className="text-muted text-[11px] leading-relaxed">
                    Avoids 8.4 hours of single-lane arterial road blockage on Ramp B. Saves an estimated
                    $142,000 in recovery costs and prevents thermal damage to the differential housing.
                  </p>
                </div>

                <div className="p-3 rounded bg-[#0B131C] border border-[#1E2D3D]">
                  <span className="font-mono font-bold text-amber text-[11px] block mb-1">
                    CALCULATED TRADE-OFFS &amp; RISKS
                  </span>
                  <p className="text-muted text-[11px] leading-relaxed">
                    Requires taking TRK-105 out of service for 45 minutes. Reserve truck TRK-108 will be
                    dispatched to maintain crushing throughput within 12 minutes.
                  </p>
                </div>
              </div>

              {/* Collapsible Evidence Dossier */}
              {showEvidence && (
                <div className="p-4 rounded bg-[#0A1016] border border-cyan/40 mt-3 space-y-2">
                  <span className="font-mono font-bold text-cyan text-xs uppercase block">
                    Telemetry Evidence Dossier (MEM-2026-0088 Cross-Correlation)
                  </span>
                  <div className="text-muted text-[11px] font-mono space-y-1">
                    <div>&bull; Current Vibration: 8.7 mm/s (Reference baseline: 2.8 mm/s)</div>
                    <div>&bull; Incline Resistance: 11% gradient at 18.5 km/h with 382t payload</div>
                    <div>&bull; Acoustic Signature: Tri-axial FFT indicates 120 Hz outer race harmonic</div>
                    <div>&bull; Governing Learned Rule: RULE-DIFF-VIB-04 (Mandatory inspection within 45m)</div>
                  </div>
                </div>
              )}
            </div>

            {/* Verification & Action Trigger Panel */}
            <div className="lg:col-span-4 bg-[#0B131C] p-4 rounded border border-[#1E2D3D] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-main tracking-wider uppercase block mb-3">
                  Operator Actions
                </span>

                <div className="space-y-2">
                  <button
                    onClick={() => setIsDispatched(true)}
                    disabled={isDispatched}
                    className={`w-full btn btn-sm font-mono text-xs flex items-center justify-center gap-2 ${
                      isDispatched ? 'btn-secondary text-teal border-teal/40' : 'btn-primary'
                    }`}
                  >
                    {isDispatched ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                        DISPATCHED TO MOBILE BAY
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        ACCEPT &amp; DISPATCH WORK ORDER
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowEvidence(!showEvidence)}
                    className="w-full btn btn-secondary btn-sm font-mono text-xs flex items-center justify-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan" />
                    {showEvidence ? 'HIDE EVIDENCE DOSSIER' : 'INSPECT SUPPORTING EVIDENCE'}
                  </button>

                  <button
                    onClick={() => onInspectAsset('TRK-105')}
                    className="w-full btn btn-secondary btn-sm font-mono text-xs flex items-center justify-center gap-2"
                  >
                    <Cpu className="w-3.5 h-3.5 text-teal" />
                    INSPECT ASSET IN 3D TWIN
                  </button>

                  <button
                    onClick={onRunWhatIf}
                    className="w-full btn btn-secondary btn-sm font-mono text-xs flex items-center justify-center gap-2"
                  >
                    <Layers className="w-3.5 h-3.5 text-cyan" />
                    RUN WHAT-IF SIMULATION
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1C2836] mt-4">
                <button
                  onClick={handleExportReport}
                  className="w-full text-xs font-mono text-cyan hover:underline flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  EXPORT AUDIT DOSSIER (.JSON)
                </button>
                {exportNotice && (
                  <div className="text-[10px] font-mono text-teal text-center mt-1">
                    {exportNotice}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
