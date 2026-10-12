import { NextResponse } from 'next/server';
import { getAdminCredentials } from '@/lib/db';
import { isSessionConfigured } from '@/lib/session';

export const dynamic = 'force-dynamic';

// Public liveness + configuration probe used by the deploy pipeline.
// It never returns secrets, only whether admin login can work.
export async function GET() {
  const sessionOk = isSessionConfigured();
  let credentialsOk = false;
  try {
    // also bootstraps the initial admin password on first run
    const creds = await getAdminCredentials();
    credentialsOk = !!creds.passwordHash;
  } catch {
    credentialsOk = false;
  }

  const adminAuth = sessionOk && credentialsOk ? 'ok' : !sessionOk ? 'missing_session_secret' : 'missing_credentials';
  return NextResponse.json({ ok: true, adminAuth }, { status: adminAuth === 'ok' ? 200 : 503 });
}
