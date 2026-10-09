import { TelemetryEvent, SensorFeedType, Asset, TelemetryPoint } from '../types/mine';

export interface TelemetryAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  onEvent(callback: (event: TelemetryEvent) => void): void;
  sendControlAction(action: string, payload: unknown): Promise<boolean>;
}

export class LocalSimulationAdapter implements TelemetryAdapter {
  private isConnected: boolean = false;
  private listeners: ((event: TelemetryEvent) => void)[] = [];
  private intervalId: number | null = null;
  private eventCounter: number = 1000;

  async connect(): Promise<void> {
    this.isConnected = true;
    this.startStreaming();
  }

  async disconnect(): Promise<void> {
    this.isConnected = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  onEvent(callback: (event: TelemetryEvent) => void): void {
    this.listeners.push(callback);
  }

  async sendControlAction(action: string, payload: unknown): Promise<boolean> {
    // In local simulation, simulate success
    console.log(`[Adapter Action] Dispatched ${action}:`, payload);
    return true;
  }

  private startStreaming(): void {
    if (this.intervalId !== null) return;
    this.intervalId = window.setInterval(() => {
      if (!this.isConnected) return;
      const event = this.generateNextEvent();
      for (const listener of this.listeners) {
        listener(event);
      }
    }, 2400); // New event every 2.4 seconds
  }

  private generateNextEvent(): TelemetryEvent {
    this.eventCounter++;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    const sensorTypes: { type: SensorFeedType; assetId: string; unit: string; getVal: () => { val: number; sev: 'normal' | 'warning' | 'critical'; msg: string } }[] = [
      {
        type: 'IIST_TELEMETRY',
        assetId: 'TRK-105',
        unit: 'mm/s',
        getVal: () => ({
          val: +(8.4 + Math.random() * 0.6).toFixed(2),
          sev: 'warning',
          msg: 'Elevated rear differential vibration on 11% gradient'
        })
      },
      {
        type: 'DAS_FIBER',
        assetId: 'SN-DAS-01',
        unit: 'με',
        getVal: () => ({
          val: +(120 + Math.random() * 25).toFixed(1),
          sev: 'normal',
          msg: 'Sub-base dynamic strain within elastic bounds (Haul Ramp B)'
        })
      },
      {
        type: 'SEISMIC',
        assetId: 'SN-SEIS-03',
        unit: 'mm/s',
        getVal: () => ({
          val: +(0.15 + Math.random() * 0.12).toFixed(2),
          sev: 'normal',
          msg: 'Sub-surface micro-seismic background acoustic stability nominal'
        })
      },
      {
        type: 'GEOSPATIAL',
        assetId: 'SN-RAD-02',
        unit: 'mm/day',
        getVal: () => ({
          val: +(0.03 + Math.random() * 0.02).toFixed(3),
          sev: 'normal',
          msg: 'Interferometric radar highwall crest velocity stable'
        })
      },
      {
        type: 'ENV_AIR',
        assetId: 'SN-ENV-01',
        unit: 'µg/m³',
        getVal: () => ({
          val: +(32 + Math.random() * 8).toFixed(1),
          sev: 'normal',
          msg: 'PM10 particulate concentration below 50 µg/m³ regulatory threshold'
        })
      },
      {
        type: 'THERMAL',
        assetId: 'EXC-701',
        unit: '°C',
        getVal: () => ({
          val: +(76.5 + Math.random() * 2.5).toFixed(1),
          sev: 'normal',
          msg: 'Hydraulic dipper loop oil temp steady'
        })
      }
    ];

    const pick = sensorTypes[Math.floor(Math.random() * sensorTypes.length)];
    const generated = pick.getVal();

    return {
      id: `EVT-${this.eventCounter}`,
      timestamp: timeStr,
      assetId: pick.assetId,
      sensorType: pick.type,
      value: generated.val,
      unit: pick.unit,
      severity: generated.sev,
      message: generated.msg
    };
  }
}
