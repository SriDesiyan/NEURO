import React, { useState } from 'react';
import { Asset } from '../../types/mine';
import { ThreeMineScene, SceneLayers } from './ThreeMineScene';
import { AssetExplorer } from './AssetExplorer';
import { AssetInspector } from './AssetInspector';
import {
  Layers,
  Eye,
  Play,
  RotateCcw,
  Sliders,
  Maximize2,
  Minimize2,
  Activity,
  Flame,
  Radio,
  Truck,
  ShieldAlert,
  GitBranch,
  Film
} from 'lucide-react';

interface TwinWorkspaceProps {
  assets: Asset[];
  selectedAssetId: string | null;
  onSelectAsset: (assetId: string) => void;
  onOpenPhantomTwins: () => void;
  onOpenKnowledgeGraph: () => void;
  activeScenarioId?: string;
}

export const TwinWorkspace: React.FC<TwinWorkspaceProps> = ({
  assets,
  selectedAssetId,
  onSelectAsset,
  onOpenPhantomTwins,
  onOpenKnowledgeGraph,
  activeScenarioId
}) => {
  const [layers, setLayers] = useState<SceneLayers>({
    equipment: true,
    sensors: true,
    telemetryLinks: true,
    haulRoutes: true,
    hazardZones: true,
    riskHeatmap: false,
    labels: true
  });

  const [simulationSpeed, setSimulationSpeed] = useState<number>(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExplorer, setShowExplorer] = useState(true);
  const [showInspector, setShowInspector] = useState(true);

  const toggleLayer = (key: keyof SceneLayers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  return (
    <div
      id="twin"
      className={`relative w-full bg-[#070C12] border border-[#1E2D3D] rounded-lg overflow-hidden shadow-2xl flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[750px] my-8'
      }`}
    >
      {/* Top Application Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#101923] border-b border-[#1E2D3D] z-20 gap-2">
        {/* Left: Title & Live indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#28D7B0] animate-pulse" />
            <span className="font-heading font-extrabold text-sm tracking-wide text-main">
              DIGITAL TWIN EXPLORER
            </span>
          </div>
          <span className="hidden sm:inline-block cyber-badge badge-cyan text-[10px]">
            CIL-IMiN SANDBOX PIT
          </span>
          {activeScenarioId && (
            <span className="cyber-badge badge-amber text-[10px]">
              Active: {activeScenarioId}
            </span>
          )}
        </div>

        {/* Center: Layer Toggles */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          <button
            onClick={() => toggleLayer('equipment')}
            className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors border ${
              layers.equipment
                ? 'bg-[#152738] text-cyan border-cyan/40'
                : 'bg-[#0B131C] text-dim border-[#1C2836]'
            }`}
            title="Toggle Mining Machinery"
          >
            <Truck className="w-3 h-3" /> Equipment
          </button>

          <button
            onClick={() => toggleLayer('sensors')}
            className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors border ${
              layers.sensors
                ? 'bg-[#152738] text-cyan border-cyan/40'
                : 'bg-[#0B131C] text-dim border-[#1C2836]'
            }`}
            title="Toggle Sensor Nodes"
          >
            <Radio className="w-3 h-3" /> Sensors
          </button>

          <button
            onClick={() => toggleLayer('haulRoutes')}
            className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors border ${
              layers.haulRoutes
                ? 'bg-[#152738] text-teal border-teal/40'
                : 'bg-[#0B131C] text-dim border-[#1C2836]'
            }`}
            title="Toggle Haul Routes"
          >
            <GitBranch className="w-3 h-3" /> Routes
          </button>

          <button
            onClick={() => toggleLayer('hazardZones')}
            className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors border ${
              layers.hazardZones
                ? 'bg-[#2A1D16] text-amber border-amber/40'
                : 'bg-[#0B131C] text-dim border-[#1C2836]'
            }`}
            title="Toggle Anomaly Zones"
          >
            <ShieldAlert className="w-3 h-3" /> Hazards
          </button>

          <button
            onClick={() => toggleLayer('riskHeatmap')}
            className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors border ${
              layers.riskHeatmap
                ? 'bg-[#311518] text-red border-red/40'
                : 'bg-[#0B131C] text-dim border-[#1C2836]'
            }`}
            title="Toggle Slope Heatmap"
          >
            <Flame className="w-3 h-3" /> Heatmap
          </button>
        </div>

        {/* Right: Video Replay, Simulation Speed & Layout toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const el = document.getElementById('demonstrations');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden md:flex px-2.5 py-1 rounded text-xs font-mono items-center gap-1.5 transition-colors border bg-[#152738] text-amber border-amber/40 hover:bg-[#1f374e]"
            title="Watch Verified 3D Pit Simulation Video Clip"
          >
            <Film className="w-3 h-3 text-amber" /> Video Replay
          </button>

          {/* Speed control */}
          <div className="flex items-center bg-[#0B131C] rounded border border-[#1E2D3D] p-0.5 text-xs font-mono">
            {[1, 2, 5].map((speed) => (
              <button
                key={speed}
                onClick={() => setSimulationSpeed(speed)}
                className={`px-2 py-0.5 rounded ${
                  simulationSpeed === speed
                    ? 'bg-cyan text-[#070C12] font-bold'
                    : 'text-dim hover:text-main'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded bg-[#151F2A] hover:bg-[#1E2D3D] text-muted hover:text-cyan border border-[#1E2D3D] transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main 3-Panel Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Panel: Asset Explorer */}
        {showExplorer && (
          <div className="w-64 md:w-72 shrink-0 h-full z-10 transition-all">
            <AssetExplorer
              assets={assets}
              selectedAssetId={selectedAssetId}
              onSelectAsset={onSelectAsset}
            />
          </div>
        )}

        {/* Center Panel: Interactive 3D WebGL Mine Scene */}
        <div className="flex-1 h-full relative">
          <ThreeMineScene
            assets={assets}
            selectedAssetId={selectedAssetId}
            onSelectAsset={onSelectAsset}
            layers={layers}
            simulationSpeed={simulationSpeed}
            activeScenarioId={activeScenarioId}
          />
        </div>

        {/* Right Panel: Asset Inspector */}
        {showInspector && (
          <div className="w-72 md:w-80 shrink-0 h-full z-10 transition-all">
            <AssetInspector
              asset={selectedAsset}
              onOpenPhantomTwins={onOpenPhantomTwins}
              onOpenKnowledgeGraph={onOpenKnowledgeGraph}
            />
          </div>
        )}
      </div>
    </div>
  );
};
