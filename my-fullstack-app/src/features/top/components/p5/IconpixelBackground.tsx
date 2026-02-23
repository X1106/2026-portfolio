"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import p5 from "p5";
import { createIconPixelSketch } from "./IconPixelSketch";

type Props = {
  pixelSize?: number;

  pixelSizePc?: number;
  pixelSizeSp?: number;
  pcMinWidth?: number;

  revealEvery?: number;
  waitFrames?: number;
  bg?: number;
};

export default function IconPixelBackground({
  pixelSize = 28,
  pixelSizePc,
  pixelSizeSp,
  pcMinWidth = 900,

  revealEvery = 2,
  waitFrames = 150,
  bg = 15,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<p5 | null>(null);

  const [isPc, setIsPc] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width:${pcMinWidth}px)`);
    const onChange = () => setIsPc(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [pcMinWidth]);

  const effectivePixelSize = useMemo(() => {
    if (pixelSizePc == null && pixelSizeSp == null) return pixelSize;
    return isPc ? pixelSizePc ?? pixelSize : pixelSizeSp ?? pixelSize;
  }, [isPc, pixelSize, pixelSizePc, pixelSizeSp]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const getSize = () => {
      // clientWidth/Height の方が “0になりにくい” ので優先
      const w = Math.max(
        1,
        Math.floor(host.clientWidth || host.getBoundingClientRect().width)
      );
      const h = Math.max(
        1,
        Math.floor(host.clientHeight || host.getBoundingClientRect().height)
      );
      return { w, h };
    };

    if (instanceRef.current) {
      instanceRef.current.remove();
      instanceRef.current = null;
    }

    let raf = 0;

    const mount = () => {
      const instance = new p5(
        createIconPixelSketch({
          pixelSize: effectivePixelSize,
          revealEvery,
          waitFrames,
          bg,
          getSize,
        }),
        host
      );

      instanceRef.current = instance;

      const fitToParent = () => {
        const inst = instanceRef.current;
        if (!inst) return;

        const { w, h } = getSize();
        // p5のrendererができていればresizeCanvasできる
        const anyInst: any = inst as any;

        if (anyInst?._fitToParent) {
          // 既存スケッチ側の専用フィットがあるならそれを優先
          anyInst._fitToParent();
        } else if (anyInst?._renderer) {
          inst.resizeCanvas(w, h);
        }

        // canvasのCSSフィット（念のため）
        const canvas = host.querySelector("canvas") as HTMLCanvasElement | null;
        if (canvas) {
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          canvas.style.display = "block";
        }
      };

      // 初回フィット（重要）
      fitToParent();

      const ro = new ResizeObserver(() => fitToParent());
      ro.observe(host);

      // window resize にも追従
      const onWinResize = () => fitToParent();
      window.addEventListener("resize", onWinResize);

      // cleanup
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", onWinResize);
        instRemove();
      };

      function instRemove() {
        const inst = instanceRef.current;
        if (inst) {
          inst.remove();
          instanceRef.current = null;
        }
      }
    };

    let cleanup: undefined | (() => void);

    raf = window.requestAnimationFrame(() => {
      cleanup = mount();
    });

    return () => {
      window.cancelAnimationFrame(raf);
      cleanup?.();
    };
  }, [effectivePixelSize, revealEvery, waitFrames, bg]);

  return (
    <div
      ref={hostRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
