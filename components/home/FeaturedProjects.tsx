import React from "react";
import { getProjects } from "@/lib/db";
import { FeaturedProjectsClient } from "./FeaturedProjectsClient";

export async function FeaturedProjects() {
  const projectsData = await getProjects();
  return <FeaturedProjectsClient projectsData={projectsData} />;
}
