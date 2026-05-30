"use client";

import { useEffect, useRef } from "react";

export function AnimatedSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const isHoveredRef = useRef(false);
  const hoverProgressRef = useRef(0); // Transitions between 0 (static) and 1 (hover wave active)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Hover event listeners
    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
    };

    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Helper to generate points on the edges and faces of a single 3D box (step)
    const generateBoxPoints = (
      cx: number,
      cy: number,
      cz: number,
      w: number,
      h: number,
      d: number
    ) => {
      const boxPoints: { x: number; y: number; z: number }[] = [];
      const w2 = w / 2;
      const h2 = h / 2;
      const d2 = d / 2;

      // Helper to add points along a 3D line (edge)
      const addLine = (
        x1: number,
        y1: number,
        z1: number,
        x2: number,
        y2: number,
        z2: number
      ) => {
        for (let t = 0; t <= 1; t += 0.08) {
          boxPoints.push({
            x: x1 + (x2 - x1) * t,
            y: y1 + (y2 - y1) * t,
            z: z1 + (z2 - z1) * t,
          });
        }
      };

      // 12 Edges of the box
      // Bottom face edges
      addLine(cx - w2, cy - h2, cz - d2, cx + w2, cy - h2, cz - d2);
      addLine(cx + w2, cy - h2, cz - d2, cx + w2, cy - h2, cz + d2);
      addLine(cx + w2, cy - h2, cz + d2, cx - w2, cy - h2, cz + d2);
      addLine(cx - w2, cy - h2, cz + d2, cx - w2, cy - h2, cz - d2);

      // Top face edges
      addLine(cx - w2, cy + h2, cz - d2, cx + w2, cy + h2, cz - d2);
      addLine(cx + w2, cy + h2, cz - d2, cx + w2, cy + h2, cz + d2);
      addLine(cx + w2, cy + h2, cz + d2, cx - w2, cy + h2, cz + d2);
      addLine(cx - w2, cy + h2, cz + d2, cx - w2, cy + h2, cz - d2);

      // Vertical connector edges
      addLine(cx - w2, cy - h2, cz - d2, cx - w2, cy + h2, cz - d2);
      addLine(cx + w2, cy - h2, cz - d2, cx + w2, cy + h2, cz - d2);
      addLine(cx + w2, cy - h2, cz + d2, cx + w2, cy + h2, cz + d2);
      addLine(cx - w2, cy - h2, cz + d2, cx - w2, cy + h2, cz + d2);

      // Generate points on the 6 quadrilateral faces (for filled volumetric look)
      const addFace = (v0: any, v1: any, v2: any, v3: any) => {
        for (let u = 0.15; u < 1; u += 0.2) {
          for (let v = 0.15; v < 1; v += 0.2) {
            boxPoints.push({
              x: v0.x * (1 - u) * (1 - v) + v1.x * u * (1 - v) + v2.x * u * v + v3.x * (1 - u) * v,
              y: v0.y * (1 - u) * (1 - v) + v1.y * u * (1 - v) + v2.y * u * v + v3.y * (1 - u) * v,
              z: v0.z * (1 - u) * (1 - v) + v1.z * u * (1 - v) + v2.z * u * v + v3.z * (1 - u) * v,
            });
          }
        }
      };

      const c0 = { x: cx - w2, y: cy - h2, z: cz - d2 };
      const c1 = { x: cx + w2, y: cy - h2, z: cz - d2 };
      const c2 = { x: cx + w2, y: cy + h2, z: cz - d2 };
      const c3 = { x: cx - w2, y: cy + h2, z: cz - d2 };
      const c4 = { x: cx - w2, y: cy - h2, z: cz + d2 };
      const c5 = { x: cx + w2, y: cy - h2, z: cz + d2 };
      const c6 = { x: cx + w2, y: cy + h2, z: cz + d2 };
      const c7 = { x: cx - w2, y: cy + h2, z: cz + d2 };

      addFace(c0, c1, c2, c3); // Back
      addFace(c4, c5, c6, c7); // Front
      addFace(c0, c1, c5, c4); // Bottom
      addFace(c2, c3, c7, c6); // Top
      addFace(c0, c3, c7, c4); // Left
      addFace(c1, c2, c6, c5); // Right

      return boxPoints;
    };

    const rotateY = (point: { x: number; y: number; z: number }, angle: number) => ({
      x: point.x * Math.cos(angle) - point.z * Math.sin(angle),
      y: point.y,
      z: point.x * Math.sin(angle) + point.z * Math.cos(angle),
    });

    const rotateX = (point: { x: number; y: number; z: number }, angle: number) => ({
      x: point.x,
      y: point.y * Math.cos(angle) - point.z * Math.sin(angle),
      z: point.y * Math.sin(angle) + point.z * Math.cos(angle),
    });

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const scale = Math.min(rect.width, rect.height) * 0.52;

      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const points: { x: number; y: number; z: number; char: string }[] = [];

      // Transition hover factor smoothly (ease to 1 when hovered, 0 when not)
      hoverProgressRef.current += ((isHoveredRef.current ? 1.0 : 0.0) - hoverProgressRef.current) * 0.12;

      // Define coordinates for 4 ascending blocks forming a staircase
      // If hovered, each step block rises in a wavy, sequenced pulse pattern
      const stepBoxes = [
        {
          cx: -0.45,
          cy: -0.375 + Math.max(0, Math.sin(time * 5.0 - 0 * 1.2)) * 0.08 * hoverProgressRef.current,
          cz: 0,
          w: 0.3,
          h: 0.25,
          d: 0.55,
        },
        {
          cx: -0.15,
          cy: -0.25 + Math.max(0, Math.sin(time * 5.0 - 1 * 1.2)) * 0.08 * hoverProgressRef.current,
          cz: 0,
          w: 0.3,
          h: 0.5,
          d: 0.55,
        },
        {
          cx: 0.15,
          cy: -0.125 + Math.max(0, Math.sin(time * 5.0 - 2 * 1.2)) * 0.08 * hoverProgressRef.current,
          cz: 0,
          w: 0.3,
          h: 0.75,
          d: 0.55,
        },
        {
          cx: 0.45,
          cy: 0.0 + Math.max(0, Math.sin(time * 5.0 - 3 * 1.2)) * 0.08 * hoverProgressRef.current,
          cz: 0,
          w: 0.3,
          h: 1.0,
          d: 0.55,
        },
      ];

      // Combine points from all steps
      const combinedPoints: { x: number; y: number; z: number }[] = [];
      stepBoxes.forEach((box) => {
        combinedPoints.push(...generateBoxPoints(box.cx, box.cy, box.cz, box.w, box.h, box.d));
      });

      // Transform and project combined points
      combinedPoints.forEach((p) => {
        // STABLE ANGLE: Locked Y and X rotations (no continuous spinning)
        let point = rotateY(p, -0.65);
        point = rotateX(point, 0.42);

        // Project relative to coordinate boundaries
        const depth = (point.z + 0.6) / 1.2;
        const charIndex = Math.floor(Math.max(0, Math.min(depth, 1)) * (chars.length - 1));

        points.push({
          x: centerX + point.x * scale,
          y: centerY - point.y * scale,
          z: point.z,
          char: chars[charIndex],
        });
      });

      // Depth sorting
      points.sort((a, b) => a.z - b.z);

      // Render points — navy-to-indigo gradient to match the #170C79 brand palette
      points.forEach((point) => {
        // depth 0=back, 1=front
        const depth = Math.max(0, Math.min((point.z + 0.6) / 1.2, 1));
        const r = Math.round(23 + (1 - depth) * 60);
        const g = Math.round(12 + (1 - depth) * 80);
        const b = Math.round(121 + (1 - depth) * 60);
        const alpha = 0.20 + depth * 0.75;
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0.12, Math.min(alpha, 1.0))})`;
        ctx.fillText(point.char, point.x, point.y);
      });

      // Increment clock only if hovered (drives the wave) or returning to base
      if (isHoveredRef.current || hoverProgressRef.current > 0.01) {
        time += 0.015;
      }
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
