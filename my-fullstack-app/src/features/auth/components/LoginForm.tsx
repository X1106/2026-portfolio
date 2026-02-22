"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import AppButton from "@/components/ui/AppButton";
import {
  Box,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Typography,
  Collapse,
  CircularProgress,
} from "@mui/material";

export default function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const canSubmit = username.trim().length > 0 && password.trim().length > 0;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
        remember,
      });

      if (!res || res.error) {
        setError("IDまたはパスワードが違います");
        setLoading(false);
        return;
      }

      window.location.assign("/");
    } catch {
      setError("ログインに失敗しました");
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Stack spacing={2}>
        {/* ===== ユーザーネーム ===== */}
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              mb: 0.5,
              color: "text.primary",
            }}
          >
            ユーザーネーム
          </Typography>

          <TextField
            placeholder="ユーザーネームを入力する"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            fullWidth
            size="small"
          />
        </Box>

        {/* ===== パスワード ===== */}
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              mb: 0.5,
              color: "text.primary",
            }}
          >
            パスワード
          </Typography>

          <TextField
            placeholder="パスワードを入力する"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            fullWidth
            size="small"
          />
        </Box>

        {/* ===== チェックボックス ===== */}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
          }
          label={
            <Typography sx={{ fontSize: 13 }}>
              次回から自動でログイン
            </Typography>
          }
        />

        {/* ===== エラー表示 ===== */}
        <Collapse in={!!error} timeout={300}>
          <Typography
            role="alert"
            aria-live="polite"
            sx={{
              fontSize: 13,
              color: "error.main",
            }}
          >
            {error}
          </Typography>
        </Collapse>

        {/* ===== ログインボタン ===== */}

        <AppButton
          tone="secondaryBlack"
          type="submit"
          variant="contained"
          disabled={!canSubmit || loading}
          fullWidth
          sx={{
            width: "100%",
            fontWeight: 600,
          }}
        >
          {loading ? (
            <Stack direction="row" spacing={1} alignItems="center">
              <CircularProgress size={18} />
              <span>ログイン</span>
            </Stack>
          ) : (
            "ログイン"
          )}
        </AppButton>

        <Divider sx={{ my: 1 }}>または</Divider>

        {/* ===== Googleボタン ===== */}
        <Button
          variant="outlined"
          disabled
          fullWidth
          sx={{
            height: 48,
            opacity: 0.6,
            "&:hover": { opacity: 0.8 },
          }}
          onClick={async () => {
            await signIn("google", { callbackUrl: "/" });
          }}
        >
          Googleでログイン
        </Button>
      </Stack>
    </Box>
  );
}
