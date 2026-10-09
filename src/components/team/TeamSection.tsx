import React from 'react';
import { TEAM_MEMBERS, PROJECT_METADATA } from '../../data/teamData';
import { Award, GraduationCap, ShieldCheck, UserCheck, Code2, Sparkles, BookOpen } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="section-padding bg-[#0A1017] border-t border-[#1E2D3D]">
      <div className="container">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="cyber-badge badge-cyan text-[11px]">PROJECT TEAM &amp; HACKATHON</span>
              <span className="text-xs font-mono text-dim">CIL–IMiN Hackathon 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-main">
              Project Investigators &amp; Development Team
            </h2>
            <p className="text-sm text-muted mt-1 max-w-2xl">
              Developed by researchers and engineers at Chennai Institute of Technology for the Coal India
              Limited (CIL) – IMiN Digital Twin Innovation Challenge.
            </p>
          </div>

          <div className="p-3 rounded bg-[#101923] border border-[#1E2D3D] text-xs font-mono">
            <div className="text-dim">Proposal Registration:</div>
            <div className="font-bold text-cyan">{PROJECT_METADATA.registrationNo}</div>
          </div>
        </div>

        {/* 3 Team Member Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="cyber-panel p-6 bg-[#101923] border border-[#1E2D3D] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan/20 to-teal/20 border border-cyan/40 text-cyan font-heading font-bold text-lg flex items-center justify-center">
                    {member.avatarInitial}
                  </div>
                  <div>
                    <h3 className="text-base font-heading font-bold text-main">{member.name}</h3>
                    <span className="text-xs font-mono text-cyan block">{member.role}</span>
                  </div>
                </div>

                <div className="text-xs text-muted font-medium mb-3">
                  {member.specialization}
                </div>

                <div className="space-y-1.5 text-xs text-dim border-t border-[#1C2836] pt-3">
                  <span className="font-mono text-[10px] text-muted uppercase tracking-wider block mb-1">
                    Key Technical Contributions:
                  </span>
                  {member.contributions.map((c, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-teal font-bold">&bull;</span>
                      <span className="leading-snug">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Institution & Hackathon Banner */}
        <div className="cyber-panel p-6 bg-[#101923] border border-[#1E2D3D] rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#152332] border border-teal/40 flex items-center justify-center text-teal">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-main">
                  Chennai Institute of Technology
                </h4>
                <p className="text-xs font-mono text-dim">
                  Department of Computer Science &amp; Advanced Engineering
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#152332] border border-cyan/40 flex items-center justify-center text-cyan">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-main">
                  CIL–IMiN Hackathon 2026
                </h4>
                <p className="text-xs font-mono text-dim">
                  Coal India Limited Innovation Challenge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#152332] border border-amber/40 flex items-center justify-center text-amber">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-main">
                  VMDIGITW-2026-0015
                </h4>
                <p className="text-xs font-mono text-dim">
                  Official Research &amp; Prototype Proposal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
