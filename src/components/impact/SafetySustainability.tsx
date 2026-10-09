import React from 'react';
import { ShieldCheck, Leaf, HeartPulse, Activity, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

export const SafetySustainability: React.FC = () => {
  const pillars = [
    {
      title: 'Zero-Harm Geotechnical Safety',
      icon: <ShieldCheck className="w-5 h-5 text-teal" />,
      desc: 'Sub-millimeter interferometric radar tracking highwall deformation velocities, auto-generating dynamic exclusion boundaries before rockfalls propagate.'
    },
    {
      title: 'Pre-emptive Catastrophic Prevention',
      icon: <HeartPulse className="w-5 h-5 text-cyan" />,
      desc: 'Early identification of drive-train and differential overheating prevents hazardous on-ramp vehicle fires and high-gradient loss of control.'
    },
    {
      title: 'Carbon & Haulage Fuel Optimization',
      icon: <Leaf className="w-5 h-5 text-teal" />,
      desc: 'Eliminating mechanical friction binding and minimizing idling delays during road blockages reduces fleet diesel burn and greenhouse emissions.'
    },
    {
      title: 'Environmental Air & Dust Stewardship',
      icon: <Activity className="w-5 h-5 text-cyan" />,
      desc: 'Continuous optical dust particulate monitoring dynamically triggers water mist canons when PM10 concentrations approach statutory limits.'
    }
  ];

  return (
    <section className="section-padding bg-[#070C12] border-t border-[#1E2D3D]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge badge-teal text-[11px]">ESG &amp; OPERATIONAL EXCELLENCE</span>
              <span className="text-xs font-mono text-dim">Industrial Sustainability Impact</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-main">
              Safety, Resilience &amp; Sustainable Operations
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Engineered to protect frontline mining personnel, extend heavy machinery lifespans, and
              minimize ecological impacts through cognitive anticipatory intelligence.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pillars.map((p, i) => (
            <div key={i} className="cyber-panel p-5 bg-[#101923] border border-[#1E2D3D] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded bg-[#152332] border border-[#1C2A38] flex items-center justify-center mb-3">
                  {p.icon}
                </div>
                <h3 className="font-heading font-bold text-sm text-main mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Validation & Compliance Note */}
        <div className="cyber-panel p-4 bg-[#0B131C] border border-[#1E2D3D] rounded-lg flex items-start gap-3 text-xs text-dim">
          <AlertCircle className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Industrial Validation Note:</strong> Projected availability gains and safety metrics
            reflect simulated sandbox scenarios developed for the CIL–IMiN Hackathon 2026. Industrial
            production deployment requires calibration against mine-specific geotechnical sensor
            telemetry and DGMS (Directorate General of Mines Safety) compliance standards.
          </p>
        </div>
      </div>
    </section>
  );
};
