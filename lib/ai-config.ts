/**
 * AI translation (9router) configuration.
 *
 * AI_TRANSLATION_ENABLED is the master switch for the "translate with AI" buttons in the
 * admin panel and for the /api/admin/translate endpoint. It is deliberately a constant in
 * the code base (not an env variable and not an admin setting): flip it to `true` here,
 * rebuild/redeploy, and the feature is on. While it is `false` the buttons are not rendered
 * and the endpoint answers 403.
 */
export const AI_TRANSLATION_ENABLED = false;

/** OpenAI-compatible base URL of the 9router gateway (override with NINEROUTER_BASE_URL). */
export const NINEROUTER_BASE_URL = process.env.NINEROUTER_BASE_URL || 'http://127.0.0.1:20128/v1';

/** Model or combo name registered in 9router (override with NINEROUTER_MODEL). */
export const NINEROUTER_MODEL = process.env.NINEROUTER_MODEL || 'gemini/gemini-3.5-flash-lite';

/** Maximum time to wait for the gateway, in milliseconds. */
export const AI_TRANSLATION_TIMEOUT_MS = 90_000;

/** Upper bound for the amount of source text sent in one request. */
export const AI_TRANSLATION_MAX_CHARS = 60_000;
