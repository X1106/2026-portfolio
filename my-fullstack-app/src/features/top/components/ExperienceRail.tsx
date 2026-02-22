"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import AboutSection from "./panels/DesignPanel";
import MuiLayoutSample from "./panels/AboutPanel";
import HeroSection from "./panels/HeroPanel";
import EngineeringSection from "./panels/EngineeringPanel";

const MotionBox = motion(Box);
const MotionDiv = motion("div");

const SECTIONS = 5;
const SNAP_BLOCKS = SECTIONS * 1.5;

export default function ExperienceRail() {
  const containerRef = React.useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const [cw, setCw] = React.useState(0);
  const [ch, setCh] = React.useState(0);

  React.useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      setCw(doc.clientWidth);
      setCh(doc.clientHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        bgcolor: "#111",
        scrollSnapType: "y mandatory",
        height: `${SNAP_BLOCKS * 100}vh`,
      }}
    >
      {Array.from({ length: SNAP_BLOCKS }).map((_, i) => (
        <Box
          key={i}
          sx={{
            height: "100vh",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        />
      ))}

      <Box sx={{ height: "100vh" }} />

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <OverlapPanels
          cw={cw}
          reduceMotion={reduceMotion ?? false}
          scrollYProgress={scrollYProgress}
        />
      </Box>
    </Box>
  );
}

function OverlapPanels({
  cw,
  reduceMotion,
  scrollYProgress,
}: {
  cw: number;
  reduceMotion: boolean;
  scrollYProgress: any;
}) {
  const w = cw || 1;

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <PaperSlide
        index={0}
        total={SECTIONS}
        reduceMotion={reduceMotion}
        scrollYProgress={scrollYProgress}
      >
        <HeroSection />
      </PaperSlide>

      <PaperSlide
        index={1}
        total={SECTIONS}
        reduceMotion={reduceMotion}
        scrollYProgress={scrollYProgress}
      >
        <MuiLayoutSample />
      </PaperSlide>

      <PaperSlide
        index={2}
        total={SECTIONS}
        reduceMotion={reduceMotion}
        scrollYProgress={scrollYProgress}
      >
        <AboutSection />
      </PaperSlide>

      <PaperSlide
        index={3}
        total={SECTIONS}
        reduceMotion={reduceMotion}
        scrollYProgress={scrollYProgress}
      >
        <EngineeringSection />
      </PaperSlide>
    </Box>
  );
}

function PaperSlide({
  index,
  total,
  reduceMotion,
  scrollYProgress,
  children,
}: {
  index: number;
  total: number;
  reduceMotion: boolean;
  scrollYProgress: any;
  children: React.ReactNode;
}) {
  const step = 1 / total;
  const start = step * index;
  const end = start + step;
  const inEnd = start + step * 0.22;

  const isFirst = index === 0;

  const xRaw = useTransform(
    scrollYProgress,
    [start, inEnd, end],
    reduceMotion
      ? ["0%", "0%", "0%"]
      : isFirst
      ? ["0%", "0%", "0%"]
      : ["100%", "0%", "0%"]
  );

  const x = useSpring(xRaw, { stiffness: 55, damping: 18, mass: 1.6 });

  return (
    <MotionBox
      style={{ x }}
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: index,
        willChange: "transform",
      }}
    >
      {/* ✅ 影なし */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </MotionBox>
  );
}

function PanelBasic({
  label,
  color,
  widthPx,
}: {
  label: string;
  color: string;
  widthPx: number;
}) {
  return (
    <Box
      sx={{
        width: widthPx ? `${widthPx}px` : "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: color,
      }}
    >
      <Typography variant="h2" sx={{ color: "#fff", fontWeight: "bold" }}>
        {label}
      </Typography>
    </Box>
  );
}
