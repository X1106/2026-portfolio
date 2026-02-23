"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";

export default function HeroBackground() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hostRef.current) return;

    const sketch = (p: p5) => {
      // ===== 元コードの変数 =====
      let fontSize = 20;
      let drops: number[] = [];

      const setupDrops = () => {
        const columns = Math.floor(p.width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
          drops[i] = p.random(-100, 0);
        }
      };

      // ===== setup =====
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.frameRate(30);
        p.noStroke();
        p.background(255);
        setupDrops();
      };

      // ===== draw =====
      p.draw = () => {
        // 残像（白を薄く重ねる）
        p.fill(255, 20);
        p.rect(0, 0, p.width, p.height);

        // ドット描画
        p.fill(150, 100);

        for (let i = 0; i < drops.length; i++) {
          const x = i * fontSize + fontSize / 2;
          const y = drops[i] * fontSize;

          p.circle(x, y, fontSize * 0.4);

          // ゆっくり落下
          drops[i] += 0.4;

          // 下まで行ったら確率でリセット
          if (y > p.height && p.random() > 0.98) {
            drops[i] = 0;
          }
        }
      };

      // ===== リサイズ対応 =====
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.background(255);
        setupDrops();
      };
    };

    // p5 インスタンス生成
    const instance = new p5(sketch, hostRef.current);

    return () => {
      instance.remove();
    };
  }, []);

  return <div ref={hostRef} />;
}
