import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  Film,
  Layers,
  CheckCircle2,
  ArrowRight,
  Activity,
  Cpu,
  Brain,
  Sliders,
  Compass
} from 'lucide-react';

export interface ProjectVideo {
  id: string;
  title: string;
  tag: string;
  duration: string;
  resolution: string;
  aspectRatio: string;
  src: string;
  poster: string;
  description: string;
  technicalDetails: string;
  mappedSection: string;
  sectionTarget: string;
}

export const PROJECT_VIDEOS: ProjectVideo[] = [
  {
    id: 'video-1',
    title: 'Multi-Zone Open-Pit Operational Simulation',
    tag: '3D TWIN SIMULATION',
    duration: '01:48',
    resolution: '2520 × 1080',
    aspectRatio: '21:9 Ultrawide',
    src: '/videos/video-project.mp4',
    poster: '/videos/posters/video-project.mp4.jpg',
    description: 'Dynamic 3D mining operations across all 11 production zones. Demonstrates shovel dig-face loading, haul truck transit, stockpiling, and primary gyratory crushing.',
    technicalDetails: 'Zone 1–11 spatial routing &bull; CAT 797F & JCB excavator rigs &bull; 60 FPS spatial physics',
    mappedSection: 'Digital Twin Explorer',
    sectionTarget: 'twin'
  },
  {
    id: 'video-2',
    title: 'Primary Crushing Hub & Continuous Overland Conveyor',
    tag: 'FIXED INFRASTRUCTURE',
    duration: '00:28',
    resolution: '2520 × 1080',
    aspectRatio: '21:9 Ultrawide',
    src: '/videos/video-project-1.mp4',
    poster: '/videos/posters/video-project-1.mp4.jpg',
    description: 'Crusher dump pocket receiving ore from loaded haulage units and continuous steel-cord conveyor belt transferring material from pit floor to processing stockpile.',
    technicalDetails: 'Continuous material kinematics &bull; Transfer chute physics &bull; Rip-detection telemetry',
    mappedSection: 'Live Operations & Fixed Plant',
    sectionTarget: 'dashboard'
  },
  {
    id: 'video-3',
    title: 'Multi-Level Terraced Bench Haulage & Pit Elevation',
    tag: 'SPATIAL ELEVATION',
    duration: '00:45',
    resolution: '2520 × 1080',
    aspectRatio: '21:9 Ultrawide',
    src: '/videos/video-project-2.mp4',
    poster: '/videos/posters/video-project-2.mp4.jpg',
    description: 'Comprehensive aerial camera trajectory showcasing the 6-tier terraced excavation benches, highwall switchback roads, and multi-vehicle traffic synchronization.',
    technicalDetails: 'Multi-bench gradient analysis &bull; Switchback turn radii &bull; Traffic collision boundaries',
    mappedSection: 'Terraced Elevation Twin',
    sectionTarget: 'twin'
  },
  {
    id: 'video-4',
    title: 'Longwall Shearer Spatial Twin & Real-Time Telemetry HUD',
    tag: 'UNDERGROUND & HUD',
    duration: '01:34',
    resolution: '1916 × 1078',
    aspectRatio: '16:9 Full HD',
    src: '/videos/screen-recording-2026-10-09.mp4',
    poster: '/videos/posters/screen-recording-2026-10-09.mp4.jpg',
    description: 'Engineering 3D Longwall Shearer model, hydraulic roof supports, live ventilation gas monitoring HUD (CH4, airflow, pressure), and what-if hazard simulation.',
    technicalDetails: 'Blender 3D engineering reconstruction &bull; Real-time sensor HUD &bull; Ventilation safety map',
    mappedSection: 'Pulse Sensor Ingress & HUD',
    sectionTarget: 'pulse'
  }
];

interface VideoDemonstrationProps {
  onEnterTwin: () => void;
  onRunScenario?: () => void;
  onViewDecisionEngine?: () => void;
  onExploreArchitecture?: () => void;
}

export const VideoDemonstration: React.FC<VideoDemonstrationProps> = ({
  onEnterTwin,
  onRunScenario,
  onViewDecisionEngine,
  onExploreArchitecture
}) => {
  const [activeVideo, setActiveVideo] = useState<ProjectVideo>(PROJECT_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSelectVideo = (video: ProjectVideo) => {
    setActiveVideo(video);
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const scrollToTarget = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="demonstrations" className="section-padding bg-[#080E14] border-t border-[#243647]">
      <div className="container">
        {/* =========================================================================
            PART A: FEATURED DEMONSTRATION ("WATCH THE MINE COME TO LIFE")
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          {/* Left Column: Technical Narrative & Key Action Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#13202D] border border-[#243647] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#19C8D8] animate-pulse" />
              <span className="text-cyan font-bold tracking-wider uppercase">
                NEUROSYMBIOMINE &bull; PRODUCT DEMONSTRATION
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight text-main">
              WATCH THE MINE <br />
              <span className="text-gradient">COME TO LIFE.</span>
            </h2>

            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Explore the NeuroSymbioMine prototype through its mining environment,
              equipment simulations, operational telemetry and cognitive decision-support workflow.
            </p>

            <div className="p-4 rounded-lg bg-[#0D1A27] border border-[#243647] space-y-2.5 text-xs font-mono text-muted">
              <div className="flex items-center gap-2 text-main font-semibold">
                <CheckCircle2 className="w-4 h-4 text-teal" />
                <span>Authentic 3D Spatial Environment</span>
              </div>
              <p className="text-[11px] text-dim pl-6">
                Accurate terraced benches, highwall haul switchbacks, and continuous materials transport.
              </p>
              <div className="flex items-center gap-2 text-main font-semibold pt-1">
                <Activity className="w-4 h-4 text-cyan" />
                <span>Real-Time Sensor Overlays</span>
              </div>
              <p className="text-[11px] text-dim pl-6">
                Synchronized telemetry HUD feeds live equipment vibration, temperatures, and gas metrics.
              </p>
            </div>

            {/* TASK 5 Required Action Controls: WATCH DEMO / EXPLORE TWIN / RUN SCENARIO / DECISION ENGINE */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={onEnterTwin}
                className="btn btn-primary text-xs font-mono px-4 py-2.5 flex items-center justify-center gap-2"
                title="Open interactive 3D WebGL Digital Twin"
              >
                <Compass className="w-3.5 h-3.5" />
                EXPLORE THE TWIN
              </button>

              <button
                onClick={onRunScenario ? onRunScenario : () => scrollToTarget('phantom')}
                className="btn btn-secondary text-xs font-mono px-4 py-2.5 flex items-center justify-center gap-2"
                title="Launch Phantom Twins parallel simulation"
              >
                <Sliders className="w-3.5 h-3.5 text-teal" />
                RUN A SCENARIO
              </button>

              <button
                onClick={onViewDecisionEngine ? onViewDecisionEngine : () => scrollToTarget('decisions')}
                className="btn btn-secondary text-xs font-mono px-4 py-2.5 flex items-center justify-center gap-2"
                title="Inspect Decision Evolution Engine"
              >
                <Brain className="w-3.5 h-3.5 text-cyan" />
                VIEW DECISION ENGINE
              </button>

              <button
                onClick={onExploreArchitecture ? onExploreArchitecture : () => scrollToTarget('architecture')}
                className="btn btn-ghost text-xs font-mono px-4 py-2.5 flex items-center justify-center gap-2"
                title="View 8-Tier Architecture"
              >
                <Cpu className="w-3.5 h-3.5 text-amber" />
                ARCHITECTURE
              </button>
            </div>
          </div>

          {/* Right Column: Featured Video Player Display */}
          <div className="lg:col-span-7">
            <div className="cyber-panel bg-[#0D1A27] border border-[#243647] rounded-lg overflow-hidden shadow-2xl">
              {/* Video Viewport Container */}
              <div className="relative aspect-[21/9] sm:aspect-[16/9] lg:aspect-[21/9] bg-[#000000] overflow-hidden group">
                <video
                  ref={videoRef}
                  key={activeVideo.src}
                  src={activeVideo.src}
                  poster={activeVideo.poster}
                  preload="metadata"
                  muted={isMuted}
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Big Center Play Button Overlay (when paused) */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 bg-[#080E14]/50 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-opacity"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#E4A12D] text-[#070C12] flex items-center justify-center shadow-[0_0_24px_rgba(228,161,45,0.6)] hover:scale-105 transition-transform">
                      <Play className="w-8 h-8 ml-1 fill-current" />
                    </div>
                  </div>
                )}

                {/* Scrubber & Player HUD Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#080E14] via-[#080E14]/85 to-transparent space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Progress Seek Bar */}
                  <div className="w-full flex items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-[#243647] rounded-lg appearance-none cursor-pointer accent-[#19C8D8]"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-main">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded hover:bg-[#1D3042] text-cyan transition-colors"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded hover:bg-[#1D3042] text-muted hover:text-main transition-colors"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <span className="text-[11px] text-dim">
                        {formatTime(currentTime)} / {activeVideo.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="cyber-badge badge-cyan text-[10px] hidden sm:inline-block">
                        {activeVideo.resolution} &bull; {activeVideo.aspectRatio}
                      </span>
                      <button
                        onClick={handleFullscreen}
                        className="p-1.5 rounded hover:bg-[#1D3042] text-muted hover:text-cyan transition-colors"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Caption Strip */}
              <div className="p-4 bg-[#101923] border-t border-[#243647]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="font-heading font-bold text-sm text-main">
                    {activeVideo.title}
                  </span>
                  <span className="cyber-badge badge-teal text-[10px]">
                    {activeVideo.tag}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed mb-2">
                  {activeVideo.description}
                </p>
                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-dim pt-2 border-t border-[#1C2836] gap-2">
                  <span dangerouslySetInnerHTML={{ __html: activeVideo.technicalDetails }} />
                  <button
                    onClick={() => scrollToTarget(activeVideo.sectionTarget)}
                    className="text-cyan hover:underline flex items-center gap-1 font-semibold"
                  >
                    Related Feature: {activeVideo.mappedSection}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART B: COMPLETE 4-VIDEO MEDIA GALLERY (TASK 2B)
           ========================================================================= */}
        <div className="pt-8 border-t border-[#1C2836]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono text-cyan tracking-wider uppercase font-bold block mb-1">
                Project Demonstration Library
              </span>
              <h3 className="text-xl font-heading font-bold text-main">
                All 4 Video Recordings &bull; Interactive Selector
              </h3>
            </div>
            <span className="text-xs font-mono text-dim hidden sm:inline-block">
              Click any clip to load in the master player
            </span>
          </div>

          {/* 4 Video Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROJECT_VIDEOS.map((video, idx) => {
              const isSelected = activeVideo.id === video.id;
              return (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`cyber-panel p-3 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#172635] border-cyan shadow-[0_0_15px_rgba(25,200,216,0.25)]'
                      : 'bg-[#101923] border-[#243647] hover:border-[#35506A] hover:bg-[#13202D]'
                  }`}
                >
                  <div>
                    {/* Thumbnail with duration badge and poster */}
                    <div className="relative aspect-[16/9] rounded overflow-hidden mb-2.5 bg-[#000]">
                      <img
                        src={video.poster}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#080E14]/30 hover:bg-transparent transition-colors flex items-center justify-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-cyan text-[#070C12]' : 'bg-[#101923]/80 text-main'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-[#080E14]/90 text-cyan text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#243647]">
                        {video.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-cyan font-bold">CLIP 0{idx + 1}</span>
                      <span className="text-dim">{video.resolution.split(' ')[0]}</span>
                    </div>

                    <h4 className="font-heading font-bold text-xs text-main leading-snug mb-1 line-clamp-2">
                      {video.title}
                    </h4>

                    <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#1C2836] mt-2 flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? 'text-teal font-bold' : 'text-dim'}>
                      {isSelected ? '&bull; ACTIVE IN PLAYER' : 'SELECT TO PLAY'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToTarget(video.sectionTarget);
                      }}
                      className="text-cyan hover:underline flex items-center gap-0.5"
                    >
                      {video.mappedSection.split(' ')[0]} <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
