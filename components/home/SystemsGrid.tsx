import React from "react";
import { getMaterials } from "@/lib/db";
import { SystemsGridClient } from "./SystemsGridClient";

export async function SystemsGrid() {
  const materialsData = await getMaterials();
  return <SystemsGridClient materialsData={materialsData} />;
}
