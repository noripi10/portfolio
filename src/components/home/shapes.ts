export type ShapeData = { pos: Float32Array; col: Float32Array };

export const rand = (a: number, b: number) => a + Math.random() * (b - a);
export const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

export const alloc = (count: number): ShapeData => ({
  pos: new Float32Array(count * 3),
  col: new Float32Array(count * 3),
});

export const set = (o: ShapeData, i: number, x: number, y: number, z: number, r: number, g: number, b: number) => {
  o.pos[i * 3] = x;
  o.pos[i * 3 + 1] = y;
  o.pos[i * 3 + 2] = z;
  o.col[i * 3] = r;
  o.col[i * 3 + 1] = g;
  o.col[i * 3 + 2] = b;
};

export const shapeRing = (count: number): ShapeData => {
  const o = alloc(count);
  const R = 1.35;
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    if (u < 0.74) {
      const th = rand(0, Math.PI * 2);
      const streak = Math.pow(Math.random(), 2.2) * 0.85;
      const tilt = rand(-0.5, 0.5);
      const bx = Math.cos(th) * R,
        by = Math.sin(th) * R;
      const tx = -Math.sin(th),
        ty = Math.cos(th);
      const nx = Math.cos(th),
        ny = Math.sin(th);
      const mixv = rand(0.55, 1.0);
      const x = bx + (tx * mixv + nx * (1 - mixv)) * streak + gauss() * 0.05;
      const y = by + (ty * mixv + ny * (1 - mixv)) * streak + gauss() * 0.05;
      const z = gauss() * 0.22 + Math.sin(th * 2) * 0.18 * tilt;
      const c = Math.random();
      if (c < 0.62) set(o, i, x, y, z, 0.85, 0.78, 0.66);
      else if (c < 0.88) set(o, i, x, y, z, 0.85, 0.58, 0.3);
      else set(o, i, x, y, z, 0.85, 0.28, 0.18);
    } else if (u < 0.84) {
      const r = Math.pow(Math.random(), 1.6) * 0.42;
      const th = rand(0, Math.PI * 2);
      set(o, i, Math.cos(th) * r, Math.sin(th) * r, gauss() * 0.12, 0.62, 0.7, 0.8);
    } else {
      set(o, i, gauss() * 2.8, gauss() * 2.4, gauss() * 1.6, 0.6, 0.5, 0.34);
    }
  }
  return o;
};

export const shapeNebula = (count: number): ShapeData => {
  const o = alloc(count);
  const palette = [
    [0.78, 0.32, 0.56],
    [0.24, 0.64, 0.78],
    [0.48, 0.32, 0.8],
    [0.3, 0.76, 0.52],
    [0.3, 0.42, 0.8],
    [0.8, 0.54, 0.34],
  ];
  const centers = [];
  for (let k = 0; k < 6; k++) {
    centers.push({
      x: rand(-1.7, 1.7),
      y: rand(-1.0, 1.0),
      z: rand(-0.8, 0.8),
      s: rand(0.35, 0.7),
      c: palette[k],
    });
  }
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.9) {
      const c = centers[(Math.random() * centers.length) | 0];
      const f = rand(0.55, 1.0);
      set(
        o,
        i,
        c.x + gauss() * c.s,
        c.y + gauss() * c.s * 0.8,
        c.z + gauss() * c.s,
        c.c[0] * f,
        c.c[1] * f,
        c.c[2] * f
      );
    } else {
      set(o, i, gauss() * 3.0, gauss() * 2.2, gauss() * 1.8, 0.5, 0.55, 0.7);
    }
  }
  return o;
};

export const shapeText = (count: number, text: string): ShapeData => {
  const o = alloc(count);
  const cw = 900,
    ch = 240;
  const c2 = document.createElement('canvas');
  c2.width = cw;
  c2.height = ch;
  const ctx = c2.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.font = '800 170px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cw / 2, ch / 2 + 6);
  const data = ctx.getImageData(0, 0, cw, ch).data;
  const pts: [number, number][] = [];
  for (let y = 0; y < ch; y += 2)
    for (let x = 0; x < cw; x += 2) if (data[(y * cw + x) * 4 + 3] > 128) pts.push([x, y]);
  const SCALE = 3.8 / cw;
  for (let i = 0; i < count; i++) {
    if (pts.length && Math.random() < 0.88) {
      const p = pts[(Math.random() * pts.length) | 0];
      const x = (p[0] - cw / 2) * SCALE + gauss() * 0.012;
      const y = -(p[1] - ch / 2) * SCALE + gauss() * 0.012 + 1.1;
      const z = gauss() * 0.16 - 0.6;
      const t = (y - 1.1 + 0.45) / 0.9;
      set(o, i, x, y, z, 0.36 + 0.18 * (1 - t), 0.34 + 0.28 * t, 0.8);
    } else {
      set(o, i, gauss() * 2.8, gauss() * 2.0, gauss() * 1.6, 0.36, 0.4, 0.72);
    }
  }
  return o;
};

export const shapeCanopy = (count: number): ShapeData => {
  const o = alloc(count);
  for (let i = 0; i < count; i++) {
    const x0 = rand(-1.8, 1.8);
    const topY = 1.25 - 0.18 * x0 * x0 + Math.sin(x0 * 3.1) * 0.12;
    const u = Math.random();
    if (u < 0.68) {
      const y = topY - Math.pow(Math.random(), 2.4) * 0.55;
      const glow = Math.max(0, 1 - (topY - y) * 1.6);
      set(
        o,
        i,
        x0 + gauss() * 0.1,
        y,
        gauss() * 0.45,
        (0.42 + 0.22 * glow) * 0.9,
        0.62 + 0.16 * glow,
        0.24 + 0.2 * (1 - glow)
      );
    } else if (u < 0.92) {
      const drop = Math.pow(Math.random(), 1.4) * 2.4;
      const fade = Math.max(0.22, 1 - drop * 0.45);
      set(o, i, x0 + gauss() * 0.025, topY - 0.3 - drop, gauss() * 0.3, 0.32 * fade, 0.62 * fade, 0.55 * fade);
    } else {
      set(o, i, gauss() * 2.6, rand(-2.0, 1.5), gauss() * 1.5, 0.36, 0.6, 0.54);
    }
  }
  return o;
};

export const shapeSphere = (count: number): ShapeData => {
  const o = alloc(count);
  const R = 0.95;
  const GA = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    if (Math.random() < 0.86) {
      const k = (Math.random() * count) | 0;
      const y = 1 - (k / (count - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = GA * k;
      const j = 1 + gauss() * 0.02;
      const c = Math.random() < 0.93 ? [0.6, 0.66, 0.78] : [0.8, 0.62, 0.34];
      set(o, i, Math.cos(th) * rad * R * j, y * R * j, Math.sin(th) * rad * R * j, c[0], c[1], c[2]);
    } else {
      const th = rand(0, Math.PI * 2);
      const rr = rand(1.4, 2.6);
      set(o, i, Math.cos(th) * rr, gauss() * 0.25, Math.sin(th) * rr, 0.42, 0.52, 0.72);
    }
  }
  return o;
};
