import React, { useState } from 'react';
import { Asset, AssetCategory } from '../../types/mine';
import { Search, Truck, HardHat, Radio, MapPin, AlertTriangle, CheckCircle2, SlidersHorizontal } from 'lucide-react';

interface AssetExplorerProps {
  assets: Asset[];
  selectedAssetId: string | null;
  onSelectAsset: (assetId: string) => void;
}

export const AssetExplorer: React.FC<AssetExplorerProps> = ({
  assets,
  selectedAssetId,
  onSelectAsset
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | 'all'>('all');

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch =
      asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.zone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: AssetCategory) => {
    switch (category) {
      case 'mobile':
        return <Truck className="w-3.5 h-3.5 text-cyan" />;
      case 'fixed':
        return <HardHat className="w-3.5 h-3.5 text-teal" />;
      case 'sensors':
        return <Radio className="w-3.5 h-3.5 text-cyan" />;
      case 'zones':
        return <MapPin className="w-3.5 h-3.5 text-amber" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'warning':
        return (
          <span className="cyber-badge badge-amber text-[10px] py-0 px-1.5 flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5" /> WARN
          </span>
        );
      case 'critical':
        return (
          <span className="cyber-badge badge-red text-[10px] py-0 px-1.5 flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5" /> CRIT
          </span>
        );
      default:
        return (
          <span className="cyber-badge badge-teal text-[10px] py-0 px-1.5 flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" /> OK
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#101923] border-r border-[#1E2D3D]">
      {/* Panel Header */}
      <div className="p-3 border-b border-[#1E2D3D] bg-[#151F2A]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-cyan" />
            <span className="text-xs font-mono font-bold tracking-wider text-main uppercase">
              Asset Explorer
            </span>
          </div>
          <span className="text-[11px] font-mono text-cyan bg-cyan/10 px-2 py-0.5 rounded border border-cyan/20">
            {filteredAssets.length} Units
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-dim absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ID, model, zone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#0B131C] border border-[#1E2D3D] rounded text-xs text-main placeholder-dim focus:outline-none focus:border-cyan transition-colors"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-1 p-2 bg-[#0C141D] border-b border-[#1E2D3D] overflow-x-auto text-[11px] font-mono">
        {(['all', 'mobile', 'fixed', 'sensors', 'zones'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2 py-1 rounded capitalize whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-[#18D4E8] text-[#070C12] font-bold'
                : 'bg-[#151F2A] text-muted hover:text-main hover:bg-[#1E2D3D]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asset List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {filteredAssets.map((asset) => {
          const isSelected = selectedAssetId === asset.id;
          return (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset.id)}
              className={`p-2.5 rounded cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-[#152332] border-[#18D4E8] shadow-[0_0_12px_rgba(24,212,232,0.25)]'
                  : 'bg-[#131D28] border-[#1C2A38] hover:border-[#2D4258] hover:bg-[#162330]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  {getCategoryIcon(asset.category)}
                  <span className="font-mono font-bold text-xs text-main tracking-tight">
                    {asset.id}
                  </span>
                </div>
                {getStatusBadge(asset.status)}
              </div>

              <div className="text-[11px] text-muted truncate mb-1.5">{asset.name}</div>

              <div className="flex items-center justify-between text-[10px] font-mono text-dim border-t border-[#1C2A38] pt-1.5">
                <span className="truncate max-w-[120px]">{asset.zone}</span>
                <span className={`font-bold ${asset.healthScore < 80 ? 'text-amber' : 'text-teal'}`}>
                  HLTH: {asset.healthScore}%
                </span>
              </div>
            </div>
          );
        })}

        {filteredAssets.length === 0 && (
          <div className="p-6 text-center text-dim text-xs font-mono">
            No assets found matching query.
          </div>
        )}
      </div>
    </div>
  );
};
