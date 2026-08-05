import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import * as THREE from 'three';
import { Country, AttackArc, RingData } from '../types';

interface ThreatGlobeProps {
  onAttackTriggered: (source: string, target: string) => void;
  active: boolean;
}

const countries: Country[] = [
  { name: 'Pakistan', lat: 30.3753, lng: 69.3451 },
  { name: 'USA', lat: 37.0902, lng: -95.7129 },
  { name: 'India', lat: 20.5937, lng: 78.9629 },
  { name: 'UK', lat: 55.3781, lng: -3.4360 },
  { name: 'China', lat: 35.8617, lng: 104.1954 },
  { name: 'Australia', lat: -25.2744, lng: 133.7751 },
  { name: 'Canada', lat: 56.1304, lng: -106.3468 },
  { name: 'Germany', lat: 51.1657, lng: 10.4515 },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253 },
  { name: 'France', lat: 46.2276, lng: 2.2137 },
  { name: 'Japan', lat: 35.6895, lng: 139.6917 }
];

export const ThreatGlobe: React.FC<ThreatGlobeProps> = ({ onAttackTriggered, active }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeInstanceRef = useRef<any>(null);

  // Arrays to hold mutable arc and ring data for visualization
  const arcsRef = useRef<AttackArc[]>([]);
  const ringsRef = useRef<RingData[]>([]);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    // Initialize Globe.gl
    const world = new Globe(containerRef.current)
      .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg')
      .backgroundImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
      .labelsData(countries)
      .labelLat('lat')
      .labelLng('lng')
      .labelText('name')
      .labelSize(1.3)
      .labelColor(() => '#00ff88')
      .labelAltitude(0.015)
      .arcColor(() => ['#ff3333', '#ffaa00', '#00ff88'])
      .arcStroke(0.5)
      .arcAltitude(0.3)
      .arcDashLength(0.25)
      .arcDashGap(0.75)
      .arcDashAnimateTime(2000)
      .ringColor(() => (t: number) => `rgba(255, 80, 0, ${1 - t})`);

    // Basic control options safely guarded
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
      console.error("Error configuring globe elements:", err);
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
          endLng: target.lng
        };

        // Add arc
        arcsRef.current = [...arcsRef.current, newArc];
        world.arcsData(arcsRef.current);

        // Notify parent to add log
        onAttackTriggered(source.name, target.name);

        // Trigger targeting rings on the destination after arc animation delay (approx 1.8s)
        const ringTimer = setTimeout(() => {
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
          arcsRef.current = arcsRef.current.filter((a) => a !== newArc);
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
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-1 overflow-hidden pointer-events-auto"
      style={{ background: 'transparent' }}
    />
  );
};
