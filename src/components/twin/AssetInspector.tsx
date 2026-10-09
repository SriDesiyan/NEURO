import React from 'react';
import { Asset } from '../../types/mine';
import {
  Activity,
  Gauge,
  Thermometer,
  Fuel,
  Weight,
  Wrench,
  UserCheck,
  AlertOctagon,
  TrendingUp,
  Cpu,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface AssetInspectorProps {
  asset: Asset | null;
  onOpenPhantomTwins: () => void;
  onOpenKnowledgeGraph: () => void;
}

export const AssetInspector: React.FC<AssetInspectorProps> = ({
  asset,
  onOpenPhantomTwins,
  onOpenKnowledgeGraph
}) => {
  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-[#101923] text-dim font-mono text-xs">
        <Cpu className="w-8 h-8 mb-3 text-cyan opacity-40 animate-pulse" />
        Select an asset from the 3D scene or explorer to view real-time cognitive telemetry.
      </div>
    );
  }

  // Calculate simple SVG sparkline path from telemetry history
  const history = asset.telemetryHistory || [];
  const maxTemp = Math.max(...history.map((h) => h.temp), 100);
  const minTemp = Math.min(...history.map((h) => h.temp), 70);
  const tempRange = maxTemp - minTemp || 1;

  const points = history
    .map((h, i) => {
      const x = (i / (history.length - 1 || 1)) * 240 + 10;
      const y = 50 - ((h.temp - minTemp) / tempRange) * 40;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col h-full bg-[#101923] border-l border-[#1E2D3D] overflow-y-auto">
      {/* Header */}
      <div className="p-3 border-b border-[#1E2D3D] bg-[#151F2A]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan">
            Cognitive Telemetry Inspector
          </span>
          <span
            className={`cyber-badge ${
              asset.status === 'warning'
                ? 'badge-amber'
                : asset.status === 'critical'
                ? 'badge-red'
                : 'badge-teal'
            }`}
          >
            {asset.status.toUpperCase()}
          </span>
        </div>
        <h3 className="text-base font-bold text-main tracking-tight">{asset.name}</h3>
        <div className="text-xs font-mono text-muted flex items-center gap-2 mt-0.5">
          <span>ID: <strong className="text-cyan">{asset.id}</strong></span>
          <span>&bull;</span>
          <span className="truncate">{asset.zone}</span>
        </div>
      </div>

      <div className="p-3 space-y-3">
        {/* Anomaly Callout if in Warning/Critical */}
        {asset.status === 'warning' && (
          <div className="p-2.5 rounded bg-[#2A1E14] border border-[#F2AA3B]/40 flex items-start gap-2.5">
            <AlertOctagon className="w-4 h-4 text-amber shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-mono font-bold text-amber block">
                ANOMALY DETECTED: BEARING VIBRATION SPIKE
              </span>
              <p className="text-muted text-[11px] mt-0.5">
                Vibration velocity is <strong>8.7 mm/s</strong> (Normal threshold: &lt; 4.5 mm/s).
                Differential oil temperature at 98.4°C on 11% gradient.
              </p>
            </div>
          </div>
        )}

        {/* Health Score Gauge */}
        <div className="p-3 rounded bg-[#131D28] border border-[#1E2D3D]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-mono text-muted flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan" /> Health Score
            </span>
            <span
              className={`font-mono text-base font-extrabold ${
                asset.healthScore < 80 ? 'text-amber' : 'text-teal'
              }`}
            >
              {asset.healthScore}%
            </span>
          </div>
          <div className="w-full h-2 bg-[#0C131B] rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                asset.healthScore < 80
                  ? 'bg-gradient-to-r from-amber to-red'
                  : 'bg-gradient-to-r from-teal to-cyan'
              }`}
              style={{ width: `${asset.healthScore}%` }}
            />
          </div>
        </div>

        {/* Live Gauges Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {asset.engineTemp !== undefined && (
            <div className="p-2.5 rounded bg-[#131D28] border border-[#1E2D3D]">
              <div className="flex items-center justify-between text-muted text-[11px] font-mono mb-1">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-amber" /> Temp
                </span>
                <span className="text-[10px] text-dim">Max 105°C</span>
              </div>
              <div className="font-mono text-sm font-bold text-main">
                {asset.engineTemp} <span className="text-xs font-normal text-muted">°C</span>
              </div>
            </div>
          )}

          {asset.vibration !== undefined && (
            <div className="p-2.5 rounded bg-[#131D28] border border-[#1E2D3D]">
              <div className="flex items-center justify-between text-muted text-[11px] font-mono mb-1">
                <span className="flex items-center gap-1">
                  <Gauge className="w-3 h-3 text-cyan" /> Vibration
                </span>
                <span className="text-[10px] text-dim">Norm &lt; 4.5</span>
              </div>
              <div
                className={`font-mono text-sm font-bold ${
                  asset.vibration > 6 ? 'text-amber' : 'text-main'
                }`}
              >
                {asset.vibration} <span className="text-xs font-normal text-muted">mm/s</span>
              </div>
            </div>
          )}

          {asset.speed !== undefined && (
            <div className="p-2.5 rounded bg-[#131D28] border border-[#1E2D3D]">
              <div className="flex items-center justify-between text-muted text-[11px] font-mono mb-1">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-teal" /> Speed
                </span>
              </div>
              <div className="font-mono text-sm font-bold text-main">
                {asset.speed} <span className="text-xs font-normal text-muted">km/h</span>
              </div>
            </div>
          )}

          {asset.payload !== undefined && (
            <div className="p-2.5 rounded bg-[#131D28] border border-[#1E2D3D]">
              <div className="flex items-center justify-between text-muted text-[11px] font-mono mb-1">
                <span className="flex items-center gap-1">
                  <Weight className="w-3 h-3 text-cyan" /> Payload
                </span>
              </div>
              <div className="font-mono text-sm font-bold text-main">
                {asset.payload} <span className="text-xs font-normal text-muted">tons</span>
              </div>
            </div>
          )}

          {asset.fuel !== undefined && (
            <div className="p-2.5 rounded bg-[#131D28] border border-[#1E2D3D]">
              <div className="flex items-center justify-between text-muted text-[11px] font-mono mb-1">
                <span className="flex items-center gap-1">
                  <Fuel className="w-3 h-3 text-teal" /> Fuel / Power
                </span>
              </div>
              <div className="font-mono text-sm font-bold text-main">
                {asset.fuel} <span className="text-xs font-normal text-muted">%</span>
              </div>
            </div>
          )}

          <div className="p-2.5 rounded bg-[#131D28] border border-[#1E2D3D]">
            <div className="flex items-center justify-between text-muted text-[11px] font-mono mb-1">
              <span className="flex items-center gap-1">
                <Wrench className="w-3 h-3 text-amber" /> Next PM
              </span>
            </div>
            <div className="font-mono text-sm font-bold text-main">
              {asset.nextServiceHours} <span className="text-xs font-normal text-muted">hrs</span>
            </div>
          </div>
        </div>

        {/* Telemetry Sparkline Chart */}
        {history.length > 0 && (
          <div className="p-3 rounded bg-[#131D28] border border-[#1E2D3D]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-muted flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-cyan" /> Thermal Trend (°C)
              </span>
              <span className="text-[10px] font-mono text-dim">Past 60 min</span>
            </div>
            <div className="w-full h-16 bg-[#0B131C] rounded p-1 relative border border-[#1B2735]">
              <svg className="w-full h-full" viewBox="0 0 260 60">
                <defs>
                  <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#18D4E8" stop-opacity="0.4" />
                    <stop offset="100%" stop-color="#18D4E8" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke="#18D4E8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={points}
                />
              </svg>
            </div>
          </div>
        )}

        {/* Operator & Maintenance Details */}
        <div className="p-3 rounded bg-[#131D28] border border-[#1E2D3D] space-y-1.5 text-[11px] font-mono">
          <div className="flex items-center justify-between">
            <span className="text-muted flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-cyan" /> Operator:
            </span>
            <span className="text-main font-semibold">{asset.operator || 'Autonomous / SCADA'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted flex items-center gap-1">
              <Wrench className="w-3 h-3 text-amber" /> Last PM:
            </span>
            <span className="text-main truncate max-w-[140px]">{asset.lastMaintenance}</span>
          </div>
        </div>

        {/* Digital Twin Interactive Actions */}
        <div className="pt-2 space-y-2">
          <button
            onClick={onOpenPhantomTwins}
            className="w-full btn btn-primary text-xs py-2 font-mono flex items-center justify-center gap-2"
          >
            <Layers className="w-3.5 h-3.5" />
            SIMULATE IN PHANTOM TWINS
            <ArrowUpRight className="w-3 h-3" />
          </button>

          <button
            onClick={onOpenKnowledgeGraph}
            className="w-full btn btn-secondary text-xs py-2 font-mono flex items-center justify-center gap-2"
          >
            <Cpu className="w-3.5 h-3.5 text-cyan" />
            VIEW IN MINE CORTEX GRAPH
          </button>
        </div>
      </div>
    </div>
  );
};
