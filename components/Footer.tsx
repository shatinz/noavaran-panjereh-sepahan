import React from "react";
import { getSettings } from "@/lib/db";
import { FooterClient } from "./FooterClient";

export async function Footer() {
  const settingsData = await getSettings();
  return <FooterClient settingsData={settingsData} />;
}
