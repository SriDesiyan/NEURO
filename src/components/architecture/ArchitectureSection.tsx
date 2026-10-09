import React, { useState } from 'react';
import {
  Layers,
  Radio,
  Cable,
  Cpu,
  Database,
  Zap,
  Brain,
  Send,
  Monitor,
  ChevronDown,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(4); // Default to Mine Cortex

  const stages = [
    {
      id: 1,
      title: 'Physical Sensing & Telemetry',
      short: 'Sensing Layer',
      icon: <Cable className="w-4 h-4 text-cyan" />,
      role: 'Captures raw physical phenomena across mine assets and geological formations.',
      tech: 'DAS/DTS optic fiber, GroundProbe radar, 1kHz geophones, J1939 CAN-bus telemetry, drone LiDAR.',
      latency: '< 10 ms at edge sensor nodes',
      dataModel: 'Raw analog/optical interferometry & binary CAN frame packets.'
    },
    {
      id: 2,
      title: 'Acquisition & Edge Validation',
      short: 'Edge Ingestion',
      icon: <Radio className="w-4 h-4 text-teal" />,
      role: 'Edge gateways filter noisy signals, synchronize NTP timestamps, and calibrate spatial coordinates.',
      tech: 'Edge IPCs running Rust/C++ pre-processors, kalman filters, coordinate transform matrices.',
      latency: '< 25 ms edge processing',
      dataModel: 'Typed telemetry tuples with covariance error bounds.'
    },
    {
      id: 3,
      title: 'Pulse Layer (Event Streaming)',
      short: 'Pulse Layer',
      icon: <Zap className="w-4 h-4 text-cyan" />,
      role: 'High-throughput publish-subscribe message broker streaming live mine telemetry into cognitive subsystems.',
      tech: 'MQTT Broker (EMQX), Apache Kafka / Redpanda, FastAPI WebSocket endpoints.',
      latency: '< 15 ms ingestion throughput',
      dataModel: 'Protobuf / JSON streaming event schema with QoS 1 guarantees.'
    },
    {
      id: 4,
      title: 'Mine Cortex & Knowledge Graph',
      short: 'Mine Cortex',
      icon: <Cpu className="w-4 h-4 text-teal" />,
      role: 'Constructs dynamic operational knowledge graph linking machinery, road slopes, and sensor streams.',
      tech: 'Graph reasoning engine (Neo4j / RDF Triple-store schema), spatial adjacency indexing.',
      latency: '< 80 ms graph traversal',
      dataModel: 'Typed entity-relation-entity triples (Asset -> traverses -> Zone).'
    },
    {
      id: 5,
      title: 'Digital Memory (Case Repository)',
      short: 'Digital Memory',
      icon: <Database className="w-4 h-4 text-amber" />,
      role: 'Preserves 5+ years of historical incident records, failure modes, and learned operational rules.',
      tech: 'Vector embeddings (Qdrant / Milvus), temporal rule-synthesis engine.',
      latency: '< 60 ms vector search',
      dataModel: 'Incident embeddings + learned constraint rules (e.g. RULE-DIFF-04).'
    },
    {
      id: 6,
      title: 'Phantom Twins (Parallel Simulation)',
      short: 'Phantom Twins',
      icon: <Layers className="w-4 h-4 text-cyan" />,
      role: 'Simulates parallel branching futures (A: Baseline, B: Predictive PM, C: Route Rerouting).',
      tech: 'Deterministic multi-agent discrete-event simulation engine, cycle time solvers.',
      latency: '< 400 ms scenario convergence',
      dataModel: 'Branched simulation state vectors with risk & output distributions.'
    },
    {
      id: 7,
      title: 'Decision Evolution Engine',
      short: 'Decision Engine',
      icon: <Brain className="w-4 h-4 text-teal" />,
      role: 'Applies Pareto multi-objective ranking and rule evolution to formulate explainable recommendations.',
      tech: 'Weighted scoring matrices, explainable rule engine, MARL policy interface readiness.',
      latency: '< 120 ms decision synthesis',
      dataModel: 'Ranked action dossiers with transparent trade-off rationale.'
    },
    {
      id: 8,
      title: 'Recommended Action Center & Twin UI',
      short: 'Action Center',
      icon: <Send className="w-4 h-4 text-amber" />,
      role: 'Interactive 3D WebGL digital twin, operator dispatch console, and real-time alerts.',
      tech: 'React, TypeScript, Three.js WebGL, Lucide, Tailwind CSS design system.',
      latency: '60 FPS client rendering',
      dataModel: 'Visual telemetry overlays, interactive raycasting, work order dispatch.'
    }
  ];

  const selectedStage = stages.find((s) => s.id === activeStageId) || stages[3];

  return (
    <section id="architecture" className="section-padding bg-[#0A1017] border-t border-[#1E2D3D]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge badge-cyan text-[11px]">SYSTEM BLUEPRINT</span>
              <span className="text-xs font-mono text-dim">End-to-End Information Pipeline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-main">
              NeuroSymbioMine Technical Architecture
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              An 8-tier cognitive pipeline bridging physical mine instrumentation with predictive
              simulation and explainable operator decision support.
            </p>
          </div>

          <div className="text-xs font-mono text-dim">
            [Click any pipeline node to inspect technical specs]
          </div>
        </div>

        {/* Interactive Pipeline Diagram */}
        <div className="cyber-panel p-4 bg-[#101923] border border-[#1E2D3D] mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {stages.map((stage) => {
              const isSelected = stage.id === activeStageId;
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`p-3 rounded border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#152636] border-cyan shadow-[0_0_15px_rgba(24,212,232,0.3)]'
                      : 'bg-[#0B131C] border-[#1C2836] hover:border-[#2D4054]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] text-cyan font-bold">0{stage.id}</span>
                      {stage.icon}
                    </div>
                    <div className="font-heading font-bold text-xs text-main leading-tight mb-1">
                      {stage.short}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-dim pt-2 border-t border-[#1A2633] mt-2">
                    {stage.latency}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep-Dive Specification Dossier */}
        <div className="cyber-panel p-6 bg-[#101923] border border-[#1E2D3D] corner-accent">
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#1E2D3D] mb-4 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#152332] border border-cyan/40 flex items-center justify-center">
                {selectedStage.icon}
              </div>
              <div>
                <span className="text-xs font-mono text-cyan">
                  TIER 0{selectedStage.id} SPECIFICATION
                </span>
                <h3 className="text-lg font-heading font-bold text-main">
                  {selectedStage.title}
                </h3>
              </div>
            </div>
            <div className="text-xs font-mono text-dim">
              Target Latency Budget: <strong className="text-teal">{selectedStage.latency}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1">
              <span className="font-mono font-bold text-main uppercase text-xs block mb-1">
                Primary System Role
              </span>
              <p className="text-muted leading-relaxed">{selectedStage.role}</p>
            </div>

            <div className="space-y-1">
              <span className="font-mono font-bold text-main uppercase text-xs block mb-1">
                Technology Stack &amp; Libraries
              </span>
              <p className="text-muted leading-relaxed font-mono">{selectedStage.tech}</p>
            </div>

            <div className="space-y-1">
              <span className="font-mono font-bold text-main uppercase text-xs block mb-1">
                Input / Output Schema
              </span>
              <p className="text-muted leading-relaxed font-mono">{selectedStage.dataModel}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
