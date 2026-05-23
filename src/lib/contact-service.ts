type ContactPayload = {
  name: string;
  phone: string;
  message: string;
  email?: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '/contact';
const CONTACT_PROPERTY_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_PROPERTY_ENDPOINT || '/contact/property/:id';
const CONTACT_PROJECT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_PROJECT_ENDPOINT || '/contact/project/:id';

export type ContactTarget =
  | { type: 'general' }
  | { type: 'property'; id: string }
  | { type: 'project'; id: string };

export type ContactResult = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<'name' | 'phone' | 'email' | 'message', string>>;
};

function endpointForTarget(target: ContactTarget): string {
  if (target.type === 'property') return CONTACT_PROPERTY_ENDPOINT.replace(':id', target.id);
  if (target.type === 'project') return CONTACT_PROJECT_ENDPOINT.replace(':id', target.id);
  return CONTACT_ENDPOINT;
}

export async function submitContact(payload: ContactPayload, target: ContactTarget): Promise<ContactResult> {
  if (!API_BASE_URL) {
    return { ok: true, message: 'تم الإرسال محليًا (API_BASE_URL غير مضبوط بعد).' };
  }

  try {
    const endpoint = endpointForTarget(target);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const fallbackMsg = 'تعذر إرسال الرسالة حاليًا. حاول مرة أخرى.';
      try {
        const body = (await response.json()) as {
          message?: string;
          error?: string;
          errors?: Record<string, string[] | string>;
        };
        const fieldErrors: ContactResult['fieldErrors'] = {};

        if (body?.errors && typeof body.errors === 'object') {
          for (const [key, value] of Object.entries(body.errors)) {
            const normalizedKey = key.toLowerCase();
            const firstMsg = Array.isArray(value) ? String(value[0] || '') : String(value || '');
            if (!firstMsg) continue;

            if (normalizedKey.includes('name')) fieldErrors.name = firstMsg;
            if (normalizedKey.includes('phone')) fieldErrors.phone = firstMsg;
            if (normalizedKey.includes('mail')) fieldErrors.email = firstMsg;
            if (normalizedKey.includes('message')) fieldErrors.message = firstMsg;
          }
        }

        return {
          ok: false,
          message: body?.message || body?.error || fallbackMsg,
          fieldErrors,
        };
      } catch {
        return { ok: false, message: fallbackMsg };
      }
    }

    return { ok: true };
  } catch {
    return { ok: false, message: 'حدث خطأ في الشبكة. تحقق من الاتصال ثم حاول مرة أخرى.' };
  }
}
