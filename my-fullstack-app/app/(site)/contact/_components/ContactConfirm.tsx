// app/(site)/contact/_components/ContactConfirm.tsx
"use client";

import * as React from "react";
import AppButton from "@/components/ui/AppButton";
import ContactHero from "./ContactHero";
import { Box, Paper, Typography, Divider, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  loadContactDraft,
  clearContactDraft,
  ContactFormData,
} from "./contactStorage";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: { xs: "block", sm: "grid" },
        gridTemplateColumns: { sm: "180px 1fr" },
        columnGap: { sm: 3 },
        alignItems: { sm: "center" },
        py: { xs: 1.75, sm: 2 },
      }}
    >
      <Box sx={{ mb: { xs: 1, sm: 0 } }}>
        <Typography
          sx={{ fontSize: 13, color: "text.secondary", fontWeight: 700 }}
        >
          {label}
        </Typography>
      </Box>

      <Typography sx={{ fontSize: 14, whiteSpace: "pre-wrap" }}>
        {value}
      </Typography>
    </Box>
  );
}

type ApiOk = { ok: true; id?: string };
type ApiNg = { ok: false; error?: unknown };
type ApiRes = ApiOk | ApiNg;

function toMessage(err: unknown): string {
  if (!err) return "送信に失敗しました。";
  if (typeof err === "string") return err;
  if (err instanceof Error) return err.message || "送信に失敗しました。";
  return "送信に失敗しました。";
}

function extractApiError(json: any): string | null {
  if (!json) return null;
  if (typeof json?.error === "string") return json.error;
  if (typeof json?.error?.message === "string") return json.error.message;
  if (typeof json?.message === "string") return json.message;
  return null;
}

export default function ContactConfirm() {
  const router = useRouter();
  const [data, setData] = React.useState<ContactFormData | null>(null);

  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setData(loadContactDraft());
  }, []);

  const heroSubtitle = `お問い合わせ内容確認
以下の内容で送信します。問題なければ「送信」を押してください。`;

  const submit = async () => {
    if (!data) return;

    try {
      setSubmitting(true);
      setSubmitError(null);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let json: ApiRes | any = null;
      try {
        json = await res.json();
      } catch {}

      if (!res.ok || !json?.ok) {
        const msg =
          extractApiError(json) ||
          (res.status
            ? `送信に失敗しました（${res.status}）`
            : "送信に失敗しました。");
        throw new Error(msg);
      }

      clearContactDraft();
      router.push("/contact/thanks");
    } catch (e) {
      setSubmitError(toMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: 1200,
        mx: "auto",
        py: { xs: 15, sm: 20 },
        px: { xs: 2.5, sm: 6 },
      }}
    >
      <Box
        component="main"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 0, sm: 6 },
          alignItems: "flex-start",
          py: { xs: 0, sm: 2 },
        }}
      >
        {/* =========================
           Left: confirm (63%)
        ========================= */}
        <Box component="section" sx={{ width: { xs: "100%", sm: "69%" } }}>
          <ContactHero title="CONTACT" subtitle={heroSubtitle} />

          <Paper
            elevation={0}
            sx={{
              mt: { xs: 2, sm: 3 },
              borderRadius: 2,
              border: "1px solid rgba(0,0,0,0.08)",
              p: { xs: 3, md: 5 },
            }}
          >
            {!data ? (
              <>
                <Typography sx={{ fontSize: 14, lineHeight: 1.9 }}>
                  入力内容が見つかりません。最初からやり直してください。
                </Typography>

                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                  <AppButton
                    tone="primary"
                    variant="contained"
                    onClick={() => router.push("/contact")}
                  >
                    入力画面へ戻る
                  </AppButton>
                </Box>
              </>
            ) : (
              <>
                <Row label="お問い合わせ種別" value={data.category || "-"} />
                <Divider />
                <Row label="お名前" value={data.name || "-"} />
                <Divider />
                <Row label="ふりがな" value={data.kana || "-"} />
                <Divider />
                <Row
                  label="性別"
                  value={
                    data.gender === "male"
                      ? "男"
                      : data.gender === "female"
                      ? "女"
                      : data.gender === "other"
                      ? "その他"
                      : "-"
                  }
                />
                <Divider />
                <Row label="メールアドレス" value={data.email || "-"} />
                <Divider />
                <Row label="電話番号" value={data.phone || "-"} />
                <Divider />
                <Row label="お問い合わせ内容" value={data.message || "-"} />
                <Divider />

                {submitError && (
                  <Typography
                    role="alert"
                    sx={{
                      mt: 2,
                      color: "error.main",
                      fontSize: 13,
                      textAlign: "center",
                    }}
                  >
                    × {submitError}
                  </Typography>
                )}

                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppButton
                    variant="outlined"
                    disabled={submitting}
                    onClick={() => router.push("/contact")}
                    tone="secondaryBlack"
                    sx={{ width: { xs: "100%" } }} // ← sm以降は指定しない
                  >
                    戻る
                  </AppButton>

                  <AppButton
                    variant="contained"
                    disabled={submitting}
                    aria-busy={submitting ? true : undefined}
                    onClick={submit}
                    tone="primary"
                    sx={{ width: { xs: "100%" } }} // ← ここも
                  >
                    {submitting ? "送信中..." : "送信"}
                  </AppButton>
                </Box>
              </>
            )}
          </Paper>
        </Box>

        {/* =========================
           Right: box (37%)  ※SPは非表示（ContactForm と同じ）
        ========================= */}
        <Box
          component="aside"
          sx={{
            width: { sm: "31%" },
            px: 2,
            display: { xs: "none", sm: "block" },
          }}
        >
          {/* 上：正方形（ContactFormと同じ枠） */}
          <Box
            sx={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: 1,
              overflow: "hidden",
              bgcolor: "#BDBDBD",
            }}
          >
            <Box
              component="img"
              src="/images/sidebar.svg"
              alt="サイドバー画像"
              sx={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* 下：縦長枠（中に Sidebar を入れる） */}
          <Box
            sx={{
              mt: 3,
              width: "100%",
              borderRadius: 1,
              border: "1px solid rgba(0,0,0,0.18)",
              bgcolor: "transparent",
              p: 2,
            }}
          >
            <Typography variant="body2">
              こちらは、ポートフォリオ用の参考ページになります。
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
