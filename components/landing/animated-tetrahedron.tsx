"use client";

import { useEffect, useRef } from "react";

export function AnimatedTetrahedron() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

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

    // 8 vertices of a 3D Cube
    const vertices = [
      { x: -0.55, y: -0.55, z: -0.55 }, // 0: Back bottom-left
      { x: 0.55, y: -0.55, z: -0.55 },  // 1: Back bottom-right
      { x: 0.55, y: 0.55, z: -0.55 },   // 2: Back top-right
      { x: -0.55, y: 0.55, z: -0.55 },  // 3: Back top-left
      { x: -0.55, y: -0.55, z: 0.55 },  // 4: Front bottom-left
      { x: 0.55, y: -0.55, z: 0.55 },   // 5: Front bottom-right
      { x: 0.55, y: 0.55, z: 0.55 },    // 6: Front top-right
      { x: -0.55, y: 0.55, z: 0.55 },   // 7: Front top-left
    ];

    // 12 edges connecting the vertices
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7], // Connecting sides
    ];

    // 6 faces (quadrilaterals) for generating filled points
    const faces = [
      [0, 1, 2, 3], // Back face
      [4, 5, 6, 7], // Front face
      [0, 1, 5, 4], // Bottom face
      [2, 3, 7, 6], // Top face
      [0, 3, 7, 4], // Left face
      [1, 2, 6, 5], // Right face
    ];

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

    const rotateZ = (point: { x: number; y: number; z: number }, angle: number) => ({
      x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
      y: point.x * Math.sin(angle) + point.y * Math.cos(angle),
      z: point.z,
    });

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const scale = Math.min(rect.width, rect.height) * 0.45;

      ctx.font = "16px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const points: { x: number; y: number; z: number; char: string }[] = [];

      // Calculate dynamic breathing sizes for the cube over time
      const stretch = Math.sin(time * 1.2) * 0.08 + 1.0;

      const dynamicVertices = vertices.map((v) => ({
        x: v.x * stretch,
        y: v.y * stretch,
        z: v.z * stretch,
      }));

      // Generate points along edges (denser lines)
      edges.forEach(([i, j]) => {
        const v1 = dynamicVertices[i];
        const v2 = dynamicVertices[j];

        for (let t = 0; t <= 1; t += 0.04) {
          let point = {
            x: v1.x + (v2.x - v1.x) * t,
            y: v1.y + (v2.y - v1.y) * t,
            z: v1.z + (v2.z - v1.z) * t,
          };

          // Apply rotations
          point = rotateY(point, time * 0.45);
          point = rotateX(point, time * 0.35);
          point = rotateZ(point, time * 0.15);

          const depth = (point.z + 1.0) / 2.0;
          const charIndex = Math.floor(depth * (chars.length - 1));

          points.push({
            x: centerX + point.x * scale,
            y: centerY - point.y * scale,
            z: point.z,
            char: chars[Math.max(0, Math.min(charIndex, chars.length - 1))],
          });
        }
      });

      // Generate points on faces for a surface-filled render
      faces.forEach(([i, j, k, l]) => {
        const v0 = dynamicVertices[i];
        const v1 = dynamicVertices[j];
        const v2 = dynamicVertices[k];
        const v3 = dynamicVertices[l];

        // Bilinear interpolation across the quadrilateral face
        for (let u = 0.08; u < 1; u += 0.15) {
          for (let v = 0.08; v < 1; v += 0.15) {
            let point = {
              x: v0.x * (1 - u) * (1 - v) + v1.x * u * (1 - v) + v2.x * u * v + v3.x * (1 - u) * v,
              y: v0.y * (1 - u) * (1 - v) + v1.y * u * (1 - v) + v2.y * u * v + v3.y * (1 - u) * v,
              z: v0.z * (1 - u) * (1 - v) + v1.z * u * (1 - v) + v2.z * u * v + v3.z * (1 - u) * v,
            };

            // Apply rotations
            point = rotateY(point, time * 0.45);
            point = rotateX(point, time * 0.35);
            point = rotateZ(point, time * 0.15);

            const depth = (point.z + 1.0) / 2.0;
            const charIndex = Math.floor(depth * (chars.length - 1));

            points.push({
              x: centerX + point.x * scale,
              y: centerY - point.y * scale,
              z: point.z,
              char: chars[Math.max(0, Math.min(charIndex, chars.length - 1))],
            });
          }
        }
      });

      // Depth sort for accurate layering
      points.sort((a, b) => a.z - b.z);

      // Draw all ASCII characters — royal-blue gradient matching the new palette
      points.forEach((point) => {
        // depth: 0=back, 1=front
        const depth = Math.max(0, Math.min((point.z + 1.0) / 2.0, 1));
        const r = Math.round(58 + (1 - depth) * 85);
        const g = Math.round(89 + (1 - depth) * 74);
        const b = Math.round(209 + (1 - depth) * 26);
        const alpha = 0.35 + depth * 0.65;
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0.20, Math.min(alpha, 1.0))})`;
        ctx.fillText(point.char, point.x, point.y);
      });

      time += 0.015;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
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
