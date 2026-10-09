# NeuroSymbioMine — Project Video Inventory & Content Audit

This document catalogues the four project video demonstrations, verified through frame analysis and playback inspection.

---

## 1. Verified Video Inventory

| Video Key | Local Path | Browser Served URL | Resolution | Duration | Key Visual Content | Website Placement |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Video 1 (Primary Demo)** | `d:/minetwin.ai/Video Project.mp4` | `/videos/video-project.mp4` | **2520 x 1080** (21:9 Ultrawide) | **1m 47s** (107.5s) | Full multi-zone (Zones 1-11) open-pit mining simulation with JCB excavators, CAT haul trucks, ore stockpiles, crusher plant, and official NeuroSymbioMine HUD branding. | **Featured Product Demonstration ("WATCH THE MINE COME TO LIFE")** & Video Gallery (Item 1) |
| **Video 2 (Plant Circuit)** | `d:/minetwin.ai/Video Project (1).mp4` | `/videos/video-project-1.mp4` | **2520 x 1080** (21:9 Ultrawide) | **28s** (28.1s) | Primary crushing hub, continuous overland conveyor system transporting crushed ore, and haul truck loading maneuvers along steep switchbacks. | **Video Gallery (Item 2)** & Twin Builder / Infrastructure section |
| **Video 3 (Aerial Pit Overview)** | `d:/minetwin.ai/Video Project (2).mp4` | `/videos/video-project-2.mp4` | **2520 x 1080** (21:9 Ultrawide) | **44s** (44.9s) | Comprehensive aerial elevation view of 6 terraced excavation benches, active truck haulage fleet, switchback roads, and spatial zone mapping. | **Video Gallery (Item 3)** & Spatial 3D Twin Overview |
| **Video 4 (Longwall & HUD Twin)** | `d:/minetwin.ai/Screen Recording 2026-10-09 113415.mp4` | `/videos/screen-recording-2026-10-09.mp4` | **1916 x 1078** (16:9 Full HD) | **1m 34s** (93.9s) | Engineering 3D Longwall Shearer spatial twin, hydraulic roof supports, live ventilation gas monitoring HUD (CH4, airflow, pressure), and what-if emergency scenarios. | **Video Gallery (Item 4)** & Live Operations / Pulse Monitoring |

---

## 2. Technical Ingestion Strategy
- All video files are hosted in `public/videos/` and served with HTTP byte-range request support via Vite.
- High-resolution poster frame images extracted via OpenCV at `public/videos/posters/*.jpg`.
- Videos are configured with `preload="metadata"` to prevent premature bandwidth exhaustion while ensuring immediate playback response upon user interaction.
