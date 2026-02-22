import type p5 from "p5";

type Pixel = { x: number; y: number; color: p5.Color };

export type IconPixelSketchOptions = {
  pixelSize?: number;
  revealEvery?: number;
  waitFrames?: number;
  bg?: number;

  // ✅ 親要素サイズ取得（IconpixelBackground.tsx 側から渡す）
  getSize: () => { w: number; h: number };
};

export const createIconPixelSketch =
  (opts: IconPixelSketchOptions) => (p: p5) => {
    let pixelSize = opts.pixelSize ?? 40;
    const revealEvery = Math.max(1, opts.revealEvery ?? 2);
    const waitFrames = opts.waitFrames ?? 150;
    const bg = opts.bg ?? 15;

    let currentState = 0;
    let pixelsToDraw: Pixel[] = [];
    let drawnPixels: Pixel[] = [];
    let nextStateTimer = 0;

    const icons = [
      [
        "    W   ",
        "   WBW  ",
        "  WRRW  ",
        " WBRRBW ",
        "WBBBBBBW",
        "WRR  RRW",
        "WFF  FFW",
      ],
      [
        "  GGGBB ",
        " GGGGBB ",
        "GGGBBBBB",
        "GYBBBBBB",
        "YBBBBGGG",
        " YBBGGG ",
        "  BBGGG ",
      ],
      [
        "   A    ",
        "  AAA   ",
        " HHHH   ",
        "HHHHHH  ",
        "HEHEHH  ",
        "HHHHHH  ",
        " HHHH   ",
      ],
    ] as const;

    const colorFromChar = (c: string): p5.Color | null => {
      if (c === "W") return p.color(255);
      if (c === "R") return p.color(200);
      if (c === "B") return p.color(160);
      if (c === "F") return p.color(100);
      if (c === "G") return p.color(180);
      if (c === "Y") return p.color(220);
      if (c === "H") return p.color(210);
      if (c === "E") return p.color(20);
      if (c === "A") return p.color(130);
      return null;
    };

    const loadIcon = (index: number) => {
      pixelsToDraw = [];
      drawnPixels = [];
      nextStateTimer = 0;

      const data = icons[index];

      for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
          const ch = data[y][x];
          if (ch === " ") continue;

          const col = colorFromChar(ch);
          if (!col) continue;

          pixelsToDraw.push({ x, y, color: col });
        }
      }

      p.shuffle(pixelsToDraw, true);
    };

    const nextIcon = () => {
      currentState = (currentState + 1) % icons.length;
      loadIcon(currentState);
    };

    p.setup = () => {
      const { w, h } = opts.getSize();
      p.createCanvas(w, h); // ✅ windowではなく親サイズ
      p.noStroke();
      loadIcon(0);
    };

    p.draw = () => {
      p.background(bg);

      const gridW = icons[currentState][0].length * pixelSize;
      const gridH = icons[currentState].length * pixelSize;

      // ✅ translate累積防止
      p.push();
      p.translate(p.width / 2 - gridW / 2, p.height / 2 - gridH / 2);

      if (p.frameCount % revealEvery === 0 && pixelsToDraw.length > 0) {
        const next = pixelsToDraw.shift();
        if (next) drawnPixels.push(next);
      }

      for (const px of drawnPixels) {
        const s = pixelSize * 0.85;
        p.fill(px.color);
        p.rect(px.x * pixelSize, px.y * pixelSize, s, s, 8);

        p.fill(255, 40);
        p.rect(px.x * pixelSize, px.y * pixelSize, s * 0.4, s * 0.2, 4);
      }

      p.pop();

      if (pixelsToDraw.length === 0) {
        nextStateTimer++;
        if (nextStateTimer > waitFrames) nextIcon();
      }
    };

    p.mousePressed = () => nextIcon();

    // ✅ 親サイズが変わったら追従（呼び出し側のResizeObserverで呼ぶ）
    (p as any)._fitToParent = () => {
      const { w, h } = opts.getSize();
      p.resizeCanvas(w, h);
    };
  };
