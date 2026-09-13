import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, 
  FolderOpen, 
  X, 
  Terminal, 
  AlertTriangle, 
  Activity, 
  Globe, 
  FileText, 
  Shield, 
  Lock, 
  Key, 
  FileCode, 
  Database, 
  Archive, 
  ChevronRight,
  HardDrive
} from 'lucide-react';
import * as THREE from 'three';
import { MatrixRain } from './MatrixRain';
import { CyberOperationsBackground } from './CyberOperationsBackground';

// Kali Linux terminal log stream
const KALI_LOGS = [
  '[+] Starting Nmap 7.94 ( https://nmap.org ) at 2026-08-11 10:30 UTC',
  '[+] Initiating ARP Ping Scan at 10:30:02',
  '[+] Scanning 192.168.1.1 [1 port]',
  '[+] Completed ARP Ping Scan at 10:30:02, 0.01s elapsed (1 total hosts)',
  '[+] Initiating SYN Stealth Scan at 10:30:03',
  '[+] Scanning gateway.internal (192.168.1.1) [1000 ports]',
  '[+] Discovered open port 22/tcp on 192.168.1.1 (SSH OpenSSH 9.2p1)',
  '[+] Discovered open port 80/tcp on 192.168.1.1 (HTTP nginx/1.22.1)',
  '[+] Discovered open port 443/tcp on 192.168.1.1 (HTTPS TLS v1.3)',
  '[+] Discovered open port 8080/tcp on 192.168.1.1 (HTTP Proxy)',
  '[+] Completed SYN Stealth Scan against 192.168.1.1 in 1.12s',
  '[+] Running NSE script engines [ssl-enum-ciphers, http-headers, vuln]...',
  '[*] ssl-cert: Subject: commonName=gateway.internal Organization=KernelAxis',
  '[*] http-enum: /admin/ [302 Found], /api/v1/health [200 OK]',
  '[+] Launching metasploit framework v6.3.42-dev...',
  '[*] msf6 > use exploit/multi/handler',
  '[*] msf6 exploit(multi/handler) > set PAYLOAD linux/x64/meterpreter/reverse_tcp',
  '[*] msf6 exploit(multi/handler) > set LHOST 192.168.1.105',
  '[*] msf6 exploit(multi/handler) > set LPORT 4444',
  '[*] [*] Started reverse TCP handler on 192.168.1.105:4444',
  '[*] [*] Sending stage (3045840 bytes) to 192.168.1.1',
  '[+] Meterpreter session 1 opened (192.168.1.105:4444 -> 192.168.1.1:52134)',
  '[*] meterpreter > sysinfo',
  '    OS: Linux 6.1.0-21-amd64 #1 SMP PREEMPT_DYNAMIC x86_64',
  '    Kernel: Linux gateway 6.1.0-21-amd64',
  '    Architecture: x64',
  '[*] meterpreter > getuid',
  '    Server username: uid=0, gid=0, euid=0, egid=0 (root)',
  '[+] Initiating tcpdump capture on interface eth0 [promiscuous mode]...',
  '[*] tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes',
  '[*] IP 192.168.1.105.52134 > 192.168.1.1.22: Flags [P.], seq 1:45, ack 1, win 502, length 44',
  '[*] IP 192.168.1.1.22 > 192.168.1.105.52134: Flags [.], ack 45, win 501, length 0',
  '[+] Tail /var/log/auth.log:',
  '    Aug 11 10:30:15 kali sshd[14022]: Accepted publickey for root from 192.168.1.105 port 52134 ssh2',
  '    Aug 11 10:30:18 kali sudo: root : TTY=pts/1 ; PWD=/root ; USER=root ; COMMAND=/usr/bin/iptables -L -n -v',
  '[+] System audit status: NOMINAL | Threat score: 0.00 | Monitoring eth0...',
];

// CMD dir /s log output template lines
const DIR_LOG_TEMPLATES = [
  " Directory of C:\\Users\\Admin\\Documents",
  "08/11/2026  10:14 AM    <DIR>          .",
  "08/11/2026  10:14 AM    <DIR>          ..",
  "08/11/2026  09:22 AM            14,320 system.dll",
  "08/11/2026  10:01 AM         1,204,812 payload.bin",
  "08/11/2026  10:12 AM            24,512 config.sys",
  "08/11/2026  11:10 AM         2,481,708 C:\\Users\\Admin\\Documents\\secret_key.pem",
  "               4 File(s)      3,725,352 bytes",
  "",
  " Directory of C:\\Users\\Admin\\Downloads",
  "08/11/2026  10:14 AM    <DIR>          .",
  "08/11/2026  10:14 AM    <DIR>          ..",
  "08/11/2026  08:15 AM         4,512,080 setup_x64.exe",
  "08/11/2026  09:40 AM        12,890,112 data_dump.zip",
  "08/11/2026  10:15 AM        18,402,192 C:\\Users\\Admin\\Downloads\\archive_2026.tar.gz",
  "               3 File(s)     35,804,384 bytes",
  "",
  " Directory of C:\\...\\project\\src",
  "08/11/2026  10:14 AM    <DIR>          .",
  "08/11/2026  10:14 AM    <DIR>          ..",
  "08/11/2026  10:50 AM             1,420 main.tsx",
  "08/11/2026  10:52 AM             2,840 App.tsx",
  "08/11/2026  11:00 AM            35,195 CyberSimulatorPage.tsx",
  "08/11/2026  11:02 AM             4,210 C:\\...\\project\\src\\index.css",
  "               4 File(s)         43,665 bytes",
  "",
  " Directory of C:\\...\\project\\src\\components",
  "08/11/2026  10:14 AM    <DIR>          .",
  "08/11/2026  10:14 AM    <DIR>          ..",
  "08/11/2026  10:30 AM             5,603 ThreatGlobe.tsx",
  "08/11/2026  10:45 AM            12,040 LiveMonitor.tsx",
  "08/11/2026  11:05 AM            32,240 C:\\...\\project\\src\\components\\CyberSimulatorPage.tsx",
  "08/11/2026  11:10 AM             2,810 MatrixRain.tsx",
  "               4 File(s)         52,693 bytes",
  "",
  " Directory of C:\\Windows\\System32\\drivers",
  "08/11/2026  10:14 AM    <DIR>          .",
  "08/11/2026  10:14 AM    <DIR>          ..",
  "08/11/2026  07:10 AM         1,048,576 kernel32.dll",
  "08/11/2026  07:10 AM           350,208 ntdll.dll",
  "08/11/2026  07:10 AM            84,992 etc_hosts.sys",
  "08/11/2026  07:12 AM               820 C:\\Windows\\System32\\drivers\\etc\\hosts",
  "               4 File(s)      1,484,596 bytes",
  "",
  " Directory of C:\\Program Files\\KernelAxis\\bin",
  "08/11/2026  10:14 AM    <DIR>          .",
  "08/11/2026  10:14 AM    <DIR>          ..",
  "08/11/2026  10:10 AM        45,892,100 service.exe",
  "08/11/2026  10:10 AM         2,104,800 listener.dll",
  "               2 File(s)     47,996,900 bytes",
  "",
  " Directory of C:\\Users\\Operator\\AppData\\Local\\Temp",
  "08/11/2026  10:14 AM    <DIR>          .",
  "08/11/2026  10:14 AM    <DIR>          ..",
  "08/11/2026  11:10 AM           512,040 session_cache.tmp",
  "08/11/2026  11:12 AM         1,024,800 audit_trace.log",
  "               2 File(s)      1,536,840 bytes",
  "",
];

// Canvas component for Green Moving Dots
function GreenDotsVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 320);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 220);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    // Create 45 green moving dots with dynamic velocities
    const numDots = 45;
    const dots: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
    }[] = [];

    for (let i = 0; i < numDots; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1.5,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint grid background
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 20;
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

      // Update & draw dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off canvas boundaries
        if (dot.x <= 0 || dot.x >= width) dot.vx *= -1;
        if (dot.y <= 0 || dot.y >= height) dot.vy *= -1;

        dot.pulse += 0.03;
        const currentRadius = dot.radius + Math.sin(dot.pulse) * 0.5;

        // Draw green connecting lines between nearby dots
        for (let j = i + 1; j < dots.length; j++) {
          const other = dots[j];
          const dx = other.x - dot.x;
          const dy = other.y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            const alpha = (1 - dist / 65) * 0.45;
            ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Draw glowing green dot
        ctx.shadowColor = '#00ff88';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#00ff88';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(0.8, currentRadius), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[200px] relative bg-[#020704] rounded-b-lg overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

// Three.js & Canvas component for 3D Rotating Earth Globe with Realistic 3D Curved Surface Scanning Animation
function SatelliteGlobeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvas2dRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 240;

    // --- THREE.JS 3D GLOBE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00ff88, 1.5);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // Dynamic Scanner PointLight that interacts physically with the Earth surface
    const scanLight = new THREE.PointLight(0x00ff88, 2.5, 3.5);
    scene.add(scanLight);

    // Earth Sphere Geometry & Material
    const globeRadius = 1.65;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      'https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg'
    );
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const sphereMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.7,
      metalness: 0.1,
      color: new THREE.Color(0xdffff0),
    });

    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(globeMesh);

    // Atmosphere Glow Outer Shell
    const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.035, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    scene.add(atmosMesh);

    // --- REALISTIC 3D CURVED SURFACE SCANNING SHADER SHELL ---
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
          float normY = vPosition.y / 1.65;
          
          // Curved Latitude Scan Line following 3D sphere surface
          float latDiff = normY - uScanLat;
          float latLine = smoothstep(0.022, 0.0, abs(latDiff));
          
          float latTrail = 0.0;
          if (latDiff < 0.0 && latDiff > -0.32) {
            latTrail = smoothstep(-0.32, 0.0, latDiff) * 0.35;
          }

          // Rotating Longitudinal Scan Line
          float angle = atan(vPosition.x, vPosition.z);
          float angleDiff = mod(angle - uScanAngle + 3.14159265, 6.2831853) - 3.14159265;
          float lonLine = smoothstep(0.028, 0.0, abs(angleDiff));
          
          float lonTrail = 0.0;
          if (angleDiff < 0.0 && angleDiff > -0.75) {
            lonTrail = smoothstep(-0.75, 0.0, angleDiff) * 0.22;
          }

          // Fine tactical grid lines illuminated on globe surface
          float gridLat = sin(vUv.y * 3.14159265 * 36.0);
          float gridLon = sin(vUv.x * 3.14159265 * 72.0);
          float gridPattern = smoothstep(0.95, 1.0, max(gridLat, gridLon)) * 0.16;

          // Combined scan illumination
          float intensity = latLine * 1.2 + latTrail + lonLine * 0.6 + lonTrail * 0.25 + gridPattern * (latLine + latTrail + 0.3);

          // Fresnel / Limb fading for 3D horizon curvature realism
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float NdotV = max(0.0, dot(vNormal, viewDir));
          float fresnel = pow(NdotV, 0.65);

          if (NdotV <= 0.0) discard;

          float alpha = intensity * fresnel * 0.85;
          if (alpha < 0.01) discard;

          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
    });

    const scanShellGeo = new THREE.SphereGeometry(globeRadius * 1.004, 64, 64);
    const scanShellMesh = new THREE.Mesh(scanShellGeo, scanShaderMat);
    scene.add(scanShellMesh);

    // Satellite Orbital Ring 1
    const ring1Geo = new THREE.RingGeometry(globeRadius * 1.3, globeRadius * 1.31, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    ring1Mesh.rotation.y = Math.PI / 6;
    scene.add(ring1Mesh);

    // Satellite Node on Orbit 1
    const sat1Geo = new THREE.SphereGeometry(0.06, 16, 16);
    const sat1Mat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
    const sat1Mesh = new THREE.Mesh(sat1Geo, sat1Mat);
    scene.add(sat1Mesh);

    // Laser Beam from Satellite to Globe Surface
    const laserGeo = new THREE.BufferGeometry();
    const laserPositions = new Float32Array(6);
    laserGeo.setAttribute('position', new THREE.BufferAttribute(laserPositions, 3));
    const laserMat = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const laserLine = new THREE.Line(laserGeo, laserMat);
    scene.add(laserLine);

    // Satellite Orbital Ring 2
    const ring2Geo = new THREE.RingGeometry(globeRadius * 1.45, globeRadius * 1.46, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x00e1ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = -Math.PI / 4;
    ring2Mesh.rotation.y = -Math.PI / 5;
    scene.add(ring2Mesh);

    // Satellite Node on Orbit 2
    const sat2Geo = new THREE.SphereGeometry(0.05, 16, 16);
    const sat2Mat = new THREE.MeshBasicMaterial({ color: 0x00e1ff });
    const sat2Mesh = new THREE.Mesh(sat2Geo, sat2Mat);
    scene.add(sat2Mesh);

    // --- 2D CANVAS TELEMETRY & HUD OVERLAY SETUP ---
    const canvas2d = canvas2dRef.current;
    if (!canvas2d) return;
    const ctx2d = canvas2d.getContext('2d');
    canvas2d.width = width;
    canvas2d.height = height;

    let animationFrameId: number;
    let scanAngle = 0;
    let scanLatPhase = 0;
    let satAngle1 = 0;
    let satAngle2 = Math.PI;

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

      if (canvas2d) {
        canvas2d.width = width;
        canvas2d.height = height;
      }
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // 1. Rotate 3D Globe
      globeMesh.rotation.y += 0.014;

      // 2. Animate Satellite Positions
      satAngle1 += 0.018;
      satAngle2 -= 0.014;

      const r1 = globeRadius * 1.305;
      sat1Mesh.position.x = Math.cos(satAngle1) * r1;
      sat1Mesh.position.y = Math.sin(satAngle1) * r1 * Math.cos(Math.PI / 3);
      sat1Mesh.position.z = Math.sin(satAngle1) * r1 * Math.sin(Math.PI / 3);

      const r2 = globeRadius * 1.455;
      sat2Mesh.position.x = Math.cos(satAngle2) * r2;
      sat2Mesh.position.y = Math.sin(satAngle2) * r2 * Math.cos(-Math.PI / 4);
      sat2Mesh.position.z = Math.sin(satAngle2) * r2 * Math.sin(-Math.PI / 4);

      // 3. Calculate Satellite Surface Footprint Target on Globe
      const surfaceTarget = sat1Mesh.position.clone().normalize().multiplyScalar(globeRadius * 1.002);

      // Update Laser Beam from Satellite to Globe Surface
      const posAttr = laserLine.geometry.attributes.position as THREE.BufferAttribute;
      posAttr.setXYZ(0, sat1Mesh.position.x, sat1Mesh.position.y, sat1Mesh.position.z);
      posAttr.setXYZ(1, surfaceTarget.x, surfaceTarget.y, surfaceTarget.z);
      posAttr.needsUpdate = true;

      // Position Dynamic Scanner PointLight at surface contact point
      scanLight.position.copy(surfaceTarget);

      // 4. Update 3D Surface Scan Shader Uniforms
      scanAngle = (scanAngle + 0.015) % (Math.PI * 2);
      scanLatPhase += 0.018;
      const scanLatValue = Math.sin(scanLatPhase) * 0.82;

      scanShaderMat.uniforms.uScanAngle.value = scanAngle;
      scanShaderMat.uniforms.uScanLat.value = scanLatValue;

      renderer.render(scene, camera);

      // 5. Draw Subtle 2D HUD Telemetry Overlay (Non-blocking)
      if (ctx2d) {
        ctx2d.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        const screenRadius = (globeRadius / camera.position.z) * (height / 2) * 1.55;

        // Tactical Corner Viewfinder Brackets
        ctx2d.strokeStyle = 'rgba(0, 255, 136, 0.45)';
        ctx2d.lineWidth = 1.0;

        const bracketSize = 14;
        const offset = screenRadius + 10;

        // Top-Left Corner Bracket
        ctx2d.beginPath();
        ctx2d.moveTo(cx - offset, cy - offset + bracketSize);
        ctx2d.lineTo(cx - offset, cy - offset);
        ctx2d.lineTo(cx - offset + bracketSize, cy - offset);
        ctx2d.stroke();

        // Top-Right Corner Bracket
        ctx2d.beginPath();
        ctx2d.moveTo(cx + offset - bracketSize, cy - offset);
        ctx2d.lineTo(cx + offset, cy - offset);
        ctx2d.lineTo(cx + offset, cy - offset + bracketSize);
        ctx2d.stroke();

        // Bottom-Left Corner Bracket
        ctx2d.beginPath();
        ctx2d.moveTo(cx - offset, cy + offset - bracketSize);
        ctx2d.lineTo(cx - offset, cy + offset);
        ctx2d.lineTo(cx - offset + bracketSize, cy + offset);
        ctx2d.stroke();

        // Bottom-Right Corner Bracket
        ctx2d.beginPath();
        ctx2d.moveTo(cx + offset - bracketSize, cy + offset);
        ctx2d.lineTo(cx + offset, cy + offset);
        ctx2d.lineTo(cx + offset, cy + offset - bracketSize);
        ctx2d.stroke();

        // Satellite Telemetry HUD Data
        const curLat = (scanLatValue * 90).toFixed(1);
        const curLon = ((scanAngle * (180 / Math.PI)) - 180).toFixed(1);

        ctx2d.font = '9px monospace';
        ctx2d.fillStyle = 'rgba(0, 255, 136, 0.85)';
        ctx2d.fillText('SAT-01 // ORBIT: 420KM', 12, 16);
        ctx2d.fillText('SURFACE SCAN: ACTIVE', width - 118, 16);
        ctx2d.fillText(`LAT: ${curLat}°  LON: ${curLon}°`, 12, height - 12);
        ctx2d.fillText('MODE: ORBITAL SWEEP', width - 118, height - 12);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[220px] relative bg-[#010603] rounded-b-lg overflow-hidden flex items-center justify-center">
      <canvas ref={canvas2dRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
    </div>
  );
}

// Custom Draggable Overlay Container supporting Desktop (Mouse) & Mobile (Touch)
interface DraggableWindowProps {
  initialX?: number;
  initialY?: number;
  children: React.ReactNode;
  className?: string;
  zIndex?: number;
  onFocus?: () => void;
}

function DraggableWindow({
  initialX = 0,
  initialY = 0,
  children,
  className = '',
  zIndex = 30,
  onFocus,
}: DraggableWindowProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: initialX,
    posY: initialY,
  });

  const handleStart = (clientX: number, clientY: number) => {
    if (onFocus) onFocus();
    setIsDragging(true);
    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      posX: position.x,
      posY: position.y,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start drag if clicking directly on or inside window, but ignore button clicks
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (e.touches.length === 1) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const s_dx = e.clientX - dragStartRef.current.startX;
      const s_dy = e.clientY - dragStartRef.current.startY;
      const isRotated = typeof window !== 'undefined' && window.innerWidth <= 1024 && window.innerHeight > window.innerWidth;
      const dx = isRotated ? s_dy : s_dx;
      const dy = isRotated ? -s_dx : s_dy;
      setPosition({
        x: dragStartRef.current.posX + dx,
        y: dragStartRef.current.posY + dy,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const s_dx = e.touches[0].clientX - dragStartRef.current.startX;
        const s_dy = e.touches[0].clientY - dragStartRef.current.startY;
        const isRotated = typeof window !== 'undefined' && window.innerWidth <= 1024 && window.innerHeight > window.innerWidth;
        const dx = isRotated ? s_dy : s_dx;
        const dy = isRotated ? -s_dx : s_dy;
        setPosition({
          x: dragStartRef.current.posX + dx,
          y: dragStartRef.current.posY + dy,
        });
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleEnd);
    window.addEventListener('touchcancel', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
    };
  }, [isDragging]);

  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={onFocus}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) var(--simulator-card-scale, scale(1))`,
        zIndex,
        touchAction: 'none',
      }}
      className={`simulator-card absolute cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {children}
    </div>
  );
}

interface ThemeOption {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  headColor: string;
  videoUrl?: string;
  isCustom?: boolean;
  unmuted?: boolean;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'cyber-operations',
    name: 'Cyber Operations',
    color: '#00ff88',
    bgColor: '#010402',
    headColor: '#ffffff',
    isCustom: true,
  },
  {
    id: 'matrix-green',
    name: 'Matrix Green',
    color: '#00ff88',
    bgColor: '#030805',
    headColor: '#ffffff',
  },
  {
    id: 'cyber-red',
    name: 'Cyber Red',
    color: '#ff3344',
    bgColor: '#080203',
    headColor: '#ffffff',
  },
  {
    id: 'amber-terminal',
    name: 'Amber Terminal',
    color: '#ffaa00',
    bgColor: '#080602',
    headColor: '#ffffff',
  },
  {
    id: 'cyan-stream',
    name: 'Cyan Stream',
    color: '#00e5ff',
    bgColor: '#020608',
    headColor: '#ffffff',
  },
  {
    id: 'cyber-video',
    name: 'The Red Mirage',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1786527406/d4ycrpl1t6ngzdur26fp.mp4',
  },
  {
    id: 'cyber-video-2',
    name: 'Shadow itachi',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1786530069/jf06swvypsrbnjrwe3ao.mp4',
  },
  {
    id: 'cyber-video-3',
    name: 'Crimson Skull',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1786544676/oivaa8iqyxphxvomu3oi.mp4',
  },
  {
    id: 'cyber-video-4',
    name: 'Cobalt Smoke',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1786546157/bgjtgpzdxjtxmawvqhcs.mp4',
  },
  {
    id: 'cyber-video-5',
    name: 'Azure Scythe',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1786546258/vxrpli4oje7ocozraipt.mp4',
  },
  {
    id: 'cyber-video-6',
    name: 'Rage Panda',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1786860780/ydwcuf1ilfrkecfcfrdj.mp4',
  },
  {
    id: 'cyber-video-7',
    name: 'Crimson Shinobi',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1786860815/ek0at17m2lxkwk4ejkyv.mp4',
  },
  {
    id: 'cyber-video-8',
    name: 'Red Revenant',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1786862115/kfemacfaxbumkaab8ipq.mp4',
  },
  {
    id: 'cyber-video-9',
    name: 'Neon Specter',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1786894962/th2bzq8tnboyx50ei1e2.mp4',
  },
  {
    id: 'cyber-video-10',
    name: 'Phantom Vortex',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1787219321/vspvw2k94tmt3xmcmer6.mp4',
  },
  {
    id: 'cyber-video-11',
    name: 'Cyber Enigma',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1787219327/l5zg0ubucw9zwh6iwspc.mp4',
  },
  {
    id: 'cyber-video-12',
    name: 'Quantum Breach',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1787219349/ga5qzrphsmactmh8n7zj.mp4',
  },
  {
    id: 'cyber-video-13',
    name: 'Abyssal Surge',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1787219341/a8aimv5vlt9upa0iyuvg.mp4',
  },
  {
    id: 'cyber-video-14',
    name: 'Sonic Matrix',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1788515569/dxohy4y231vldhspxqr1.mp4',
    unmuted: true,
  },
  {
    id: 'cyber-video-15',
    name: 'Cyber Resonance',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1788515902/yv8ercvao5wz780kwsnq.mp4',
    unmuted: true,
  },
  {
    id: 'cyber-video-16',
    name: 'Neural Grid',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1788527635/lc9kyua8vgm7yajcywdo.mp4',
  },
  {
    id: 'cyber-video-17',
    name: 'Sonic Surge',
    color: '#00ff88',
    bgColor: '#020504',
    headColor: '#ffffff',
    videoUrl: 'https://res.cloudinary.com/dc0hquoqv/video/upload/v1788528305/gxrdd4wsz7es8acphzlc.mp4',
    unmuted: true,
  },
];

export function CyberSimulatorPage() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption | null>(null);

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDotsOpen, setIsDotsOpen] = useState(false);
  const [isSatelliteOpen, setIsSatelliteOpen] = useState(false);
  const [isDirStreamOpen, setIsDirStreamOpen] = useState(false);

  // 5th Folder Nested Directory States
  const [isParentDirOpen, setIsParentDirOpen] = useState(false);
  const [isMalwareOpen, setIsMalwareOpen] = useState(false);
  const [malwareProgress, setMalwareProgress] = useState(12);
  const [isSubImageOpen, setIsSubImageOpen] = useState(false);
  const [isThreatScanOpen, setIsThreatScanOpen] = useState(false);
  const [isBackupDirOpen, setIsBackupDirOpen] = useState(false);

  // Nested File Viewer States
  const [isFirewallFileOpen, setIsFirewallFileOpen] = useState(false);
  const [isAuthLogFileOpen, setIsAuthLogFileOpen] = useState(false);
  const [isKeyFileOpen, setIsKeyFileOpen] = useState(false);
  const [isSigFileOpen, setIsSigFileOpen] = useState(false);
  const [isMemFileOpen, setIsMemFileOpen] = useState(false);
  const [isPortFileOpen, setIsPortFileOpen] = useState(false);
  const [isCveFileOpen, setIsCveFileOpen] = useState(false);
  const [isHeapFileOpen, setIsHeapFileOpen] = useState(false);
  const [isShadowFileOpen, setIsShadowFileOpen] = useState(false);
  const [isRecoveryFileOpen, setIsRecoveryFileOpen] = useState(false);
  const [isArchiveViewOpen, setIsArchiveViewOpen] = useState(false);
  const [isManifestViewOpen, setIsManifestViewOpen] = useState(false);

  // Active Window Layer Management
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const [logLines, setLogLines] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const lineIndexRef = useRef(0);

  const [dirLines, setDirLines] = useState<string[]>([]);
  const dirContainerRef = useRef<HTMLDivElement>(null);
  const dirIndexRef = useRef(0);

  // Automatically add logs on loop when terminal is open
  useEffect(() => {
    if (!isTerminalOpen) return;

    setLogLines(KALI_LOGS.slice(0, 5));
    lineIndexRef.current = 5;

    const interval = setInterval(() => {
      const nextLine = KALI_LOGS[lineIndexRef.current % KALI_LOGS.length];
      lineIndexRef.current += 1;

      setLogLines((prev) => {
        const updated = [...prev, nextLine];
        if (updated.length > 70) {
          return updated.slice(updated.length - 70);
        }
        return updated;
      });
    }, 650);

    return () => clearInterval(interval);
  }, [isTerminalOpen]);

  // Auto-scroll to bottom of log terminal
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logLines]);

  // Fast auto-scrolling stream for Command Prompt dir /s
  useEffect(() => {
    if (!isDirStreamOpen) return;

    setDirLines([
      "Microsoft Windows [Version 10.0.19045.3803]",
      "(c) Microsoft Corporation. All rights reserved.",
      "",
      "C:\\Users\\Admin>",
      " Volume in drive C has no label.",
      " Volume Serial Number is 84F2-9A0B",
      "",
    ]);
    dirIndexRef.current = 0;

    const interval = setInterval(() => {
      setDirLines((prev) => {
        const nextBatch: string[] = [];
        for (let i = 0; i < 2; i++) {
          nextBatch.push(DIR_LOG_TEMPLATES[dirIndexRef.current % DIR_LOG_TEMPLATES.length]);
          dirIndexRef.current += 1;
        }
        const updated = [...prev, ...nextBatch];
        if (updated.length > 120) {
          return updated.slice(updated.length - 120);
        }
        return updated;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isDirStreamOpen]);

  // Malware progress simulation animation
  useEffect(() => {
    if (!isMalwareOpen) {
      setMalwareProgress(15);
      return;
    }

    const interval = setInterval(() => {
      setMalwareProgress((prev) => {
        if (prev >= 98) return 98;
        const increment = Math.floor(Math.random() * 6) + 3;
        return Math.min(prev + increment, 98);
      });
    }, 380);

    return () => clearInterval(interval);
  }, [isMalwareOpen]);

  // Auto-scroll to bottom of dir stream command prompt
  useEffect(() => {
    if (dirContainerRef.current) {
      dirContainerRef.current.scrollTop = dirContainerRef.current.scrollHeight;
    }
  }, [dirLines]);

  // Ensure unmuted audio starts reliably upon theme selection or user gesture
  useEffect(() => {
    if (!selectedTheme?.unmuted) return;
    const handleGesture = () => {
      const videoEl = document.querySelector<HTMLVideoElement>('video.fixed');
      if (videoEl) {
        videoEl.muted = false;
        videoEl.volume = 1.0;
        if (videoEl.paused) {
          videoEl.play().catch(() => {});
        }
      }
    };
    window.addEventListener('click', handleGesture, { once: true });
    window.addEventListener('touchstart', handleGesture, { once: true });
    window.addEventListener('keydown', handleGesture, { once: true });
    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, [selectedTheme]);

  if (!selectedTheme) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-zinc-300 select-none">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 my-auto">
          
          {/* Main Theme Selector Content */}
          <div className="flex-1 max-w-4xl w-full flex flex-col items-center justify-center text-center">
            {/* Centered Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-widest text-white uppercase text-center">
              KERNEL THEMES
            </h1>
            {/* Directly Underneath Subtitle */}
            <p className="text-xs sm:text-sm font-mono text-zinc-400 text-center mt-2 mb-8 sm:mb-10">
              Select your background to continue.
            </p>

            {/* Clean Balanced Theme Selection Cards - All visible and scrollable on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
              {THEME_OPTIONS.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className="group bg-[#09090b] border border-zinc-800 hover:border-zinc-500 rounded-xl p-3.5 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] flex flex-col gap-3 text-left"
                >
                  {/* Compact preview of that theme's actual background */}
                  <div className="relative w-full h-32 rounded-lg overflow-hidden bg-black border border-zinc-800/80">
                    {theme.isCustom ? (
                      <CyberOperationsBackground previewMode />
                    ) : theme.videoUrl ? (
                      <video
                        src={theme.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                      />
                    ) : (
                      <MatrixRain
                        color={theme.color}
                        bgColor={theme.bgColor}
                        headColor={theme.headColor}
                        speed={35}
                        opacity={0.12}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                      />
                    )}
                  </div>

                  {/* Clean container with Theme Name */}
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs sm:text-sm font-mono font-semibold text-zinc-200 group-hover:text-white transition-colors">
                      {theme.name}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      Select →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 w-screen h-screen overflow-hidden flex items-center justify-end pr-2 sm:pr-3 md:pr-4 lg:pr-6 simulator-mobile-landscape"
      style={{ backgroundColor: selectedTheme.bgColor }}
    >
      {/* Selected Theme Background */}
      {selectedTheme.isCustom ? (
        <CyberOperationsBackground />
      ) : selectedTheme.videoUrl ? (
        <video
          key={selectedTheme.id}
          ref={(el) => {
            if (el) {
              const shouldMute = !selectedTheme.unmuted;
              el.muted = shouldMute;
              if (!shouldMute) {
                el.volume = 1.0;
                el.play().catch(() => {});
              }
            }
          }}
          src={selectedTheme.videoUrl}
          autoPlay
          loop
          muted={!selectedTheme.unmuted}
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover pointer-events-none z-0"
        />
      ) : (
        <MatrixRain 
          speed={33} 
          opacity={0.12} 
          color={selectedTheme.color}
          bgColor={selectedTheme.bgColor}
          headColor={selectedTheme.headColor}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
      )}


      {/* 1st OVERLAY: Terminal Output (Draggable) */}
      {isTerminalOpen && (
        <DraggableWindow
          initialX={0}
          initialY={0}
          zIndex={activeWindow === 'terminal' ? 40 : 30}
          onFocus={() => setActiveWindow('terminal')}
          className="left-4 sm:left-10 md:left-16 top-1/2 -translate-y-1/2 w-[90vw] max-w-md sm:max-w-lg md:max-w-xl h-80 sm:h-96"
        >
          <div className="w-full h-full bg-[#040906]/95 border border-[#00ff88]/40 rounded-lg shadow-[0_0_35px_rgba(0,255,136,0.18)] flex flex-col font-mono text-xs overflow-hidden backdrop-blur-md">
            {/* Terminal Window Bar */}
            <div className="bg-[#020504] border-b border-[#00ff88]/20 px-3.5 py-2 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-[#00ff88]">
                <Terminal className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold tracking-wider text-zinc-200">
                  root@kali:~# nmap -sS -A 192.168.1.1
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsTerminalOpen(false);
                  }}
                  className="text-zinc-400 hover:text-white hover:bg-red-500/20 p-1 rounded transition-colors cursor-pointer ml-1"
                  title="Close terminal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terminal Output Log Area */}
            <div 
              ref={logContainerRef}
              className="flex-grow p-3.5 space-y-1.5 overflow-y-auto font-mono text-[11px] leading-relaxed select-text bg-[#010403]/90 text-emerald-400 cursor-text"
            >
              {logLines.map((line, idx) => {
                let styleClass = 'text-emerald-400';
                if (line.startsWith('[+]')) styleClass = 'text-[#00ff88] font-semibold';
                if (line.startsWith('[*]')) styleClass = 'text-cyan-400';
                if (line.startsWith('    ')) styleClass = 'text-zinc-400 pl-2';

                return (
                  <div key={idx} className={`${styleClass} whitespace-pre-wrap break-words`}>
                    {line}
                  </div>
                );
              })}
            </div>

            {/* Footer Status Line */}
            <div className="bg-[#020504] border-t border-[#00ff88]/15 px-3 py-1.5 flex items-center justify-between text-[10px] text-zinc-500 shrink-0">
              <span className="text-[#00ff88]/80 font-mono">tty1 // LIVE LOG STREAM</span>
            </div>
          </div>
        </DraggableWindow>
      )}

      {/* 2nd OVERLAY: Decryption Alert (Draggable) */}
      {isAlertOpen && (
        <DraggableWindow
          initialX={20}
          initialY={20}
          zIndex={activeWindow === 'alert' ? 40 : 30}
          onFocus={() => setActiveWindow('alert')}
          className="left-6 sm:left-16 md:left-28 top-1/2 -translate-y-1/2 w-[85vw] max-w-sm sm:max-w-md"
        >
          <div className="w-full bg-[#090203]/95 border border-red-500/50 rounded-lg shadow-[0_0_35px_rgba(239,68,68,0.3)] flex flex-col font-mono text-xs overflow-hidden backdrop-blur-md">
            {/* Window Header */}
            <div className="bg-[#050102] border-b border-red-500/30 px-3.5 py-2 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-3.5 h-3.5 animate-pulse text-red-500" />
                <span className="text-[11px] font-semibold tracking-wider text-red-300 uppercase">
                  SYSTEM NOTIFICATION
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAlertOpen(false);
                }}
                className="text-zinc-400 hover:text-white hover:bg-red-500/20 p-1 rounded transition-colors cursor-pointer"
                title="Close alert"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-7 flex flex-col items-center justify-center text-center gap-3 bg-[#050102]/95">
              <div className="text-2xl sm:text-3xl font-black text-red-500 tracking-widest animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]">
                ALERT !!
              </div>
              <div className="text-xs sm:text-sm text-zinc-300 font-medium tracking-wide">
                Data can be Decrypted...
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#050102] border-t border-red-500/20 px-3 py-1.5 flex items-center justify-between text-[10px] text-zinc-500 shrink-0">
              <span className="text-red-400/80 font-mono">STATUS // DECRYPTION READY</span>
            </div>
          </div>
        </DraggableWindow>
      )}

      {/* 3rd OVERLAY: Moving Green Dots Matrix Visualizer (Draggable) */}
      {isDotsOpen && (
        <DraggableWindow
          initialX={-10}
          initialY={-10}
          zIndex={activeWindow === 'dots' ? 40 : 30}
          onFocus={() => setActiveWindow('dots')}
          className="left-8 sm:left-20 md:left-36 top-1/2 -translate-y-1/2 w-[88vw] max-w-sm sm:max-w-md h-72 sm:h-80"
        >
          <div className="w-full h-full bg-[#030905]/95 border border-[#00ff88]/40 rounded-lg shadow-[0_0_35px_rgba(0,255,136,0.2)] flex flex-col font-mono text-xs overflow-hidden backdrop-blur-md">
            {/* Window Header */}
            <div className="bg-[#020504] border-b border-[#00ff88]/20 px-3.5 py-2 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-[#00ff88]">
                <Activity className="w-3.5 h-3.5 animate-pulse text-[#00ff88]" />
                <span className="text-[11px] font-semibold tracking-wider text-zinc-200">
                  NETWORK TOPOLOGY
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDotsOpen(false);
                }}
                className="text-zinc-400 hover:text-white hover:bg-red-500/20 p-1 rounded transition-colors cursor-pointer"
                title="Close visualizer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Canvas Container */}
            <div className="flex-grow w-full relative overflow-hidden">
              <GreenDotsVisual />
            </div>

            {/* Footer */}
            <div className="bg-[#020504] border-t border-[#00ff88]/15 px-3 py-1.5 flex items-center justify-between text-[10px] text-zinc-500 shrink-0">
              <span className="text-[#00ff88]/80 font-mono">DYNAMIC NODES // ACTIVE</span>
            </div>
          </div>
        </DraggableWindow>
      )}

      {/* 4th OVERLAY: Satellite Mode Globe with Scanning Animation ON THE GLOBE (Draggable) */}
      {isSatelliteOpen && (
        <DraggableWindow
          initialX={30}
          initialY={-30}
          zIndex={activeWindow === 'satellite' ? 40 : 30}
          onFocus={() => setActiveWindow('satellite')}
          className="left-10 sm:left-24 md:left-44 top-1/2 -translate-y-1/2 w-[88vw] max-w-sm sm:max-w-md h-80 sm:h-96"
        >
          <div className="w-full h-full bg-[#030905]/95 border border-[#00ff88]/40 rounded-lg shadow-[0_0_35px_rgba(0,255,136,0.2)] flex flex-col font-mono text-xs overflow-hidden backdrop-blur-md">
            {/* Window Header with Title "Satellite Mode" */}
            <div className="bg-[#020504] border-b border-[#00ff88]/20 px-3.5 py-2 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-[#00ff88]">
                <Globe className="w-4 h-4 text-[#00ff88]" />
                <span className="text-xs font-bold tracking-wider text-zinc-100 uppercase">
                  Satellite Mode
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSatelliteOpen(false);
                }}
                className="text-zinc-400 hover:text-white hover:bg-red-500/20 p-1 rounded transition-colors cursor-pointer"
                title="Close Satellite Mode"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Globe Canvas Container (Directly Underneath Title) */}
            <div className="flex-grow w-full relative overflow-hidden flex items-center justify-center bg-[#010503]">
              <SatelliteGlobeVisual />
            </div>

            {/* Footer */}
            <div className="bg-[#020504] border-t border-[#00ff88]/15 px-3 py-1.5 flex items-center justify-between text-[10px] text-zinc-500 shrink-0">
              <span className="text-[#00ff88]/80 font-mono">GLOBAL ORBIT // LIVE SCAN</span>
            </div>
          </div>
        </DraggableWindow>
      )}

      {/* 5th OVERLAY: Directory Overlay (Small Red Folder Icons Only, Draggable) */}
      {isParentDirOpen && (
        <DraggableWindow
          initialX={-20}
          initialY={20}
          zIndex={activeWindow === 'parentDir' ? 50 : 30}
          onFocus={() => setActiveWindow('parentDir')}
          className="left-6 sm:left-16 md:left-28 top-1/2 -translate-y-1/2"
        >
          <div className="bg-[#030906]/95 border border-[#00ff88]/50 rounded-xl shadow-[0_0_35px_rgba(0,255,136,0.22)] flex flex-col overflow-hidden backdrop-blur-md">
            {/* Minimal Window Bar with Close Button */}
            <div className="bg-[#020504] border-b border-[#00ff88]/20 px-3 py-1.5 flex items-center justify-end shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsParentDirOpen(false);
                }}
                className="text-zinc-400 hover:text-white hover:bg-red-500/20 p-1 rounded transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Folder Icons - Clean, evenly spaced, balanced, NO TEXT */}
            <div className="p-4 sm:p-5 flex items-center justify-center gap-3 sm:gap-4 md:gap-5 bg-[#020704]/90">
              {[
                { key: 'dirstream', action: () => { setIsDirStreamOpen(true); setActiveWindow('dirstream'); } },
                { key: 'malware', action: () => { setIsMalwareOpen(true); setActiveWindow('malware'); } },
                { key: 'subImage', action: () => { setIsSubImageOpen(true); setActiveWindow('subImage'); } },
                { key: 'threatScan', action: () => { setIsThreatScanOpen(true); setActiveWindow('threatScan'); } },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.action();
                  }}
                  className="p-1.5 sm:p-2 rounded-xl transition-transform hover:scale-110 cursor-pointer"
                >
                  <Folder className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-red-500 fill-red-500/20 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                </div>
              ))}
            </div>
          </div>
        </DraggableWindow>
      )}

      {/* PRESERVED EXISTING FUNCTION: Directory Stream (cmd.exe dir /s) (Draggable) */}
      {isDirStreamOpen && (
        <DraggableWindow
          initialX={-15}
          initialY={10}
          zIndex={activeWindow === 'dirstream' ? 50 : 30}
          onFocus={() => setActiveWindow('dirstream')}
          className="left-12 sm:left-28 md:left-48 top-1/2 -translate-y-1/2 w-[90vw] max-w-md sm:max-w-lg h-80 sm:h-96"
        >
          <div className="w-full h-full bg-black border border-zinc-700 rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.15)] flex flex-col font-mono text-xs overflow-hidden">
            {/* Command Prompt Window Header */}
            <div className="bg-[#1f1f1f] border-b border-zinc-800 px-3.5 py-1.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[11px] font-semibold tracking-wide text-zinc-200">
                  Command Prompt (cmd_stream.exe)
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDirStreamOpen(false);
                }}
                className="text-zinc-400 hover:text-white hover:bg-red-600/60 p-1 rounded transition-colors cursor-pointer"
                title="Close Command Prompt"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pure Black Log Area with White Text */}
            <div
              ref={dirContainerRef}
              className="flex-grow p-3.5 space-y-0.5 overflow-y-auto font-mono text-[11px] leading-tight select-text bg-black text-white cursor-text"
            >
              {dirLines.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap break-words text-white">
                  {line}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-[#121212] border-t border-zinc-800 px-3 py-1 flex items-center justify-between text-[10px] text-zinc-400 shrink-0">
              <span className="font-mono text-zinc-400">cmd.exe // DIRECTORY STREAM</span>
            </div>
          </div>
        </DraggableWindow>
      )}

      {/* 2nd SUB-FOLDER OVERLAY: Malware Installation Visual Simulation (Draggable) */}
      {isMalwareOpen && (
        <DraggableWindow
          initialX={0}
          initialY={-10}
          zIndex={activeWindow === 'malware' ? 50 : 30}
          onFocus={() => setActiveWindow('malware')}
          className="left-8 sm:left-20 md:left-36 top-1/2 -translate-y-1/2 w-[90vw] max-w-xs sm:max-w-sm"
        >
          <div className="w-full bg-[#d60000] border-2 border-red-700 rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.5)] flex flex-col font-mono overflow-hidden backdrop-blur-md">
            {/* Header with Close Button */}
            <div className="bg-[#b30000] border-b border-red-800 px-3 py-1.5 flex items-center justify-end shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMalwareOpen(false);
                }}
                className="text-white/80 hover:text-white hover:bg-black/20 p-1 rounded transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Main Visual Content */}
            <div className="p-6 sm:p-7 flex flex-col items-center justify-center text-center select-none">
              {/* Large Black ☠ Symbol */}
              <div 
                className="text-7xl sm:text-8xl text-black font-black leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] mb-4 select-none animate-pulse"
                style={{ color: '#000000' }}
              >
                {'\u2620\uFE0E'}
              </div>

              {/* INSTALLING MALWARE... Label */}
              <div className="font-mono text-sm sm:text-base font-black tracking-widest text-black uppercase mb-5 select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                INSTALLING MALWARE...
              </div>

              {/* Clean Loading / Progress Animation */}
              <div className="w-full max-w-[240px] flex flex-col gap-2">
                <div className="w-full bg-black/80 rounded-full h-3 overflow-hidden border border-black/60 shadow-inner p-0.5 relative">
                  <div
                    className="h-full bg-black rounded-full transition-all duration-300 relative overflow-hidden"
                    style={{ width: `${malwareProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-900/40 to-transparent animate-pulse" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-black font-bold tracking-wider px-1">
                  <span>DEPLOYING</span>
                  <span>{malwareProgress}%</span>
                </div>
              </div>
            </div>
          </div>
        </DraggableWindow>
      )}

      {/* 3rd SUB-FOLDER OVERLAY: Image Display (Draggable) */}
      {isSubImageOpen && (
        <DraggableWindow
          initialX={0}
          initialY={0}
          zIndex={activeWindow === 'subImage' ? 50 : 30}
          onFocus={() => setActiveWindow('subImage')}
          className="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[75vw] max-w-[260px] sm:max-w-[300px]"
        >
          <div className="w-full bg-[#080808]/95 border border-[#00ff88]/50 rounded-xl shadow-[0_0_30px_rgba(0,255,136,0.22)] flex flex-col overflow-hidden backdrop-blur-md">
            {/* Header with Close Button */}
            <div className="bg-[#030604]/90 border-b border-[#00ff88]/20 px-2.5 py-1 flex items-center justify-end shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSubImageOpen(false);
                }}
                className="text-zinc-400 hover:text-white hover:bg-red-500/20 p-1 rounded transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Image Container - Proportionally Scaled Down, Snug Fit */}
            <div className="p-2 sm:p-2.5 flex items-center justify-center bg-black/80">
              <img
                src="https://res.cloudinary.com/dc0hquoqv/image/upload/v1786704549/bzdygxllhfpydrzxwa5j.png"
                alt="Sub-folder Content"
                className="w-full h-auto max-h-[48vh] object-contain rounded-md select-none block"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </DraggableWindow>
      )}

      {/* 4th SUB-FOLDER OVERLAY: SCANNING THREATS... (Draggable) */}
      {isThreatScanOpen && (
        <DraggableWindow
          initialX={0}
          initialY={0}
          zIndex={activeWindow === 'threatScan' ? 50 : 30}
          onFocus={() => setActiveWindow('threatScan')}
          className="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85vw] max-w-xs sm:max-w-sm"
        >
          <div className="w-full bg-black border border-[#00ff88]/50 rounded-2xl shadow-[0_0_40px_rgba(0,255,136,0.25)] flex flex-col font-mono overflow-hidden backdrop-blur-md">
            {/* Header with Close Button */}
            <div className="bg-black border-b border-[#00ff88]/20 px-3 py-1.5 flex items-center justify-end shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsThreatScanOpen(false);
                }}
                className="text-zinc-500 hover:text-white hover:bg-red-500/20 p-1 rounded transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Main Visual Content */}
            <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center select-none space-y-4 bg-black">
              <div className="font-mono text-sm sm:text-base font-bold tracking-widest text-[#00ff88] uppercase drop-shadow-[0_0_10px_rgba(0,255,136,0.4)]">
                SCANNING THREATS...
              </div>

              {/* Repeating animated dots */}
              <div className="flex items-center justify-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"
                  style={{ animationDuration: '1.2s', animationDelay: '0ms' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"
                  style={{ animationDuration: '1.2s', animationDelay: '300ms' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.8)] animate-pulse"
                  style={{ animationDuration: '1.2s', animationDelay: '600ms' }}
                />
              </div>
            </div>
          </div>
        </DraggableWindow>
      )}

      {/* NESTED LEVEL 2 OVERLAY: Backup_Archives (Draggable) */}
      {isBackupDirOpen && (
        <DraggableWindow
          initialX={-20}
          initialY={-10}
          zIndex={activeWindow === 'backupDir' ? 50 : 30}
          onFocus={() => setActiveWindow('backupDir')}
          className="left-14 sm:left-28 md:left-44 top-1/2 -translate-y-1/2 w-[88vw] max-w-sm"
        >
          <div className="w-full bg-[#010608]/95 border border-teal-500/50 rounded-lg shadow-[0_0_35px_rgba(20,184,166,0.22)] flex flex-col font-mono text-xs overflow-hidden backdrop-blur-md">
            <div className="bg-[#010304] border-b border-teal-500/30 px-3.5 py-2 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-teal-400">
                <Archive className="w-4 h-4 text-teal-400" />
                <span className="text-[11px] font-bold tracking-wider text-teal-200 uppercase">
                  Backup_Archives/ (Level 2)
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBackupDirOpen(false);
                }}
                className="text-zinc-400 hover:text-white hover:bg-teal-500/20 p-1 rounded transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-[#010203] px-3.5 py-1.5 border-b border-teal-500/20 text-[10px] text-zinc-400">
              <span className="text-teal-400">NESTED:</span> ..\Encrypted_Vault\Backup_Archives
            </div>

            <div className="p-3 space-y-2 bg-[#010405]">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsArchiveViewOpen(true);
                  setActiveWindow('archiveView');
                }}
                className="p-2.5 rounded-lg border border-teal-500/30 bg-[#01080a] hover:bg-teal-500/15 hover:border-teal-400 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Archive className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold text-zinc-200 group-hover:text-teal-300">
                      db_dump_2026.tar.gz
                    </div>
                    <div className="text-[10px] text-zinc-500">Encrypted GZIP Compressed Dump</div>
                  </div>
                </div>
                <span className="text-[9px] text-teal-400 font-mono">38.4 MB</span>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsManifestViewOpen(true);
                  setActiveWindow('manifestView');
                }}
                className="p-2.5 rounded-lg border border-teal-500/30 bg-[#01080a] hover:bg-teal-500/15 hover:border-teal-400 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <FileCode className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-bold text-zinc-200 group-hover:text-teal-300">
                      archive_manifest.json
                    </div>
                    <div className="text-[10px] text-zinc-500">Backup Checksum Header Index</div>
                  </div>
                </div>
                <span className="text-[9px] text-teal-400 font-mono">JSON</span>
              </div>
            </div>

            <div className="bg-[#010304] border-t border-teal-500/20 px-3 py-1.5 flex items-center justify-between text-[10px] text-zinc-500 shrink-0">
              <span className="text-teal-400/80 font-mono">ARCHIVES // RAID-6 COLD STORAGE</span>
            </div>
          </div>
        </DraggableWindow>
      )}

      {/* NESTED CONTENT VIEWER OVERLAYS */}
      {/* 1. Firewall rules viewer */}
      {isFirewallFileOpen && (
        <DraggableWindow
          initialX={30}
          initialY={10}
          zIndex={activeWindow === 'firewallFile' ? 50 : 30}
          onFocus={() => setActiveWindow('firewallFile')}
          className="left-8 sm:left-20 md:left-40 top-1/2 -translate-y-1/2 w-[90vw] max-w-sm sm:max-w-md"
        >
          <div className="w-full bg-[#080203]/95 border border-red-500/40 rounded-lg shadow-[0_0_30px_rgba(239,68,68,0.25)] flex flex-col font-mono text-xs overflow-hidden backdrop-blur-md">
            <div className="bg-[#050102] border-b border-red-500/30 px-3.5 py-1.5 flex items-center justify-between">
              <span className="text-[11px] font-bold text-red-300">firewall_rules.conf [READ-ONLY]</span>
              <button onClick={() => setIsFirewallFileOpen(false)} className="text-zinc-400 hover:text-white p-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <pre className="p-3 text-[11px] leading-relaxed text-red-400 bg-black/90 max-h-60 overflow-y-auto select-text font-mono">
{`# KernelAxis Active Ingress Filter
*filter
:INPUT DROP [0:0]
:FORWARD DROP [0:0]
:OUTPUT ACCEPT [0:0]
-A INPUT -i lo -j ACCEPT
-A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
-A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT
-A INPUT -p tcp --dport 80 -j DROP
COMMIT`}
            </pre>
          </div>
        </DraggableWindow>
      )}

      {/* 2. Master Key Viewer */}
      {isKeyFileOpen && (
        <DraggableWindow
          initialX={-15}
          initialY={-25}
          zIndex={activeWindow === 'keyFile' ? 50 : 30}
          onFocus={() => setActiveWindow('keyFile')}
          className="left-8 sm:left-20 md:left-40 top-1/2 -translate-y-1/2 w-[90vw] max-w-sm sm:max-w-md"
        >
          <div className="w-full bg-[#080206]/95 border border-purple-500/40 rounded-lg shadow-[0_0_30px_rgba(168,85,247,0.25)] flex flex-col font-mono text-xs overflow-hidden backdrop-blur-md">
            <div className="bg-[#050104] border-b border-purple-500/30 px-3.5 py-1.5 flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-300">master_rsa4096.pem [SECURE]</span>
              <button onClick={() => setIsKeyFileOpen(false)} className="text-zinc-400 hover:text-white p-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <pre className="p-3 text-[10px] leading-relaxed text-purple-300 bg-black/90 max-h-60 overflow-y-auto select-text font-mono">
{`-----BEGIN RSA PRIVATE KEY-----
MIIJKQIBAAKCAgEA7xQ2vL9sF5hK3z9a1M2n4p6Q8r0t2v4x6z8A0b2d4f6h8j0l
2n4p6r8t0v2x4z6A8b0d2f4h6j8l0n2p4r6t8v0x2z4A6b8d0f2h4j6l8n0p2r4t
6v8x0z2A4b6d8f0h2j4l6n8p0r2t4v6x8z0A2b4d6f8h0j2l4n6p8r0t2v4x6z8A
... [4096-BIT RSA CIPHER TRUNCATED] ...
-----END RSA PRIVATE KEY-----`}
            </pre>
          </div>
        </DraggableWindow>
      )}

      {/* 3. CVE PoC Viewer */}
      {isCveFileOpen && (
        <DraggableWindow
          initialX={25}
          initialY={20}
          zIndex={activeWindow === 'cveFile' ? 50 : 30}
          onFocus={() => setActiveWindow('cveFile')}
          className="left-8 sm:left-20 md:left-40 top-1/2 -translate-y-1/2 w-[90vw] max-w-sm sm:max-w-md"
        >
          <div className="w-full bg-[#080401]/95 border border-orange-500/40 rounded-lg shadow-[0_0_30px_rgba(249,115,22,0.25)] flex flex-col font-mono text-xs overflow-hidden backdrop-blur-md">
            <div className="bg-[#050201] border-b border-orange-500/30 px-3.5 py-1.5 flex items-center justify-between">
              <span className="text-[11px] font-bold text-orange-300">cve_2026_8812.poc [EXPLOIT]</span>
              <button onClick={() => setIsCveFileOpen(false)} className="text-zinc-400 hover:text-white p-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <pre className="p-3 text-[11px] leading-relaxed text-orange-400 bg-black/90 max-h-60 overflow-y-auto select-text font-mono">
{`/* CVE-2026-8812 LPE PoC */
#include <stdio.h>
#include <sys/mman.h>

int main() {
    printf("[*] Allocating payload at 0x00000000...\n");
    void *addr = mmap(0, 4096, PROT_READ|PROT_WRITE|PROT_EXEC, 
                      MAP_ANONYMOUS|MAP_PRIVATE|MAP_FIXED, -1, 0);
    printf("[+] Kernel ring-0 transition payload staged.\n");
    return 0;
}`}
            </pre>
          </div>
        </DraggableWindow>
      )}

      {/* 4. Shadow DB Viewer */}
      {isShadowFileOpen && (
        <DraggableWindow
          initialX={-10}
          initialY={15}
          zIndex={activeWindow === 'shadowFile' ? 50 : 30}
          onFocus={() => setActiveWindow('shadowFile')}
          className="left-8 sm:left-20 md:left-40 top-1/2 -translate-y-1/2 w-[90vw] max-w-sm sm:max-w-md"
        >
          <div className="w-full bg-[#010708]/95 border border-cyan-500/40 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.25)] flex flex-col font-mono text-xs overflow-hidden backdrop-blur-md">
            <div className="bg-[#010405] border-b border-cyan-500/30 px-3.5 py-1.5 flex items-center justify-between">
              <span className="text-[11px] font-bold text-cyan-300">shadow_hashes.db [ENCRYPTED]</span>
              <button onClick={() => setIsShadowFileOpen(false)} className="text-zinc-400 hover:text-white p-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <pre className="p-3 text-[11px] leading-relaxed text-cyan-400 bg-black/90 max-h-60 overflow-y-auto select-text font-mono">
{`root:$6$rounds=5000$saltsalt$eQ4...j8A0:19820:0:99999:7:::
daemon:*:19820:0:99999:7:::
operator:$6$kAxis$9xL...p2Q4:19820:0:99999:7:::
admin:$6$secOps$1mA...4kLm:19820:0:99999:7:::`}
            </pre>
          </div>
        </DraggableWindow>
      )}

      {/* Exactly 5 Red Folder Icons on the Right Side */}
      <div className="relative z-10 flex flex-col gap-2.5 sm:gap-3 md:gap-3.5 items-center justify-center">
        {[0, 1, 2, 3, 4].map((index) => (
          <div 
            key={index} 
            onClick={() => {
              if (index === 0) {
                setIsTerminalOpen((prev) => !prev);
                setActiveWindow('terminal');
              } else if (index === 1) {
                setIsAlertOpen((prev) => !prev);
                setActiveWindow('alert');
              } else if (index === 2) {
                setIsDotsOpen((prev) => !prev);
                setActiveWindow('dots');
              } else if (index === 3) {
                setIsSatelliteOpen((prev) => !prev);
                setActiveWindow('satellite');
              } else if (index === 4) {
                // 5th Folder turns into Parent Folder / Directory
                setIsParentDirOpen((prev) => !prev);
                setActiveWindow('parentDir');
              }
            }}
            className="p-1.5 sm:p-2 rounded-xl transition-transform hover:scale-110 cursor-pointer"
            title={
              index === 0 
                ? "Open Terminal Log Console" 
                : index === 1 
                ? "Open Decryption Alert" 
                : index === 2 
                ? "Open Network Dot Visualizer" 
                : index === 3
                ? "Open Satellite Mode"
                : index === 4
                ? "Open Root Parent Directory"
                : undefined
            }
          >
            <Folder className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-red-500 fill-red-500/20 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
