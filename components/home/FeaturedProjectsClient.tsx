"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { ProjectItem } from "@/lib/db";
import { SteelPanel } from "../ui/SteelPanel";
import { withBasePath } from "@/lib/media";
import { useLanguage } from "@/lib/i18n/context";
import { getLocalizedProject } from "@/lib/i18n/entities";

export function FeaturedProjectsClient({ projectsData }: { projectsData: ProjectItem[] }) {
  const { t, locale, dir, isRTL } = useLanguage();
  const featured = projectsData.slice(0, 4);
  const mainProject = featured[0];
  const sideProjects = featured.slice(1);

  const locMain = mainProject ? getLocalizedProject(mainProject, locale) : null;

  return (
    <section className="py-16 md:py-24 relative z-10" dir={dir}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <SectionHeading 
              title={t('featuredProjects.headingTitle')} 
              subtitle={t('featuredProjects.headingSubtitle')} 
              centered={false}
              className="mb-0"
            />
            <Button variant="primary" href="/projects" className="shrink-0">
              {t('featuredProjects.galleryBtn')}
            </Button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Featured Project - wide steel panel */}
          {mainProject && locMain && (
            <div className="lg:col-span-8">
              <Reveal delay={100} className="h-full">
                <Link href={`/projects/${mainProject.id}`} className="block h-full group">
                  <SteelPanel className="h-full flex flex-col">
                    <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-t-xl lg:rounded-t-none">
                      <Image
                        src={withBasePath(mainProject.image || `/projects/${mainProject.id}.webp`)}
                        alt={locMain.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(min-width: 1024px) 66vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
                      <div className={`absolute bottom-6 ${isRTL ? 'right-6 pr-4 border-r-4' : 'left-6 pl-4 border-l-4'} text-white border-signal-500`}>
                        <h3 className="text-2xl font-black font-vazir mb-1 drop-shadow-lg">{locMain.title}</h3>
                        <p className="text-steel-300 text-sm drop-shadow-md">{locMain.category} | {locMain.location}</p>
                      </div>
                    </div>
                  </SteelPanel>
                </Link>
              </Reveal>
            </div>
          )}

          {/* Thumbnails Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {sideProjects.map((project, idx) => {
              const locProj = getLocalizedProject(project, locale);
              return (
                <Reveal key={project.id} delay={(idx + 2) * 100} className="flex-1 flex flex-col min-h-[150px]">
                  <Link href={`/projects/${project.id}`} className="flex-1 block relative w-full rounded-xl overflow-hidden group border border-white/10 metal-shadow">
                    <Image
                      src={withBasePath(project.image || `/projects/${project.id}.webp`)}
                      alt={locProj.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-ink-950/60 group-hover:bg-ink-950/40 transition-colors" />
                    <div className={`absolute inset-0 p-4 flex flex-col justify-end ${
                      isRTL ? 'border-r-2 border-signal-500/0 group-hover:border-signal-500' : 'border-l-2 border-signal-500/0 group-hover:border-signal-500'
                    } transition-colors`}>
                      <h4 className="text-white font-bold font-vazir text-lg drop-shadow-md">{locProj.title}</h4>
                      <p className="text-steel-300 text-xs mt-1 drop-shadow-md">{locProj.location}</p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
