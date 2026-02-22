// app/(site)/contact/_components/ContactForm.tsx
"use client";
import AppButton from "@/components/ui/AppButton";
import * as React from "react";
import {
  Box,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Checkbox,
  Container,
  Chip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  ContactFormData,
  loadContactDraft,
  saveContactDraft,
} from "./contactStorage";
import ContactHero from "./ContactHero";

const initial: ContactFormData = {
  category: "",
  name: "",
  kana: "",
  gender: "",
  email: "",
  phone: "",
  message: "",
  agreed: false,
};

function ReqChip({ required }: { required?: boolean }) {
  return (
    <Chip
      size="small"
      label={required ? "必須" : "任意"}
      sx={{
        ml: 1.25,
        height: 20,
        fontSize: 11,
        borderRadius: 999,
        bgcolor: required
          ? "rgba(170, 130, 255, 0.18)"
          : "rgba(140, 200, 255, 0.18)",
        color: "text.primary",
      }}
    />
  );
}

function FieldRow({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        // PC：ラベル列 + 入力列 / SP：縦積み
        display: { xs: "block", sm: "grid" },
        gridTemplateColumns: { sm: "180px 1fr" },
        columnGap: { sm: 3 },
        rowGap: { sm: 0 },
        alignItems: { sm: "center" },
        mb: { xs: 2.25, sm: 2 },
      }}
    >
      <Box sx={{ mb: { xs: 1, sm: 0 } }}>
        <Typography>
          {label}
          <ReqChip required={required} />
        </Typography>
      </Box>

      <Box sx={{ pt: { xs: 0, sm: 0.5 } }}>{children}</Box>
    </Box>
  );
}

export default function ContactForm() {
  const router = useRouter();
  const [data, setData] = React.useState<ContactFormData>(initial);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const draft = loadContactDraft();
    if (draft) setData(draft);
  }, []);

  const update = <K extends keyof ContactFormData>(
    key: K,
    value: ContactFormData[K]
  ) => setData((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    if (!data.category) return "お問い合わせ種別を選択してください。";
    if (!data.name) return "お名前を入力してください。";
    if (!data.kana) return "ふりがなを入力してください。";
    if (!data.email) return "メールアドレスを入力してください。";
    if (!data.message) return "お問い合わせ内容を入力してください。";
    if (!data.agreed) return "利用規約に同意してください。";
    return null;
  };

  const onConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validate();
    setError(msg);
    if (msg) return;

    saveContactDraft(data);
    router.push("/contact/confirm");
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
           Left: form (72%)
        ========================= */}
        <Box component="section" sx={{ width: { xs: "100%", sm: "69%" } }}>
          <Box
            component="form"
            onSubmit={onConfirm}
            noValidate
            sx={{
              // PDFのように「カード」ではなく素の白背景に近い余白
              bgcolor: "transparent",
              color: "text.primary",
            }}
          >
            <ContactHero
              title="CONTACT"
              subtitle="ご質問やご依頼は、以下のフォームよりお送りください。最短当日中にご連絡いたします。お急ぎの方はお電話での相談も承っております。"
            />
            <FieldRow label="お問い合わせ種別" required>
              <Box
                sx={{
                  width: { xs: "100%", sm: "50%" }, // ✅ SPは100%、PCは約50%
                }}
              >
                <TextField
                  select
                  fullWidth
                  value={data.category}
                  onChange={(e) => update("category", e.target.value)}
                  size="small"
                >
                  <MenuItem value="">選択してください</MenuItem>
                  <MenuItem value="blog">ブログ</MenuItem>
                  <MenuItem value="work">制作依頼</MenuItem>
                  <MenuItem value="other">その他</MenuItem>
                </TextField>
              </Box>
            </FieldRow>

            <FieldRow label="お名前" required>
              <TextField
                fullWidth
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                autoComplete="name"
                size="small"
              />
            </FieldRow>

            <FieldRow label="ふりがな" required>
              <TextField
                fullWidth
                value={data.kana}
                onChange={(e) => update("kana", e.target.value)}
                size="small"
              />
            </FieldRow>

            <FieldRow label="性別">
              <RadioGroup
                value={data.gender}
                onChange={(e) => update("gender", e.target.value as any)}
                sx={{
                  flexDirection: { xs: "column", sm: "row" }, // ✅ SP=縦 / PC=横
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 2,
                }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio size="small" />}
                  label="男"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio size="small" />}
                  label="女"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio size="small" />}
                  label="その他"
                />
              </RadioGroup>
            </FieldRow>

            <FieldRow label="メールアドレス" required>
              <TextField
                fullWidth
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                autoComplete="email"
                size="small"
              />
            </FieldRow>

            <FieldRow label="電話番号">
              <TextField
                fullWidth
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                autoComplete="tel"
                size="small"
              />
            </FieldRow>

            <FieldRow label="お問い合わせ内容" required>
              <TextField
                fullWidth
                value={data.message}
                onChange={(e) => update("message", e.target.value)}
                multiline
                minRows={5}
                size="small"
              />
            </FieldRow>

            <Box sx={{ mt: 4 }}>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 14 },
                  fontWeight: 400, // fw.regular 相当（もし fw.regular があるなら置き換えOK）
                  lineHeight: 1.3, // lhTight 相当（もし lhTight があるなら置き換えOK）
                  letterSpacing: "0.15em", // 15% → 0.15em（CSSは%指定できないので em に変換）
                  color: "#212121",
                }}
              >
                ご利用規約とプライバシーポリシーをご確認の上、同意していただける場合は「同意する」にチェックを入れてください。
              </Typography>

              <FormControlLabel
                sx={{ mt: 1 }}
                control={
                  <Checkbox
                    checked={data.agreed}
                    onChange={(e) => update("agreed", e.target.checked)}
                    size="small"
                  />
                }
                label={
                  <Typography sx={{ fontSize: 13, color: "text.primary" }}>
                    同意する
                  </Typography>
                }
              />

              {error && (
                <Typography sx={{ color: "error.main", mt: 1, fontSize: 13 }}>
                  × {error}
                </Typography>
              )}
            </Box>

            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <AppButton type="submit" variant="contained" tone="primary">
                確認画面に進む
              </AppButton>
            </Box>
          </Box>
        </Box>

        {/* =========================
           Right: image/box (28%)  ※SPは非表示
        ========================= */}
        <Box
          component="aside"
          sx={{
            width: { sm: "31%" },
            px: 2,
            display: { xs: "none", sm: "block" },
          }}
        >
          {/* 画像：正方形 */}
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

          {/* 下の縦長枠 */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              width: "100%",
              height: "auto",
              borderRadius: 1,
              border: "1px solid rgba(0,0,0,0.18)",
              bgcolor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
