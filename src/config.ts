import fs from "fs";
import path from "path";
import type { ConfigSchema } from "./types";

export function loadConfig(): ConfigSchema {
  const configPath = path.join(__dirname, "../config/config.json");
  let rawData: string;
  try {
    rawData = fs.readFileSync(configPath, "utf-8");
  } catch (err) {
    console.error(`Failed to read config file: ${configPath}`, err);
    throw err;
  }
  let parsed: any;
  try {
    parsed = JSON.parse(rawData);
  } catch (err) {
    console.error(`Failed to parse config JSON: ${configPath}`, err);
    throw err;
  }
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
  for (const key of ["good", "bad", "neutral"]) {
    if (typeof parsed.audio[key] !== "string") {
      console.error(`Invalid config: audio. must be a string.`);
      throw new Error(`Invalid config: audio. must be a string.`);
    }
  }
  return parsed as ConfigSchema;
}
