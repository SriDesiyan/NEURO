import { KnowledgeNode, KnowledgeEdge } from '../types/mine';

export const KNOWLEDGE_NODES: KnowledgeNode[] = [
  {
    id: 'TRK-105',
    label: 'TRK-105 (Haul Truck)',
    category: 'asset',
    status: 'warning',
    x: 320,
    y: 220,
    details: '400T Cat 797F haul truck with active differential vibration anomaly (8.7 mm/s) ascending Haul Ramp B.'
  },
  {
    id: 'ZN-RAMP-B',
    label: 'ZN-RAMP-B (Haul Ramp B)',
    category: 'zone',
    status: 'warning',
    x: 480,
    y: 120,
    details: '11% gradient single-lane switchback corridor with high-density uphill loaded haul traffic.'
  },
  {
    id: 'SN-VIB-09',
    label: 'SN-VIB-09 (Differential Vibration)',
    category: 'sensor',
    status: 'critical',
    x: 180,
    y: 180,
    details: 'Tri-axial wireless high-frequency piezo vibration sensor on rear axle differential housing.'
  },
  {
    id: 'SN-DAS-01',
    label: 'SN-DAS-01 (DAS Optical Fiber)',
    category: 'sensor',
    status: 'normal',
    x: 620,
    y: 150,
    details: 'Distributed acoustic and strain fiber optic cable buried beneath Haul Ramp B road surface.'
  },
  {
    id: 'MEM-2026-0088',
    label: 'MEM-2026-0088 (Historical Seizure)',
    category: 'incident',
    status: 'critical',
    x: 200,
    y: 340,
    details: 'Past incident from Feb 2026: differential catastrophic failure caused 8.4h haul ramp blockage. Similarity to current TRK-105: 91%.'
  },
  {
    id: 'RULE-DIFF-04',
    label: 'RULE-DIFF-VIB-04 (Cognitive Rule)',
    category: 'policy',
    status: 'normal',
    x: 380,
    y: 420,
    details: 'Autonomous policy learned from MEM-2026-0088: Pre-emptive pullout recommended when vibration > 6.5 mm/s on steep grades.'
  },
  {
    id: 'EXC-701',
    label: 'EXC-701 (Electric Shovel)',
    category: 'asset',
    status: 'normal',
    x: 120,
    y: 70,
    details: 'P&H 4100XPC shovel at Bench 4 dig face; primary ore supplier for TRK-105.'
  },
  {
    id: 'ZN-NORTH-B4',
    label: 'ZN-NORTH-B4 (Dig Bench 4)',
    category: 'zone',
    status: 'normal',
    x: 260,
    y: 50,
    details: 'Active ore extraction face monitored by interferometric slope radar.'
  },
  {
    id: 'CRU-01',
    label: 'CRU-01 (Primary Crusher)',
    category: 'asset',
    status: 'normal',
    x: 540,
    y: 300,
    details: 'Primary 60-89 gyratory crusher receiving run-of-mine ore from haul truck fleet.'
  },
  {
    id: 'CNV-04',
    label: 'CNV-04 (Overland Conveyor)',
    category: 'asset',
    status: 'normal',
    x: 680,
    y: 320,
    details: '2.4km overland conveyor transferring crushed ore from crusher to plant.'
  }
];

export const KNOWLEDGE_EDGES: KnowledgeEdge[] = [
  { source: 'TRK-105', target: 'ZN-RAMP-B', relation: 'traversing' },
  { source: 'SN-VIB-09', target: 'TRK-105', relation: 'monitors bearing' },
  { source: 'SN-DAS-01', target: 'ZN-RAMP-B', relation: 'monitors sub-base' },
  { source: 'TRK-105', target: 'MEM-2026-0088', relation: '91% pattern match' },
  { source: 'MEM-2026-0088', target: 'RULE-DIFF-04', relation: 'synthesized rule' },
  { source: 'RULE-DIFF-04', target: 'TRK-105', relation: 'recommends diversion' },
  { source: 'EXC-701', target: 'ZN-NORTH-B4', relation: 'excavating at' },
  { source: 'EXC-701', target: 'TRK-105', relation: 'dispatches payload to' },
  { source: 'TRK-105', target: 'CRU-01', relation: 'destination hopper' },
  { source: 'CRU-01', target: 'CNV-04', relation: 'feeds downstream' }
];
