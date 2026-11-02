"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/context";
import { withBasePath } from "@/lib/media";
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Eye,
  Layers,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  Ruler,
  Crosshair,
  ArrowDown,
} from "lucide-react";

// ============================================================================
// Types & Math Helpers
// ============================================================================

export interface PartBounds {
  min: [number, number, number];
  max: [number, number, number];
  center: [number, number, number];
}

export interface PartData {
  id: string;
  name: string;
  nameFa: string;
  subsystem: string;
  subsystemFa: string;
  material: string;
  provenance: "catalogue_confirmed" | "video_observed" | "schematic_compatible_hardware";
  chapter: number;
  specsFa: string;
  specsEn: string;
  explodedOffset: [number, number, number];
  inspectionOffset: [number, number, number];
  isMovingSash: boolean;
  bounds: PartBounds;
  vertices: number[];
  normals: number[];
  indices: number[];
}

export interface MaterialDef {
  name: string;
  diffuse: [number, number, number];
  specular: [number, number, number];
  roughness: number;
  metalness: number;
  opacity: number;
  transparent: boolean;
}

export interface SubsystemDef {
  id: string;
  nameFa: string;
  nameEn: string;
  color: string;
}

export interface ChapterDef {
  id: string;
  number: number;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  camera: {
    position: [number, number, number];
    target: [number, number, number];
    fov: number;
  };
  highlightSubsystems: string[];
  provenance: "catalogue_confirmed" | "video_observed" | "schematic_compatible_hardware";
}

export interface SceneData {
  model: string;
  brand: string;
  brandFa: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  specifications: {
    frameDepthMm: number;
    sashDepthMm: number;
    wallThicknessMm: string;
    glazingEnvelopeMm: string;
    polyamideOptionsMm: number[];
    thermalTransmittanceUf: string;
    hardwareClassKg: string;
    widthM: number;
    heightM: number;
  };
  cameraDefault: {
    position: [number, number, number];
    target: [number, number, number];
    fov: number;
  };
  materials: Record<string, MaterialDef>;
  subsystems: SubsystemDef[];
  chapters: ChapterDef[];
  parts: PartData[];
}

// 4x4 Matrix math routines (column-major order for WebGL)
type Mat4 = Float32Array;

function mat4Create(): Mat4 {
  const out = new Float32Array(16);
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}

function mat4Perspective(out: Mat4, fovyRad: number, aspect: number, near: number, far: number): Mat4 {
  const f = 1.0 / Math.tan(fovyRad / 2.0);
  const nf = 1.0 / (near - far);
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[14] = 2 * far * near * nf;
  out[15] = 0;
  return out;
}

function mat4LookAt(out: Mat4, eye: number[], center: number[], up: number[]): Mat4 {
  const eyex = eye[0], eyey = eye[1], eyez = eye[2];
  const upx = up[0], upy = up[1], upz = up[2];
  const centerx = center[0], centery = center[1], centerz = center[2];

  let z0 = eyex - centerx;
  let z1 = eyey - centery;
  let z2 = eyez - centerz;
  let len = 1 / Math.hypot(z0, z1, z2);
  z0 *= len; z1 *= len; z2 *= len;

  let x0 = upy * z2 - upz * z1;
  let x1 = upz * z0 - upx * z2;
  let x2 = upx * z1 - upy * z0;
  len = Math.hypot(x0, x1, x2);
  if (!len) {
    x0 = 0; x1 = 0; x2 = 0;
  } else {
    len = 1 / len;
    x0 *= len; x1 *= len; x2 *= len;
  }

  let y0 = z1 * x2 - z2 * x1;
  let y1 = z2 * x0 - z0 * x2;
  let y2 = z0 * x1 - z1 * x0;
  len = Math.hypot(y0, y1, y2);
  if (!len) {
    y0 = 0; y1 = 0; y2 = 0;
  } else {
    len = 1 / len;
    y0 *= len; y1 *= len; y2 *= len;
  }

  out[0] = x0;
  out[1] = y0;
  out[2] = z0;
  out[3] = 0;
  out[4] = x1;
  out[5] = y1;
  out[6] = z1;
  out[7] = 0;
  out[8] = x2;
  out[9] = y2;
  out[10] = z2;
  out[11] = 0;
  out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
  out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
  out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
  out[15] = 1;
  return out;
}

function mat4Multiply(out: Mat4, a: Mat4, b: Mat4): Mat4 {
  const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
  out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
  out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
  out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

  b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
  out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  return out;
}

function mat4Invert(out: Mat4, a: Mat4): Mat4 | null {
  const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

  const b00 = a00 * a11 - a01 * a10;
  const b01 = a00 * a12 - a02 * a10;
  const b02 = a00 * a13 - a03 * a10;
  const b03 = a01 * a12 - a02 * a11;
  const b04 = a01 * a13 - a03 * a11;
  const b05 = a02 * a13 - a03 * a12;
  const b06 = a20 * a31 - a21 * a30;
  const b07 = a20 * a32 - a22 * a30;
  const b08 = a20 * a33 - a23 * a30;
  const b09 = a21 * a32 - a22 * a31;
  const b10 = a21 * a33 - a23 * a31;
  const b11 = a22 * a33 - a23 * a32;

  let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  if (!det) return null;
  det = 1.0 / det;

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
  return out;
}

// Ray-triangle intersection test (Möller-Trumbore)
function rayIntersectsTriangle(
  orig: [number, number, number],
  dir: [number, number, number],
  v0: [number, number, number],
  v1: [number, number, number],
  v2: [number, number, number]
): number | null {
  const EPSILON = 0.000001;
  const edge1: [number, number, number] = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]];
  const edge2: [number, number, number] = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]];

  const pvec: [number, number, number] = [
    dir[1] * edge2[2] - dir[2] * edge2[1],
    dir[2] * edge2[0] - dir[0] * edge2[2],
    dir[0] * edge2[1] - dir[1] * edge2[0],
  ];

  const det = edge1[0] * pvec[0] + edge1[1] * pvec[1] + edge1[2] * pvec[2];
  if (det > -EPSILON && det < EPSILON) return null;
  const invDet = 1.0 / det;

  const tvec: [number, number, number] = [orig[0] - v0[0], orig[1] - v0[1], orig[2] - v0[2]];
  const u = (tvec[0] * pvec[0] + tvec[1] * pvec[1] + tvec[2] * pvec[2]) * invDet;
  if (u < 0.0 || u > 1.0) return null;

  const qvec: [number, number, number] = [
    tvec[1] * edge1[2] - tvec[2] * edge1[1],
    tvec[2] * edge1[0] - tvec[0] * edge1[2],
    tvec[0] * edge1[1] - tvec[1] * edge1[0],
  ];
  const v = (dir[0] * qvec[0] + dir[1] * qvec[1] + dir[2] * qvec[2]) * invDet;
  if (v < 0.0 || u + v > 1.0) return null;

  const t = (edge2[0] * qvec[0] + edge2[1] * qvec[1] + edge2[2] * qvec[2]) * invDet;
  return t > EPSILON ? t : null;
}

// ============================================================================
// WebGL Shader Sources
// ============================================================================

const VERTEX_SHADER_SRC = `
attribute vec3 aPosition;
attribute vec3 aNormal;

uniform mat4 uProjection;
uniform mat4 uView;
uniform vec3 uPartOffset;

varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vViewPos;

void main() {
  vec3 worldPos = aPosition + uPartOffset;
  vWorldPos = worldPos;
  vec4 viewPos = uView * vec4(worldPos, 1.0);
  vViewPos = -viewPos.xyz;
  vNormal = aNormal;
  gl_Position = uProjection * viewPos;
}
`;

const FRAGMENT_SHADER_SRC = `
precision mediump float;

varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vViewPos;

uniform vec3 uColor;
uniform float uOpacity;
uniform float uRoughness;
uniform float uMetallic;
uniform vec3 uHighlightColor;
uniform float uHighlightIntensity;
uniform float uGhosting;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewPos);

  // Key light: angled from front-right-above
  vec3 L1 = normalize(vec3(0.5, -0.85, 1.1));
  float diff1 = max(dot(N, L1), 0.0);
  vec3 H1 = normalize(L1 + V);
  float spec1 = pow(max(dot(N, H1), 0.0), mix(48.0, 6.0, uRoughness));

  // Fill light: soft cool light from left
  vec3 L2 = normalize(vec3(-0.7, -0.4, 0.5));
  float diff2 = max(dot(N, L2), 0.0) * 0.4;

  // Subtle upward bounce light
  float bounce = max(-N.z, 0.0) * 0.15;

  vec3 baseColor = uColor;
  if (uGhosting > 0.5) {
    baseColor = mix(baseColor, vec3(0.24, 0.24, 0.28), 0.82);
  }

  vec3 diffuse = baseColor * (0.35 + 0.65 * diff1 + diff2 + bounce);
  vec3 specular = mix(vec3(0.95), baseColor, uMetallic) * spec1 * (1.0 - uRoughness * 0.5);

  vec3 finalColor = diffuse + specular * 0.45;

  // Architectural ruby/signal highlight glow on selected or active stage part
  if (uHighlightIntensity > 0.01) {
    finalColor = mix(finalColor, uHighlightColor, uHighlightIntensity * 0.75);
    float rim = 1.0 - max(dot(N, V), 0.0);
    finalColor += uHighlightColor * pow(rim, 2.2) * uHighlightIntensity * 0.85;
  }

  float alpha = uOpacity;
  if (uGhosting > 0.5) {
    alpha = min(alpha, 0.16);
  }

  gl_FragColor = vec4(finalColor, alpha);
}
`;

function createProgram(gl: WebGLRenderingContext, vsSrc: string, fsSrc: string): WebGLProgram | null {
  const vs = gl.createShader(gl.VERTEX_SHADER);
  if (!vs) return null;
  gl.shaderSource(vs, vsSrc);
  gl.compileShader(vs);
  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    console.error("VS error:", gl.getShaderInfoLog(vs));
    gl.deleteShader(vs);
    return null;
  }

  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fs) return null;
  gl.shaderSource(fs, fsSrc);
  gl.compileShader(fs);
  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.error("FS error:", gl.getShaderInfoLog(fs));
    gl.deleteShader(fs);
    return null;
  }

  const prog = gl.createProgram();
  if (!prog) return null;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("Link error:", gl.getProgramInfoLog(prog));
    gl.deleteProgram(prog);
    return null;
  }
  return prog;
}

// ============================================================================
// Component Implementation
// ============================================================================

interface PartBuffer {
  part: PartData;
  posBuffer: WebGLBuffer;
  normBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  indexCount: number;
  isTransparent: boolean;
}

export function TS143InteractiveScene() {
  const { locale, isRTL } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const storyContainerRef = useRef<HTMLDivElement>(null);

  // Fallback state if WebGL unsupported
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [sceneData, setSceneData] = useState<SceneData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Chapter and UI Navigation State
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [activeSubsystemId, setActiveSubsystemId] = useState<string | null>(null);
  const [isInspectionMode, setIsInspectionMode] = useState<boolean>(false);
  const [isCrossSectionMode, setIsCrossSectionMode] = useState<boolean>(false);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);

  // Refs for 60fps render loop
  const currentChapterIndexRef = useRef<number>(0);
  const selectedPartIdRef = useRef<string | null>(null);
  const activeSubsystemIdRef = useRef<string | null>(null);
  const isInspectionModeRef = useRef<boolean>(false);
  const isCrossSectionModeRef = useRef<boolean>(false);
  const isAutoRotateRef = useRef<boolean>(false);
  const isManualNavRef = useRef<boolean>(false);
  const manualNavTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Camera Orbit State
  const cameraRef = useRef({
    yaw: 0.05,
    targetYaw: 0.05,
    pitch: 0.06,
    targetPitch: 0.06,
    distance: 3.35,
    targetDistance: 3.35,
    targetPos: [0.0, 0.0, 1.1] as [number, number, number],
    targetPosGoal: [0.0, 0.0, 1.1] as [number, number, number],
  });

  const pointerStateRef = useRef({
    isDown: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    moved: false,
  });

  const buffersRef = useRef<PartBuffer[]>([]);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const locsRef = useRef<{
    aPosition: number;
    aNormal: number;
    uProjection: WebGLUniformLocation | null;
    uView: WebGLUniformLocation | null;
    uPartOffset: WebGLUniformLocation | null;
    uColor: WebGLUniformLocation | null;
    uOpacity: WebGLUniformLocation | null;
    uRoughness: WebGLUniformLocation | null;
    uMetallic: WebGLUniformLocation | null;
    uHighlightColor: WebGLUniformLocation | null;
    uHighlightIntensity: WebGLUniformLocation | null;
    uGhosting: WebGLUniformLocation | null;
  } | null>(null);

  const rafIdRef = useRef<number | null>(null);

  // Synchronize React state with animation refs
  useEffect(() => {
    selectedPartIdRef.current = selectedPartId;
  }, [selectedPartId]);

  useEffect(() => {
    activeSubsystemIdRef.current = activeSubsystemId;
  }, [activeSubsystemId]);

  useEffect(() => {
    isInspectionModeRef.current = isInspectionMode;
  }, [isInspectionMode]);

  useEffect(() => {
    isCrossSectionModeRef.current = isCrossSectionMode;
  }, [isCrossSectionMode]);

  useEffect(() => {
    isAutoRotateRef.current = isAutoRotate;
  }, [isAutoRotate]);

  useEffect(() => {
    currentChapterIndexRef.current = currentChapterIndex;
  }, [currentChapterIndex]);

  // Load Scene JSON
  useEffect(() => {
    let isMounted = true;
    const jsonPath = withBasePath("/models/ts143_scene.json");

    fetch(jsonPath)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: SceneData) => {
        if (isMounted) {
          setSceneData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch ts143_scene.json:", err);
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle chapter changes: smoothly re-orient camera & configure stage progression
  const applyChapterState = useCallback((chapterIdx: number, data: SceneData | null) => {
    setCurrentChapterIndex(chapterIdx);
    if (!data || !data.chapters || !data.chapters[chapterIdx]) return;

    const ch = data.chapters[chapterIdx];
    const cam = cameraRef.current;

    // Apply chapter camera
    const cp = ch.camera.position;
    const ct = ch.camera.target;

    cam.targetPosGoal = [ct[0], ct[1], ct[2]];
    const dx = cp[0] - ct[0];
    const dy = cp[1] - ct[1];
    const dz = cp[2] - ct[2];
    cam.targetDistance = Math.hypot(dx, dy, dz);
    cam.targetYaw = Math.atan2(dx, -dy);
    cam.targetPitch = Math.asin(Math.max(-0.99, Math.min(0.99, dz / (cam.targetDistance || 1))));

    // Configure chapter highlight subsystem and modes
    if (ch.id === "overview") {
      setActiveSubsystemId(null);
      setIsInspectionMode(false);
    } else if (ch.id === "thermal_break") {
      setActiveSubsystemId("thermal_break");
      setIsInspectionMode(true);
    } else if (ch.id === "hardware_mechanism") {
      setActiveSubsystemId("hardware");
      setIsInspectionMode(true);
    } else {
      setActiveSubsystemId(ch.highlightSubsystems[0] || null);
      setIsInspectionMode(false);
    }

    setIsCrossSectionMode(ch.id === "assembled_inspection");
  }, []);

  // Multi-viewport tall scrollytelling hook
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Reduced motion: land on fully assembled final chapter immediately
      if (sceneData && sceneData.chapters) {
        applyChapterState(sceneData.chapters.length - 1, sceneData);
      }
      return;
    }

    const onScroll = () => {
      if (isManualNavRef.current) return;
      const el = storyContainerRef.current;
      if (!el || !sceneData || !sceneData.chapters) return;

      const rect = el.getBoundingClientRect();
      const totalScrollRange = rect.height - window.innerHeight;
      if (totalScrollRange <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0.0, Math.min(1.0, currentScroll / totalScrollRange));
      const totalChapters = sceneData.chapters.length;
      const targetIdx = Math.min(totalChapters - 1, Math.floor(progress * totalChapters));

      // Call applyChapterState strictly when crossing a chapter boundary (11 times across story)
      if (targetIdx !== currentChapterIndexRef.current) {
        currentChapterIndexRef.current = targetIdx;
        applyChapterState(targetIdx, sceneData);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (manualNavTimerRef.current) clearTimeout(manualNavTimerRef.current);
    };
  }, [sceneData, applyChapterState]);

  // Navigate to chapter via click/keyboard with smooth window scroll synchronization
  const navigateToChapter = useCallback(
    (targetIdx: number) => {
      if (!sceneData || !sceneData.chapters) return;
      const boundedIdx = Math.max(0, Math.min(sceneData.chapters.length - 1, targetIdx));

      // Flag manual navigation to prevent onScroll race condition
      isManualNavRef.current = true;
      if (manualNavTimerRef.current) clearTimeout(manualNavTimerRef.current);
      manualNavTimerRef.current = setTimeout(() => {
        isManualNavRef.current = false;
      }, 700);

      applyChapterState(boundedIdx, sceneData);

      // Smoothly sync window scroll position if tall container is mounted
      const el = storyContainerRef.current;
      if (el && typeof window !== "undefined") {
        const rect = el.getBoundingClientRect();
        const totalScrollRange = rect.height - window.innerHeight;
        if (totalScrollRange > 0) {
          const targetY = window.scrollY + rect.top + (boundedIdx / sceneData.chapters.length) * totalScrollRange;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    },
    [sceneData, applyChapterState]
  );

  // Initialize WebGL context and buffers once sceneData is ready
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !sceneData) return;

    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      setWebglSupported(false);
      return;
    }
    glRef.current = gl;

    const prog = createProgram(gl, VERTEX_SHADER_SRC, FRAGMENT_SHADER_SRC);
    if (!prog) {
      setWebglSupported(false);
      return;
    }
    progRef.current = prog;

    locsRef.current = {
      aPosition: gl.getAttribLocation(prog, "aPosition"),
      aNormal: gl.getAttribLocation(prog, "aNormal"),
      uProjection: gl.getUniformLocation(prog, "uProjection"),
      uView: gl.getUniformLocation(prog, "uView"),
      uPartOffset: gl.getUniformLocation(prog, "uPartOffset"),
      uColor: gl.getUniformLocation(prog, "uColor"),
      uOpacity: gl.getUniformLocation(prog, "uOpacity"),
      uRoughness: gl.getUniformLocation(prog, "uRoughness"),
      uMetallic: gl.getUniformLocation(prog, "uMetallic"),
      uHighlightColor: gl.getUniformLocation(prog, "uHighlightColor"),
      uHighlightIntensity: gl.getUniformLocation(prog, "uHighlightIntensity"),
      uGhosting: gl.getUniformLocation(prog, "uGhosting"),
    };

    // Build vertex, normal, and index buffers for every architectural part
    const newBuffers: PartBuffer[] = [];
    for (const part of sceneData.parts) {
      const posB = gl.createBuffer();
      if (!posB) continue;
      gl.bindBuffer(gl.ARRAY_BUFFER, posB);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part.vertices), gl.STATIC_DRAW);

      const normB = gl.createBuffer();
      if (!normB) continue;
      gl.bindBuffer(gl.ARRAY_BUFFER, normB);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part.normals), gl.STATIC_DRAW);

      const idxB = gl.createBuffer();
      if (!idxB) continue;
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxB);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(part.indices), gl.STATIC_DRAW);

      const matInfo = sceneData.materials[part.material];
      const isTransparent = matInfo ? matInfo.transparent : false;

      newBuffers.push({
        part,
        posBuffer: posB,
        normBuffer: normB,
        indexBuffer: idxB,
        indexCount: part.indices.length,
        isTransparent,
      });
    }
    buffersRef.current = newBuffers;

    // WebGL state
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    // 60fps Render Loop
    const render = () => {
      if (!gl || !prog || !locsRef.current) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      const cam = cameraRef.current;
      if (isAutoRotateRef.current) {
        cam.targetYaw += 0.0035;
      }
      cam.yaw += (cam.targetYaw - cam.yaw) * 0.12;
      cam.pitch += (cam.targetPitch - cam.pitch) * 0.12;
      cam.distance += (cam.targetDistance - cam.distance) * 0.12;

      cam.targetPos[0] += (cam.targetPosGoal[0] - cam.targetPos[0]) * 0.12;
      cam.targetPos[1] += (cam.targetPosGoal[1] - cam.targetPos[1]) * 0.12;
      cam.targetPos[2] += (cam.targetPosGoal[2] - cam.targetPos[2]) * 0.12;

      const cy = Math.cos(cam.yaw);
      const sy = Math.sin(cam.yaw);
      const cp = Math.cos(cam.pitch);
      const sp = Math.sin(cam.pitch);

      const eyeX = cam.targetPos[0] + cam.distance * sy * cp;
      const eyeY = cam.targetPos[1] - cam.distance * cy * cp;
      const eyeZ = cam.targetPos[2] + cam.distance * sp;

      const eye = [eyeX, eyeY, eyeZ];
      const target = cam.targetPos;
      const up = [0, 0, 1];

      const aspect = canvas.width / (canvas.height || 1);
      const projMat = mat4Create();
      mat4Perspective(projMat, (38.0 * Math.PI) / 180.0, aspect, 0.1, 50.0);

      const viewMat = mat4Create();
      mat4LookAt(viewMat, eye, target, up);

      gl.clearColor(0.04, 0.01, 0.02, 1.0); // Noavaran dark ink/red tint
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(prog);
      gl.uniformMatrix4fv(locsRef.current.uProjection, false, projMat);
      gl.uniformMatrix4fv(locsRef.current.uView, false, viewMat);

      const activePartId = selectedPartIdRef.current;
      const activeSubsystem = activeSubsystemIdRef.current;
      const inspecting = isInspectionModeRef.current;
      const activeChapterIdx = currentChapterIndexRef.current;
      const activeChapter = sceneData.chapters ? sceneData.chapters[activeChapterIdx] : null;

      const opaque = buffersRef.current.filter((b) => !b.isTransparent);
      const transparent = buffersRef.current.filter((b) => b.isTransparent);

      const drawPart = (item: PartBuffer) => {
        const p = item.part;
        const mat = sceneData.materials[p.material] || {
          diffuse: [0.3, 0.3, 0.3],
          opacity: 1.0,
          roughness: 0.5,
          metalness: 0.5,
        };

        // Distinct Per-Part Staged Transforms based on active walkthrough chapter
        const chapterNum = activeChapterIdx + 1; // 1 to 11
        let offX = 0;
        let offY = 0;
        let offZ = 0;

        if (chapterNum === 1) {
          // Chapter 1: Overview - gentle exploded layout
          offX = p.explodedOffset[0] * 0.35;
          offY = p.explodedOffset[1] * 0.35;
          offZ = p.explodedOffset[2] * 0.35;
        } else if (chapterNum === 2) {
          // Chapter 2: Frame & Riveted Corners (perimeter frame & cleats assembled, other parts staged away)
          if (p.chapter > 2) {
            offX = p.explodedOffset[0] * 0.95;
            offY = p.explodedOffset[1] * 0.95;
            offZ = p.explodedOffset[2] * 0.95;
          }
        } else if (chapterNum === 3) {
          // Chapter 3: Thermal Break Polyamide Barriers (halves separated, polyamide highlighted)
          if (p.chapter === 3) {
            offY = -0.04;
            offZ = 0.02;
          } else if (p.subsystem === "frame" && p.id.includes("outer")) {
            offY = -0.06;
          } else if (p.chapter > 3) {
            offX = p.explodedOffset[0] * 0.95;
            offY = p.explodedOffset[1] * 0.95;
            offZ = p.explodedOffset[2] * 0.95;
          }
        } else if (chapterNum === 4) {
          // Chapter 4: Sash Profiles & Interlock (sashes slide in, subsequent parts staged away)
          if (p.chapter === 4) {
            offY = -0.025;
          } else if (p.chapter > 4) {
            offX = p.explodedOffset[0] * 0.95;
            offY = p.explodedOffset[1] * 0.95;
            offZ = p.explodedOffset[2] * 0.95;
          }
        } else if (chapterNum === 5) {
          // Chapter 5: Running Track & Top Guides
          if (p.id === "frame_sill_track" || p.id === "frame_top_guide_channel") {
            offZ = 0.015;
          } else if (p.chapter > 5) {
            offX = p.explodedOffset[0] * 0.95;
            offY = p.explodedOffset[1] * 0.95;
            offZ = p.explodedOffset[2] * 0.95;
          }
        } else if (chapterNum === 6) {
          // Chapter 6: Lift-Slide Hardware Mechanism (bogies, gearbox, handle highlighted)
          if (p.subsystem === "hardware") {
            offY = -0.045;
            offZ = 0.02;
          } else if (p.chapter > 6) {
            offX = p.explodedOffset[0] * 0.95;
            offY = p.explodedOffset[1] * 0.95;
            offZ = p.explodedOffset[2] * 0.95;
          }
        } else if (chapterNum === 7) {
          // Chapter 7: Glazing Envelope & Snap-in Beads
          if (p.subsystem.includes("sash") && (p.id.includes("glass") || p.id.includes("bead"))) {
            offY = -0.055;
          } else if (p.chapter > 7) {
            offX = p.explodedOffset[0] * 0.95;
            offY = p.explodedOffset[1] * 0.95;
            offZ = p.explodedOffset[2] * 0.95;
          }
        } else if (chapterNum === 8) {
          // Chapter 8: EPDM Seals
          if (p.subsystem === "seals") {
            offY = -0.035;
          }
        } else if (chapterNum === 9) {
          // Chapter 9: Sash Engagement on Carriages (sash positioned slightly above track to seat)
          if (p.isMovingSash) {
            offZ = 0.025;
          }
        } else if (chapterNum === 10) {
          // Chapter 10: Schematic lift-slide motion only; exact lift travel and opening distance depend on the selected hardware.
          if (p.isMovingSash) {
            offZ = 0.007;
            offX = -0.75;
          }
        } else {
          // Chapter 11: Final Assembled & Section Inspection
          // All offsets 0
        }

        // Additional Subsystem inspection isolation if user clicked Inspect
        let isGhosted = false;
        if (inspecting && activeSubsystem) {
          if (p.subsystem === activeSubsystem) {
            offX += p.inspectionOffset[0] * 1.5;
            offY += p.inspectionOffset[1] * 1.5;
            offZ += p.inspectionOffset[2] * 1.5;
          } else {
            isGhosted = true;
          }
        }

        // Chapter spotlight highlighting
        const isSelected = activePartId === p.id;
        let highlightIntensity = 0.0;
        if (isSelected) {
          highlightIntensity = 1.0;
        } else if (activeSubsystem === p.subsystem) {
          highlightIntensity = 0.30;
        } else if (activeChapter && activeChapter.highlightSubsystems.includes(p.subsystem)) {
          highlightIntensity = 0.18;
        }

        gl.uniform3f(locsRef.current!.uPartOffset, offX, offY, offZ);
        gl.uniform3fv(locsRef.current!.uColor, mat.diffuse);
        gl.uniform1f(locsRef.current!.uOpacity, mat.opacity);
        gl.uniform1f(locsRef.current!.uRoughness, mat.roughness);
        gl.uniform1f(locsRef.current!.uMetallic, mat.metalness);
        gl.uniform3f(locsRef.current!.uHighlightColor, 1.0, 0.15, 0.25);
        gl.uniform1f(locsRef.current!.uHighlightIntensity, highlightIntensity);
        gl.uniform1f(locsRef.current!.uGhosting, isGhosted ? 1.0 : 0.0);

        gl.bindBuffer(gl.ARRAY_BUFFER, item.posBuffer);
        gl.enableVertexAttribArray(locsRef.current!.aPosition);
        gl.vertexAttribPointer(locsRef.current!.aPosition, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, item.normBuffer);
        gl.enableVertexAttribArray(locsRef.current!.aNormal);
        gl.vertexAttribPointer(locsRef.current!.aNormal, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.indexBuffer);
        gl.drawElements(gl.TRIANGLES, item.indexCount, gl.UNSIGNED_SHORT, 0);
      };

      // 1. Draw Opaque Parts
      gl.depthMask(true);
      gl.disable(gl.BLEND);
      for (const item of opaque) {
        drawPart(item);
      }

      // 2. Draw Transparent Parts
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.depthMask(false);
      for (const item of transparent) {
        drawPart(item);
      }

      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [sceneData]);

  // Pointer Interaction (Orbit, Zoom, Raycast Select)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    pointerStateRef.current = {
      isDown: true,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      moved: false,
    };
    setIsAutoRotate(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!pointerStateRef.current.isDown) return;

    const dx = e.clientX - pointerStateRef.current.lastX;
    const dy = e.clientY - pointerStateRef.current.lastY;

    if (Math.hypot(e.clientX - pointerStateRef.current.startX, e.clientY - pointerStateRef.current.startY) > 5) {
      pointerStateRef.current.moved = true;
    }

    pointerStateRef.current.lastX = e.clientX;
    pointerStateRef.current.lastY = e.clientY;

    const cam = cameraRef.current;
    cam.targetYaw -= dx * 0.007;
    cam.targetPitch = Math.max(-0.6, Math.min(0.8, cam.targetPitch + dy * 0.007));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas && e.pointerId) {
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // Ignored
      }
    }

    const wasClick = !pointerStateRef.current.moved;
    pointerStateRef.current.isDown = false;

    if (wasClick && sceneData) {
      const rect = canvas?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ndcX = (x / rect.width) * 2 - 1;
      const ndcY = -((y / rect.height) * 2 - 1);

      const cam = cameraRef.current;
      const cy = Math.cos(cam.yaw);
      const sy = Math.sin(cam.yaw);
      const cp = Math.cos(cam.pitch);
      const sp = Math.sin(cam.pitch);

      const eye: [number, number, number] = [
        cam.targetPos[0] + cam.distance * sy * cp,
        cam.targetPos[1] - cam.distance * cy * cp,
        cam.targetPos[2] + cam.distance * sp,
      ];

      const aspect = rect.width / rect.height;
      const projMat = mat4Create();
      mat4Perspective(projMat, (38.0 * Math.PI) / 180.0, aspect, 0.1, 50.0);

      const viewMat = mat4Create();
      mat4LookAt(viewMat, eye, cam.targetPos, [0, 0, 1]);

      const pv = mat4Create();
      mat4Multiply(pv, projMat, viewMat);
      const invPv = mat4Create();
      if (!mat4Invert(invPv, pv)) return;

      const unproject = (nx: number, ny: number, nz: number): [number, number, number] => {
        const m = invPv;
        const rw = 1.0 / (m[3] * nx + m[7] * ny + m[11] * nz + m[15]);
        return [
          (m[0] * nx + m[4] * ny + m[8] * nz + m[12]) * rw,
          (m[1] * nx + m[5] * ny + m[9] * nz + m[13]) * rw,
          (m[2] * nx + m[6] * ny + m[10] * nz + m[14]) * rw,
        ];
      };

      const nearPt = unproject(ndcX, ndcY, -1);
      const farPt = unproject(ndcX, ndcY, 1);
      const dir: [number, number, number] = [
        farPt[0] - nearPt[0],
        farPt[1] - nearPt[1],
        farPt[2] - nearPt[2],
      ];
      const dlen = Math.hypot(dir[0], dir[1], dir[2]);
      if (dlen === 0) return;
      dir[0] /= dlen; dir[1] /= dlen; dir[2] /= dlen;

      let closestT = Infinity;
      let hitPartId: string | null = null;
      let hitSubsystem: string | null = null;

      const inspecting = isInspectionModeRef.current;
      const activeSub = activeSubsystemIdRef.current;

      for (const p of sceneData.parts) {
        let offX = 0;
        let offY = 0;
        let offZ = 0;

        if (inspecting && activeSub === p.subsystem) {
          offX += p.inspectionOffset[0] * 1.5;
          offY += p.inspectionOffset[1] * 1.5;
          offZ += p.inspectionOffset[2] * 1.5;
        }

        const shiftedOrig: [number, number, number] = [
          nearPt[0] - offX,
          nearPt[1] - offY,
          nearPt[2] - offZ,
        ];

        const verts = p.vertices;
        const indices = p.indices;
        for (let i = 0; i < indices.length; i += 3) {
          const i0 = indices[i] * 3;
          const i1 = indices[i + 1] * 3;
          const i2 = indices[i + 2] * 3;

          const v0: [number, number, number] = [verts[i0], verts[i0 + 1], verts[i0 + 2]];
          const v1: [number, number, number] = [verts[i1], verts[i1 + 1], verts[i1 + 2]];
          const v2: [number, number, number] = [verts[i2], verts[i2 + 1], verts[i2 + 2]];

          const tHit = rayIntersectsTriangle(shiftedOrig, dir, v0, v1, v2);
          if (tHit !== null && tHit < closestT) {
            closestT = tHit;
            hitPartId = p.id;
            hitSubsystem = p.subsystem;
          }
        }
      }

      if (hitPartId) {
        setSelectedPartId(hitPartId);
        setActiveSubsystemId(hitSubsystem);
      } else {
        setSelectedPartId(null);
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const cam = cameraRef.current;
    cam.targetDistance = Math.max(1.8, Math.min(6.5, cam.targetDistance + e.deltaY * 0.003));
  };

  // Keyboard navigation for accessible Prev/Next chapter selection
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (isRTL) {
        navigateToChapter(currentChapterIndex + 1);
      } else {
        navigateToChapter(currentChapterIndex - 1);
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (isRTL) {
        navigateToChapter(currentChapterIndex - 1);
      } else {
        navigateToChapter(currentChapterIndex + 1);
      }
    }
  };

  const handleResetCamera = useCallback(() => {
    const cam = cameraRef.current;
    cam.targetYaw = 0.05;
    cam.targetPitch = 0.06;
    cam.targetDistance = 3.35;
    cam.targetPosGoal = [0.0, 0.0, 1.1];
    setIsAutoRotate(false);
    setIsCrossSectionMode(false);
  }, []);

  const handleToggleCrossSection = useCallback(() => {
    setIsCrossSectionMode((prev) => {
      const next = !prev;
      const cam = cameraRef.current;
      if (next) {
        // Direct axonometric cutaway view of frame and sill profile
        cam.targetYaw = 0.35;
        cam.targetPitch = 0.18;
        cam.targetDistance = 2.45;
        cam.targetPosGoal = [0.35, 0.0, 0.25];
      } else {
        cam.targetYaw = 0.05;
        cam.targetPitch = 0.06;
        cam.targetDistance = 3.35;
        cam.targetPosGoal = [0.0, 0.0, 1.1];
      }
      return next;
    });
  }, []);

  const chapters = sceneData?.chapters || [];
  const currentChapter = chapters[currentChapterIndex] || null;

  const handleNextChapter = useCallback(() => {
    if (!sceneData || !sceneData.chapters) return;
    const nextIdx = (currentChapterIndex + 1) % sceneData.chapters.length;
    navigateToChapter(nextIdx);
  }, [currentChapterIndex, sceneData, navigateToChapter]);

  const handlePrevChapter = useCallback(() => {
    if (!sceneData || !sceneData.chapters) return;
    const prevIdx = (currentChapterIndex - 1 + sceneData.chapters.length) % sceneData.chapters.length;
    navigateToChapter(prevIdx);
  }, [currentChapterIndex, sceneData, navigateToChapter]);

  const selectedPart = useMemo(() => {
    if (!selectedPartId || !sceneData) return null;
    return sceneData.parts.find((p) => p.id === selectedPartId) || null;
  }, [selectedPartId, sceneData]);

  const subsystems = sceneData?.subsystems || [
    { id: "frame", nameFa: "فریم محیطی ۱۴۳ میلی‌متری", nameEn: "Perimeter Frame", color: "#ab0017" },
    { id: "thermal_break", nameFa: "تیغه‌های پلی‌آمید عایق", nameEn: "Polyamide Thermal Barriers", color: "#ff334b" },
    { id: "sash_fixed", nameFa: "لنگه ثابت و شیشه", nameEn: "Fixed Sash & Glass", color: "#3b82f6" },
    { id: "sash_moving", nameFa: "لنگه متحرک بازشو", nameEn: "Moving Sash & Glass", color: "#10b981" },
    { id: "hardware", nameFa: "یراق‌آلات و بوژی‌ها", nameEn: "Lift-Slide Hardware", color: "#f59e0b" },
    { id: "seals", nameFa: "گسکت‌های درزبند EPDM", nameEn: "EPDM Seals", color: "#8b5cf6" },
  ];

  const getProvenanceBadge = (prov?: string) => {
    if (prov === "catalogue_confirmed") {
      return {
        label: locale === "fa" ? "ارجاع به کاتالوگ AKPAi؛ هندسه مدل شماتیک است" : "AKPAi catalogue reference · visual geometry is illustrative",
        color: "bg-white/5 text-titanium-300 border-white/10",
      };
    }
    if (prov === "video_observed") {
      return {
        label: locale === "fa" ? "مشاهده در انیمیشن ارسالی AKPAi" : "Observed in supplied AKPAi animation",
        color: "bg-sky-500/15 text-sky-400 border-sky-500/30",
      };
    }
    return {
      label: locale === "fa" ? "چیدمان شماتیک؛ جزئیات تابع سازنده یراق است" : "Schematic layout · hardware supplier-specific",
      color: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    };
  };

  return (
    <div
      ref={storyContainerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative w-full min-h-[750vh] focus:outline-none"
      dir={isRTL ? "rtl" : "ltr"}
      aria-label={
        locale === "fa"
          ? "داستان مونتاژ مهندسی و عملکرد سیستم لیفت‌اند‌اسلاید TS143"
          : "TS143 Lift & Slide Engineering Assembly Walkthrough & Performance Story"
      }
    >
      {/* Sticky Product Viewport Container that stays pinned during scrolling */}
      <div className="sticky top-14 sm:top-16 md:top-20 z-20 w-full max-w-5xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-b from-[#140003]/95 via-[#0c0002]/95 to-[#180004]/95 shadow-[0_16px_60px_rgba(0,0,0,0.75)] overflow-hidden backdrop-blur-md">
        {/* Top Banner Header with System Badge & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 sm:px-6 py-3 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="flex h-2.5 w-2.5 rounded-full bg-signal-500 animate-pulse shrink-0" />
            <h3 className="text-xs sm:text-base font-bold text-white tracking-wide font-vazir truncate">
              {locale === "fa"
                ? "مراحل مونتاژ مهندسی و انیمیشن لیفت‌اند‌اسلاید TS143"
                : "TS143 Thermal-Break Lift & Slide Engineering Walkthrough"}
            </h3>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-mono font-semibold rounded bg-signal-500/20 text-signal-400 border border-signal-500/30 shrink-0">
              AKPAi TS143
            </span>
          </div>

          {/* Viewport Toolbar Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Profile Cross-Section View Toggle */}
            <button
              onClick={handleToggleCrossSection}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-all flex items-center gap-1.5 font-vazir ${
                isCrossSectionMode
                  ? "bg-signal-500/30 border-signal-500 text-white font-bold shadow-[0_0_12px_rgba(171,0,23,0.4)]"
                  : "bg-white/5 border-white/10 text-titanium-300 hover:bg-white/10"
              }`}
              title={locale === "fa" ? "نمایش برش مهندسی مقطع پروفیل" : "Show profile cross-section view"}
            >
              <Crosshair className="w-3.5 h-3.5 text-signal-400" />
              <span className="hidden xs:inline">{locale === "fa" ? "نمای مقطع پروفیل" : "Section View"}</span>
            </button>

            <button
              onClick={() => setIsAutoRotate((prev) => !prev)}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-all flex items-center gap-1.5 ${
                isAutoRotate
                  ? "bg-signal-500/25 border-signal-500 text-white"
                  : "bg-white/5 border-white/10 text-titanium-300 hover:bg-white/10"
              }`}
              title={locale === "fa" ? "چرخش خودکار دوربین" : "Auto-rotate"}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? "animate-spin" : ""}`} />
              <span className="hidden xs:inline">{locale === "fa" ? "چرخش" : "Rotate"}</span>
            </button>

            <button
              onClick={handleResetCamera}
              className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-titanium-300 hover:bg-white/10 transition-all flex items-center gap-1"
              title={locale === "fa" ? "تنظیم مجدد زاویه دوربین" : "Reset camera view"}
            >
              <Sparkles className="w-3.5 h-3.5 text-signal-400" />
              <span className="hidden xs:inline">{locale === "fa" ? "زاویه پیش‌فرض" : "Reset"}</span>
            </button>
          </div>
        </div>

        {/* Main 3D Viewport */}
        <div className="relative w-full h-[210px] sm:h-[280px] md:h-[340px] lg:h-[420px] bg-gradient-to-b from-[#0e0002] to-[#040001]">
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm gap-3">
              <div className="w-10 h-10 border-2 border-signal-500/30 border-t-signal-500 rounded-full animate-spin" />
              <p className="text-xs text-titanium-300 font-vazir">
                {locale === "fa" ? "در حال بارگذاری مدل سه‌بعدی مهندسی TS143..." : "Loading TS143 3D scene..."}
              </p>
            </div>
          )}

          {/* WebGL Canvas or Fallback */}
          {webglSupported ? (
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onWheel={handleWheel}
              className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
              aria-label={
                locale === "fa"
                  ? "مدل سه‌بعدی تعاملی پنجره ترمال‌بریک TS143؛ برای چرخش بکشید و برای انتخاب قطعات کلیک کنید."
                  : "Interactive 3D viewport for TS143 window; drag to orbit, click parts to inspect."
              }
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <Image
                src={withBasePath("/images/catalog/ts143_render.jpg")}
                alt="رندر سه‌بعدی رسمی سیستم درب و پنجره لیفت‌اند‌اسلاید TS143 نوآوران پنجره"
                fill
                className="object-contain p-4 opacity-80"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="relative z-10 max-w-md p-4 rounded-xl bg-black/85 border border-signal-500/40 backdrop-blur-md shadow-2xl">
                <ShieldAlert className="w-8 h-8 text-signal-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white font-vazir mb-1">
                  {locale === "fa" ? "پیش‌نمایش استاتیک مهندسی TS143" : "TS143 Engineering Static Preview"}
                </h4>
                <p className="text-xs text-titanium-300">
                  {locale === "fa"
                    ? "شتاب‌دهنده گرافیکی WebGL در مرورگر شما فعال نیست؛ مشخصات فنی قطعات از طریق پنل زیر در دسترس است."
                    : "WebGL hardware acceleration is inactive; view technical component specs via the panel below."}
                </p>
              </div>
            </div>
          )}

          {/* Viewport Overlay Hints */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/65 border border-white/10 backdrop-blur-md text-[10px] sm:text-[11px] text-titanium-300 font-vazir shadow-lg">
              <Eye className="w-3.5 h-3.5 text-signal-400" />
              <span>
                {locale === "fa"
                  ? "اسکرول صفحه برای گذر از مراحل • درگ جهت چرخش ۳۶۰°"
                  : "Scroll to step through assembly • Drag to orbit 360°"}
              </span>
            </div>

            {isCrossSectionMode && (
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-signal-500/25 border border-signal-500/50 backdrop-blur-md text-[10px] sm:text-[11px] text-signal-300 font-bold font-vazir shadow-lg">
                <Crosshair className="w-3.5 h-3.5 text-signal-400 animate-pulse" />
                <span>
                  {locale === "fa"
                    ? "نمای مقطع فعال: نمایش حفره‌های توخالی و عایق پلی‌آمید"
                    : "Profile Section Active: Hollow chambers & thermal break"}
                </span>
              </div>
            )}

            {isInspectionMode && (
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md text-[10px] sm:text-[11px] text-emerald-300 font-bold font-vazir shadow-lg">
                <Maximize2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>
                  {locale === "fa"
                    ? "حالت تفکیک قطعات داخلی فعال است"
                    : "Internal Inspection Active: Parts separated"}
                </span>
              </div>
            )}
          </div>

          {/* Cross-Section Dimension Callout Badges (rendered ONLY in section mode) */}
          {isCrossSectionMode && sceneData?.specifications && (
            <div className="absolute top-12 left-3 sm:top-14 sm:left-4 z-10 max-w-[280px] sm:max-w-xs p-3 rounded-xl bg-black/85 border border-signal-500/40 backdrop-blur-md shadow-2xl text-[10px] sm:text-[11px] font-vazir space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-white font-bold border-b border-white/10 pb-1">
                <Ruler className="w-3.5 h-3.5 text-signal-400" />
                <span>{locale === "fa" ? "مشخصات فنی کاتالوگ AKPAi برای TS143:" : "AKPAi TS143 Catalogue Specifications:"}</span>
              </div>
              <div className="flex justify-between text-titanium-200">
                <span>{locale === "fa" ? "عمق فریم (Frame Depth):" : "Frame Depth:"}</span>
                <span className="font-mono text-signal-400 font-bold">143 mm</span>
              </div>
              <div className="flex justify-between text-titanium-200">
                <span>{locale === "fa" ? "عمق لنگه (Sash Depth):" : "Sash Depth:"}</span>
                <span className="font-mono text-signal-400 font-bold">70 mm</span>
              </div>
              <div className="flex justify-between text-titanium-200">
                <span>{locale === "fa" ? "ضخامت جداره آلومینیوم:" : "Wall Thickness:"}</span>
                <span className="font-mono text-signal-400 font-bold">2.0 - 2.2 mm</span>
              </div>
              <div className="flex justify-between text-titanium-200">
                <span>{locale === "fa" ? "تیغه‌های پلی‌آمید (گزینه‌ها):" : "Polyamide Options:"}</span>
                <span className="font-mono text-signal-400 font-bold">18 / 24 / 38 mm</span>
              </div>
              <div className="flex justify-between text-titanium-200">
                <span>{locale === "fa" ? "بازه پکیج شیشه:" : "Glazing Range:"}</span>
                <span className="font-mono text-signal-400 font-bold">28 - 52 mm</span>
              </div>
              <div className="flex justify-between text-titanium-200">
                <span>{locale === "fa" ? "ضریب انتقال حرارت فریم (Uf):" : "Frame Uf:"}</span>
                <span className="font-mono text-signal-400 font-bold">3.2 W/(m²·K)</span>
              </div>
              <div className="flex justify-between text-titanium-200">
                <span>{locale === "fa" ? "کلاس یراق لیفت سازگار:" : "Compatible Hardware Class:"}</span>
                <span className="font-mono text-signal-400 font-bold">300 - 400 kg</span>
              </div>
              <div className="pt-1 border-t border-white/10 text-[9px] text-titanium-400 leading-tight">
                {locale === "fa"
                  ? "طرح شماتیک آموزشی مهندسی - نقشه برش کارگاهی یا دفترچه نصب دارای گواهی کارخانه تلقی نمی‌گردد."
                  : "Educational marketing interpretation - not a certified fabrication manual."}
              </div>
            </div>
          )}

          {/* Chapter Walkthrough Floating Bar */}
          <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-4 sm:inset-x-6 z-10 flex flex-col gap-2 p-2.5 sm:p-3 rounded-xl bg-ink-950/90 border border-white/15 backdrop-blur-md shadow-2xl">
            {/* Header row: Step pill, Title, and Prev/Next buttons */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold rounded bg-signal-500/25 text-signal-300 border border-signal-500/40 shrink-0">
                  {locale === "fa"
                    ? `مرحله ${currentChapterIndex + 1} از ${chapters.length || 11}`
                    : `Stage ${currentChapterIndex + 1} of ${chapters.length || 11}`}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white font-vazir truncate">
                  {currentChapter ? (locale === "fa" ? currentChapter.titleFa : currentChapter.titleEn) : ""}
                </h4>
              </div>

              {/* Non-scroll Previous / Next Buttons */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handlePrevChapter}
                  className="p-1 sm:p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-titanium-300 hover:text-white transition-all border border-white/10"
                  aria-label={locale === "fa" ? "مرحله قبل" : "Previous Stage"}
                  title={locale === "fa" ? "مرحله قبل" : "Previous Stage"}
                >
                  {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleNextChapter}
                  className="p-1 sm:p-1.5 rounded-lg bg-signal-500/80 hover:bg-signal-500 text-white font-bold transition-all shadow-md shadow-signal-500/30"
                  aria-label={locale === "fa" ? "مرحله بعد" : "Next Stage"}
                  title={locale === "fa" ? "مرحله بعد" : "Next Stage"}
                >
                  {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Chapter description & provenance badge */}
            {currentChapter && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1 border-t border-white/10 text-xs font-vazir">
                <p className="text-titanium-200 line-clamp-2 leading-relaxed text-[11px] sm:text-xs">
                  {locale === "fa" ? currentChapter.descFa : currentChapter.descEn}
                </p>
                {currentChapter.provenance && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded border shrink-0 whitespace-nowrap self-start sm:self-center ${
                      getProvenanceBadge(currentChapter.provenance).color
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{getProvenanceBadge(currentChapter.provenance).label}</span>
                  </span>
                )}
              </div>
            )}

            {/* Chapter Steps Track (Pill indicators) */}
            <div className="flex items-center gap-1 pt-1 overflow-x-auto no-scrollbar" role="tablist">
              {chapters.map((ch, idx) => {
                const isActive = idx === currentChapterIndex;
                return (
                  <button
                    key={ch.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => navigateToChapter(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-7 sm:w-8 bg-signal-500 shadow-[0_0_8px_rgba(171,0,23,0.8)]"
                        : "w-2 sm:w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                    title={`${ch.number}. ${locale === "fa" ? ch.titleFa : ch.titleEn}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Subsystem & Materials Strip */}
        <div className="px-3.5 sm:px-6 py-2.5 sm:py-3 border-t border-white/10 bg-black/60">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-signal-500" />
              <span className="text-xs font-bold text-white font-vazir">
                {locale === "fa" ? "زیرسیستم‌های ساختاری و متریال:" : "Structural Subsystems & Materials:"}
              </span>
            </div>

            {/* Inspection Mode Quick Toggle */}
            <button
              onClick={() => setIsInspectionMode((prev) => !prev)}
              className={`px-2.5 py-1 text-xs rounded-lg transition-all flex items-center gap-1.5 font-vazir border ${
                isInspectionMode
                  ? "bg-emerald-600/30 border-emerald-500 text-emerald-300 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  : "bg-white/5 border-white/10 text-titanium-300 hover:bg-white/10"
              }`}
            >
              {isInspectionMode ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              <span>
                {isInspectionMode
                  ? (locale === "fa" ? "بستن حالت تفکیک" : "Close Inspection")
                  : (locale === "fa" ? "تفکیک قطعات داخلی" : "Inspect Internals")}
              </span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2" role="tablist">
            {subsystems.map((sub) => {
              const isActive = activeSubsystemId === sub.id;
              return (
                <button
                  key={sub.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    if (activeSubsystemId === sub.id && isInspectionMode) {
                      setIsInspectionMode(false);
                      setActiveSubsystemId(null);
                    } else {
                      setActiveSubsystemId(sub.id);
                      setIsInspectionMode(true);
                    }
                  }}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-vazir transition-all flex items-center gap-2 border ${
                    isActive
                      ? "bg-signal-500/20 border-signal-500 text-white font-bold shadow-[0_0_12px_rgba(171,0,23,0.3)]"
                      : "bg-white/5 border-white/10 text-titanium-300 hover:bg-white/10"
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: sub.color }} />
                  <span>{locale === "fa" ? sub.nameFa : sub.nameEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Component Details Panel (when a part is selected) */}
        {selectedPart && (
          <div className="p-3.5 sm:p-6 border-t border-signal-500/30 bg-gradient-to-r from-blood-950/70 via-ink-950/80 to-blood-950/70 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono rounded bg-signal-500/20 text-signal-400 border border-signal-500/30">
                    {selectedPart.id}
                  </span>
                  <span className="text-xs text-titanium-400 font-vazir">
                    {locale === "fa" ? selectedPart.subsystemFa : selectedPart.subsystem}
                  </span>
                  {selectedPart.provenance && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] rounded border ${
                        getProvenanceBadge(selectedPart.provenance).color
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{getProvenanceBadge(selectedPart.provenance).label}</span>
                    </span>
                  )}
                </div>

                <h4 className="text-sm sm:text-lg font-bold text-white font-vazir mb-1 sm:mb-2">
                  {locale === "fa" ? selectedPart.nameFa : selectedPart.name}
                </h4>

                <p className="text-xs sm:text-sm text-titanium-200 leading-relaxed font-vazir">
                  {locale === "fa" ? selectedPart.specsFa : selectedPart.specsEn}
                </p>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0">
                <button
                  onClick={() => setSelectedPartId(null)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-white/10 hover:bg-white/15 text-white transition-all font-vazir"
                >
                  {locale === "fa" ? "بستن توضیحات" : "Dismiss"}
                </button>
                <button
                  onClick={() => {
                    setActiveSubsystemId(selectedPart.subsystem);
                    setIsInspectionMode(true);
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg bg-signal-500 hover:bg-signal-600 text-white font-bold transition-all font-vazir shadow-lg shadow-signal-500/25"
                >
                  {locale === "fa" ? "تفکیک این زیرسیستم" : "Isolate Subsystem"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Engineering Spec Quick Bar */}
        <div className="px-3.5 sm:px-6 py-2.5 border-t border-white/5 bg-black/40 flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] text-titanium-400 font-vazir gap-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span>{locale === "fa" ? "عمق فریم: ۱۴۳ میلی‌متر" : "Frame: 143mm"}</span>
            <span>•</span>
            <span>{locale === "fa" ? "عمق لنگه: ۷۰ میلی‌متر" : "Sash: 70mm"}</span>
            <span>•</span>
            <span>{locale === "fa" ? "جداره آلومینیوم: ۲٫۰ تا ۲٫۲ میلی‌متر" : "Wall: 2.0-2.2mm"}</span>
            <span>•</span>
            <span>{locale === "fa" ? "بازه شیشه: ۲۸ تا ۵۲ میلی‌متر" : "Glazing: 28-52mm"}</span>
          </div>
          <div className="text-signal-400 font-mono text-[10px] sm:text-[11px]">
            Uf: 3.20 W/m²K • Architectural Aluminium Extrusion • Polyamide 18/24/38mm • 400kg Class
          </div>
        </div>
      </div>

      {/* Invisible scrollway markers spanning the 750vh story to drive scrollytelling */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-12 px-4 select-none opacity-0">
        {chapters.map((ch, idx) => (
          <div key={ch.id} className="h-16 flex items-center justify-center text-xs text-titanium-600">
            Chapter {idx + 1}: {ch.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TS143InteractiveScene;
