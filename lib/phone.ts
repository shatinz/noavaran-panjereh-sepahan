// Small helpers so public pages render contact data from the admin settings
// instead of hard-coded numbers.

/** "031-33687755" -> "03133687755" (for tel: links) */
export function telHref(phone: string | undefined | null): string {
  return String(phone || '').replace(/\D/g, '');
}

/** Normalise an Iranian mobile/WhatsApp value to wa.me format (98…), or fall back. */
export function whatsappNumber(raw: string | undefined | null, fallback = '989301545858'): string {
  const digits = String(raw || '').replace(/\D/g, '');
  if (!digits) return fallback;
  if (digits.startsWith('98') && digits.length >= 12) return digits;
  if (digits.startsWith('0') && digits.length === 11) return `98${digits.slice(1)}`;
  if (digits.startsWith('9') && digits.length === 10) return `98${digits}`;
  return fallback;
}
