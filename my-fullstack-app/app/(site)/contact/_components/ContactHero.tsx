"use client";

import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { typographyPresets } from "@/theme/typography";
export default function ContactHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const theme = useTheme();
  const isPc = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ mb: { xs: 5, md: 6 }, maxWidth: "600px" }}>
      <Typography
        sx={{
          ...(isPc
            ? typographyPresets.contact.pc.h2
            : typographyPresets.contact.sp.h2),
          mb: { xs: 0, sm: 0 },
        }}
      >
        {title}
      </Typography>

      <Box
        aria-hidden
        sx={{
          mt: 1,
          mb: { xs: 2, sm: 3 },
          width: { xs: 180, md: 280 },
          height: 2,
          background: "linear-gradient(90deg, #e0c200, #5a50ff)",
        }}
      />

      <Typography
        sx={{
          ...(isPc
            ? typographyPresets.contact.pc.body2
            : typographyPresets.contact.sp.body2),
          mb: { xs: 0, sm: 0 },
          whiteSpace: "pre-line",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
