import * as THREE from "three";
import type { CoverSpec } from "@/types";

/**
 * 用 Canvas 程序化生成专辑封面纹理（与 CoverArt 组件同一视觉语言），
 * 供 3D 场景中的专辑展示装置使用，不依赖任何外部图片资源。
 */
export function createCoverTexture(
  cover: CoverSpec,
  title: string,
  artistName: string
): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // 底：对角渐变
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, cover.from);
  grad.addColorStop(1, cover.to);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  // 中心氛围光
  const halo = ctx.createRadialGradient(
    size / 2,
    size * 0.4,
    0,
    size / 2,
    size * 0.4,
    size * 0.7
  );
  halo.addColorStop(0, `${cover.accent}44`);
  halo.addColorStop(1, "transparent");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = cover.accent;
  ctx.fillStyle = cover.accent;

  switch (cover.pattern) {
    case "rings":
      ctx.globalAlpha = 0.5;
      [52, 102, 152, 202].forEach((r) => {
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(size / 2, size * 0.45, r, 0, Math.PI * 2);
        ctx.stroke();
      });
      break;
    case "bars":
      ctx.globalAlpha = 0.35;
      for (let i = 0; i < 7; i++) {
        ctx.save();
        ctx.translate(40 + i * 64, 0);
        ctx.transform(1, 0, -0.21, 1, 0, 0);
        ctx.fillRect(0, -40, 18, size + 80);
        ctx.restore();
      }
      break;
    case "grid":
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;
      for (let i = 1; i < 12; i++) {
        const p = (size / 12) * i;
        ctx.beginPath();
        ctx.moveTo(p, 0);
        ctx.lineTo(p, size);
        ctx.moveTo(0, p);
        ctx.lineTo(size, p);
        ctx.stroke();
      }
      break;
    case "slash":
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(-50, size + 50);
      ctx.lineTo(size + 50, -50);
      ctx.stroke();
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-50, size - 10);
      ctx.lineTo(size - 10, -50);
      ctx.moveTo(40, size + 50);
      ctx.lineTo(size + 50, 40);
      ctx.stroke();
      break;
    case "halo":
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(size / 2, size * 0.45, 190, 58, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.ellipse(size / 2, size * 0.45, 140, 38, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.arc(size / 2, size * 0.45, 44, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "noise":
      ctx.globalAlpha = 0.5;
      for (let i = 0; i < 90; i++) {
        const x = (i * 97) % size;
        const y = (i * 61) % size;
        const s = 2 + ((i * 13) % 6);
        ctx.fillRect(x, y, s, s);
      }
      break;
  }
  ctx.globalAlpha = 1;

  // 标题自动换行
  ctx.font = "900 34px 'Arial Black', Arial, sans-serif";
  const words = title.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > size - 56 && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  lines.push(line);

  // 文字排版（从底部向上排列）
  ctx.fillStyle = "rgba(232,228,220,0.65)";
  ctx.font = "600 20px 'Courier New', monospace";
  const artist = artistName;
  ctx.fillText(artist.slice(0, 34), 28, size - 40 - (Math.min(lines.length, 3) - 1) * 40 - 24);
  ctx.fillStyle = "#E8E4DC";
  ctx.font = "900 34px 'Arial Black', Arial, sans-serif";
  lines.slice(0, 3).forEach((l, i, arr) => {
    ctx.fillText(l, 28, size - 40 - (arr.length - 1 - i) * 40);
  });

  // 暗角
  const vig = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.3,
    size / 2,
    size / 2,
    size * 0.75
  );
  vig.addColorStop(0, "transparent");
  vig.addColorStop(1, "rgba(5,5,5,0.55)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
