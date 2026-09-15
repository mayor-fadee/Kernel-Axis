import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import { Country, AttackArc, RingData } from '../types';

interface ThreatGlobeProps {
  onAttackTriggered: (source: string, target: string) => void;
  active: boolean;
}

const countries: Country[] = [
  { name: 'USA', lat: 37.0902, lng: -95.7129 },
  { name: 'Canada', lat: 56.1304, lng: -106.3468 },
  { name: 'Mexico', lat: 23.6345, lng: -102.5528 },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253 },
  { name: 'UK', lat: 55.3781, lng: -3.4360 },
  { name: 'Germany', lat: 51.1657, lng: 10.4515 },
  { name: 'France', lat: 46.2276, lng: 2.2137 },
  { name: 'Netherlands', lat: 52.3676, lng: 4.9041 },
  { name: 'Norway', lat: 60.4720, lng: 8.4689 },
  { name: 'Russia', lat: 61.5240, lng: 105.3188 },
  { name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792 },
  { name: 'UAE', lat: 23.4241, lng: 53.8478 },
  { name: 'India', lat: 20.5937, lng: 78.9629 },
  { name: 'Pakistan', lat: 30.3753, lng: 69.3451 },
  { name: 'China', lat: 35.8617, lng: 104.1954 },
  { name: 'Japan', lat: 35.6895, lng: 139.6917 },
  { name: 'South Korea', lat: 35.9078, lng: 127.7669 },
  { name: 'Indonesia', lat: -0.7893, lng: 113.9213 },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
  { name: 'Australia', lat: -25.2744, lng: 133.7751 },
  { name: 'South Africa', lat: -30.5595, lng: 22.9375 },
  { name: 'Nigeria', lat: 9.0820, lng: 8.6753 },
  { name: 'Kenya', lat: -0.0236, lng: 37.9062 },
  { name: 'Israel', lat: 31.0461, lng: 34.8516 },
  { name: 'Turkey', lat: 38.9637, lng: 35.2433 }
];

const threatArcPalette = ['#7dd3fc', '#22c55e', '#fbbf24', '#f87171', '#a78bfa'];

export const ThreatGlobe: React.FC<ThreatGlobeProps> = ({ onAttackTriggered, active }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeInstanceRef = useRef<any>(null);
  const [fallbackVisible, setFallbackVisible] = useState(false);

  // Arrays to hold mutable arc and ring data for visualization
  const arcsRef = useRef<AttackArc[]>([]);
  const ringsRef = useRef<RingData[]>([]);

  useEffect(() => {
    setFallbackVisible(false);

    if (!active || !containerRef.current) return;

    const canvas = document.createElement('canvas');
    const webglContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!webglContext) {
      setFallbackVisible(true);
      return;
    }

    try {
      // Initialize Globe.gl
      const world: any = new Globe(containerRef.current)
        .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg')
        .backgroundImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
        .labelsData(countries)
        .labelLat('lat')
        .labelLng('lng')
        .labelText('name')
        .labelSize(1.1)
        .labelColor(() => '#eaf7ff')
        .labelAltitude(0.02)
      .arcColor((obj: any) => obj?.color ?? ['#7dd3fc', '#fbbf24', '#f87171'])
      .arcStroke(1)
      .arcAltitude((obj: any) => 0.12 + Math.abs(((obj?.endLat ?? 0) - (obj?.startLat ?? 0)) / 90) * 0.18)
      .arcDashLength(0.55)
      .arcDashGap(0.25)
      .arcDashAnimateTime(1800)
      try {
        const controls = world.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.5;
        }
        const camera = world.camera();
        if (camera && camera.position) {
          camera.position.set(0, 0, 220);
        }
        const scene = world.scene();
        if (scene) {
          scene.add(new THREE.AmbientLight(0xffffff, 0.9));
          const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
          dirLight.position.set(5, 3, 5);
          scene.add(dirLight);
        }
      } catch (err) {
        console.error('Error configuring globe elements:', err);
      }

      // `ringsTransitionDuration` is not part of the installed globe.gl TypeScript defs.
      // Keep the animation behavior via instance-level config when available.
      if (typeof world.ringsTransitionDuration === 'function') {
        world.ringsTransitionDuration(900);
      }

      globeInstanceRef.current = world;

      // Set initial size
      const rect = containerRef.current.getBoundingClientRect();
      world.width(rect.width).height(rect.height);

      // Setup ResizeObserver for responsive resizing
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (globeInstanceRef.current) {
            globeInstanceRef.current.width(width).height(height);
          }
        }
      });

      resizeObserver.observe(containerRef.current);

      // Active Attack simulation interval
      const attackInterval = setInterval(() => {
        if (arcsRef.current.length > 44) return;

        // Trigger 1 to 3 simultaneous attacks (reduced from 2 to 4)
        const numAttacks = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < numAttacks; i++) {
          const source = countries[Math.floor(Math.random() * countries.length)];
          const target = countries[Math.floor(Math.random() * countries.length)];

          if (source.name === target.name) continue;

          const newArc: AttackArc = {
            startLat: source.lat,
            startLng: source.lng,
            endLat: target.lat,
            endLng: target.lng,
            color: [
              threatArcPalette[Math.floor(Math.random() * threatArcPalette.length)],
              threatArcPalette[Math.floor(Math.random() * threatArcPalette.length)],
              '#fef3c7'
            ]
          };

          // Add arc
          arcsRef.current = [...arcsRef.current, newArc];
          world.arcsData(arcsRef.current);

          // Notify parent to add log
          onAttackTriggered(source.name, target.name);

          // Trigger targeting rings on the destination after arc animation delay (approx 1.8s)
          setTimeout(() => {
            const newRing: RingData = {
              lat: target.lat,
              lng: target.lng,
              maxR: 4,
              propagationSpeed: 3.5,
              repeatPeriod: 800
            };
            ringsRef.current = [...ringsRef.current, newRing];
            world.ringsData(ringsRef.current);

            // Clear ring after some cycles
            setTimeout(() => {
              ringsRef.current = ringsRef.current.filter((r) => r !== newRing);
              if (globeInstanceRef.current) {
                globeInstanceRef.current.ringsData(ringsRef.current);
              }
            }, 3000);
          }, 1800);

          // Clean up arc after 5 seconds
          setTimeout(() => {
            arcsRef.current = arcsRef.current.filter((a: AttackArc) => a !== newArc);
            if (globeInstanceRef.current) {
              globeInstanceRef.current.arcsData(arcsRef.current);
            }
          }, 5000);
        }
      }, 900);

      // Clean up
      return () => {
        clearInterval(attackInterval);
        resizeObserver.disconnect();
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    } catch (error) {
      console.error('Threat globe init failed:', error);
      setFallbackVisible(true);
      return;
    }
  }, [active]);

  if (fallbackVisible) {
    return (
      <div className="absolute inset-0 w-full h-full z-1 overflow-hidden pointer-events-auto bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.18),_rgba(5,8,10,0.9)_58%)] flex items-center justify-center">
        <div className="max-w-md rounded-2xl border border-[#00ff88]/30 bg-[#050b0a]/80 px-6 py-5 text-center shadow-[0_0_40px_rgba(0,255,136,0.12)]">
          <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#00ff88] mb-3">Threat Monitor</div>
          <h3 className="text-xl font-display font-semibold text-white tracking-tight">3D Globe Unavailable</h3>
          <p className="mt-2 text-sm text-zinc-300">This browser cannot initialize WebGL, so the globe view is offline. Live telemetry is still monitored in text mode.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-1 overflow-hidden pointer-events-auto"
      style={{ background: 'transparent' }}
    />
  );
};
