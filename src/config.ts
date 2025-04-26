// src/config.ts
import fs from "fs";
import path from "path";
import { app } from "electron";
import type { ConfigSchema } from "./types";

export function loadConfig(): ConfigSchema {
  // Determine where to look for config.json
  const configDir = app.isPackaged
    ? path.join(process.resourcesPath, "config")
    : path.join(__dirname, "../config");

  const configPath = path.join(configDir, "config.json");
  let rawData: string;

  try {
    rawData = fs.readFileSync(configPath, "utf-8");
  } catch (err) {
    console.error(`❌ Failed to read config file at ${configPath}`, err);
    throw err;
  }

  let parsed: any;
  try {
    parsed = JSON.parse(rawData);
  } catch (err) {
    console.error(`❌ Failed to parse JSON in config file: ${configPath}`, err);
    throw err;
  }

  // Validate schema
  if (!Array.isArray(parsed.studying)) {
    console.error("Invalid config: studying must be an array.");
    throw new Error("Invalid config: studying must be an array.");
  }
  if (!Array.isArray(parsed.gaming)) {
    console.error("Invalid config: gaming must be an array.");
    throw new Error("Invalid config: gaming must be an array.");
  }
  if (typeof parsed.audio !== "object" || parsed.audio === null) {
    console.error("Invalid config: audio must be an object.");
    throw new Error("Invalid config: audio must be an object.");
  }
  for (const key of ["good", "bad", "neutral"] as const) {
    if (typeof parsed.audio[key] !== "string") {
      console.error(`Invalid config: audio.${key} must be a string.`);
      throw new Error(`Invalid config: audio.${key} must be a string.`);
    }
  }

  return parsed as ConfigSchema;
}
