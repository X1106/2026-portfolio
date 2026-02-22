"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const drawerWidth = 280;

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (next: boolean) => () => setOpen(next);

  const pathname = usePathname();

  const ink = "#111";
  const activeColor = "#B026FF";
  const hoverColor = "#19C37D";

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const navLinkSx = (active: boolean) =>
    ({
      color: active ? activeColor : ink,
      textDecoration: "none",
      fontSize: 14,
      letterSpacing: 2,
      fontWeight: 500,
      transition: "color 120ms ease",
      "&:hover": { color: hoverColor },
      "&:focus-visible": {
        outline: `2px solid ${hoverColor}`,
        outlineOffset: 3,
        borderRadius: 6,
      },
    } as const);

  const drawerLinkSx = (active: boolean) =>
    ({
      color: active ? activeColor : ink,
      "& .MuiListItemText-primary": {
        color: active ? activeColor : ink,
        letterSpacing: 2,
        fontWeight: 600,
      },
      transition: "color 120ms ease",
      "&:hover": {
        color: hoverColor,
        "& .MuiListItemText-primary": { color: hoverColor },
      },
    } as const);

  const drawer = (
    <Box sx={{ width: drawerWidth, p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ fontWeight: 600, letterSpacing: 2 }}>MENU</Typography>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/"
            onClick={toggleDrawer(false)}
            sx={drawerLinkSx(isActive("/"))}
          >
            <ListItemText primary="HOME" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/news"
            onClick={toggleDrawer(false)}
            sx={drawerLinkSx(isActive("/news"))}
          >
            <ListItemText primary="NEWS" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/contact"
            onClick={toggleDrawer(false)}
            sx={drawerLinkSx(isActive("/contact"))}
          >
            <ListItemText primary="CONTACT" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      <Button
        fullWidth
        variant="outlined"
        onClick={() => signOut({ callbackUrl: "/login" })}
        sx={{
          borderColor: "rgba(0,0,0,0.3)",
          color: ink,
        }}
      >
        ログアウト
      </Button>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        px: { xs: 2, sm: 3 },
        pt: 1.5,
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: 80 }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 1000,
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 0, sm: 4 }, // ✅ SPは余白を減らす（お好みで）
            py: 1.4,
            borderRadius: 999,

            // ✅ SPは横長ぼかしをやめる（透明）
            backgroundColor: {
              xs: "transparent",
              sm: "rgba(255,255,255,0.45)",
            },
            backdropFilter: { xs: "none", sm: "blur(8px)" },
            WebkitBackdropFilter: { xs: "none", sm: "blur(8px)" },
            border: { xs: "none", sm: "1px solid rgba(0,0,0,0.08)" },
            boxShadow: { xs: "none", sm: "0 8px 30px rgba(0,0,0,0.06)" },
          }}
        >
          {/* ✅ SPではPORTFOLIOを消す */}
          <Typography
            component={Link}
            href="/"
            sx={{
              display: { xs: "none", sm: "inline-flex" }, // ←ここがポイント
              color: ink,
              textDecoration: "none",
              fontWeight: 500,
              letterSpacing: 2,
              fontSize: 14,
            }}
          >
            PORTFOLIO
          </Typography>

          {/* PCナビ */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box component={Link} href="/" sx={navLinkSx(isActive("/"))}>
              HOME
            </Box>
            <Box
              component={Link}
              href="/news"
              sx={navLinkSx(isActive("/news"))}
            >
              NEWS
            </Box>
            <Box
              component={Link}
              href="/contact"
              sx={navLinkSx(isActive("/contact"))}
            >
              CONTACT
            </Box>

            <IconButton
              component="a"
              target="_blank"
              href="https://www.figma.com/design/wzsR5gc7lKBqaoxB1aUkML/Untitled?node-id=0-1&t=lYliMifxSHnwcPRD-1"
              sx={{ p: 0 }}
            >
              <Box
                component="img"
                src="/icons/figm.svg"
                alt="icon1"
                sx={{ width: 20, height: 20 }}
              />
            </IconButton>

            <IconButton
              component="a"
              target="_blank"
              href="https://github.com/X1106/2026-portfolio"
              sx={{ p: 0 }}
            >
              <Box
                component="img"
                src="/icons/git.svg"
                alt="icon2"
                sx={{ width: 20, height: 20 }}
              />
            </IconButton>
          </Box>

          {/* ✅ SP ハンバーガー：後ろだけ丸いぼかし */}
          <Box
            sx={{
              display: { xs: "inline-flex", sm: "none" },
              ml: "auto",
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.45)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
              p: 1.5,
            }}
          >
            <IconButton sx={{ color: ink, p: 1 }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
