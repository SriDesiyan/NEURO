export interface TeamMember {
  name: string;
  role: string;
  specialization: string;
  contributions: string[];
  avatarInitial: string;
}

export const PROJECT_METADATA = {
  name: 'NeuroSymbioMine',
  fullName: 'NeuroSymbioMine: A Cognitive, Learning and Evolutionary Digital Twin for Mines',
  tagline: 'Transforming Static Mine Digital Twins into Learning Systems That Remember, Simulate, and Recommend.',
  competition: 'CIL–IMiN Hackathon 2026',
  registrationNo: 'VMDIGITW-2026-0015',
  institution: 'Chennai Institute of Technology',
  location: 'Chennai, Tamil Nadu, India',
  coreVision: 'Build an industrial digital-twin platform that transforms a conventional static 3D mine into a cognitive operational environment that learns from past incidents, monitors the present, simulates possible futures (Phantom Twins), and recommends explainable actions for safer and more productive mining operations.'
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Sri Desiyan V',
    role: 'Principal Investigator & Team Lead',
    specialization: 'Cognitive Digital Twin Architecture, Decision Evolution & Multi-System Integration',
    contributions: [
      'System Architecture & Mine Cortex design',
      'Cognitive Knowledge Graph & Decision Evolution pipeline',
      'Integration of DAS/DTS fiber telemetry & pulse ingestion',
      'Project coordination for CIL-IMiN Hackathon 2026'
    ],
    avatarInitial: 'SD'
  },
  {
    name: 'Sivasakthi T',
    role: 'Simulation & Phantom Twins Development',
    specialization: 'Deterministic Future Simulation, Operational Risk Modeling & Historical Incident Learning',
    contributions: [
      'Digital Memory temporal incident repository and rule synthesis',
      'Phantom Twins parallel scenario evaluation engine (A/B/C)',
      'Deterministic risk and production throughput scoring models',
      'Predictive maintenance validation algorithms'
    ],
    avatarInitial: 'ST'
  },
  {
    name: 'A. Mohamed Ismail',
    role: 'Digital Twin Development & Spatial Visualization',
    specialization: '3D Mine Reconstruction, Equipment Rigging & Spatial Telemetry Overlays',
    contributions: [
      'Interactive 3D WebGL Open-pit mining scene implementation',
      'Terraced excavation benches & haul-road spline navigation',
      'Dynamic equipment simulation (excavators, trucks, conveyor systems)',
      'Spatial sensor markers, heatmaps & raycasting inspection'
    ],
    avatarInitial: 'MI'
  }
];
