export interface Country {
  name: string;
  lat: number;
  lng: number;
}

export interface ThreatLog {
  id: string;
  source: string;
  target: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipSource: string;
  ipTarget: string;
}

export interface AttackArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color?: string | string[];
}

export interface RingData {
  lat: number;
  lng: number;
  maxR?: number;
  propagationSpeed?: number;
  repeatPeriod?: number;
}
