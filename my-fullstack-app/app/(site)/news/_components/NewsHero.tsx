// app/(site)/news/_components/NewsHero.tsx
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { typographyPresets } from "@/theme/typography";
export default function NewsHero() {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box sx={{ mt: "auto" }}>
      <Typography
        sx={{
          ...(isPc
            ? typographyPresets.news.pc.h2
            : typographyPresets.news.sp.h2),
          mb: { xs: 1, sm: 1 },
        }}
      >
        NEWS
      </Typography>

      <Box
        sx={{
          mb: 2,
          height: 3,
          width: 200,
          maxWidth: "80%",
          borderRadius: 999,
          background: "linear-gradient(90deg, #f1c21b 0%, #5b2eff 100%)",
        }}
      />

      <Typography
        sx={{
          ...(isPc
            ? typographyPresets.news.pc.body2
            : typographyPresets.news.sp.body2),
          mb: { xs: 1, sm: 0 },
          pr: { xs: 0, sm: 4 },
        }}
      >
        最新の活動状況や、日々の研鑽をブログ形式で発信しております。技術や知識の共有と共に、皆様のお役に立てる情報を丁寧にお届けしますので、ぜひご一読ください。
      </Typography>
    </Box>
  );
}
