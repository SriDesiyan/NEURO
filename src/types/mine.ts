export type AssetCategory = 'mobile' | 'fixed' | 'sensors' | 'zones';
export type AssetStatus = 'operational' | 'warning' | 'critical' | 'idle';
export type AssetType = 'truck' | 'excavator' | 'crusher' | 'conveyor' | 'sensor' | 'zone';

export interface TelemetryPoint {
  timestamp: string;
  temp: number;
  vib: number;
  load: number;
}

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  category: AssetCategory;
  status: AssetStatus;
  position: { x: number; y: number; z: number };
  rotation?: number;
  speed?: number; // km/h
  fuel?: number; // %
  engineTemp?: number; // °C
  vibration?: number; // mm/s
  payload?: number; // tons
  healthScore: number; // 0 - 100
  zone: string;
  operator?: string;
  lastMaintenance: string;
  nextServiceHours: number;
  telemetryHistory: TelemetryPoint[];
  details?: string;
}

export type SensorFeedType = 'DAS_FIBER' | 'SEISMIC' | 'IIST_TELEMETRY' | 'GEOSPATIAL' | 'ENV_AIR' | 'THERMAL';

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  assetId: string;
  sensorType: SensorFeedType;
  value: number;
  unit: string;
  severity: 'normal' | 'warning' | 'critical';
  message: string;
}

export interface HistoricalIncident {
  id: string;
  date: string;
  title: string;
  assetId: string;
  location: string;
  severity: 'critical' | 'warning' | 'info';
  summary: string;
  triggerTelemetry: string;
  responseTaken: string;
  downtimeRecorded: string;
  learnedRule: string;
  policyApplied: string;
  relatedAssets: string[];
}

export interface PhantomScenarioMetrics {
  riskScore: number; // 0-100 (lower is better)
  expectedThroughput: number; // tons/shift
  expectedDowntime: number; // hours
  energyImpact: string; // e.g. -4.2%
  safetyIndex: number; // 0-100 (higher is better)
  fleetAvailability: number; // %
}

export interface PhantomScenario {
  id: string;
  tag: 'Scenario A' | 'Scenario B' | 'Scenario C';
  name: string;
  type: 'baseline' | 'maintenance' | 'reroute';
  description: string;
  intervention: string;
  metrics: PhantomScenarioMetrics;
  assumptions: string[];
  isRecommended?: boolean;
}

export interface Recommendation {
  id: string;
  assetId: string;
  title: string;
  severity: 'warning' | 'critical';
  triggerAnomaly: string;
  recommendedAction: string;
  similarityMatch: {
    incidentId: string;
    title: string;
    matchPct: number;
  };
  expectedBenefit: string;
  tradeoffs: string;
  confidenceScore: number;
  status: 'active' | 'dispatched' | 'dismissed';
}

export interface KnowledgeNode {
  id: string;
  label: string;
  category: 'asset' | 'sensor' | 'zone' | 'incident' | 'policy';
  status: 'normal' | 'warning' | 'critical';
  x: number;
  y: number;
  details: string;
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  relation: string;
}
