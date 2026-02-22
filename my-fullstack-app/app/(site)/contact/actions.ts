"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { contactSchema, type ContactForm } from "@/lib/contactSchema";

const COOKIE_KEY = "contact_draft_v1";

function encode(data: unknown) {
  return Buffer.from(JSON.stringify(data), "utf8").toString("base64url");
}

function decode<T>(value: string): T | null {
  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

type ActionState = {
  ok: boolean;
  fieldErrors?: Record<string, string[] | undefined>;
};

export async function saveDraftAction(
  _: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    category: String(formData.get("category") ?? ""),
    name: String(formData.get("name") ?? ""),
    kana: String(formData.get("kana") ?? ""),
    gender: (formData.get("gender") as string | null) ?? undefined,
    age: String(formData.get("age") ?? ""),
    email: String(formData.get("email") ?? ""),
    tel: String(formData.get("tel") ?? ""),
    message: String(formData.get("message") ?? ""),
    agree: formData.get("agree") === "on",
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  cookies().set({
    name: COOKIE_KEY,
    value: encode(parsed.data),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 30,
  });

  // ✅ 成功したらサーバー側で確実に遷移
  redirect("/contact/confirm");
}
