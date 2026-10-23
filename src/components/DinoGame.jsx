import { useEffect, useRef } from 'react';

const G = 0.6;
const JUMP_V = -10;
const SPEED_START = 6;
const ACCEL = 0.001;
const SPEED_MAX = 13;
const WORLD_H = 150;
const GROUND_Y = 138;
const SCORE_COEF = 0.025;
const NIGHT_EVERY = 700;
const PTERO_SCORE = 450;
const HI_KEY = 'sudhir-dino-hi';

const DAY = { fg: '#16201B', bg: null, cloud: '#9AA5A0', text: '#4f5752' };
const NIGHT = { fg: '#EFE9DC', bg: '#16201B', cloud: '#4f5752', text: '#A8B2AC' };

export default function DinoGame() {
  const canvasRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hint = hintRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let cssW = 0;
    let cssH = 0;
    let S = 1;
    let worldW = 0;
    let raf = null;
    let started = false;
    let running = false;
    let over = false;

    let speed = SPEED_START;
    let distance = 0;
    let obstacles = [];
    let clouds = [];
    let gapAcc = 0;
    let nextGap = 0;
    let cloudGap = 0;

    let baseY = GROUND_Y;
    let vy = 0;
    let grounded = true;
    let ducking = false;
    let duckHeld = false;
    let legPhase = 0;
    let legTimer = 0;
    let wingPhase = 0;
    let wingTimer = 0;

    let hiScore = 0;
    try { hiScore = parseInt(localStorage.getItem(HI_KEY) || '0', 10) || 0; } catch (e) { hiScore = 0; }

    const score = () => Math.floor(distance * SCORE_COEF);

    function setHint(text) {
      if (!hint) return;
      hint.textContent = text;
      hint.style.opacity = text ? '1' : '0';
    }

    function resize() {
      cssW = canvas.clientWidth;
      cssH = canvas.clientHeight;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      S = cssH / WORLD_H;
      worldW = cssW / S;
      ctx.imageSmoothingEnabled = false;
      if (!raf && started) draw();
    }

    function reset() {
      speed = SPEED_START;
      distance = 0;
      obstacles = [];
      gapAcc = 0;
      nextGap = worldW * 0.45;
      cloudGap = 80;
      baseY = GROUND_Y;
      vy = 0;
      grounded = true;
      ducking = false;
      legPhase = 0;
      wingPhase = 0;
      over = false;
      running = true;
      started = true;
      canvas.classList.remove('game-over');
      setHint('');
      if (!raf) raf = requestAnimationFrame(frame);
    }

    function jump() {
      if (!running) return;
      ducking = false;
      if (grounded) {
        vy = JUMP_V;
        grounded = false;
      }
    }

    function duck(on) {
      if (!running) return;
      duckHeld = on;
      if (grounded) ducking = on;
    }

    function action() {
      if (over || !running) {
        reset();
        return;
      }
      jump();
    }

    function onKeyDown(e) {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        action();
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        duck(true);
      }
    }

    function onKeyUp(e) {
      if (e.code === 'ArrowDown' || e.code === 'KeyS') duck(false);
    }

    function getGap(totalWidth) {
      const min = 30 + totalWidth + speed * 14;
      const roll = Math.random();
      const spread = roll < 0.15 ? 0.1 + Math.random() * 0.3 : roll < 0.5 ? 0.6 + Math.random() * 0.6 : 1.2 + Math.random() * 1.3;
      return min + spread * min;
    }

    function spawnCacti() {
      const large = Math.random() < 0.4 && speed > SPEED_START + 1;
      const count = large ? 1 + (Math.random() < 0.3 ? 1 : 0) : 1 + Math.floor(Math.random() * 3);
      const h = large ? 50 : 35;
      const w = large ? 11 : 8;
      let x = worldW + 24;
      for (let i = 0; i < count; i += 1) {
        obstacles.push({ kind: 'cactus', x, w, h, variant: large });
        x += w + 6;
      }
      nextGap = getGap(count * (w + 6));
    }

    function spawnPtero() {
      const level = 100 - 50 * Math.floor(Math.random() * 3);
      const ospeed = 0.85 + Math.random() * 0.55;
      obstacles.push({ kind: 'ptero', x: worldW + 24, y: level - 20, w: 46, h: 40, ospeed });
      nextGap = getGap(46);
    }

    function spawnCloud() {
      clouds.push({ x: worldW + 60, y: 14 + Math.random() * 40, w: 30 + Math.floor(Math.random() * 3) * 10 });
    }

    function update() {
      speed = Math.min(speed + ACCEL, SPEED_MAX);
      distance += speed;
      gapAcc += speed;
      if (gapAcc >= nextGap) {
        gapAcc = 0;
        if (score() >= PTERO_SCORE && Math.random() < 0.25) spawnPtero();
        else spawnCacti();
      }
      cloudGap -= speed * 0.25;
      if (cloudGap <= 0) {
        spawnCloud();
        cloudGap = 160 + Math.random() * 320;
      }

      obstacles.forEach((o) => { o.x -= o.kind === 'ptero' ? speed * o.ospeed : speed; });
      obstacles = obstacles.filter((o) => o.x + o.w > -20);
      clouds.forEach((c) => { c.x -= speed * 0.25; });
      clouds = clouds.filter((c) => c.x + c.w > -20);

      wingTimer += 1;
      if (wingTimer >= 12) {
        wingTimer = 0;
        wingPhase = 1 - wingPhase;
      }

      const dropMul = duckHeld && !grounded ? 3 : 1;
      if (!grounded) {
        vy += G * dropMul;
        baseY += vy;
        if (baseY >= GROUND_Y) {
          baseY = GROUND_Y;
          vy = 0;
          grounded = true;
          if (duckHeld) ducking = true;
        }
      } else if (duckHeld) {
        ducking = true;
      } else {
        ducking = false;
      }

      if (grounded) {
        legTimer += 1;
        if (legTimer >= 6) {
          legTimer = 0;
          legPhase = 1 - legPhase;
        }
      }

      const box = ducking
        ? { x: 24, y: baseY - 22, w: 56, h: 20 }
        : { x: 26, y: baseY - 42, w: 32, h: 40 };
      const hit = obstacles.some((o) => {
        const ox = o.x + 3;
        const ow = o.w - 6;
        if (o.kind === 'ptero') {
          const oy = o.y + 12;
          return box.x < ox + ow && box.x + box.w > ox && box.y < oy + 24 && box.y + box.h > oy;
        }
        const oy = GROUND_Y - o.h + 2;
        return box.x < ox + ow && box.x + box.w > ox && box.y + box.h > oy;
      });

      if (hit) {
        over = true;
        running = false;
        grounded = true;
        ducking = false;
        baseY = GROUND_Y;
        vy = 0;
        const s = score();
        if (s > hiScore) {
          hiScore = s;
          try { localStorage.setItem(HI_KEY, String(hiScore)); } catch (err) { /* ignore */ }
        }
        setHint(`GAME OVER \u00b7 SCORE ${s} \u2014 CLICK/SPACE TO RETRY`);
        canvas.classList.add('game-over');
      }
    }

    function pad(n) {
      return String(Math.min(n, 99999)).padStart(5, '0');
    }

    function F(x, y, w = 1, h = 1) {
      ctx.fillRect(x * 2, y * 2, w * 2, h * 2);
    }

    function drawStanding() {
      // tail
      F(0, 1); F(0, 2, 1, 2);
      F(1, 3, 1, 3);
      F(2, 4, 1, 4);
      F(3, 5, 1, 4);
      F(4, 6, 3, 4);
      // torso
      F(4, 8, 11, 4);
      F(4, 12, 11, 3);
      F(4, 7, 9, 1);
      // neck + head
      F(12, 6, 2, 2);
      F(13, 0, 7, 6);
      F(15, 6, 4, 2);
      // arm
      F(14, 10, 1, 2);
      F(15, 11, 1, 2);
      // legs
      if (!grounded) {
        F(6, 15, 2, 4); F(6, 19, 2, 1);
        F(11, 15, 2, 4); F(11, 19, 2, 1);
      } else if (legPhase === 0) {
        F(6, 15, 2, 6); F(6, 21, 2, 1); F(8, 21, 1, 1);
        F(11, 15, 2, 4); F(11, 19, 2, 1); F(13, 19, 1, 1);
      } else {
        F(6, 15, 2, 4); F(6, 19, 2, 1); F(8, 19, 1, 1);
        F(11, 15, 2, 6); F(11, 21, 2, 1); F(13, 21, 1, 1);
      }
    }

    function drawDuck(frame) {
      // tail
      F(0, 3, 1, 2);
      F(1, 2, 1, 3);
      F(2, 3, 1, 3);
      // body
      F(3, 3, 16, 4);
      F(5, 2, 12, 1);
      // head forward
      F(18, 1, 7, 6);
      F(25, 3, 3, 2);
      // legs shuffle
      if (frame === 0) {
        F(8, 7, 2, 4); F(8, 11, 3, 1);
        F(16, 7, 2, 3); F(16, 10, 3, 1);
      } else {
        F(8, 7, 2, 3); F(8, 10, 3, 1);
        F(16, 7, 2, 4); F(16, 11, 3, 1);
      }
    }

    function drawDino(pal) {
      const DS = 1.15;
      ctx.save();
      ctx.translate(16, baseY - (ducking ? 24 * DS : 44 * DS));
      ctx.scale(DS, DS);
      ctx.fillStyle = over ? '#C8412B' : pal.fg;
      if (!ducking) {
        drawStanding();
        ctx.fillStyle = pal.bg || '#EFE9DC';
        ctx.fillRect(17 * 2, 1 * 2, 2, 2);
      } else {
        drawDuck(legPhase);
        ctx.fillStyle = pal.bg || '#EFE9DC';
        ctx.fillRect(24 * 2, 2 * 2, 2, 2);
      }
      ctx.restore();
      ctx.fillStyle = over ? '#C8412B' : pal.fg;
    }

    function drawCactus(o, pal) {
      const fg = over ? '#C8412B' : pal.fg;
      ctx.fillStyle = fg;
      const gh = GROUND_Y;
      ctx.fillRect(Math.round(o.x), gh - o.h, o.w, o.h);
      const a = o.variant ? 8 : 5;
      // left arm
      ctx.fillRect(Math.round(o.x) - 6, gh - o.h + a, 2, 10);
      ctx.fillRect(Math.round(o.x) - 6, gh - o.h + a + 8, 8, 3);
      // right arm
      ctx.fillRect(Math.round(o.x) + o.w + 4, gh - o.h + a, 2, 12);
      ctx.fillRect(Math.round(o.x) + o.w - 4, gh - o.h + a + 9, 10, 3);
    }

    function drawPtero(o, pal) {
      ctx.save();
      ctx.translate(Math.round(o.x), Math.round(o.y));
      ctx.fillStyle = over ? '#C8412B' : pal.fg;
      if (wingPhase === 0) {
        F(9, 0, 3, 3);
        F(8, 3, 5, 5);
      } else {
        F(9, 12, 3, 4);
        F(8, 8, 5, 5);
      }
      F(4, 8, 12, 3);
      F(0, 9, 4, 2);
      F(0, 8, 2, 1);
      F(14, 10, 4, 2);
      F(18, 11, 4, 1);
      ctx.fillStyle = pal.bg || '#EFE9DC';
      ctx.fillRect(2 * 2, 9 * 2, 2, 2);
      ctx.restore();
      ctx.fillStyle = over ? '#C8412B' : pal.fg;
    }

    function drawCloud(c, pal) {
      ctx.fillStyle = pal.cloud;
      const x = Math.round(c.x);
      ctx.fillRect(x, c.y, c.w, 3);
      ctx.fillRect(x + 6, c.y - 4, c.w - 16, 4);
      ctx.fillRect(x + 14, c.y - 8, Math.max(c.w - 30, 6), 4);
      ctx.fillRect(x + 2, c.y + 3, c.w + 4, 2);
    }

    function draw() {
      const night = score() >= NIGHT_EVERY && Math.floor(score() / NIGHT_EVERY) % 2 === 1;
      const pal = night ? NIGHT : DAY;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      if (pal.bg) {
        ctx.fillStyle = pal.bg;
        ctx.fillRect(0, 0, cssW, cssH);
      }

      ctx.setTransform(dpr * S, 0, 0, dpr * S, 0, 0);

      clouds.forEach((c) => drawCloud(c, pal));
      ctx.fillStyle = pal.fg;
      ctx.fillRect(0, GROUND_Y, worldW, 2);
      if (running) {
        ctx.fillStyle = pal.cloud;
        const scroll = (distance * 2) % 46;
        for (let gx = -scroll; gx < worldW; gx += 46) {
          ctx.fillRect(gx, GROUND_Y, 18, 2);
          ctx.fillRect(gx + 30, GROUND_Y, 6, 2);
          ctx.fillRect(gx + 40, GROUND_Y, 2, 2);
        }
      }
      obstacles.forEach((o) => (o.kind === 'ptero' ? drawPtero(o, pal) : drawCactus(o, pal)));
      drawDino(pal);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!over) {
        ctx.fillStyle = pal.text;
        ctx.font = '10px "IBM Plex Mono", monospace';
        ctx.textAlign = 'right';
        const s = score();
        ctx.fillText(started ? `HI ${pad(hiScore)}  ${pad(s)}` : pad(Math.max(s, 0)), cssW - 8, 14);
      }
      ctx.textAlign = 'left';
    }

    function frame() {
      raf = null;
      if (running) update();
      draw();
      if (running) raf = requestAnimationFrame(frame);
    }

    resize();
    clouds.push(
      { x: worldW * 0.25, y: 18, w: 34 },
      { x: worldW * 0.45, y: 34, w: 26 },
      { x: worldW * 0.68, y: 24, w: 30 },
      { x: worldW * 0.85, y: 40, w: 24 }
    );
    setHint('CLICK TO PLAY');
    baseY = GROUND_Y;
    draw();

    canvas.addEventListener('click', action);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('resize', resize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      canvas.removeEventListener('click', action);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="hero-rule-game">
      <canvas ref={canvasRef} aria-label="Dino runner mini-game: press space to jump, down arrow to duck" tabIndex="0" />
      <span className="game-hint" ref={hintRef}></span>
    </div>
  );
}
