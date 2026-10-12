// Signed admin session tokens (HMAC-SHA256, Web Crypto so it runs in both the
// Edge middleware and Node route handlers).
//
// Token format: <expiresAtMs>.<nonce>.<mustChange:0|1>.<issuedAtMs>.<hexSignature>
// Also accepts legacy: <expiresAtMs>.<nonce>.<hexSignature>
//
// The signing secret MUST come from ADMIN_SESSION_SECRET (>= 16 chars). In
// production there is deliberately no fallback: a guessable secret would let
// anyone forge an admin session, so without it login is refused (the deploy
// pipeline generates the secret in the server's .env).

export const SESSION_COOKIE = 'noavaran_admin_session';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export interface SessionData {
  valid: boolean;
  expiresAt: number;
  mustChangePassword: boolean;
  issuedAt: number;
}

const g = globalThis as unknown as { __nvMinSessionIssuedAt?: number };

export function invalidateAllSessions(): void {
  g.__nvMinSessionIssuedAt = Date.now();
}

export function getMinSessionIssuedAt(): number {
  return g.__nvMinSessionIssuedAt || 0;
}

function getSecret(): string | null {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit && explicit.length >= 16) return explicit;
  if (process.env.NODE_ENV !== 'production') return 'dev-only-insecure-session-secret';
  return null;
}

export function isSessionConfigured(): boolean {
  return getSecret() !== null;
}

const encoder = new TextEncoder();

async function hmacHex(message: string): Promise<string> {
  const secret = getSecret();
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured');
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(options?: { mustChangePassword?: boolean; issuedAt?: number }): Promise<string> {
  const expires = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const issuedAt = options?.issuedAt ?? Date.now();
  const mustChange = options?.mustChangePassword ? '1' : '0';
  const nonceBytes = crypto.getRandomValues(new Uint8Array(12));
  const nonce = Array.from(nonceBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const payload = `${expires}.${nonce}.${mustChange}.${issuedAt}`;
  return `${payload}.${await hmacHex(payload)}`;
}

export async function getSession(token: string | undefined | null): Promise<SessionData | null> {
  if (!token || !isSessionConfigured()) return null;
  const parts = token.split('.');

  // 5-part token format: <expires>.<nonce>.<mustChange>.<issuedAt>.<sig>
  if (parts.length === 5) {
    const [expires, nonce, mustChangeStr, issuedAtStr, signature] = parts;
    const expiresAt = Number(expires);
    const issuedAt = Number(issuedAtStr);
    if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return null;
    if (!Number.isFinite(issuedAt) || issuedAt < getMinSessionIssuedAt()) return null;
    const payload = `${expires}.${nonce}.${mustChangeStr}.${issuedAtStr}`;
    const expected = await hmacHex(payload);
    if (!timingSafeEqual(expected, signature)) return null;
    return {
      valid: true,
      expiresAt,
      mustChangePassword: mustChangeStr === '1',
      issuedAt,
    };
  }

  // Legacy 3-part token format: <expires>.<nonce>.<sig>
  if (parts.length === 3) {
    const [expires, nonce, signature] = parts;
    const expiresAt = Number(expires);
    if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return null;
    if (getMinSessionIssuedAt() > 0) return null; // invalidated by password change
    const expected = await hmacHex(`${expires}.${nonce}`);
    if (!timingSafeEqual(expected, signature)) return null;
    return {
      valid: true,
      expiresAt,
      mustChangePassword: false,
      issuedAt: 0,
    };
  }

  return null;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  const session = await getSession(token);
  return session !== null;
}
