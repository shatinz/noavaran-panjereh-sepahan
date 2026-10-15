import React from "react";
import { getServices } from "@/lib/db";
import { ServicesClient } from "./ServicesClient";

export async function Services() {
  const servicesData = await getServices();
  return <ServicesClient servicesData={servicesData} />;
}
