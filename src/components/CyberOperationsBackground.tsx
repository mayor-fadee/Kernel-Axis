import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Shield, Activity, Radio, Cpu, Network, Lock, Wifi, AlertTriangle, Server, Terminal, Globe } from 'lucide-react';

interface CyberOperationsBackgroundProps {
  previewMode?: boolean;
}

// Major global cybersecurity SOC nodes (Lat, Lon, Name)
const GLOBAL_NODES = [
  { lat: 40.7128, lon: -74.0060, name: 'NYC-SOC-01' },
  { lat: 51.5074, lon: -0.1278, name: 'LDN-NODE-02' },
  { lat: 35.6762, lon: 139.6503, name: 'TYO-[#03]' },
  { lat: 37.7749, lon: -122.4194, name: 'SFO-GATEWAY' },
  { lat: 50.1109, lon: 8.6821, name: 'FRA-RELAY' },
  { lat: 1.3521, lon: 103.8198, name: 'SGP-CENTRAL' },
  { lat: -33.8688, lon: 151.2093, name: 'SYD-PACIFIC' },
  { lat: -23.5505, lon: -46.6333, name: 'SAO-SOUTH' },
];

// Active threat connection pairs
const THREAT_CONNECTIONS = [
  [0, 1], // NYC -> London
  [1, 4], // London -> Frankfurt
  [3, 2], // San Francisco -> Tokyo
  [2, 5], // Tokyo -> Singapore
  [4, 5], // Frankfurt -> Singapore
  [5, 6], // Singapore -> Sydney
  [0, 7], // NYC -> São Paulo
  [3, 0], // San Francisco -> NYC
];

// Realistic live SOC logs
const SOC_LOG_TEMPLATES = [
  '[+] [SOC-CORE] Packet inspection active | 14.8 Gbps | Drop rate 0.00%',
  '[*] [IDS-KEMEL] TCP SYN flood anomaly mitigated from 185.220.101.4',
  '[+] [FIREWALL] Rule #402 applied: Blocked port scan on 192.168.1.1',
  '[*] [EDR-AGENT] Process tree verified: systemd (pid 1) -> nominal',
  '[+] [CERT-LOG] TLS 1.3 key exchange successful | AES-256-GCM',
  '[*] [AI-ANALYTICS] Behavioral threat score: 0.02 (LOW RISK)',
  '[+] [DNS-GUARD] Sinkholed 3 suspicious domain queries',
  '[*] [DECRYPTION] Payload buffer integrity checked: SHA-256 ok',
  '[+] [DEFENDER] Zero-day telemetry database synced v2026.08.13',
  '[*] [NET-FLOW] BGP route status nominal across all 8 global gateways',
];

export function CyberOperationsBackground({ previewMode = false }: CyberOperationsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvas2dRef = useRef<HTMLCanvasElement>(null);

  // Live log stream state
  const [logs, setLogs] = useState<string[]>([
    '[+] [SOC-CORE] Cyber Operations Center initialized',
    '[*] [GLOBAL-NET] 8 SOC Nodes connected | DEFCON 4',
    '[+] [FIREWALL] Intrusion Prevention System: ACTIVE',
  ]);
  const logIndexRef = useRef(0);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // System stats state for HUD
  const [bandwidth, setBandwidth] = useState('14.8');
  const [threatScore, setThreatScore] = useState('0.02');
  const [activePackets, setActivePackets] = useState('1,428,910');

  // Helper to convert Lat/Lon to 3D Sphere vector
  const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  // 1. Setup Three.js 3D Globe & Arcs
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || (previewMode ? 300 : window.innerWidth);
    let height = container.clientHeight || (previewMode ? 140 : window.innerHeight);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = previewMode ? 4.8 : 5.4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00ff88, 1.8);
    dirLight.position.set(5, 4, 5);
    scene.add(dirLight);

    const blueLight = new THREE.DirectionalLight(0x0088ff, 0.8);
    blueLight.position.set(-5, -2, -3);
    scene.add(blueLight);

    // Globe Mesh
    const globeRadius = previewMode ? 1.35 : 1.75;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg'
    );
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.6,
      metalness: 0.2,
      color: new THREE.Color(0xdffff0),
    });

    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globeMesh);

    // Atmospheric Green Glow Outer Shell
    const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.04, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);

    // --- REFINED PREMIUM ORBITAL SURFACE SCANNING SHADER ---
    const scanShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uScanAngle: { value: 0 },
        uScanLat: { value: 0 },
        uColor: { value: new THREE.Color(0x00ff88) },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uScanAngle;
        uniform float uScanLat;
        uniform vec3 uColor;

        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        varying vec3 vWorldPosition;

        void main() {
          // Normalized height (-1.0 to 1.0)
          float normY = vPosition.y / ${globeRadius.toFixed(2)};
          
          // Clean, smooth latitude scan line along sphere curvature
          float latDiff = normY - uScanLat;
          float latLine = smoothstep(0.016, 0.0, abs(latDiff));
          
          // Soft trailing glow behind the latitude scan line
          float latTrail = 0.0;
          if (latDiff < 0.0 && latDiff > -0.28) {
            latTrail = smoothstep(-0.28, 0.0, latDiff) * 0.25;
          }

          // Rotating longitudinal radar sweep
          float angle = atan(vPosition.x, vPosition.z);
          float angleDiff = mod(angle - uScanAngle + 3.14159265, 6.2831853) - 3.14159265;
          float lonLine = smoothstep(0.02, 0.0, abs(angleDiff));
          
          float lonTrail = 0.0;
          if (angleDiff < 0.0 && angleDiff > -0.6) {
            lonTrail = smoothstep(-0.6, 0.0, angleDiff) * 0.16;
          }

          // Subtle micro tactical grid illuminated under scan beam
          float gridLat = sin(vUv.y * 3.14159265 * 32.0);
          float gridLon = sin(vUv.x * 3.14159265 * 64.0);
          float gridPattern = smoothstep(0.96, 1.0, max(gridLat, gridLon)) * 0.12;

          // Combined scan illumination intensity
          float intensity = latLine * 1.0 + latTrail + lonLine * 0.45 + lonTrail * 0.2 + gridPattern * (latLine + latTrail + 0.15);

          // Fresnel / Horizon Curvature check: ensure scan strictly stays on front surface without bleeding outside sphere
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float NdotV = max(0.0, dot(vNormal, viewDir));
          float fresnel = pow(NdotV, 0.75);

          if (NdotV <= 0.0) discard;

          float alpha = intensity * fresnel * 0.7;
          if (alpha < 0.008) discard;

          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
    });

    const scanShellGeo = new THREE.SphereGeometry(globeRadius * 1.002, 64, 64);
    const scanShellMesh = new THREE.Mesh(scanShellGeo, scanShaderMat);
    scene.add(scanShellMesh);

    // Group for objects attached to rotating globe
    const globeObjectsGroup = new THREE.Group();
    globeMesh.add(globeObjectsGroup);

    // Add SOC Node Beacons on globe surface
    const nodeVectors: THREE.Vector3[] = [];
    GLOBAL_NODES.forEach((node) => {
      const vec = latLonToVector3(node.lat, node.lon, globeRadius * 1.01);
      nodeVectors.push(vec);

      // Glowing dot for node
      const dotGeo = new THREE.SphereGeometry(0.032, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(vec);
      globeObjectsGroup.add(dotMesh);

      // Pulsing node ring
      const ringGeo = new THREE.RingGeometry(0.04, 0.06, 16);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(vec);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
      globeObjectsGroup.add(ringMesh);
    });

    // 3D Curved Cyber Threat Arcs connecting global nodes
    const pulseObjects: { curve: THREE.QuadraticBezierCurve3; mesh: THREE.Mesh; progress: number; speed: number }[] = [];

    THREAT_CONNECTIONS.forEach(([startIndex, endIndex]) => {
      const vStart = nodeVectors[startIndex];
      const vEnd = nodeVectors[endIndex];

      // Midpoint elevated above globe surface for 3D arching effect
      const vMid = new THREE.Vector3()
        .addVectors(vStart, vEnd)
        .multiplyScalar(0.5);
      const distance = vStart.distanceTo(vEnd);
      vMid.normalize().multiplyScalar(globeRadius + distance * 0.45);

      const curve = new THREE.QuadraticBezierCurve3(vStart, vMid, vEnd);
      const points = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

      const curveMat = new THREE.LineBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.45,
      });

      const arcLine = new THREE.Line(curveGeo, curveMat);
      globeObjectsGroup.add(arcLine);

      // Traveling light pulse along the 3D arc
      const pulseGeo = new THREE.SphereGeometry(0.025, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0x33ffaa });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      globeObjectsGroup.add(pulseMesh);

      pulseObjects.push({
        curve,
        mesh: pulseMesh,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
      });
    });

    // Outer Tactical Orbit Ring
    const orbitRingGeo = new THREE.RingGeometry(globeRadius * 1.35, globeRadius * 1.36, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const orbitRingMesh = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRingMesh.rotation.x = Math.PI / 2.8;
    scene.add(orbitRingMesh);

    // Orbiting Satellite Node
    const satGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    scene.add(satMesh);

    let satAngle = 0;
    let scanAngle = 0;
    let scanLatPhase = 0;
    let animationFrameId: number;

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    if (!previewMode) {
      window.addEventListener('resize', handleResize);
    }

    // Animation Loop
    const render = () => {
      // 1. Rotate Globe at 4x speed
      globeMesh.rotation.y += 0.024;

      // 2. Animate Globe Surface Scan Shader
      scanAngle = (scanAngle + 0.016) % (Math.PI * 2);
      scanLatPhase += 0.020;
      scanShaderMat.uniforms.uScanAngle.value = scanAngle;
      scanShaderMat.uniforms.uScanLat.value = Math.sin(scanLatPhase) * 0.82;

      // Animate Arcs Light Pulses
      pulseObjects.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        const pos = p.curve.getPoint(p.progress);
        p.mesh.position.copy(pos);
      });

      // Animate Orbiting Satellite
      satAngle += 0.015;
      const r = globeRadius * 1.355;
      satMesh.position.x = Math.cos(satAngle) * r;
      satMesh.position.z = Math.sin(satAngle) * r;
      satMesh.position.y = Math.sin(satAngle) * 0.4;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (!previewMode) {
        window.removeEventListener('resize', handleResize);
      }
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [previewMode]);

  // 2. Setup 2D Radar Canvas HUD Overlay
  useEffect(() => {
    const canvas = canvas2dRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let radarAngle = 0;

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };

    if (!previewMode) {
      window.addEventListener('resize', handleResize);
    }

    const render2D = () => {
      ctx.clearRect(0, 0, width, height);

      // Faint Tactical Grid
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = previewMode ? 20 : 36;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center Radar Sweep Overlay
      const cx = width / 2;
      const cy = height / 2;
      const radarRadius = Math.min(width, height) * (previewMode ? 0.38 : 0.32);

      radarAngle += 0.015;

      // Radar Concentric Circles
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.12)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.arc(cx, cy, radarRadius * 0.4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radarRadius * 0.75, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radarRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Sweeping Gradient Line
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(radarAngle);

      const grad = ctx.createConicGradient(0, 0, 0);
      grad.addColorStop(0, 'rgba(0, 255, 136, 0.28)');
      grad.addColorStop(0.12, 'rgba(0, 255, 136, 0.05)');
      grad.addColorStop(0.25, 'transparent');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radarRadius, 0, Math.PI * 2);
      ctx.fill();

      // Sweeping Edge Line
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radarRadius, 0);
      ctx.stroke();

      ctx.restore();

      // Degree Tick Marks & Cardinal Indicators around Radar Boundary
      ctx.fillStyle = 'rgba(0, 255, 136, 0.45)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const angles = [
        { rad: 0, label: '090° [E]' },
        { rad: Math.PI / 2, label: '180° [S]' },
        { rad: Math.PI, label: '270° [W]' },
        { rad: (Math.PI * 3) / 2, label: '000° [N]' },
      ];

      angles.forEach((a) => {
        const tx = cx + Math.cos(a.rad) * (radarRadius + 14);
        const ty = cy + Math.sin(a.rad) * (radarRadius + 14);
        ctx.fillText(a.label, tx, ty);

        // Tick mark line
        const x1 = cx + Math.cos(a.rad) * (radarRadius - 4);
        const y1 = cy + Math.sin(a.rad) * (radarRadius - 4);
        const x2 = cx + Math.cos(a.rad) * (radarRadius + 5);
        const y2 = cy + Math.sin(a.rad) * (radarRadius + 5);
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Subtle Telemetry Data Readouts around Globe Radar Center
      if (!previewMode) {
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(0, 255, 136, 0.6)';
        ctx.fillText('SAT_ORBIT: 420KM // SYNC_OK', cx - radarRadius + 10, cy - radarRadius - 8);
        
        ctx.textAlign = 'right';
        ctx.fillText('GLOBAL SCAN: 100% COVERAGE', cx + radarRadius - 10, cy - radarRadius - 8);
      }

      // Corner Tactical Brackets in Full Mode
      if (!previewMode) {
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.35)';
        ctx.lineWidth = 1.5;
        const offset = 24;
        const bLen = 18;

        // Top Left
        ctx.beginPath();
        ctx.moveTo(offset, offset + bLen);
        ctx.lineTo(offset, offset);
        ctx.lineTo(offset + bLen, offset);
        ctx.stroke();

        // Top Right
        ctx.beginPath();
        ctx.moveTo(width - offset - bLen, offset);
        ctx.lineTo(width - offset, offset);
        ctx.lineTo(width - offset, offset + bLen);
        ctx.stroke();

        // Bottom Left
        ctx.beginPath();
        ctx.moveTo(offset, height - offset - bLen);
        ctx.lineTo(offset, height - offset);
        ctx.lineTo(offset + bLen, height - offset);
        ctx.stroke();

        // Bottom Right
        ctx.beginPath();
        ctx.moveTo(width - offset - bLen, height - offset);
        ctx.lineTo(width - offset, height - offset);
        ctx.lineTo(width - offset, height - offset - bLen);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render2D);
    };

    render2D();

    return () => {
      if (!previewMode) {
        window.removeEventListener('resize', handleResize);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [previewMode]);

  // 3. Live Log Stream Interval & Stat Updates (Full Mode Only)
  useEffect(() => {
    if (previewMode) return;

    const interval = setInterval(() => {
      const nextLog = SOC_LOG_TEMPLATES[logIndexRef.current % SOC_LOG_TEMPLATES.length];
      logIndexRef.current += 1;

      setLogs((prev) => {
        const updated = [...prev, nextLog];
        if (updated.length > 25) return updated.slice(updated.length - 25);
        return updated;
      });

      // Fluctuate stats realistically
      setBandwidth((14.2 + Math.random() * 1.5).toFixed(1));
      setThreatScore((0.01 + Math.random() * 0.03).toFixed(2));
      setActivePackets((1420000 + Math.floor(Math.random() * 15000)).toLocaleString());
    }, 650);

    return () => clearInterval(interval);
  }, [previewMode]);

  // Auto-scroll log window
  useEffect(() => {
    if (!previewMode && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, previewMode]);

  if (previewMode) {
    return (
      <div className="w-full h-full relative bg-[#010603] overflow-hidden flex items-center justify-center">
        {/* Three.js 3D Globe Container */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 flex items-center justify-center" />
        {/* 2D Canvas Radar Grid */}
        <canvas ref={canvas2dRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />
        
        {/* Mini HUD Badge overlay */}
        <div className="absolute bottom-1.5 left-2 z-20 font-mono text-[9px] text-[#00ff88] flex items-center gap-1 bg-[#020a05]/80 px-1.5 py-0.5 rounded border border-[#00ff88]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
          <span>SOC COMMAND</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-[#010402] text-zinc-200 overflow-hidden select-none pointer-events-none">
      {/* 3D Three.js Globe Layer */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 flex items-center justify-center" />

      {/* 2D Tactical Radar & Grid Canvas Layer */}
      <canvas ref={canvas2dRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />

      {/* --- COMMAND CENTER HUD OVERLAYS --- */}

      {/* Top Header Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-3 sm:px-6 py-2.5 bg-[#020704]/85 border-b border-[#00ff88]/20 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
        {/* Left Status Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] font-bold text-[11px] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span>SOC COMMAND // DEFCON 4</span>
          </div>
          <span className="hidden md:inline-block text-zinc-400 text-[11px]">
            SYS_VER: <span className="text-emerald-400">v2026.8.13</span>
          </span>
        </div>

        {/* Center Live Telemetry Indicators */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-zinc-300">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>BANDWIDTH: <strong className="text-[#00ff88]">{bandwidth} Gbps</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>THREAT INDEX: <strong className="text-[#00ff88]">{threatScore} (LOW)</strong></span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>PACKETS: <strong className="text-[#00ff88]">{activePackets}/s</strong></span>
          </div>
        </div>

        {/* Right Gateway Pings */}
        <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" /> EU-WEST: <span className="text-emerald-400">12ms</span>
          </span>
          <span className="hidden sm:flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" /> US-EAST: <span className="text-emerald-400">34ms</span>
          </span>
          <span className="hidden lg:flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" /> ASIA-PAC: <span className="text-emerald-400">88ms</span>
          </span>
        </div>
      </div>

      {/* Left HUD Panel - Live Cybersecurity Security Logs */}
      <div className="hidden md:flex flex-col absolute left-4 top-16 bottom-12 z-20 w-80 max-w-[28vw] bg-[#020804]/75 border border-[#00ff88]/25 rounded-lg backdrop-blur-md overflow-hidden font-mono text-xs shadow-[0_0_25px_rgba(0,255,136,0.08)]">
        {/* Panel Header */}
        <div className="px-3 py-2 bg-[#010503] border-b border-[#00ff88]/20 flex items-center justify-between text-[#00ff88]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold tracking-wider text-zinc-200 uppercase">
              LIVE SOC EVENT STREAM
            </span>
          </div>
          <span className="text-[10px] text-emerald-500/80 animate-pulse">● STREAMING</span>
        </div>

        {/* Log Lines Container */}
        <div className="flex-1 p-3 overflow-y-auto space-y-1.5 text-[10.5px] leading-relaxed text-emerald-400/90 bg-[#010402]/80">
          {logs.map((log, idx) => {
            let isHighlight = log.startsWith('[+]');
            let isWarning = log.includes('anomaly') || log.includes('mitigated');
            return (
              <div
                key={idx}
                className={`whitespace-pre-wrap break-words transition-colors ${
                  isWarning
                    ? 'text-yellow-400 font-semibold'
                    : isHighlight
                    ? 'text-[#00ff88]'
                    : 'text-emerald-400/80'
                }`}
              >
                {log}
              </div>
            );
          })}
          <div ref={logsEndRef} />
        </div>

        {/* Panel Footer */}
        <div className="px-3 py-1.5 bg-[#010503] border-t border-[#00ff88]/15 text-[10px] text-zinc-500 flex justify-between">
          <span>INTERFACE: eth0 [INSPECTING]</span>
          <span className="text-[#00ff88]">8 NODES OK</span>
        </div>
      </div>

      {/* Right HUD Panel - Metrics & Shields (Positioned to the left of desktop folder icons) */}
      <div className="hidden xl:flex flex-col absolute right-24 top-16 z-20 w-64 bg-[#020804]/75 border border-[#00ff88]/25 rounded-lg backdrop-blur-md p-3 font-mono text-xs gap-3 shadow-[0_0_25px_rgba(0,255,136,0.08)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-1.5 border-b border-[#00ff88]/20 text-[#00ff88]">
          <div className="flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold text-zinc-200">DEFENSIVE STATUS</span>
          </div>
          <span className="text-[10px] text-emerald-400">ACTIVE</span>
        </div>

        {/* Metric 1: Firewall Shield */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-zinc-400">Firewall Shielding</span>
            <span className="text-[#00ff88]">100%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-[#00ff88]/30">
            <div className="h-full bg-[#00ff88] w-full" />
          </div>
        </div>

        {/* Metric 2: Deep Packet Inspection Engine */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-zinc-400">DPI Engine Load</span>
            <span className="text-emerald-400">38.4%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-[#00ff88]/30">
            <div className="h-full bg-[#00ff88] w-[38.4%]" />
          </div>
        </div>

        {/* Metric 3: Zero-Trust Identity Guard */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-zinc-400">Identity Guard</span>
            <span className="text-[#00ff88]">VERIFIED</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-[#00ff88]/30">
            <div className="h-full bg-[#00ff88] w-full" />
          </div>
        </div>

        {/* Tactical Grid Summary */}
        <div className="pt-2 border-t border-[#00ff88]/15 grid grid-cols-2 gap-2 text-[10px] text-zinc-400">
          <div className="bg-[#010503] p-1.5 rounded border border-[#00ff88]/15">
            <div className="text-[9px] text-zinc-500">HONEYPOTS</div>
            <div className="text-emerald-400 font-bold">12/12 READY</div>
          </div>
          <div className="bg-[#010503] p-1.5 rounded border border-[#00ff88]/15">
            <div className="text-[9px] text-zinc-500">ENCRYPTION</div>
            <div className="text-emerald-400 font-bold">AES-256</div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Ticker Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-1.5 bg-[#020704]/90 border-t border-[#00ff88]/20 backdrop-blur-md flex items-center justify-between font-mono text-[10px] text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="text-[#00ff88] flex items-center gap-1 font-semibold">
            <Lock className="w-3 h-3" /> SECURE CHANNEL
          </span>
          <span className="hidden sm:inline-block">GPS COORDINATES: 37.7749° N, 122.4194° W</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block">PROTOCOL: KERNEL-AXIS-SEC-V4</span>
          <span className="text-emerald-400 font-semibold">ALL SYSTEMS OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}
