import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  TrendingUp,
  Wind,
  Truck,
  HardHat,
  BarChart3,
  Calendar,
  Film
} from 'lucide-react';

export const LiveDashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'1H' | '8H' | '24H' | '7D'>('24H');

  // Hourly production data for the chart (t/h)
  const productionData = [
    { hour: '08:00', tons: 1380 },
    { hour: '10:00', tons: 1420 },
    { hour: '12:00', tons: 1450 },
    { hour: '14:00', tons: 1390 },
    { hour: '16:00', tons: 1420 },
    { hour: '18:00', tons: 1440 },
    { hour: '20:00', tons: 1410 }
  ];

  // Vibration trend data (mm/s)
  const vibrationTrend = [
    { time: '10:00', val: 2.8 },
    { time: '11:00', val: 3.1 },
    { time: '12:00', val: 3.4 },
    { time: '13:00', val: 4.8 },
    { time: '14:00', val: 6.9 },
    { time: '15:00', val: 8.7 }
  ];

  return (
    <section id="dashboard" className="section-padding bg-[#0A1017] border-t border-[#1E2D3D]">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge badge-cyan text-[11px]">TELEMETRY &amp; KPIS</span>
              <span className="text-xs font-mono text-dim">Deterministic Live Simulation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-main">
              Live Mine Operations Dashboard
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Consolidated real-time operational telemetry across haulage circuits, primary gyratory
              crushers, geotechnical radar arrays, and environmental stations.
            </p>
          </div>

          {/* Action Links & Time range filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const el = document.getElementById('demonstrations');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-sm text-xs font-mono flex items-center gap-1.5"
              title="Watch Primary Crushing & Continuous Conveyor Video (Clip 2)"
            >
              <Film className="w-3.5 h-3.5 text-teal" />
              PLANT CIRCUIT VIDEO (CLIP 02)
            </button>

            <div className="flex items-center bg-[#101923] p-1 rounded border border-[#1E2D3D] text-xs font-mono">
              {(['1H', '8H', '24H', '7D'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`px-3 py-1 rounded transition-colors ${
                    timeFilter === t
                      ? 'bg-cyan text-[#070C12] font-bold'
                      : 'text-muted hover:text-main'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 8 Primary KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {/* Card 1: Monitored Assets */}
          <div className="cyber-panel p-3.5 bg-[#101923]">
            <div className="flex items-center justify-between text-muted text-xs font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan" /> Monitored Assets
              </span>
              <span className="text-[10px] text-teal">100% Online</span>
            </div>
            <div className="text-2xl font-mono font-bold text-main">42</div>
            <div className="text-[11px] text-dim font-mono mt-1">
              18 Mobile &bull; 8 Fixed &bull; 16 Sensors
            </div>
          </div>

          {/* Card 2: Active Equipment */}
          <div className="cyber-panel p-3.5 bg-[#101923]">
            <div className="flex items-center justify-between text-muted text-xs font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-teal" /> Active Fleet
              </span>
              <span className="text-[10px] text-teal">18/20</span>
            </div>
            <div className="text-2xl font-mono font-bold text-teal">94.2%</div>
            <div className="text-[11px] text-dim font-mono mt-1">Fleet availability index</div>
          </div>

          {/* Card 3: Warning Conditions */}
          <div className="cyber-panel p-3.5 bg-[#101923] border-[#F2AA3B]/40">
            <div className="flex items-center justify-between text-amber text-xs font-mono mb-1">
              <span className="flex items-center gap-1.5 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" /> Warning State
              </span>
              <span className="cyber-badge badge-amber text-[9px] py-0">1 ASSET</span>
            </div>
            <div className="text-2xl font-mono font-bold text-amber">TRK-105</div>
            <div className="text-[11px] text-muted font-mono mt-1">
              Vibration spike: 8.7 mm/s (Ramp B)
            </div>
          </div>

          {/* Card 4: Critical Incidents */}
          <div className="cyber-panel p-3.5 bg-[#101923]">
            <div className="flex items-center justify-between text-muted text-xs font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal" /> Critical Emergencies
              </span>
              <span className="text-[10px] text-teal">Zero</span>
            </div>
            <div className="text-2xl font-mono font-bold text-main">0</div>
            <div className="text-[11px] text-dim font-mono mt-1">Zero-harm goal maintained</div>
          </div>

          {/* Card 5: Production Rate */}
          <div className="cyber-panel p-3.5 bg-[#101923]">
            <div className="flex items-center justify-between text-muted text-xs font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-cyan" /> Throughput Rate
              </span>
              <span className="text-[10px] text-teal">+4.1% Plan</span>
            </div>
            <div className="text-2xl font-mono font-bold text-main">
              1,420 <span className="text-sm font-normal text-muted">t/h</span>
            </div>
            <div className="text-[11px] text-dim font-mono mt-1">Primary crusher feed</div>
          </div>

          {/* Card 6: Haul Cycle Time */}
          <div className="cyber-panel p-3.5 bg-[#101923]">
            <div className="flex items-center justify-between text-muted text-xs font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal" /> Avg Cycle Time
              </span>
              <span className="text-[10px] text-dim">Target 25m</span>
            </div>
            <div className="text-2xl font-mono font-bold text-main">
              24.6 <span className="text-sm font-normal text-muted">min</span>
            </div>
            <div className="text-[11px] text-dim font-mono mt-1">Excavation to Dump cycle</div>
          </div>

          {/* Card 7: Geotechnical Stability */}
          <div className="cyber-panel p-3.5 bg-[#101923]">
            <div className="flex items-center justify-between text-muted text-xs font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan" /> Highwall Slope
              </span>
              <span className="text-[10px] text-teal">Stable</span>
            </div>
            <div className="text-2xl font-mono font-bold text-teal">0.03</div>
            <div className="text-[11px] text-dim font-mono mt-1">mm/day creep displacement</div>
          </div>

          {/* Card 8: Environmental Air AQI */}
          <div className="cyber-panel p-3.5 bg-[#101923]">
            <div className="flex items-center justify-between text-muted text-xs font-mono mb-1">
              <span className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-teal" /> Dust Particulate
              </span>
              <span className="text-[10px] text-teal">AQI 42</span>
            </div>
            <div className="text-2xl font-mono font-bold text-main">
              38 <span className="text-sm font-normal text-muted">µg/m³</span>
            </div>
            <div className="text-[11px] text-dim font-mono mt-1">PM10 mist cannon active</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Production Ore Throughput by Interval */}
          <div className="cyber-panel p-4 bg-[#101923]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan" />
                <h3 className="text-sm font-heading font-bold text-main">
                  Crusher Throughput by Shift Interval (Tons/Hour)
                </h3>
              </div>
              <span className="text-xs font-mono text-dim">Benchmark: 1,400 t/h</span>
            </div>

            {/* SVG Bar Chart */}
            <div className="h-56 w-full pt-4">
              <div className="flex items-end justify-between h-44 gap-2 border-b border-[#1E2D3D] pb-1 px-2">
                {productionData.map((d, i) => {
                  const heightPct = ((d.tons - 1200) / 400) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center group relative">
                      {/* Tooltip */}
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-[#070C12] border border-cyan/40 px-1.5 py-0.5 rounded text-[10px] font-mono text-cyan whitespace-nowrap z-20">
                        {d.tons} t/h
                      </div>
                      <div
                        className="w-full max-w-[36px] bg-gradient-to-t from-cyan/40 to-cyan rounded-t transition-all group-hover:to-teal"
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[10px] font-mono text-dim mt-2">{d.hour}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chart 2: TRK-105 Bearing Vibration Trajectory */}
          <div className="cyber-panel p-4 bg-[#101923] border-[#F2AA3B]/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber" />
                <h3 className="text-sm font-heading font-bold text-main">
                  TRK-105 Vibration Velocity Acceleration (mm/s)
                </h3>
              </div>
              <span className="cyber-badge badge-amber text-[10px]">ANOMALY TRAJECTORY</span>
            </div>

            {/* SVG Telemetry Curve */}
            <div className="h-56 w-full relative pt-2">
              <svg className="w-full h-44" viewBox="0 0 500 150">
                {/* Normal safe zone line at Y = 100 (4.5 mm/s) */}
                <line
                  x1="20"
                  y1="90"
                  x2="480"
                  y2="90"
                  stroke="#28D7B0"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  strokeOpacity="0.5"
                />
                <text x="25" y="85" fill="#28D7B0" fontSize="10" fontFamily="monospace">
                  SAFE THRESHOLD (&lt; 4.5 mm/s)
                </text>

                {/* Critical threshold line at Y = 40 (7.0 mm/s) */}
                <line
                  x1="20"
                  y1="40"
                  x2="480"
                  y2="40"
                  stroke="#FF555D"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  strokeOpacity="0.5"
                />
                <text x="25" y="35" fill="#FF555D" fontSize="10" fontFamily="monospace">
                  CRITICAL SEIZURE RISK (&gt; 7.0 mm/s)
                </text>

                {/* Line Path */}
                <polyline
                  fill="none"
                  stroke="#F2AA3B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="30,120 120,115 210,110 300,85 390,45 470,20"
                />

                {/* Data Points */}
                {[
                  [30, 120, '2.8'],
                  [120, 115, '3.1'],
                  [210, 110, '3.4'],
                  [300, 85, '4.8'],
                  [390, 45, '6.9'],
                  [470, 20, '8.7']
                ].map(([cx, cy, val], i) => (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="4.5" fill="#F2AA3B" stroke="#070C12" strokeWidth="2" />
                    <text
                      x={cx}
                      y={Number(cy) - 8}
                      fill="#FFFFFF"
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {val}
                    </text>
                  </g>
                ))}
              </svg>
              <div className="flex justify-between text-[10px] font-mono text-dim px-4 border-t border-[#1E2D3D] pt-1">
                <span>10:00</span>
                <span>11:00</span>
                <span>12:00</span>
                <span>13:00</span>
                <span>14:00</span>
                <span>15:00 (NOW)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
