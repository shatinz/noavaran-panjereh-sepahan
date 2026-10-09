"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/media";

interface MetallicForgeLogoProps {
  className?: string;
  size?: number; // e.g. 160 or 180
  href?: string;
}

export function MetallicForgeLogo({
  className = "",
  size = 170,
  href = "/",
}: MetallicForgeLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // HTML5 Canvas rising sparks & embers engine
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = size * 1.5);
    const height = (canvas.height = size * 1.5);

    class Spark {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      size: number = 0;
      life: number = 0;
      decay: number = 0;
      color: string = "";

      constructor() {
        this.reset();
      }

      reset() {
        this.x = width / 2 + (Math.random() - 0.5) * (size * 0.7);
        this.y = height / 2 + (size * 0.28) + Math.random() * (size * 0.15);
        this.vx = (Math.random() - 0.5) * 0.9;
        this.vy = -(0.8 + Math.random() * 1.8);
        this.size = Math.random() * 2.2 + 0.6;
        this.life = 1;
        this.decay = 0.012 + Math.random() * 0.02;
        this.color = Math.random() > 0.35 ? "#ff3344" : "#ffaa33";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx += (Math.random() - 0.5) * 0.1;
        this.life -= this.decay;
        if (this.life <= 0) this.reset();
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = Math.max(0, this.life * 0.85);
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.shadowColor = this.color;
        c.shadowBlur = 8;
        c.fill();
        c.restore();
      }
    }

    const sparksCount = 28;
    const sparks = Array.from({ length: sparksCount }, () => new Spark());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      sparks.forEach((s) => {
        s.update();
        s.draw(ctx);
      });
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isVisible, size]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background Thermal Halo & Organic Ambient Fade */}
      <div 
        className="absolute rounded-full pointer-events-none -z-10 animate-pulse"
        style={{
          inset: "-22%",
          background: "radial-gradient(circle, rgba(155, 33, 48, 0.35) 0%, rgba(155, 33, 48, 0.15) 42%, rgba(255, 51, 68, 0.05) 60%, transparent 75%)",
          filter: "blur(26px)",
        }}
      />

      {/* Canvas for Live Rising Sparks */}
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none z-20"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          left: `-${size * 0.25}px`,
          top: `-${size * 0.25}px`,
        }}
      />

      {/* Spinning Molten Crucible Plasma Ring */}
      <div
        className="absolute rounded-full pointer-events-none z-10 will-change-transform"
        style={{
          width: size * 1.06,
          height: size * 1.06,
          border: "2.5px solid transparent",
          borderTop: "2.5px solid #ff3344",
          borderRight: "2.5px solid #9B2130",
          boxShadow: "0 0 24px rgba(155, 33, 48, 0.6), inset 0 0 16px rgba(255, 68, 68, 0.3)",
          animation: "forgeRingSpin 14s linear infinite",
        }}
      />

      {/* Secondary Industrial Orbit Ring */}
      <div
        className="absolute rounded-full pointer-events-none z-10 will-change-transform"
        style={{
          width: size * 1.15,
          height: size * 1.15,
          border: "1px dashed rgba(155, 33, 48, 0.25)",
          animation: "forgeRingReverse 32s linear infinite",
        }}
      />

      {/* Logo Link & Chamber */}
      <Link
        href={href}
        className="relative z-10 block group overflow-hidden rounded-full transition-transform duration-300 hover:scale-[1.03]"
        style={{ width: size * 0.88, height: size * 0.88 }}
        title="نوآوران پنجره سپاهان — استودیوی لوگو موشن"
      >
        {/* Authentic Main Logo */}
        <div className="relative w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] group-hover:drop-shadow-[0_0_20px_rgba(155,33,48,0.6)] transition-all">
          <Image
            src={withBasePath("/images/logo.png")}
            alt="شرکت نوآوران پنجره سپاهان"
            fill
            className="object-contain"
            sizes={`${size}px`}
            priority={false}
          />
        </div>
      </Link>

      <style jsx>{`
        @keyframes forgeRingSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes forgeRingReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
