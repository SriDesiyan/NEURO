# NeuroSymbioMine

> **Cognitive Evolutionary Digital Twin for Mines**  
> *Transforming Static Mine Digital Twins into Learning Systems That Remember, Simulate, and Recommend.*

[![CIL-IMiN Hackathon 2026](https://img.shields.io/badge/CIL--IMiN%20Hackathon-2026-18D4E8.svg)](#)
[![Proposal ID](https://img.shields.io/badge/Proposal-VMDIGITW--2026--0015-28D7B0.svg)](#)
[![Institution](https://img.shields.io/badge/Institution-Chennai%20Institute%20of%20Technology-F2AA3B.svg)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20Three.js%20%7C%20TypeScript%20%7C%20Vite-blue.svg)](#)
[![Vercel Ready](https://img.shields.io/badge/Deployment-Vercel%20Ready-black.svg?logo=vercel)](#)

---

## 1. Project Overview & Core Vision

Traditional mining digital twins are typically passive 3D geometric viewers linked to disconnected relational databases. **NeuroSymbioMine** transforms conventional static mining twins into active, cognitive operational systems:

1. **Remembers (Digital Memory):** Retains historical failure telemetry, geotechnical deformations, and operational incidents, automatically synthesizing learned constraint policies.
2. **Understands (Mine Cortex):** Constructs a bi-directional operational knowledge graph linking mobile equipment, haul roads, sensor telemetry, and environmental conditions.
3. **Simulates (Phantom Twins):** Projects parallel forward branching scenarios ahead of time (Baseline vs. Predictive PM vs. Haul Route Diversion) to evaluate safety, throughput, and carbon drag before committing physical resources.
4. **Recommends (Decision Evolution Engine):** Ranks alternative actions using transparent multi-objective scoring and delivers plain-language, explainable recommendations with full supporting evidence dossiers.

---

## 2. Project Team & Credentials

- **Sri Desiyan V** — *Principal Investigator & Team Lead*  
  Cognitive Digital Twin Architecture, Decision Evolution & Multi-System Integration
- **Sivasakthi T** — *Simulation & Phantom Twins Development*  
  Deterministic Future Simulation, Operational Risk Modeling & Historical Incident Learning
- **A. Mohamed Ismail** — *Digital Twin Development & Spatial Visualization*  
  3D Mine Reconstruction, Equipment Rigging & Spatial Telemetry Overlays

**Institution:** Chennai Institute of Technology (CIT), Chennai, Tamil Nadu, India  
**Competition:** Coal India Limited (CIL) – IMiN Hackathon 2026  
**Proposal Registration Number:** `VMDIGITW-2026-0015`

---

## 3. Key System Modules

### A. Interactive 3D Open-Pit Mine (WebGL / Three.js)
- **Terraced Excavation Benches:** Procedural 6-level open-pit amphitheater excavation with realistic rock strata (overburden, sandstone, carbonaceous host rock, ore dig-face, and pit sump floor).
- **Physical Equipment Assemblies:** Animated crawler tracks, revolving upper cab and boom on the excavator shovel (EXC-701), continuous overland conveyor belt, primary gyratory crusher (CRU-01), and ultra-class haul trucks (TRK-105, TRK-101, TRK-102) with rotating wheel physics on spiral haul ramps.
- **Raycasting Inspection:** Click any machinery or sensor beacon in 3D space to trigger smooth camera lerp focus and load live telemetry in the inspector.
- **Layer Visibility Controls:** Instant toggles for Equipment, Sensors, Telemetry Links, Haul Routes, Hazard Polygons, and Slope Stability Heatmaps.

### B. Digital Twin Explorer (3-Panel Workspace)
- **Asset Explorer (Left):** Filter mobile equipment, fixed infrastructure, sensors, and mine zones with live health scores.
- **3D Scene Viewport (Center):** Interactive Three.js canvas with HUD overlays and camera overview resets.
- **Asset Inspector (Right):** Real-time thermal gauges, vibration velocity, speed, payload, operator credentials, and SVG sparkline telemetry trends.

### C. Live Mine Operations Dashboard
- 8 Primary KPI telemetry cards (Monitored Assets, Fleet Availability, Active Warnings, Throughput Rate, Average Cycle Time, Highwall Creep, PM10 Dust).
- Interactive SVG charts for hourly crusher throughput and TRK-105 differential vibration acceleration trajectory.

### D. Pulse Layer (Live Data Acquisition)
- Multi-modal ingestion interface consolidating DAS/DTS fiber optics, micro-seismic geophones, CAN-bus equipment telemetry, and interferometric radar.
- Real-time streaming event table with pause/resume feed control and sensor type filtering.
- Deterministic in-browser simulation adapter with ready pluggable interface for future edge MQTT/WebSocket brokers.

### E. Mine Cortex (Operational Knowledge Graph)
- Interactive bi-directional SVG knowledge graph connecting equipment, sensors, haul roads, past incidents, and cognitive policies.
- Click any node to highlight connected entities and inspect the contextual semantic dossier.

### F. Digital Memory (Incident Learning Timeline)
- Temporal case repository featuring historical failure signatures (Differential bearing seizure, conveyor splice fatigue, road sub-base slump).
- Replay state capability that resets the twin to historical incident conditions.
- Displays learned rules (e.g. `RULE-DIFF-VIB-04`) synthesized from past outcomes.

### G. Phantom Twins (Parallel Future Simulation)
- Dedicated deterministic multi-future simulation comparing:
  - **Scenario A (Baseline):** 86% risk of catastrophic bearing seizure on 11% grade.
  - **Scenario B (Predictive PM - Recommended):** 45-minute summit pitstop saving 8.4 hours of arterial haul blockage.
  - **Scenario C (Dynamic Reroute):** Power derate with 1.8 km bypass loop.
- One-click simulation execution engine updating the active twin state with quantitative deltas vs baseline.

### H. Decision Evolution Engine & Action Center
- 7-step cognitive reasoning pipeline visualization.
- Operator action triggers: Accept & dispatch work orders, inspect supporting evidence dossiers, and export JSON audit reports.

---

## 4. Video Demonstrations & Media Assets

The repository contains four verified video demonstrations served via Vite public static assets:

| Video File | Resolution & Ratio | Duration | Visual Description & Placement |
| :--- | :--- | :--- | :--- |
| **`video-project.mp4`** (171.2 MB) | **2520 × 1080** (21:9 Ultrawide) | **01:48** | Full multi-zone (Zones 1–11) open-pit simulation with shovel loading, CAT haul truck transit, and primary crushing hub. Featured in the **Product Demonstration ("WATCH THE MINE COME TO LIFE")**. |
| **`video-project-1.mp4`** (44.7 MB) | **2520 × 1080** (21:9 Ultrawide) | **00:28** | Primary crushing dump pocket and continuous overland conveyor belt transferring ore from the pit floor to the plant stockpile. Linked in **Live Operations & Fixed Plant**. |
| **`video-project-2.mp4`** (61.6 MB) | **2520 × 1080** (21:9 Ultrawide) | **00:45** | Aerial trajectory showcasing 6-tier terraced excavation benches, highwall haul switchback roads, and traffic synchronization. Linked in **3D Spatial Elevation Twin**. |
| **`screen-recording-2026-10-09.mp4`** (89.1 MB) | **1916 × 1078** (16:9 Full HD) | **01:34** | Engineering 3D Longwall Shearer spatial twin, hydraulic roof supports, and live ventilation gas monitoring HUD. Linked in **Pulse Sensor Ingress & HUD**. |

*Note: All video media files are tracked via **Git LFS** in `.gitattributes` to adhere to GitHub's file storage standards.*

---

## 5. Technology Stack & Simulation Architecture

- **Frontend & UI:** React 18, TypeScript, Vite
- **3D Graphics & Spatial Visualization:** Three.js (WebGL, procedural geometry, lighting, PCF soft shadow maps, raycasting)
- **Icons & Visual Language:** Lucide React, Google Fonts (Outfit, Inter, JetBrains Mono)
- **Styling & Design System:** Custom Structured Dark Industrial CSS (`#070C12`, `#0D1A27`, `#13202D`, Electric Cyan `#19C8D8`, Teal `#25C9AB`, Amber `#E4A12D`)
- **Simulation Engine:** `LocalSimulationAdapter` — deterministic, seeded in-browser operational telemetry event generator providing realistic live readings without requiring external dependencies.
- **Planned / Future Integrations:** External MQTT edge broker ingestion, FastAPI backend telemetry streaming, and automated PLC control-loop actions (clearly identified in UI as simulation mode until physical site commissioning).

---

## 6. Getting Started & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended, tested on Node v20/v22)
- npm (v9.0.0 or higher)
- Git & Git LFS (`git lfs install`)

### Installation
```bash
# Clone the repository
git clone https://github.com/SriDesiyan/NEURO.git
cd NEURO

# Install clean locked dependencies
npm ci
```

### Running the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Building for Production
```bash
npm run build
```
The optimized production bundle will be created in the `dist/` directory.

### Previewing the Production Build
```bash
npm run preview
```

---

## 7. Deploying to Vercel

NeuroSymbioMine is fully configured for continuous deployment on [Vercel](https://vercel.com).

1. Log in to [Vercel](https://vercel.com) and click **"Add New..." &rarr; "Project"**.
2. Select and import the GitHub repository: **`SriDesiyan/NEURO`**.
3. Vercel automatically detects the project settings via [`vercel.json`](./vercel.json):
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci`
4. *(Optional)* In **Environment Variables**, you may set:
   - `VERCEL_GIT_LFS=1` (enables automatic Git LFS asset pulling during Vercel builds).
5. Click **Deploy**.

---

## 8. License & Hackathon Notice

Developed specifically for the **CIL–IMiN Hackathon 2026** under Proposal ID **VMDIGITW-2026-0015**.  
Copyright &copy; 2026 Chennai Institute of Technology. All rights reserved.
