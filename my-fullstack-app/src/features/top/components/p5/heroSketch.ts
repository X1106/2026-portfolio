// src/features/top/components/p5/heroSketch.ts
import type p5 from "p5";

export type SketchOptions = {
  backgroundAlpha?: number; // 残像の強さ
};

export const createHeroSketch =
  (opts: SketchOptions = {}) =>
  (p: p5) => {
    const backgroundAlpha = opts.backgroundAlpha ?? 25;

    p.setup = () => {
      // 親要素にフィットさせたいなら createCanvas(width,height) を後で resizeCanvas で調整
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
      p.background(0);
      p.noStroke();
    };

    p.draw = () => {
      // うっすら黒で塗って残像
      p.background(0, backgroundAlpha);

      // サンプル：ドットを適当に流す
      p.fill(255, 200);
      for (let i = 0; i < 40; i++) {
        const x = p.random(p.width);
        const y = p.random(p.height);
        const r = p.random(1, 3);
        p.circle(x, y, r);
      }

      // マウス付近に軽く反応（不要なら消してOK）
      p.fill(255, 80);
      p.circle(p.mouseX, p.mouseY, 24);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };
