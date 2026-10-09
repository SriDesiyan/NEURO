import React, { useState } from 'react';
import { INITIAL_ASSETS } from './data/initialAssets';
import { Asset, HistoricalIncident, PhantomScenario } from './types/mine';

import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/hero/Hero';
import { VideoDemonstration } from './components/video/VideoDemonstration';
import { QueryableTwinSection } from './components/presentation/QueryableTwinSection';
import { TwinWorkspace } from './components/twin/TwinWorkspace';
import { LiveDashboard } from './components/dashboard/LiveDashboard';
import { PulseLayer } from './components/pulse/PulseLayer';
import { MineCortexGraph } from './components/cortex/MineCortexGraph';
import { DigitalMemory } from './components/memory/DigitalMemory';
import { PhantomTwins } from './components/phantom/PhantomTwins';
import { DecisionEngine } from './components/decision/DecisionEngine';
import { ArchitectureSection } from './components/architecture/ArchitectureSection';
import { SafetySustainability } from './components/impact/SafetySustainability';
import { TeamSection } from './components/team/TeamSection';
import { AskNeuroAssistant } from './components/assistant/AskNeuroAssistant';
import { Footer } from './components/footer/Footer';

export const App: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('TRK-105');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('SCENARIO-B');

  // Smooth scroll utility
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectAsset = (assetId: string) => {
    setSelectedAssetId(assetId);
  };

  const handleReplayIncident = (incident: HistoricalIncident) => {
    setSelectedAssetId(incident.assetId);
    scrollToSection('twin');
  };

  const handleApplyScenario = (scenario: PhantomScenario) => {
    setActiveScenarioId(scenario.id);
    if (scenario.id === 'SCENARIO-B') {
      // Scenario B: Predictive Maintenance -> TRK-105 serviced at summit siding
      setAssets((prev) =>
        prev.map((a) =>
          a.id === 'TRK-105'
            ? {
                ...a,
                status: 'operational',
                vibration: 3.2,
                healthScore: 94,
                zone: 'Summit Maintenance Siding (Serviced)'
              }
            : a
        )
      );
    } else if (scenario.id === 'SCENARIO-C') {
      // Scenario C: Route Rerouting -> TRK-105 rerouted via Eastern Bypass
      setAssets((prev) =>
        prev.map((a) =>
          a.id === 'TRK-105'
            ? {
                ...a,
                status: 'operational',
                vibration: 4.8,
                healthScore: 84,
                speed: 15.0, // Derated speed
                zone: 'Eastern Bypass Loop (6% Grade)'
              }
            : a
        )
      );
    } else {
      // Scenario A: Baseline -> Warning status remains on steep Ramp B
      setAssets((prev) =>
        prev.map((a) =>
          a.id === 'TRK-105'
            ? {
                ...a,
                status: 'warning',
                vibration: 8.7,
                healthScore: 71,
                speed: 18.5,
                zone: 'ZN-RAMP-B (Haul Ramp B)'
              }
            : a
        )
      );
    }
    scrollToSection('twin');
  };

  return (
    <div className="min-h-screen bg-[#080E14] text-main font-sans selection:bg-cyan selection:text-black">
      {/* Top Navigation */}
      <Navbar onEnterTwin={() => scrollToSection('twin')} />

      {/* Hero Section */}
      <Hero
        onEnterTwin={() => scrollToSection('twin')}
        onWatchDemonstration={() => scrollToSection('demonstrations')}
        onRunScenario={() => scrollToSection('phantom')}
        onViewDecisionEngine={() => scrollToSection('decisions')}
        onExploreArchitecture={() => scrollToSection('architecture')}
      />

      {/* Product Demonstrations & Complete 4-Video Gallery */}
      <VideoDemonstration
        onEnterTwin={() => scrollToSection('twin')}
        onRunScenario={() => scrollToSection('phantom')}
        onViewDecisionEngine={() => scrollToSection('decisions')}
        onExploreArchitecture={() => scrollToSection('architecture')}
      />

      {/* MineTwin-Inspired Core Philosophy: "A Twin You Can Query, Not Scenery" */}
      <QueryableTwinSection
        onEnterTwin={() => scrollToSection('twin')}
        onOpenKnowledgeGraph={() => scrollToSection('cortex')}
        onOpenOperations={() => scrollToSection('dashboard')}
      />

      {/* Centerpiece: Digital Twin Explorer (3-Panel Workspace) */}
      <div className="container">
        <TwinWorkspace
          assets={assets}
          selectedAssetId={selectedAssetId}
          onSelectAsset={handleSelectAsset}
          onOpenPhantomTwins={() => scrollToSection('phantom')}
          onOpenKnowledgeGraph={() => scrollToSection('cortex')}
          activeScenarioId={activeScenarioId}
        />
      </div>

      {/* Live Operations Monitoring Dashboard */}
      <LiveDashboard />

      {/* Pulse Layer: Multi-Modal Sensor Ingress */}
      <PulseLayer />

      {/* Mine Cortex: Operational Knowledge Graph */}
      <MineCortexGraph />

      {/* Digital Memory: Historical Incident Learning Timeline */}
      <DigitalMemory onReplayIncident={handleReplayIncident} />

      {/* Phantom Twins: Parallel Future Simulation */}
      <PhantomTwins
        onApplyScenario={handleApplyScenario}
        activeScenarioId={activeScenarioId}
      />

      {/* Decision Evolution Engine & Action Center */}
      <DecisionEngine
        onInspectAsset={(id) => {
          setSelectedAssetId(id);
          scrollToSection('twin');
        }}
        onRunWhatIf={() => scrollToSection('phantom')}
      />

      {/* 8-Tier Architecture Section */}
      <ArchitectureSection />

      {/* Safety & ESG Sustainability Impact */}
      <SafetySustainability />

      {/* Project Team & Hackathon Credentials */}
      <TeamSection />

      {/* Floating Operational AI Assistant: "Ask Neuro" */}
      <AskNeuroAssistant
        assets={assets}
        onSelectAsset={handleSelectAsset}
        onOpenPhantomTwins={() => scrollToSection('phantom')}
      />

      {/* Site Footer */}
      <Footer />
    </div>
  );
};

export default App;
