export function assertEnv() {
  const required = ["KEYSTATIC_ADMIN_PASSWORD", "KEYSTATIC_SECRET"] as const;
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(`[env] Fehlende Umgebungsvariablen: ${missing.join(", ")}`);
  }
}
