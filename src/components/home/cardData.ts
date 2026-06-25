import * as THREE from 'three';

import Develop from '@/constants/development/development.json';

import { rand } from './shapes';

export type CardDatum = {
  no: string;
  title: string;
  tag: string;
  smoke: [string, string, string];
  href?: string;
};

const SMOKE_PALETTES: [string, string, string][] = [
  ['#3a7bff', '#28e0c8', '#7a4dff'],
  ['#22d39a', '#1f8fff', '#b9ff5e'],
  ['#a04dff', '#ff4d9e', '#4dc8ff'],
  ['#ffb84d', '#ff5e5e', '#ffe08a'],
  ['#ff5fa8', '#ff9e5e', '#c44dff'],
  ['#5ee0ff', '#4d7bff', '#b08aff'],
];

const CARD_TITLES: Record<string, string> = {
  塗り絵メーカー: 'COLORING\nMAKER',
  'my クイズ': 'MY QUIZ',
  GeoTask: 'GEOTASK',
  ウェザリス: 'WEATHERIS',
  メモリス: 'MEMORIS',
  'my-switchbot-controller': 'SWITCHBOT\nCONTROLLER',
};

/** ヘリックスカード用データ — development.json の各プロジェクトから生成 */
export const CARD_DATA: CardDatum[] = Develop.map((item, i) => ({
  no: `W-${String(i + 1).padStart(2, '0')}`,
  title: CARD_TITLES[item.name] ?? item.name,
  tag: item.technology.slice(0, 2).join(' / ').toUpperCase(),
  smoke: SMOKE_PALETTES[i % SMOKE_PALETTES.length],
  href: Object.values(item.stores)[0],
}));

/** CanvasTexture — カラフルなスモーク質感のプロジェクトカード */
export function makeCardTexture(d: CardDatum): THREE.CanvasTexture {
  const w = 768,
    h = 480,
    r = 40;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const x = c.getContext('2d')!;

  const round = () => {
    x.beginPath();
    x.moveTo(r, 0);
    x.arcTo(w, 0, w, h, r);
    x.arcTo(w, h, 0, h, r);
    x.arcTo(0, h, 0, 0, r);
    x.arcTo(0, 0, w, 0, r);
    x.closePath();
  };

  round();
  x.fillStyle = 'rgba(10,12,22,0.94)';
  x.fill();
  x.save();
  round();
  x.clip();

  x.globalCompositeOperation = 'lighter';
  for (let k = 0; k < 46; k++) {
    const hx = rand(-60, w + 60),
      hy = rand(-60, h + 60);
    const rr = rand(50, 230);
    const col = d.smoke[(Math.random() * d.smoke.length) | 0];
    const gr = x.createRadialGradient(hx, hy, 0, hx, hy, rr);
    gr.addColorStop(0, col + Math.floor(rand(22, 58)).toString(16).padStart(2, '0'));
    gr.addColorStop(1, col + '00');
    x.fillStyle = gr;
    x.beginPath();
    x.arc(hx, hy, rr, 0, Math.PI * 2);
    x.fill();
  }
  for (let k = 0; k < 1400; k++) {
    x.fillStyle = 'rgba(255,255,255,' + rand(0.015, 0.07).toFixed(3) + ')';
    x.fillRect(rand(0, w), rand(0, h), 1.4, 1.4);
  }
  x.globalCompositeOperation = 'source-over';

  const vg = x.createRadialGradient(w / 2, h / 2, 40, w / 2, h / 2, 320);
  vg.addColorStop(0, 'rgba(5,6,12,0.42)');
  vg.addColorStop(1, 'rgba(5,6,12,0)');
  x.fillStyle = vg;
  x.fillRect(0, 0, w, h);
  x.restore();

  x.strokeStyle = 'rgba(238,241,247,0.30)';
  x.lineWidth = 2;
  round();
  x.stroke();

  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const lines = d.title.split('\n');
  x.font = '700 54px "JetBrains Mono", Menlo, Consolas, monospace';
  lines.forEach((line, i) => {
    const ly = h / 2 + (i - (lines.length - 1) / 2) * 64;
    x.fillStyle = 'rgba(120,220,255,0.5)';
    x.fillText(line, w / 2 + 3, ly + 2);
    x.fillStyle = 'rgba(255,120,200,0.4)';
    x.fillText(line, w / 2 - 3, ly - 1);
    x.fillStyle = 'rgba(240,246,255,0.96)';
    x.fillText(line, w / 2, ly);
  });

  x.textAlign = 'left';
  x.textBaseline = 'alphabetic';
  x.fillStyle = 'rgba(238,241,247,0.55)';
  x.font = '500 20px "JetBrains Mono", Menlo, monospace';
  x.fillText(d.no, 34, 48);
  x.textAlign = 'right';
  x.fillText(d.tag, w - 34, h - 34);
  x.textAlign = 'left';

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}
