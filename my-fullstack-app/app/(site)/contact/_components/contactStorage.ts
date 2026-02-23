// app/(site)/contact/_components/contactStorage.ts
export type Gender = "male" | "female" | "other" | "";

export type ContactFormData = {
  category: string;
  name: string;
  kana: string;
  gender: Gender;
  email: string;
  phone: string;
  message: string;
  agreed: boolean;
};

const KEY = "contactDraft:v1";

export function saveContactDraft(data: ContactFormData) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

export function loadContactDraft(): ContactFormData | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ContactFormData;
  } catch {
    return null;
  }
}

export function clearContactDraft() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}
