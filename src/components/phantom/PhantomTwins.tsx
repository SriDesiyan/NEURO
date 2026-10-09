import React, { useState, useEffect } from 'react';
import { PHANTOM_SCENARIOS } from '../../data/scenarios';
import { PhantomScenario } from '../../types/mine';
import {
  Layers,
  Play,
  CheckCircle2,
  AlertTriangle,
  Zap,
  TrendingUp,
  Clock,
  Shield,
  Fuel,
  Sparkles,
  ArrowRight,
  Eye,
  GitBranch,
  Wrench,
  DollarSign
} from 'lucide-react';

interface PhantomTwinsProps {
  onApplyScenario: (scenario: PhantomScenario) => void;
  activeScenarioId?: string;
}

export const PhantomTwins: React.FC<PhantomTwinsProps> = ({
  onApplyScenario,
  activeScenarioId = 'SCENARIO-B'
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(activeScenarioId);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(100);

  useEffect(() => {
    setSelectedScenarioId(activeScenarioId);
  }, [activeScenarioId]);

  const selectedScenario =
    PHANTOM_SCENARIOS.find((s) => s.id === selectedScenarioId) || PHANTOM_SCENARIOS[1];

  const baselineScenario = PHANTOM_SCENARIOS[0];

  const handleRunSimulation = (scenario: PhantomScenario) => {
    setIsSimulating(true);
    setSimulationProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      setSimulationProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsSimulating(false);
        onApplyScenario(scenario);
      }
    }, 150);
  };

  const scrollToTwin = () => {
    const el = document.getElementById('twin');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="phantom" className="section-padding bg-[#0A1017] border-t border-[#1E2D3D]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge badge-cyan text-[11px]">PARALLEL FUTURE SIMULATION</span>
              <span className="text-xs font-mono text-dim">Deterministic Multi-Branch Projections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-main">
              Phantom Twins: What-If Scenario Exploration
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Simulate multiple operational trajectories ahead of time. Compare mechanical risk,
              throughput, haul delays, and energy consumption before committing physical mine resources.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="cyber-badge badge-teal text-xs">
              Deterministic Physics &bull; Non-destructive Sandbox
            </span>
            <button
              onClick={scrollToTwin}
              className="btn btn-secondary btn-sm text-xs font-mono flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-cyan" />
              VIEW ACTIVE 3D ROUTE
            </button>
          </div>
        </div>

        {/* 3 Scenario Cards Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {PHANTOM_SCENARIOS.map((scenario) => {
            const isSelected = selectedScenarioId === scenario.id;
            const isCurrentlyActive = activeScenarioId === scenario.id;
            const isRecommended = scenario.isRecommended;

            return (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenarioId(scenario.id)}
                className={`cyber-panel p-5 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? isRecommended
                      ? 'border-[#28D7B0] bg-[#102428] shadow-[0_0_20px_rgba(40,215,176,0.25)]'
                      : 'border-[#18D4E8] bg-[#121F2D] shadow-[0_0_20px_rgba(24,212,232,0.2)]'
                    : 'bg-[#101923] border-[#1E2D3D] hover:border-[#2C4054]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-cyan tracking-wider">
                      {scenario.tag}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isCurrentlyActive && (
                        <span className="cyber-badge badge-amber text-[9px] font-bold">
                          ACTIVE APPLIED
                        </span>
                      )}
                      {isRecommended ? (
                        <span className="cyber-badge badge-teal text-[10px] flex items-center gap-1 font-bold">
                          <Sparkles className="w-2.5 h-2.5" /> RECOMMENDED
                        </span>
                      ) : (
                        <span className="cyber-badge badge-gray text-[10px]">
                          {scenario.type.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base font-heading font-bold text-main mb-2 leading-snug">
                    {scenario.name}
                  </h3>

                  <p className="text-xs text-muted mb-4 leading-relaxed">
                    {scenario.description}
                  </p>

                  {/* Key Metrics Breakdown */}
                  <div className="space-y-2 border-t border-[#1C2836] pt-3 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-dim flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5 text-cyan" /> Risk Score:
                      </span>
                      <span
                        className={`font-bold ${
                          scenario.metrics.riskScore > 60
                            ? 'text-red'
                            : scenario.metrics.riskScore > 30
                            ? 'text-amber'
                            : 'text-teal'
                        }`}
                      >
                        {scenario.metrics.riskScore} / 100
                        {scenario.id !== 'SCENARIO-A' && (
                          <span className="text-[10px] text-teal ml-1">
                            ({scenario.metrics.riskScore - baselineScenario.metrics.riskScore} pts)
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-dim flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-teal" /> Expected Output:
                      </span>
                      <span className="text-main font-semibold">
                        {scenario.metrics.expectedThroughput.toLocaleString()} t
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-dim flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber" /> Expected Downtime:
                      </span>
                      <span
                        className={`font-semibold ${
                          scenario.metrics.expectedDowntime > 4 ? 'text-red' : 'text-main'
                        }`}
                      >
                        {scenario.metrics.expectedDowntime} hrs
                        {scenario.id !== 'SCENARIO-A' && (
                          <span className="text-[10px] text-teal ml-1">
                            (-{(baselineScenario.metrics.expectedDowntime - scenario.metrics.expectedDowntime).toFixed(1)}h)
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-dim flex items-center gap-1">
                        <Fuel className="w-3.5 h-3.5 text-cyan" /> Energy / Drag:
                      </span>
                      <span className="text-main">{scenario.metrics.energyImpact}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-4 mt-4 border-t border-[#1C2836] space-y-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRunSimulation(scenario);
                    }}
                    disabled={isSimulating}
                    className={`w-full btn btn-sm font-mono text-xs ${
                      isRecommended ? 'btn-primary' : 'btn-secondary'
                    }`}
                  >
                    {isSimulating && selectedScenarioId === scenario.id ? (
                      `SIMULATING ${simulationProgress}%...`
                    ) : (
                      <>
                        <Play className="w-3 h-3" /> APPLY THIS SCENARIO
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Scenario Deep-Dive & Evaluation Assumptions */}
        <div className="cyber-panel p-6 bg-[#101923] border border-[#1E2D3D]">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#1E2D3D] mb-4 gap-2">
            <div>
              <span className="text-xs font-mono text-cyan">DETERMINISTIC EVALUATION ANALYSIS</span>
              <h3 className="text-lg font-heading font-bold text-main">
                {selectedScenario.tag}: {selectedScenario.name}
              </h3>
            </div>
            <div className="text-xs font-mono text-dim">
              Intervention Protocol: <strong className="text-teal">{selectedScenario.intervention}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
            {/* Column 1: Assumptions */}
            <div>
              <h4 className="font-mono font-bold text-main text-xs uppercase mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan" /> Physical &amp; Operational Assumptions
              </h4>
              <ul className="space-y-1.5 text-muted list-disc list-inside">
                {selectedScenario.assumptions.map((assump, i) => (
                  <li key={i} className="leading-relaxed">
                    {assump}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Trade-off Matrix */}
            <div>
              <h4 className="font-mono font-bold text-main text-xs uppercase mb-2 flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-teal" /> Operational Trade-Off Analysis
              </h4>
              <p className="text-muted leading-relaxed mb-3">
                {selectedScenario.isRecommended
                  ? 'Scenario B exhibits the optimal Pareto frontier: accepting a minor 45-minute scheduled inspection eliminates the 74% hazard of an 8.4-hour catastrophic haulage corridor shutdown.'
                  : selectedScenario.id === 'SCENARIO-A'
                  ? 'Baseline operations prioritize short-term tons but face imminent mechanical seizure under continued 11% slope haulage stress.'
                  : 'Rerouting provides a viable contingency if mobile maintenance bays are fully occupied, though it increases diesel consumption and cycle times.'}
              </p>
              <div className="p-2.5 rounded bg-[#0B131C] border border-[#1E2D3D] text-[11px] font-mono text-dim">
                Confidence: <strong className="text-teal">94.2%</strong> &bull; Validated against historical
                incident records MEM-2026-0088 and MEM-2026-0114.
              </div>
            </div>

            {/* Column 3: Quantitative Delta vs Baseline */}
            <div className="bg-[#0B131C] p-4 rounded border border-[#1E2D3D] flex flex-col justify-between">
              <div>
                <h4 className="font-mono font-bold text-main text-xs uppercase mb-2 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber" /> Quantitative Delta vs Baseline (A)
                </h4>
                <div className="space-y-2 text-[11px] font-mono">
                  <div className="flex justify-between border-b border-[#1C2836] pb-1">
                    <span className="text-dim">Risk Reduction:</span>
                    <span className="font-bold text-teal">
                      {baselineScenario.metrics.riskScore - selectedScenario.metrics.riskScore} points
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#1C2836] pb-1">
                    <span className="text-dim">Downtime Avoided:</span>
                    <span className="font-bold text-teal">
                      {(baselineScenario.metrics.expectedDowntime - selectedScenario.metrics.expectedDowntime).toFixed(1)} hrs
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#1C2836] pb-1">
                    <span className="text-dim">Fleet Availability:</span>
                    <span className="font-bold text-main">
                      {selectedScenario.metrics.fleetAvailability}% (+{(selectedScenario.metrics.fleetAvailability - baselineScenario.metrics.fleetAvailability).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dim">Net Economic Benefit:</span>
                    <span className="font-bold text-teal">
                      {selectedScenario.id === 'SCENARIO-B' ? '+$124,000' : selectedScenario.id === 'SCENARIO-C' ? '+$68,000' : '$0 (Risk -$186k)'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1C2836] mt-3">
                <button
                  onClick={() => handleRunSimulation(selectedScenario)}
                  className="w-full btn btn-primary btn-sm text-xs font-mono"
                >
                  <Play className="w-3 h-3" /> APPLY &amp; FOCUS 3D TWIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
