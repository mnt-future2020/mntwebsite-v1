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
  /**
   * Analyst role — an opt-in LLM pass that judges quality/AEO issues the
   * deterministic Monitor can't (weak titles, generic meta, thin content,
   * poor AI-citability). Runs after the deterministic checks. `--deep`
   * overrides `enabled`. Needs the Agent SDK + ANTHROPIC_API_KEY.
   */
  analyst?: {
    enabled: boolean;
    model?: string;
    /** Cost cap — judge at most this many pages per run. */
    maxPages?: number;
  };
  brandVoice: string;
  neverTouch: string[];
  /**
   * Optional path (relative to this config file) to a Markdown "site playbook"
   * the Fixer reads before editing — positioning, voice, good/bad examples, and
   * a map of where metadata lives. Resolved to an absolute path on load.
   */
  contextFile?: string;
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
  if (raw.contextFile) raw.contextFile = path.resolve(configDir, raw.contextFile);
  return raw;
}

/**
 * Read the site playbook (config.contextFile) if configured and present.
 * Returns "" when unset or unreadable — the Fixer simply runs without it.
 */
export function loadContextText(config: SearchlightConfig): string {
  if (!config.contextFile) return "";
  try {
    return fs.readFileSync(config.contextFile, "utf8").trim();
  } catch {
    return "";
  }
}

export function defaultConfigPath(): string {
  return path.resolve(__dirname, "..", "searchlight.config.json");
}
