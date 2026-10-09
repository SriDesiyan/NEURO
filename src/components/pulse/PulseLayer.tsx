import React, { useState, useEffect } from 'react';
import { TelemetryEvent, SensorFeedType } from '../../types/mine';
import { LocalSimulationAdapter } from '../../simulation/SimulationEngine';
import {
  Radio,
  Activity,
  Play,
  Pause,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Cable,
  Database,
  Terminal,
  Cpu,
  Film
} from 'lucide-react';

export const PulseLayer: React.FC = () => {
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [selectedSensorFilter, setSelectedSensorFilter] = useState<string>('ALL');

  useEffect(() => {
    const adapter = new LocalSimulationAdapter();
    adapter.onEvent((newEvent) => {
      if (isStreaming) {
        setEvents((prev) => [newEvent, ...prev.slice(0, 24)]);
      }
    });

    adapter.connect();

    return () => {
      adapter.disconnect();
    };
  }, [isStreaming]);

  const filteredEvents = events.filter((e) => {
    if (selectedSensorFilter === 'ALL') return true;
    return e.sensorType === selectedSensorFilter;
  });

  return (
    <section id="pulse" className="section-padding bg-[#070C12] border-t border-[#1E2D3D]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge badge-teal text-[11px]">DATA ACQUISITION LAYER</span>
              <span className="text-xs font-mono text-dim">Continuous Ingestion Stream</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-main">
              Pulse Layer: Multi-Modal Live Sensor Ingestion
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Deterministic real-time ingestion interface consolidating DAS/DTS fiber optics,
              micro-seismic arrays, vehicle CAN-bus telemetry, and interferometric slope radar.
            </p>
          </div>

          {/* Stream Controls */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => {
                const el = document.getElementById('demonstrations');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-secondary btn-sm flex items-center gap-1.5"
              title="Watch Longwall Shearer & HUD Real-Time Telemetry Video"
            >
              <Film className="w-3.5 h-3.5 text-cyan" />
              HUD VIDEO (CLIP 04)
            </button>

            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`btn btn-sm ${
                isStreaming ? 'btn-secondary text-cyan' : 'btn-primary'
              }`}
            >
              {isStreaming ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> PAUSE FEED
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> RESUME FEED
                </>
              )}
            </button>
            <span className="cyber-badge badge-cyan text-[10px]">
              {isStreaming ? 'STREAMING 2.4s TICK' : 'PAUSED'}
            </span>
          </div>
        </div>

        {/* 4 Sensor Modality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="cyber-panel p-3 bg-[#0F1722] border-l-2 border-l-cyan">
            <div className="flex items-center gap-2 text-cyan font-mono text-xs font-bold mb-1">
              <Cable className="w-4 h-4" /> DAS/DTS Fiber Sensing
            </div>
            <p className="text-xs text-muted leading-tight">
              Acoustic &amp; continuous thermal strain monitoring along 12.8 km of arterial haulage
              roads and transfer conveyors.
            </p>
          </div>

          <div className="cyber-panel p-3 bg-[#0F1722] border-l-2 border-l-teal">
            <div className="flex items-center gap-2 text-teal font-mono text-xs font-bold mb-1">
              <Activity className="w-4 h-4" /> Micro-Seismic Arrays
            </div>
            <p className="text-xs text-muted leading-tight">
              24-bit 1 kHz sub-surface tri-axial geophones tracking rock mass fracturing, blast
              induced vibrations, and acoustic emissions.
            </p>
          </div>

          <div className="cyber-panel p-3 bg-[#0F1722] border-l-2 border-l-amber">
            <div className="flex items-center gap-2 text-amber font-mono text-xs font-bold mb-1">
              <Radio className="w-4 h-4" /> IIST Fleet Telemetry
            </div>
            <p className="text-xs text-muted leading-tight">
              J1939 CAN-bus engine diagnostics, differential vibration sensors, payload load cells,
              and GPS positional tracks.
            </p>
          </div>

          <div className="cyber-panel p-3 bg-[#0F1722] border-l-2 border-l-[#818CF8]">
            <div className="flex items-center gap-2 text-[#818CF8] font-mono text-xs font-bold mb-1">
              <Cpu className="w-4 h-4" /> Radar &amp; Drone LiDAR
            </div>
            <p className="text-xs text-muted leading-tight">
              GroundProbe sub-millimeter interferometric wall displacement scanning combined with
              weekly automated UAV point-clouds.
            </p>
          </div>
        </div>

        {/* Real-time Streaming Table Container */}
        <div className="cyber-panel bg-[#0B131C] border border-[#1E2D3D] rounded-lg overflow-hidden">
          {/* Table Header Filter Bar */}
          <div className="p-3 bg-[#131D28] border-b border-[#1E2D3D] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan" />
              <span className="font-bold text-main tracking-wider uppercase">
                Live Ingress Event Stream
              </span>
              <span className="text-dim text-[11px]">
                ({filteredEvents.length} events logged in ring-buffer)
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto">
              <Filter className="w-3 h-3 text-dim mr-1" />
              {['ALL', 'IIST_TELEMETRY', 'DAS_FIBER', 'SEISMIC', 'GEOSPATIAL', 'ENV_AIR'].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedSensorFilter(filter)}
                    className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                      selectedSensorFilter === filter
                        ? 'bg-cyan text-[#070C12] font-bold'
                        : 'bg-[#0B131C] text-muted hover:text-main'
                    }`}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Table Body */}
          <div className="overflow-x-auto max-h-80">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0E1722] text-dim text-[11px] uppercase tracking-wider border-b border-[#1E2D3D]">
                <tr>
                  <th className="py-2.5 px-3">Event ID</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Sensor Type</th>
                  <th className="py-2.5 px-3">Target Asset</th>
                  <th className="py-2.5 px-3">Value</th>
                  <th className="py-2.5 px-3">Severity</th>
                  <th className="py-2.5 px-3">Ingested Payload Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#172330]">
                {filteredEvents.map((e) => (
                  <tr key={e.id} className="hover:bg-[#131E2B] transition-colors">
                    <td className="py-2 px-3 text-cyan font-bold">{e.id}</td>
                    <td className="py-2 px-3 text-muted">{e.timestamp}</td>
                    <td className="py-2 px-3">
                      <span className="cyber-badge badge-gray text-[10px]">{e.sensorType}</span>
                    </td>
                    <td className="py-2 px-3 text-main font-semibold">{e.assetId}</td>
                    <td className="py-2 px-3 text-main">
                      <strong>{e.value}</strong> <span className="text-dim">{e.unit}</span>
                    </td>
                    <td className="py-2 px-3">
                      <span
                        className={`cyber-badge text-[10px] ${
                          e.severity === 'warning'
                            ? 'badge-amber'
                            : e.severity === 'critical'
                            ? 'badge-red'
                            : 'badge-teal'
                        }`}
                      >
                        {e.severity.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-muted text-[11px] truncate max-w-xs">{e.message}</td>
                  </tr>
                ))}

                {filteredEvents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-dim font-mono">
                      Awaiting live sensor packet ingress...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Adapter Status */}
          <div className="p-2.5 bg-[#0A1118] border-t border-[#1E2D3D] flex flex-wrap items-center justify-between text-[11px] font-mono text-dim gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span>Edge Broker: <strong className="text-main">mqtt://broker.neurosymbiomine.local:1883</strong></span>
            </div>
            <div>
              Protocol: <span className="text-cyan">FastAPI WebSocket / Protobuf</span> &bull; Latency: <span className="text-teal">12ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
