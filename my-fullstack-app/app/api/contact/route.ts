// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// 送信（Resend）
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

const ContactSchema = z.object({
  category: z.string().min(1),
  name: z.string().min(1),
  kana: z.string().min(1),
  gender: z.string().optional().nullable(),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string().min(1),
  agreed: z.boolean().refine((v) => v === true),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = ContactSchema.parse(json);

    const to = process.env.CONTACT_TO_EMAIL;
    if (!to) {
      return NextResponse.json(
        { ok: false, error: "CONTACT_TO_EMAIL is not set" },
        { status: 500 }
      );
    }

    // ドメイン未設定のテスト環境なら from は onboarding@resend.dev を使うのが無難
    // （公式例にも onboarding@resend.dev が使われています）
    const fromName = process.env.CONTACT_FROM_NAME ?? "Contact Form";
    const from = `${fromName} <onboarding@resend.dev>`;

    const subject = `【お問い合わせ】${data.category} / ${data.name}`;

    const text = [
      `お問い合わせ種別: ${data.category}`,
      `お名前: ${data.name}`,
      `ふりがな: ${data.kana}`,
      `性別: ${data.gender ?? "-"}`,
      `メール: ${data.email}`,
      `電話: ${data.phone ?? "-"}`,
      "",
      "--- お問い合わせ内容 ---",
      data.message,
    ].join("\n");

    const html = `
      <div style="font-family: ui-sans-serif, system-ui; line-height: 1.7">
        <h2>お問い合わせが届きました</h2>
        <ul>
          <li><b>お問い合わせ種別</b>: ${escapeHtml(data.category)}</li>
          <li><b>お名前</b>: ${escapeHtml(data.name)}</li>
          <li><b>ふりがな</b>: ${escapeHtml(data.kana)}</li>
          <li><b>性別</b>: ${escapeHtml(data.gender ?? "-")}</li>
          <li><b>メール</b>: ${escapeHtml(data.email)}</li>
          <li><b>電話</b>: ${escapeHtml(data.phone ?? "-")}</li>
        </ul>
        <hr />
        <h3>お問い合わせ内容</h3>
        <pre style="white-space: pre-wrap">${escapeHtml(data.message)}</pre>
      </div>
    `;

    const { data: sent, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      // 返信しやすいように replyTo をユーザーのメールに
      replyTo: data.email,
      text,
      html,
    });

    if (error) {
      return NextResponse.json({ ok: false, error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: sent?.id });
  } catch (e: any) {
    // zod parse error など
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unknown error" },
      { status: 400 }
    );
  }
}

// 簡易XSS対策（HTMLメール用）
function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
