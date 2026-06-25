import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { CARD_DATA, makeCardTexture } from './cardData';
import { gauss, rand, shapeCanopy, shapeNebula, shapeRing, shapeSphere, shapeText } from './shapes';

const SEGMENTS = 4;

/**
 * particle-portfolio_3.html の three.js シーンを React 向けに移植したフック。
 * canvas / セクション(panel) の DOM ノードを ref で受け取り、
 * スクロール位置に応じてパーティクル形状モーフィング・ヘリックスカード・
 * パネルの opacity/transform を直接スタイル更新する。
 */
export function useHomeScene(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  scrollRef: React.RefObject<HTMLDivElement | null>,
  panelsRef: React.RefObject<(HTMLElement | null)[]>,
  onSectionChange: (index: number) => void
) {
  const goToRef = useRef<(i: number) => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const scrollEl = scrollRef.current;
    if (!canvas || !scrollEl) return;

    const isMobile = matchMedia('(pointer: coarse)').matches || innerWidth < 768;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const COUNT = isMobile ? 5000 : 14000;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setSize(innerWidth, innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 60);
    camera.position.set(0, 0.2, 6.4);
    camera.lookAt(0, 0, 0);

    const BG = [
      new THREE.Color('#05060d'),
      new THREE.Color('#0b0716'),
      new THREE.Color('#070a18'),
      new THREE.Color('#030f0d'),
      new THREE.Color('#040408'),
    ];

    /* ============================================================
       パーティクル ジオメトリ + シェーダー
    ============================================================ */
    const shapes = [
      shapeRing(COUNT),
      shapeNebula(COUNT),
      shapeText(COUNT, 'WORKS'),
      shapeCanopy(COUNT),
      shapeSphere(COUNT),
    ];

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(shapes[0].pos, 3));
    for (let s = 1; s <= 4; s++) geo.setAttribute('pos' + s, new THREE.BufferAttribute(shapes[s].pos, 3));
    for (let s = 0; s <= 4; s++) geo.setAttribute('col' + s, new THREE.BufferAttribute(shapes[s].col, 3));

    const randAttr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      randAttr[i * 3] = Math.random();
      randAttr[i * 3 + 1] = rand(0.6, 1.9) * (Math.random() < 0.04 ? 2.2 : 1);
      randAttr[i * 3 + 2] = Math.random();
    }
    geo.setAttribute('aRand', new THREE.BufferAttribute(randAttr, 3));

    const uniforms = {
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uRot: { value: 0 },
      uMouse: { value: new THREE.Vector3(99, 99, 0) },
      uMouseForce: { value: isMobile ? 0 : 1 },
      uMotion: { value: reduceMotion ? 0.18 : 1 },
      uPR: { value: Math.min(devicePixelRatio, 1.5) },
      uDim: { value: 0.5 },
    };

    const vert = `
      attribute vec3 pos1; attribute vec3 pos2; attribute vec3 pos3; attribute vec3 pos4;
      attribute vec3 col0; attribute vec3 col1; attribute vec3 col2; attribute vec3 col3; attribute vec3 col4;
      attribute vec3 aRand;
      uniform float uProgress, uTime, uRot, uMouseForce, uMotion, uPR;
      uniform vec3 uMouse;
      varying vec3 vColor;
      varying float vAlpha;

      void main(){
        float seg = clamp(uProgress, 0.0, 4.0);
        float idx = floor(min(seg, 3.999));
        float f   = seg - idx;

        vec3 a, b, ca, cb;
        if      (idx < 0.5){ a = position; b = pos1; ca = col0; cb = col1; }
        else if (idx < 1.5){ a = pos1;     b = pos2; ca = col1; cb = col2; }
        else if (idx < 2.5){ a = pos2;     b = pos3; ca = col2; cb = col3; }
        else               { a = pos3;     b = pos4; ca = col3; cb = col4; }

        float t = clamp((f - aRand.x * 0.3) / 0.7, 0.0, 1.0);
        t = t * t * (3.0 - 2.0 * t);

        vec3 p = mix(a, b, t);
        vColor = mix(ca, cb, t);

        float arc = sin(t * 3.14159265);
        p += vec3(
          sin(aRand.z * 6.2832 + t * 6.0),
          cos(aRand.z * 6.2832 + t * 5.0),
          sin(aRand.x * 6.2832 + t * 4.0)
        ) * arc * (0.22 + aRand.x * 0.5) * uMotion;

        p += 0.028 * uMotion * vec3(
          sin(uTime * (0.6 + aRand.z) + aRand.x * 40.0),
          cos(uTime * (0.5 + aRand.x) + aRand.z * 30.0),
          sin(uTime * 0.4 + aRand.y * 20.0)
        );

        float cR = cos(uRot), sR = sin(uRot);
        p = vec3(p.x * cR + p.z * sR, p.y, -p.x * sR + p.z * cR);

        vec2 diff = p.xy - uMouse.xy;
        float d = length(diff);
        p.xy += normalize(diff + 1e-4) * smoothstep(0.38, 0.0, d) * 0.2 * uMouseForce;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;

        float tw = 0.45 + 0.35 * sin(uTime * (1.0 + aRand.z * 3.0) + aRand.x * 50.0);
        vAlpha = tw;
        gl_PointSize = aRand.y * uPR * (165.0 / -mv.z);
      }
    `;

    const frag = `
      precision mediump float;
      uniform float uDim;
      varying vec3 vColor;
      varying float vAlpha;
      void main(){
        vec2 q = gl_PointCoord - 0.5;
        float d = length(q);
        if (d > 0.5) discard;
        float a = pow(smoothstep(0.5, 0.0, d), 2.2);
        gl_FragColor = vec4(vColor, a * vAlpha * uDim);
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    points.renderOrder = 0;
    scene.add(points);

    /* ============================================================
       ヘリックスカード
    ============================================================ */
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const AXIS_X = 0.55;
    const CARD_R = 1.35;
    const STEP_A = 1.85;
    const STEP_Y = 1.05;
    const TURN_K = 2.1;
    const N_CARDS = CARD_DATA.length;
    cardGroup.position.x = AXIS_X;

    const cardTextures: THREE.CanvasTexture[] = [];
    const cards = CARD_DATA.map((d, i) => {
      const tex = makeCardTexture(d);
      cardTextures.push(tex);
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.4, 1.5),
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
      );
      mesh.renderOrder = 2;
      cardGroup.add(mesh);
      return { mesh, i };
    });

    function updateCards(smooth: number, t: number) {
      const groupFade =
        Math.min(1, Math.max(0, (smooth - 0.45) * 2.2)) * Math.min(1, Math.max(0, (3.75 - smooth) * 2.2));

      for (const c of cards) {
        let u = c.i - (smooth - 0.9) * TURN_K;
        u = ((u % N_CARDS) + N_CARDS) % N_CARDS;
        if (u > N_CARDS / 2) u -= N_CARDS;

        const th = Math.PI / 2 + u * STEP_A + (reduceMotion ? 0 : Math.sin(t * 0.2) * 0.03);
        const y = u * STEP_Y;

        c.mesh.position.set(
          Math.cos(th) * CARD_R,
          y + Math.sin(t * 0.7 + c.i * 2.1) * 0.035 * (reduceMotion ? 0 : 1),
          Math.sin(th) * CARD_R
        );

        c.mesh.rotation.set(-0.05 + u * 0.16, Math.PI / 2 - th, u * 0.07);

        const facing = Math.max(0, Math.sin(th));
        const s = 0.85 + 0.3 * facing;
        c.mesh.scale.set(s, s, 1);

        const edgeFade = Math.max(0, 1 - Math.pow(Math.abs(u) / (N_CARDS / 2 - 0.15), 4));
        const opacity = (0.22 + 0.78 * Math.pow(facing, 1.4)) * edgeFade * groupFade;
        (c.mesh.material as THREE.MeshBasicMaterial).opacity = opacity;
        c.mesh.visible = opacity > 0.01;
      }
      return groupFade;
    }

    /* ============================================================
       中心スパイン
    ============================================================ */
    const S_COUNT = isMobile ? 1500 : 4200;
    const S_H = 10.0;
    const sGeo = new THREE.BufferGeometry();
    {
      const sp = new Float32Array(S_COUNT * 3);
      const sc = new Float32Array(S_COUNT * 3);
      const sr = new Float32Array(S_COUNT);
      const SPALETTE = [
        [0.85, 0.55, 0.75],
        [0.75, 0.65, 0.9],
        [0.9, 0.85, 0.95],
        [0.55, 0.75, 0.9],
        [0.9, 0.6, 0.5],
      ];
      const clusters: { y: number; a: number; c: number[] }[] = [];
      for (let k = 0; k < 14; k++) {
        clusters.push({
          y: (k / 14) * S_H - S_H / 2 + rand(-0.2, 0.2),
          a: rand(0, Math.PI * 2),
          c: SPALETTE[(Math.random() * SPALETTE.length) | 0],
        });
      }
      for (let i = 0; i < S_COUNT; i++) {
        let xP, yP, zP, col;
        if (Math.random() < 0.8) {
          const cl = clusters[(Math.random() * clusters.length) | 0];
          const ang = cl.a + (((Math.random() * 5) | 0) / 5) * Math.PI * 2 + gauss() * 0.25;
          const rr = Math.pow(Math.random(), 0.7) * 0.4;
          xP = Math.cos(ang) * rr + gauss() * 0.04;
          zP = Math.sin(ang) * rr + gauss() * 0.04;
          yP = cl.y + gauss() * 0.18;
          const f = rand(0.6, 1.0);
          col = [cl.c[0] * f, cl.c[1] * f, cl.c[2] * f];
        } else {
          const ang = rand(0, Math.PI * 2);
          const rr = Math.pow(Math.random(), 2.0) * 0.6;
          xP = Math.cos(ang) * rr;
          zP = Math.sin(ang) * rr;
          yP = rand(-S_H / 2, S_H / 2);
          col = [0.6, 0.6, 0.75];
        }
        sp[i * 3] = xP;
        sp[i * 3 + 1] = yP;
        sp[i * 3 + 2] = zP;
        sc[i * 3] = col[0];
        sc[i * 3 + 1] = col[1];
        sc[i * 3 + 2] = col[2];
        sr[i] = rand(0.5, 1.6);
      }
      sGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
      sGeo.setAttribute('aCol', new THREE.BufferAttribute(sc, 3));
      sGeo.setAttribute('aSize', new THREE.BufferAttribute(sr, 1));
    }
    const sUniforms = {
      uTime: { value: 0 },
      uRot: { value: 0 },
      uLift: { value: 0 },
      uFade: { value: 0 },
      uPR: { value: Math.min(devicePixelRatio, 1.5) },
    };
    const spineMat = new THREE.ShaderMaterial({
      uniforms: sUniforms,
      vertexShader: `
        attribute vec3 aCol;
        attribute float aSize;
        uniform float uTime, uRot, uLift, uPR;
        varying vec3 vC; varying float vA;
        void main(){
          float H = ${S_H.toFixed(1)};
          vec3 p = position;
          p.y = mod(p.y + uLift + H * 0.5, H) - H * 0.5;
          float cR = cos(uRot), sR = sin(uRot);
          p = vec3(p.x * cR + p.z * sR, p.y, -p.x * sR + p.z * cR);
          p.x += sin(uTime * 0.5 + position.y * 2.0) * 0.02;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          vC = aCol;
          vA = smoothstep(H * 0.5, H * 0.34, abs(p.y));
          gl_PointSize = aSize * uPR * (120.0 / -mv.z);
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform float uFade;
        varying vec3 vC; varying float vA;
        void main(){
          vec2 q = gl_PointCoord - 0.5;
          float d = length(q);
          if (d > 0.5) discard;
          float a = pow(smoothstep(0.5, 0.0, d), 2.0);
          gl_FragColor = vec4(vC, a * vA * 0.4 * uFade);
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const spine = new THREE.Points(sGeo, spineMat);
    spine.frustumCulled = false;
    spine.renderOrder = 1;
    spine.position.x = AXIS_X;
    scene.add(spine);

    /* ============================================================
       スクロール → 進行度
    ============================================================ */
    let targetProgress = 0;
    let smooth = 0;

    const maxScroll = () => scrollEl.scrollHeight - scrollEl.clientHeight;
    const onScroll = () => {
      targetProgress = (scrollEl.scrollTop / Math.max(1, maxScroll())) * SEGMENTS;
    };
    scrollEl.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    goToRef.current = (i: number) => {
      scrollEl.scrollTo({ top: (i / SEGMENTS) * maxScroll(), behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    /* ============================================================
       マウス
    ============================================================ */
    const ray = new THREE.Raycaster();
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const ndc = new THREE.Vector2(99, 99);
    const hit = new THREE.Vector3();
    let mouseActive = false;

    const onPointerMove = (e: PointerEvent) => {
      ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
      mouseActive = true;
    };
    if (!isMobile) {
      addEventListener('pointermove', onPointerMove, { passive: true });
    }

    /* ============================================================
       レンダーループ
    ============================================================ */
    let lastIdx = -1;
    let rafId = 0;
    let disposed = false;

    const timer = new THREE.Timer();
    const bgColor = new THREE.Color();

    function tick() {
      if (disposed) return;

      const t = timer.getElapsed();
      smooth += (targetProgress - smooth) * 0.065;

      uniforms.uTime.value = t;
      uniforms.uProgress.value = smooth;
      uniforms.uRot.value = smooth * 0.9 + (reduceMotion ? 0 : t * 0.03);

      if (!isMobile && mouseActive) {
        ray.setFromCamera(ndc, camera);
        ray.ray.intersectPlane(planeZ, hit);
        uniforms.uMouse.value.lerp(hit, 0.18);
        camera.position.x += (ndc.x * 0.3 - camera.position.x) * 0.04;
        camera.position.y += (0.2 + ndc.y * 0.22 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
      }

      const showcase = updateCards(smooth, t);

      sUniforms.uTime.value = t;
      sUniforms.uRot.value = uniforms.uRot.value * 0.6;
      sUniforms.uLift.value = -smooth * TURN_K * STEP_Y + t * 0.05;
      sUniforms.uFade.value = showcase;

      uniforms.uDim.value = 0.5 * (1 - 0.45 * showcase);

      const bi = Math.min(SEGMENTS - 0.001, Math.max(0, smooth));
      const b0 = Math.floor(bi),
        bf = bi - b0;
      bgColor.copy(BG[b0]).lerp(BG[b0 + 1], bf);
      renderer.setClearColor(bgColor);

      const panels = panelsRef.current ?? [];
      for (let i = 0; i < panels.length; i++) {
        const panel = panels[i];
        if (!panel) continue;
        const dist = Math.abs(smooth - i);
        const o = Math.max(0, 1 - dist * 1.9);
        panel.style.opacity = o.toFixed(3);
        panel.style.transform = `translateY(${(smooth - i) * -36}px)`;
        const live = o > 0.45;
        panel.classList.toggle('live', live);
        panel.querySelectorAll('a').forEach((a) => ((a as HTMLAnchorElement).tabIndex = live ? 0 : -1));
      }

      const idx = Math.round(Math.min(SEGMENTS, Math.max(0, smooth)));
      if (idx !== lastIdx) {
        lastIdx = idx;
        onSectionChange(idx);
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    }
    tick();

    const onResize = () => {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      uniforms.uPR.value = Math.min(devicePixelRatio, 1.5);
      sUniforms.uPR.value = Math.min(devicePixelRatio, 1.5);
    };
    addEventListener('resize', onResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      scrollEl.removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      if (!isMobile) removeEventListener('pointermove', onPointerMove);

      geo.dispose();
      mat.dispose();
      sGeo.dispose();
      spineMat.dispose();
      cardTextures.forEach((tex) => tex.dispose());
      cards.forEach((c) => {
        c.mesh.geometry.dispose();
        (c.mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [canvasRef, scrollRef, panelsRef, onSectionChange]);

  return { goTo: (i: number) => goToRef.current(i) };
}
