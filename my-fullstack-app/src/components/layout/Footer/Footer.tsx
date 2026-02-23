"use client";

import { Box, Typography, useTheme } from "@mui/material";

export default function Footer() {
  const theme = useTheme();

  const textColor = theme.palette.mode === "dark" ? "white" : "black";

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        textAlign: "center",
        backgroundColor: "transparent",
        color: textColor,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} My Site. All rights reserved.
      </Typography>
    </Box>
  );
}
