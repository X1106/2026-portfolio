import { z } from "zod";

export const contactSchema = z.object({
  category: z.string().min(1, "お問い合わせ種別は必須です"),
  name: z.string().min(1, "お名前は必須です"),
  kana: z.string().min(1, "ふりがなは必須です"),
  gender: z.enum(["male", "female", "other"]).optional(),
  age: z.string().optional(),
  email: z.string().email("メールアドレスの形式が正しくありません"),
  tel: z.string().optional(),
  message: z.string().min(1, "お問い合わせ内容は必須です"),
  agree: z.literal(true, { errorMap: () => ({ message: "同意が必要です" }) }),
});

export type ContactForm = z.infer<typeof contactSchema>;
