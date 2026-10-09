import React, { useState } from 'react';
import { Asset } from '../../types/mine';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  HelpCircle,
  Activity,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface AskNeuroAssistantProps {
  assets: Asset[];
  onSelectAsset?: (assetId: string) => void;
  onOpenPhantomTwins?: () => void;
}

export const AskNeuroAssistant: React.FC<AskNeuroAssistantProps> = ({
  assets,
  onSelectAsset,
  onOpenPhantomTwins
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'neuro'; text: string; details?: React.ReactNode }>>([
    {
      sender: 'neuro',
      text: "Hello! I am Neuro, the operational cognitive agent. Ask me about equipment risks, historical failure memory, or Phantom Twin projections."
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const sampleQuestions = [
    'Which haul truck has the highest simulated risk?',
    'What was the most recent recorded incident?',
    'Why did Phantom Twin B receive the best score?',
    'What sensors monitor Haul Ramp B?'
  ];

  const handleAsk = (query: string) => {
    const q = query.toLowerCase();
    let replyText = '';
    let detailsNode: React.ReactNode = null;

    if (q.includes('risk') || q.includes('truck') || q.includes('highest')) {
      const trk105 = assets.find((a) => a.id === 'TRK-105') || assets[0];
      replyText = `TRK-105 (CAT 797F) currently exhibits the highest simulated risk profile (Health: ${trk105.healthScore}%).`;
      detailsNode = (
        <div className="p-2.5 rounded bg-[#080E14] border border-amber/40 text-[11px] font-mono mt-1 space-y-1">
          <div className="text-amber font-bold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Warning Condition: Bearing Vibration Spike
          </div>
          <div>&bull; Current Vibration: <strong>{trk105.vibration} mm/s</strong> (Normal: &lt; 4.5)</div>
          <div>&bull; Location: {trk105.zone} on 11% ascending grade</div>
          <div>&bull; Correlated Incident: MEM-2026-0088 (91% pattern match)</div>
          {onSelectAsset && (
            <button
              onClick={() => {
                onSelectAsset('TRK-105');
                setIsOpen(false);
              }}
              className="text-cyan underline text-[10px] mt-1 block font-bold"
            >
              &rarr; Focus camera on TRK-105 in 3D scene
            </button>
          )}
        </div>
      );
    } else if (q.includes('incident') || q.includes('history') || q.includes('past')) {
      replyText = `The most critical correlated incident is MEM-2026-0088 (Haul Truck Differential Seizure).`;
      detailsNode = (
        <div className="p-2.5 rounded bg-[#080E14] border border-cyan/40 text-[11px] font-mono mt-1 space-y-1">
          <div className="text-cyan font-bold">Historical Record: MEM-2026-0088 (Feb 18, 2026)</div>
          <div>&bull; Downtime Impact: 8.4 hours ramp blockage ($142,000 production loss)</div>
          <div>&bull; Governing Learned Rule: <code>RULE-DIFF-VIB-04</code></div>
          <div>&bull; Synthesis: Pre-emptive inspection required when vibration &gt; 6.5 mm/s</div>
        </div>
      );
    } else if (q.includes('phantom') || q.includes('score') || q.includes('scenario b')) {
      replyText = `Phantom Scenario B (Predictive Maintenance) achieved the Pareto-optimal score (Risk: 14/100, Availability: 94.2%).`;
      detailsNode = (
        <div className="p-2.5 rounded bg-[#080E14] border border-teal/40 text-[11px] font-mono mt-1 space-y-1">
          <div className="text-teal font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Scenario B Rationale:
          </div>
          <div>&bull; Trade-off: Accepts 45 min planned siding inspection vs 8.4h breakdown</div>
          <div>&bull; Throughput Preserved: 17,650 tons/shift with reserve truck fill</div>
          <div>&bull; Energy Benefit: -4.2% fuel drag eliminated</div>
          {onOpenPhantomTwins && (
            <button
              onClick={() => {
                onOpenPhantomTwins();
                setIsOpen(false);
              }}
              className="text-teal underline text-[10px] mt-1 block font-bold"
            >
              &rarr; Open Phantom Twins comparison matrix
            </button>
          )}
        </div>
      );
    } else if (q.includes('sensor') || q.includes('ramp')) {
      replyText = `Haul Ramp B is monitored by continuous optic fiber strain and acoustic telemetry.`;
      detailsNode = (
        <div className="p-2.5 rounded bg-[#080E14] border border-cyan/40 text-[11px] font-mono mt-1 space-y-1">
          <div>&bull; <strong>SN-DAS-01</strong>: Distributed Acoustic Sensing (120 με dynamic strain)</div>
          <div>&bull; <strong>SN-VIB-09</strong>: Wireless piezo bearing sensor on TRK-105 axle</div>
          <div>&bull; Ingress Latency: 12ms via MQTT edge broker</div>
        </div>
      );
    } else {
      replyText = `NeuroSymbioMine operates on 134 telemetry streams and 5 years of historical memory. Ask about TRK-105, Ramp B sensors, or Phantom Twins.`;
    }

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: query },
      { sender: 'neuro', text: replyText, details: detailsNode }
    ]);
    setInputVal('');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-[#19C8D8] to-[#25C9AB] text-[#070C12] shadow-[0_4px_24px_rgba(25,200,216,0.5)] hover:scale-105 transition-transform flex items-center gap-2 font-mono font-bold text-xs"
        aria-label="Open Ask Neuro Assistant"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden sm:inline">ASK NEURO</span>
      </button>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[520px] bg-[#101923] border border-[#243647] rounded-xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-3.5 bg-[#172635] border-b border-[#243647] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#080E14] border border-cyan/40 p-0.5 flex items-center justify-center text-cyan">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-main leading-tight">
                  Ask Neuro <span className="text-cyan font-mono text-xs">&bull; Expert Agent</span>
                </h4>
                <span className="text-[10px] font-mono text-dim">
                  Context-Aware Operational Assistant
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-muted hover:text-main hover:bg-[#1D3042]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Chip Starters */}
          <div className="p-2.5 bg-[#0D1A27] border-b border-[#243647] flex gap-1.5 overflow-x-auto text-[11px] font-mono">
            {sampleQuestions.slice(0, 3).map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(q)}
                className="px-2 py-1 rounded bg-[#13202D] hover:bg-[#1A2D3F] text-muted hover:text-cyan border border-[#243647] whitespace-nowrap transition-colors"
              >
                {q.length > 28 ? q.substring(0, 26) + '...' : q}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[88%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#1D3042] text-main border border-cyan/30'
                      : 'bg-[#13202D] text-muted border border-[#243647]'
                  }`}
                >
                  <p>{m.text}</p>
                  {m.details && <div className="mt-1">{m.details}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputVal.trim()) handleAsk(inputVal);
            }}
            className="p-2.5 bg-[#0D1A27] border-t border-[#243647] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Neuro a question..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-3 py-2 bg-[#080E14] border border-[#243647] rounded text-xs text-main placeholder-dim focus:outline-none focus:border-cyan font-sans"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded bg-cyan text-[#070C12] hover:bg-teal disabled:opacity-40 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
