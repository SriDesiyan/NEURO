import React, { useState } from 'react';
import { KNOWLEDGE_NODES, KNOWLEDGE_EDGES } from '../../data/knowledgeGraph';
import { KnowledgeNode } from '../../types/mine';
import {
  Brain,
  Share2,
  Cpu,
  Layers,
  Radio,
  MapPin,
  AlertTriangle,
  BookOpen,
  Info
} from 'lucide-react';

export const MineCortexGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('TRK-105');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const selectedNode = KNOWLEDGE_NODES.find((n) => n.id === selectedNodeId) || KNOWLEDGE_NODES[0];

  // Find connected edges and neighbors
  const connectedEdges = KNOWLEDGE_EDGES.filter(
    (e) => e.source === selectedNodeId || e.target === selectedNodeId
  );

  const connectedNodeIds = new Set<string>();
  connectedNodeIds.add(selectedNodeId);
  connectedEdges.forEach((e) => {
    connectedNodeIds.add(e.source);
    connectedNodeIds.add(e.target);
  });

  const getNodeColor = (cat: string, status: string) => {
    if (status === 'critical') return '#FF555D';
    if (status === 'warning') return '#F2AA3B';
    switch (cat) {
      case 'asset':
        return '#18D4E8';
      case 'sensor':
        return '#28D7B0';
      case 'zone':
        return '#F2AA3B';
      case 'incident':
        return '#FF555D';
      case 'policy':
        return '#818CF8';
      default:
        return '#98A8B7';
    }
  };

  return (
    <section id="cortex" className="section-padding bg-[#0A1017] border-t border-[#1E2D3D]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge badge-cyan text-[11px]">COGNITIVE INTELLIGENCE</span>
              <span className="text-xs font-mono text-dim">Contextual Semantic Reasoning</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-main">
              Mine Cortex: Operational Knowledge Graph
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Traversing high-dimensional relationships between machinery telemetry, physical road
              gradients, sensor streams, past failures, and synthesized operational policies.
            </p>
          </div>

          {/* Category filter buttons */}
          <div className="flex items-center bg-[#101923] p-1 rounded border border-[#1E2D3D] text-xs font-mono overflow-x-auto">
            {['ALL', 'asset', 'sensor', 'zone', 'incident', 'policy'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded capitalize transition-colors ${
                  categoryFilter === cat
                    ? 'bg-cyan text-[#070C12] font-bold'
                    : 'text-muted hover:text-main'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Graph Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive SVG Graph Canvas */}
          <div className="lg:col-span-8 cyber-panel bg-[#070C12] border border-[#1E2D3D] rounded-lg p-2 h-[520px] relative overflow-hidden">
            <div className="absolute top-3 left-3 z-10 text-[11px] font-mono text-dim bg-[#070C12]/80 px-2 py-1 rounded border border-[#1E2D3D]">
              [Click any Node to inspect contextual connections]
            </div>

            <svg className="w-full h-full" viewBox="0 0 800 500">
              <defs>
                {/* Arrow markers */}
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#2E455C" />
                </marker>
                <marker
                  id="arrow-active"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#18D4E8" />
                </marker>
              </defs>

              {/* Render Edges */}
              {KNOWLEDGE_EDGES.map((edge, idx) => {
                const srcNode = KNOWLEDGE_NODES.find((n) => n.id === edge.source);
                const tgtNode = KNOWLEDGE_NODES.find((n) => n.id === edge.target);
                if (!srcNode || !tgtNode) return null;

                const isConnected =
                  edge.source === selectedNodeId || edge.target === selectedNodeId;

                const strokeColor = isConnected ? '#18D4E8' : '#1E2D3D';
                const strokeWidth = isConnected ? 2.5 : 1.2;

                const midX = (srcNode.x + tgtNode.x) / 2;
                const midY = (srcNode.y + tgtNode.y) / 2;

                return (
                  <g key={idx}>
                    <line
                      x1={srcNode.x}
                      y1={srcNode.y}
                      x2={tgtNode.x}
                      y2={tgtNode.y}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={isConnected ? 'none' : '4,3'}
                      markerEnd={isConnected ? 'url(#arrow-active)' : 'url(#arrow)'}
                    />
                    {isConnected && (
                      <text
                        x={midX}
                        y={midY - 6}
                        fill="#18D4E8"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                        className="select-none bg-[#070C12]"
                      >
                        {edge.relation}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Render Nodes */}
              {KNOWLEDGE_NODES.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const isConnected = connectedNodeIds.has(node.id);
                const isDimmed =
                  categoryFilter !== 'ALL' &&
                  node.category !== categoryFilter &&
                  !isConnected;

                const color = getNodeColor(node.category, node.status);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNodeId(node.id)}
                    className="cursor-pointer transition-all duration-300"
                    opacity={isDimmed ? 0.25 : 1}
                  >
                    {/* Selected pulse halo */}
                    {isSelected && (
                      <circle
                        r="24"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        className="animate-ping"
                        opacity="0.4"
                      />
                    )}

                    {/* Outer Circle */}
                    <circle
                      r="18"
                      fill="#101923"
                      stroke={color}
                      strokeWidth={isSelected ? 3.5 : 2}
                      className="transition-all"
                    />

                    {/* Inner Center Dot */}
                    <circle r="7" fill={color} />

                    {/* Node Label */}
                    <text
                      y="32"
                      fill={isSelected ? '#FFFFFF' : '#98A8B7'}
                      fontSize="11"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="select-none"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right: Selected Node Semantic Dossier */}
          <div className="lg:col-span-4 cyber-panel bg-[#101923] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="cyber-badge badge-cyan text-[10px] uppercase">
                  {selectedNode.category} Entity
                </span>
                <span
                  className={`cyber-badge text-[10px] ${
                    selectedNode.status === 'warning'
                      ? 'badge-amber'
                      : selectedNode.status === 'critical'
                      ? 'badge-red'
                      : 'badge-teal'
                  }`}
                >
                  {selectedNode.status.toUpperCase()}
                </span>
              </div>

              <h3 className="text-lg font-heading font-bold text-main mb-1">
                {selectedNode.label}
              </h3>
              <div className="text-xs font-mono text-cyan mb-4">Entity ID: {selectedNode.id}</div>

              <div className="p-3 rounded bg-[#0B131C] border border-[#1E2D3D] mb-4 text-xs text-muted leading-relaxed">
                {selectedNode.details}
              </div>

              {/* Connected Entities Links */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-main tracking-wider uppercase block">
                  Connected Entities ({connectedEdges.length})
                </span>

                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {connectedEdges.map((edge, i) => {
                    const otherId = edge.source === selectedNodeId ? edge.target : edge.source;
                    const otherNode = KNOWLEDGE_NODES.find((n) => n.id === otherId);
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedNodeId(otherId)}
                        className="p-2 rounded bg-[#131D28] hover:bg-[#182635] border border-[#1C2A38] hover:border-cyan/40 cursor-pointer flex items-center justify-between text-xs font-mono transition-colors"
                      >
                        <span className="text-main font-semibold">{otherId}</span>
                        <span className="text-dim text-[11px] italic">[{edge.relation}]</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1E2D3D] mt-4 text-[11px] font-mono text-dim flex items-center gap-2">
              <Share2 className="w-3.5 h-3.5 text-cyan" />
              <span>Bi-directional graph traversal enabled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
