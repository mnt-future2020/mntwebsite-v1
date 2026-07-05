import * as fs from "fs";
import * as path from "path";
import type { CheckId, Tier } from "./types";

export interface SearchlightConfig {
  site: { name: string; baseUrl: string; sitemapUrl?: string };
  repo: {
    root: string;
    framework: "nextjs" | "generic";
    buildCommand: string;
    typecheckCommand?: string;
  };
  targetKeywords: string[];
  checks: {
    maxPages: number;
    titleMaxLength: number;
    metaDescriptionMaxLength: number;
    metaDescriptionMinLength: number;
    requireSchemaTypes: string[];
    checkBrokenLinks: boolean;
    maxLinksToCheck: number;
  };
  autoFix: {
    tiers: Record<CheckId, Tier>;
    maxRetries: number;
  };
  /** Shipper role — auto-commit + push after the Verifier passes. Opt-in. */
  deploy?: {
    enabled: boolean;
    remote: string;
    branch: string;
    commitPrefix: string;
    push: boolean;
  };
  brandVoice: string;
  neverTouch: string[];
}

/**
 * Load searchlight.config.json. `repo.root` is resolved to an absolute path
 * relative to the config file's directory, so the Fixer always edits the right
 * project regardless of where the CLI is invoked from.
 */
export function loadConfig(configPath: string): SearchlightConfig {
  const abs = path.resolve(configPath);
  if (!fs.existsSync(abs)) {
    throw new Error(`Config not found: ${abs}`);
  }
  const raw = JSON.parse(fs.readFileSync(abs, "utf8")) as SearchlightConfig;
  const configDir = path.dirname(abs);
  raw.repo.root = path.resolve(configDir, raw.repo.root);
  return raw;
}

export function defaultConfigPath(): string {
  return path.resolve(__dirname, "..", "searchlight.config.json");
}
