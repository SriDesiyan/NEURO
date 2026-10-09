import { HistoricalIncident } from '../types/mine';

export const HISTORICAL_INCIDENTS: HistoricalIncident[] = [
  {
    id: 'MEM-2026-0088',
    date: '2026-02-18 11:24 IST',
    title: 'Haul Truck Rear Differential Bearing Seizure',
    assetId: 'TRK-105',
    location: 'Haul Ramp B (Station KM 1.4)',
    severity: 'critical',
    summary: 'A 400-ton haul truck suffered sudden differential catastrophic seizure while climbing an 11% grade, blocking the main single-lane arterial haul road for 8.4 hours and backing up 6 hauling circuits.',
    triggerTelemetry: 'Vibration accelerated from 3.8 mm/s to 9.2 mm/s over 42 minutes with oil temp reaching 104°C.',
    responseTaken: 'Towed with heavy recovery vehicle; complete differential replacement in central bay.',
    downtimeRecorded: '8.4 hours haul road blockage; 36 hours truck total downtime; $142,000 production loss.',
    learnedRule: 'RULE-DIFF-VIB-04: If vibration exceeds 6.5 mm/s on ascending haul ramps and temperature slope is > 0.3°C/min, initiate proactive bay routing within 45 minutes.',
    policyApplied: 'Automatic Cognitive Pre-emptive Routing (Dispatched by Mine Cortex)',
    relatedAssets: ['TRK-105', 'ZN-RAMP-B', 'SN-DAS-01']
  },
  {
    id: 'MEM-2025-1219',
    date: '2025-12-19 04:15 IST',
    title: 'Overland Conveyor CV-4 Splice Fatigue & Belt Tear',
    assetId: 'CNV-04',
    location: 'Overland Route CV-4 (Transfer Station 2)',
    severity: 'critical',
    summary: 'Splice pull-out caused belt delamination and spillage of 450 tons of crushed run-of-mine ore onto the transfer chute.',
    triggerTelemetry: 'Optical rip scanner showed edge misalignment of 14mm accompanied by motor current spike of 38A.',
    responseTaken: 'Automated emergency trip triggered by rip detector; cold vulcanized splice repaired.',
    downtimeRecorded: '14.2 hours circuit downtime; primary crusher had to be throttled to 25% capacity.',
    learnedRule: 'RULE-CNV-SPLICE-02: Splice displacement exceeding 8mm combined with >20A motor differential requires immediate controlled shutdown within 15 minutes before tear propagation.',
    policyApplied: 'Automated Slow-Stop & Tension Relief Protocol',
    relatedAssets: ['CNV-04', 'CRU-01']
  },
  {
    id: 'MEM-2025-1102',
    date: '2025-11-02 14:50 IST',
    title: 'Electric Shovel Hydraulic Oil Thermal Runaway',
    assetId: 'EXC-701',
    location: 'North Pit Bench 4 Face',
    severity: 'warning',
    summary: 'High ambient temperature (42°C) coupled with continuous hard dig cycle caused hydraulic cooler fan failure, leading to fluid degradation.',
    triggerTelemetry: 'Hydraulic tank sensor reported 96°C; auxiliary cooler pressure dropped by 45%.',
    responseTaken: 'Duty cycle throttled to 50%; mobile cooler flush truck dispatched.',
    downtimeRecorded: '2.5 hours reduced loading capacity; no equipment damage.',
    learnedRule: 'RULE-EXC-THERM-01: When ambient exceeds 38°C, shovel duty cycle must automatically throttle if hydraulic cooling delta drops below 15°C.',
    policyApplied: 'Adaptive Dig-Cycle Modulation',
    relatedAssets: ['EXC-701', 'ZN-NORTH-B4']
  },
  {
    id: 'MEM-2026-0114',
    date: '2026-01-14 08:30 IST',
    title: 'Haul Road Ramp B Sub-base Slump & Lateral Crack',
    assetId: 'ZN-RAMP-B',
    location: 'Haul Ramp B (Switchback Turn 2)',
    severity: 'warning',
    summary: 'Heavy monsoon downpour saturated the outer fill slope, causing a 20-meter longitudinal crack along the outer berm wheelpath.',
    triggerTelemetry: 'DAS fiber line detected progressive strain anomalies (850 με) along channel 142.',
    responseTaken: 'Heavy trucks rerouted to secondary bypass; geotechnical team backfilled and compacted crushed ballast.',
    downtimeRecorded: '4.0 hours single-lane restriction; 18% cycle time delay.',
    learnedRule: 'RULE-GEOTECH-FIBER-03: Fiber strain delta > 600 με within 6 hours during high rainfall triggers immediate speed cap of 15 km/h and dual-lane closure.',
    policyApplied: 'Real-time Fiber Strain Warning Thresholds',
    relatedAssets: ['ZN-RAMP-B', 'SN-DAS-01', 'TRK-105']
  },
  {
    id: 'MEM-2026-0304',
    date: '2026-03-04 16:10 IST',
    title: 'Bench 3 Highwall Micro-Shear Deformation Alert',
    assetId: 'SN-RAD-02',
    location: 'North Highwall Sector C',
    severity: 'info',
    summary: 'Interferometric radar detected sub-millimeter creep acceleration on joint set 2 behind shovel working envelope.',
    triggerTelemetry: 'Deformation velocity exceeded 1.8 mm/day threshold on 4 adjacent radar range cells.',
    responseTaken: 'Exclusion safety perimeter expanded by 30 meters; autonomous laser scanning survey verified block wedge.',
    downtimeRecorded: '0 hours downtime; controlled scaling performed during scheduled blast window.',
    learnedRule: 'RULE-RADAR-DISP-01: Micro-displacement > 1.5 mm/day prompts automated safety exclusion zone expansion without stopping production.',
    policyApplied: 'Dynamic Spatial Exclusion Zone Generation',
    relatedAssets: ['SN-RAD-02', 'ZN-NORTH-B4', 'EXC-701']
  }
];
