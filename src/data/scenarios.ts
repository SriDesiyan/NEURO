import { PhantomScenario } from '../types/mine';

export const PHANTOM_SCENARIOS: PhantomScenario[] = [
  {
    id: 'SCENARIO-A',
    tag: 'Scenario A',
    name: 'Baseline Operational Continuity (No Action)',
    type: 'baseline',
    description: 'Continue operating TRK-105 on Haul Ramp B along current dispatch plan without intervention.',
    intervention: 'None. Maintain current dispatch speed (24 km/h target) and 100% payload cycle.',
    metrics: {
      riskScore: 86,
      expectedThroughput: 18200,
      expectedDowntime: 8.4,
      energyImpact: '+6.8% (friction drag)',
      safetyIndex: 42,
      fleetAvailability: 71.5
    },
    assumptions: [
      'Bearing vibration trajectory matches historical incident MEM-2026-0088 within 91% confidence.',
      '74% probability of catastrophic differential freeze on 11% grade within 120-150 minutes.',
      'Will require emergency heavy retrieval and complete ramp clearance shutdown.'
    ],
    isRecommended: false
  },
  {
    id: 'SCENARIO-B',
    tag: 'Scenario B',
    name: 'Predictive Maintenance Intervention (Proactive Pullout)',
    type: 'maintenance',
    description: 'Divert TRK-105 to Summit Maintenance Siding for immediate oil sample, ultrasonic bearing check, and thermal flush.',
    intervention: 'Immediate diversion at top of Ramp B; 45-minute pit-stop turnaround; dispatch spare TRK-108 from stand-by reserve.',
    metrics: {
      riskScore: 14,
      expectedThroughput: 17650,
      expectedDowntime: 0.75,
      energyImpact: '-4.2% (eliminates mechanical binding)',
      safetyIndex: 96,
      fleetAvailability: 94.2
    },
    assumptions: [
      'Stops mechanical degradation before race damage occurs; avoids catastrophic component destruction.',
      'Stand-by truck TRK-108 fills haul gap within 12 minutes of diversion.',
      'Saves an estimated $124,000 in unscheduled downtime and secondary transmission failure.'
    ],
    isRecommended: true
  },
  {
    id: 'SCENARIO-C',
    tag: 'Scenario C',
    name: 'Dynamic Haul-Route Rerouting & Power Derate',
    type: 'reroute',
    description: 'Keep TRK-105 in service but derate speed to 15 km/h and reroute around Ramp B via Eastern Bypass (6% gentler grade).',
    intervention: 'Dynamic traffic rerouting via fleet dispatch; avoid steep 11% Ramp B gradient; defer service to shift change.',
    metrics: {
      riskScore: 39,
      expectedThroughput: 16800,
      expectedDowntime: 1.5,
      energyImpact: '+3.5% (longer 1.8km haul circuit)',
      safetyIndex: 85,
      fleetAvailability: 88.0
    },
    assumptions: [
      'Reduces mechanical torque on damaged differential bearings by 42%.',
      'Extends cycle time by 6.4 minutes per round trip, causing minor truck bunching.',
      'Allows completing shift without immediate stoppage, but carries 26% residual failure risk.'
    ],
    isRecommended: false
  }
];
