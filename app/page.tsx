import React from "react";
import { Hero } from "@/components/home/Hero";
import { ProofStrip } from "@/components/home/ProofStrip";
import { Services } from "@/components/home/Services";
import { SystemsGrid } from "@/components/home/SystemsGrid";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Process } from "@/components/home/Process";
import { CtaBand } from "@/components/home/CtaBand";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent overflow-hidden">
      <Hero />
      <ProofStrip />
      
      <div className="relative mt-12 md:mt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(171,0,23,0.25)_0%,_transparent_70%)] pointer-events-none" />
        <Services />
      </div>

      <div className="relative bg-gradient-to-b from-[#6b000e]/30 via-[#1e0004]/80 to-[#0a0002] border-y border-[#cbcccb]/20">
        <SystemsGrid />
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(171,0,23,0.15)_0%,_transparent_60%)] pointer-events-none" />
        <FeaturedProjects />
      </div>

      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blood-900/10 via-[#0a0002] to-[#0a0002]">
        <Process />
      </div>
      <CtaBand />
    </main>
  );
}
 
 
