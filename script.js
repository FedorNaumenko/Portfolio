document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Scroll-reveal observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.wobble').forEach((el) => observer.observe(el));

  // ===== CHARACTER POSE CONTROLLER =====
  // The character is an inline SVG; poses are CSS classes that rotate
  // the arm groups around their shoulder pivots (smooth transitions).
  const character = document.getElementById('character');

  function setPose(name, opts) {
    character.className =
      'character-container pose-' + name +
      (opts && opts.mustache ? ' has-mustache' : '');
  }

  // ===== HELPERS =====
  function shadeColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + percent));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
    const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function makeCanvas(container) {
    const c = document.createElement('canvas');
    c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
    container.appendChild(c);
    function resize() {
      c.width = container.offsetWidth;
      c.height = container.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    return { c, resize };
  }

  // ===== HERO: SPACE SHOOTER (Chicken Invaders / Galaga) =====
  function createSpaceShooter(container) {
    const { c } = makeCanvas(container);
    const cx = c.getContext('2d');

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(),
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.0004 + 0.0001,
      tw: Math.random() * Math.PI * 2,
    }));

    const ship = { x: 0.5, dir: 1, y: 0.82 };
    let bullets = [];
    const invaders = Array.from({ length: 5 }, (_, i) => ({
      x: 0.15 + i * 0.17, y: 0.12 + (i % 2) * 0.06, phase: i,
    }));
    let frame = 0;

    function drawShip(sx, sy) {
      const u = Math.max(3, c.width / 90);
      cx.save();
      cx.translate(sx, sy);
      cx.fillStyle = '#5fd0ff';
      cx.fillRect(-u, -u, 2 * u, u);
      cx.fillRect(-2 * u, 0, 4 * u, u);
      cx.fillStyle = '#cdf3ff';
      cx.fillRect(-0.5 * u, -2 * u, u, u);
      cx.fillStyle = '#ff6b6b';
      cx.fillRect(-2 * u, u, u, u);
      cx.fillRect(u, u, u, u);
      // thruster
      cx.fillStyle = frame % 10 < 5 ? '#ffd23f' : '#ff8c2b';
      cx.fillRect(-0.5 * u, u, u, u);
      cx.restore();
    }

    function drawInvader(ix, iy, ph) {
      const u = Math.max(3, c.width / 110);
      const bob = Math.sin(frame * 0.02 + ph) * u;
      cx.fillStyle = '#b39ddb';
      cx.fillRect(ix - 1.5 * u, iy + bob, 3 * u, 2 * u);
      cx.fillRect(ix - 2.5 * u, iy + u + bob, 5 * u, u);
      cx.fillStyle = '#fff';
      cx.fillRect(ix - u, iy + 0.5 * u + bob, 0.6 * u, 0.6 * u);
      cx.fillRect(ix + 0.4 * u, iy + 0.5 * u + bob, 0.6 * u, 0.6 * u);
      // legs
      cx.fillStyle = '#7e57c2';
      const legY = iy + 2 * u + bob;
      cx.fillRect(ix - 2 * u, legY, u, u);
      cx.fillRect(ix + u, legY, u, u);
    }

    function draw() {
      cx.fillStyle = '#0d0d2a';
      cx.fillRect(0, 0, c.width, c.height);

      stars.forEach((s) => {
        s.tw += 0.03;
        s.y += s.speed;
        if (s.y > 1) s.y = 0;
        const a = 0.4 + Math.sin(s.tw) * 0.4;
        cx.fillStyle = `rgba(255,255,255,${a})`;
        cx.fillRect(s.x * c.width, s.y * c.height, s.size, s.size);
      });

      invaders.forEach((inv) => drawInvader(inv.x * c.width, inv.y * c.height, inv.phase));

      // move ship
      ship.x += ship.dir * 0.001;
      if (ship.x > 0.85 || ship.x < 0.15) ship.dir *= -1;
      const sx = ship.x * c.width;
      const sy = ship.y * c.height;
      drawShip(sx, sy);

      // fire
      if (frame % 45 === 0) bullets.push({ x: sx, y: sy - 8 });
      cx.fillStyle = '#ffd23f';
      bullets.forEach((b) => {
        b.y -= 6;
        cx.fillRect(b.x - 2, b.y, 4, 12);
      });
      bullets = bullets.filter((b) => b.y > -20);

      frame++;
      if (!reducedMotion) requestAnimationFrame(draw);
    }
    draw();
  }

  // ===== EXPERIENCE: SUPER MARIO =====
  function createMarioLevel(container) {
    const { c } = makeCanvas(container);
    const cx = c.getContext('2d');
    let frame = 0;
    const coins = [];

    function spawnCoin(bx, by) {
      coins.push({ x: bx, y: by, vy: -3.2, life: 0 });
    }

    function draw() {
      cx.fillStyle = '#5c94fc';
      cx.fillRect(0, 0, c.width, c.height);

      // clouds (pixel)
      cx.fillStyle = 'rgba(255,255,255,0.9)';
      for (let i = 0; i < 4; i++) {
        const clx = ((i * 280 + frame * 0.3) % (c.width + 120)) - 60;
        const cly = 60 + (i % 2) * 50;
        cx.fillRect(clx, cly, 50, 16);
        cx.fillRect(clx + 12, cly - 12, 26, 14);
      }

      const groundY = c.height - 80;

      // ? blocks
      const blockXs = [c.width * 0.2, c.width * 0.45, c.width * 0.68];
      const blockY = groundY - 130;
      blockXs.forEach((bx, i) => {
        cx.fillStyle = '#e8a030';
        cx.fillRect(bx, blockY, 36, 36);
        cx.fillStyle = '#b06818';
        cx.fillRect(bx, blockY, 36, 4);
        cx.fillRect(bx, blockY + 32, 36, 4);
        cx.fillRect(bx, blockY, 4, 36);
        cx.fillRect(bx + 32, blockY, 4, 36);
        // rivets
        cx.fillStyle = '#fff';
        cx.fillRect(bx + 4, blockY + 4, 3, 3);
        cx.fillRect(bx + 29, blockY + 4, 3, 3);
        cx.fillRect(bx + 4, blockY + 29, 3, 3);
        cx.fillRect(bx + 29, blockY + 29, 3, 3);
        // ?
        cx.fillStyle = '#fff';
        cx.font = 'bold 20px monospace';
        cx.textAlign = 'center';
        cx.fillText('?', bx + 18, blockY + 26);
        // periodic coin pop
        if (frame % 150 === i * 50 + 20) spawnCoin(bx + 18, blockY);
      });

      // coins (arc + spin)
      for (let i = coins.length - 1; i >= 0; i--) {
        const co = coins[i];
        co.life++;
        co.y += co.vy;
        co.vy += 0.12;
        const w = Math.abs(Math.cos(co.life * 0.25)) * 14 + 2;
        cx.fillStyle = '#ffd23f';
        cx.fillRect(co.x - w / 2, co.y - 9, w, 18);
        cx.fillStyle = '#e8a030';
        cx.fillRect(co.x - w / 6, co.y - 5, w / 3, 10);
        if (co.life > 60 || co.y > blockY + 4) coins.splice(i, 1);
      }

      // ground
      cx.fillStyle = '#c84c0c';
      cx.fillRect(0, groundY, c.width, 80);
      cx.fillStyle = '#e87038';
      for (let x = 0; x < c.width; x += 32) {
        cx.fillRect(x, groundY, 16, 16);
        cx.fillRect(x + 16, groundY + 16, 16, 16);
      }
      cx.fillStyle = '#a03808';
      cx.fillRect(0, groundY, c.width, 4);

      frame++;
      if (!reducedMotion) requestAnimationFrame(draw);
    }
    draw();
  }

  // ===== PROJECTS: ALADDIN (Sega, 1993: blue sky, orange Agrabah walls, dunes) =====
  function createAgrabah(container) {
    const { c } = makeCanvas(container);
    const cx = c.getContext('2d');
    let frame = 0;
    const gems = Array.from({ length: 3 }, (_, i) => ({
      x: 0.36 + i * 0.14, tw: i * 2.1,
      color: ['#ff6b6b', '#4ecdc4', '#b39ddb'][i],
    }));

    function drawWall(x, w, duneY) {
      // big flat orange wall mass with dither texture and arched windows
      cx.fillStyle = '#c97a2a';
      cx.fillRect(x, 0, w, duneY + 30);
      // dither speckles (deterministic)
      for (let i = 0; i < 120; i++) {
        const sx = x + ((i * 137 + 41) % w);
        const sy = ((i * 89 + 17) % (duneY + 20));
        cx.fillStyle = i % 3 === 0 ? '#e09a4a' : '#a85a18';
        cx.fillRect(sx, sy, 4, 4);
      }
      // edge shading
      cx.fillStyle = '#a85a18';
      if (x === 0) cx.fillRect(x + w - 8, 0, 8, duneY + 30);
      else cx.fillRect(x, 0, 8, duneY + 30);
      // pointed-arch windows
      cx.fillStyle = '#3a1f0e';
      [0.22, 0.55].forEach((fy) => {
        const wy = fy * duneY;
        const wx = x + w / 2 - 14;
        cx.fillRect(wx, wy, 28, 38);
        cx.beginPath();
        cx.moveTo(wx, wy);
        cx.quadraticCurveTo(wx + 14, wy - 26, wx + 28, wy);
        cx.fill();
      });
      // protruding wooden beam
      const bx = x === 0 ? x + w - 6 : x - 34;
      cx.fillStyle = '#8a5a2a';
      cx.fillRect(bx, duneY * 0.4, 40, 9);
      cx.fillStyle = '#6b4220';
      cx.fillRect(bx, duneY * 0.4 + 9, 40, 3);
    }

    function drawPalm(x, baseY, h) {
      // curved trunk
      cx.strokeStyle = '#8a5a2a';
      cx.lineWidth = 9;
      cx.lineCap = 'round';
      cx.beginPath();
      cx.moveTo(x, baseY);
      cx.quadraticCurveTo(x + 8, baseY - h * 0.6, x - 4, baseY - h);
      cx.stroke();
      // fronds
      const tx = x - 4, ty = baseY - h;
      const sway = Math.sin(frame * 0.02 + x) * 3;
      cx.fillStyle = '#2e8b4f';
      for (let a = 0; a < 6; a++) {
        const ang = Math.PI * (0.15 + a * 0.14) + sway * 0.01;
        cx.save();
        cx.translate(tx, ty);
        cx.rotate(ang - Math.PI / 2);
        cx.beginPath();
        cx.ellipse(26, 0, 28, 8, 0, 0, Math.PI * 2);
        cx.fill();
        cx.restore();
      }
      cx.fillStyle = '#1f6b3a';
      cx.beginPath();
      cx.arc(tx, ty, 7, 0, Math.PI * 2);
      cx.fill();
    }

    function draw() {
      // bright game-blue sky
      cx.fillStyle = '#4da6e8';
      cx.fillRect(0, 0, c.width, c.height);
      cx.fillStyle = '#7cc4f0';
      cx.fillRect(0, c.height * 0.45, c.width, c.height * 0.2);

      // pale clouds
      cx.fillStyle = 'rgba(255,255,255,0.75)';
      for (let i = 0; i < 3; i++) {
        const clx = ((i * 340 + frame * 0.2) % (c.width + 160)) - 80;
        const cly = c.height * (0.12 + i * 0.09);
        cx.fillRect(clx, cly, 64, 12);
        cx.fillRect(clx + 14, cly - 9, 34, 10);
      }

      const duneY = c.height - 110;

      // sand dunes
      cx.fillStyle = '#d9a441';
      cx.fillRect(0, duneY, c.width, c.height - duneY);
      cx.fillStyle = '#e8c84a';
      cx.beginPath();
      cx.moveTo(0, duneY + 14);
      for (let x = 0; x <= c.width; x += 24) {
        cx.lineTo(x, duneY + 14 + Math.sin(x * 0.012 + 1) * 10);
      }
      cx.lineTo(c.width, duneY + 44);
      cx.lineTo(0, duneY + 44);
      cx.fill();

      // palms between the walls
      drawPalm(c.width * 0.32, duneY + 24, 90);
      drawPalm(c.width * 0.62, duneY + 18, 70);

      // flanking Agrabah walls
      const wallW = Math.max(90, c.width * 0.2);
      drawWall(0, wallW, duneY);
      drawWall(c.width - wallW, wallW, duneY);

      // golden lamp with smoke wisp (upper sky)
      const lampX = c.width * 0.3;
      const lampY = c.height * 0.16 + Math.sin(frame * 0.025) * 6;
      cx.fillStyle = '#ffd23f';
      cx.beginPath();
      cx.ellipse(lampX, lampY, 22, 11, 0, 0, Math.PI * 2);
      cx.fill();
      cx.fillRect(lampX - 34, lampY - 5, 16, 5); // spout
      cx.fillStyle = '#e8a030';
      cx.fillRect(lampX - 8, lampY - 16, 16, 6); // lid
      cx.beginPath(); // handle
      cx.arc(lampX + 24, lampY - 4, 8, -Math.PI / 2, Math.PI / 2);
      cx.lineWidth = 3.5;
      cx.strokeStyle = '#e8a030';
      cx.stroke();
      // smoke puffs drifting up from the spout
      cx.fillStyle = 'rgba(120,120,130,0.45)';
      for (let p = 0; p < 4; p++) {
        const t = ((frame * 0.012 + p * 0.25) % 1);
        const px2 = lampX - 30 - t * 50 + Math.sin(t * 9 + p) * 8;
        const py2 = lampY - 12 - t * 60;
        const r = 5 + t * 10;
        cx.beginPath();
        cx.arc(px2, py2, r, 0, Math.PI * 2);
        cx.fill();
      }

      // gems on the dunes, gentle twinkle
      gems.forEach((gm) => {
        gm.tw += 0.05;
        const s = 5 + Math.sin(gm.tw) * 2;
        const gx = gm.x * c.width, gy = duneY + 36;
        cx.fillStyle = gm.color;
        cx.beginPath();
        cx.moveTo(gx, gy - s);
        cx.lineTo(gx + s, gy);
        cx.lineTo(gx, gy + s);
        cx.lineTo(gx - s, gy);
        cx.closePath();
        cx.fill();
        cx.fillStyle = 'rgba(255,255,255,0.7)';
        cx.fillRect(gx - 1, gy - 2, 2, 2);
      });

      // magic carpet drifting
      const carpetX = ((frame * 0.55) % (c.width + 160)) - 80;
      const carpetY = c.height * 0.34 + Math.sin(frame * 0.03) * 12;
      cx.save();
      cx.translate(carpetX, carpetY);
      cx.fillStyle = '#b3306b';
      cx.fillRect(0, 0, 60, 14);
      cx.fillStyle = '#ffd23f';
      cx.fillRect(0, 4, 60, 3);
      cx.fillStyle = '#4ecdc4';
      for (let t = 0; t < 60; t += 10) cx.fillRect(t, 11, 4, 8);
      cx.fillStyle = '#b3306b';
      cx.fillRect(-6, 2 + Math.sin(frame * 0.2) * 2, 6, 4);
      cx.fillRect(60, 2 + Math.cos(frame * 0.2) * 2, 6, 4);
      cx.restore();

      frame++;
      if (!reducedMotion) requestAnimationFrame(draw);
    }
    draw();
  }

  // ===== EDUCATION: GARGOYLES (gothic night) =====
  function createGargoyles(container) {
    const { c } = makeCanvas(container);
    const cx = c.getContext('2d');
    let frame = 0;

    function draw() {
      const grad = cx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, '#0a0a1e');
      grad.addColorStop(0.6, '#1a1030');
      grad.addColorStop(1, '#2a1838');
      cx.fillStyle = grad;
      cx.fillRect(0, 0, c.width, c.height);

      // moon + glow
      const mx = c.width * 0.78, my = c.height * 0.22;
      const mg = cx.createRadialGradient(mx, my, 10, mx, my, 90);
      mg.addColorStop(0, 'rgba(200,180,255,0.5)');
      mg.addColorStop(1, 'rgba(200,180,255,0)');
      cx.fillStyle = mg;
      cx.fillRect(mx - 90, my - 90, 180, 180);
      cx.fillStyle = '#d8d0f0';
      cx.beginPath();
      cx.arc(mx, my, 40, 0, Math.PI * 2);
      cx.fill();
      cx.fillStyle = grad;
      cx.beginPath();
      cx.arc(mx + 14, my - 8, 36, 0, Math.PI * 2);
      cx.fill();

      // stars
      cx.fillStyle = 'rgba(255,255,255,0.5)';
      for (let i = 0; i < 50; i++) {
        const sx = (i * 137.5) % c.width;
        const sy = (i * 91.3) % (c.height * 0.5);
        cx.fillRect(Math.floor(sx), Math.floor(sy), 2, 2);
      }

      const baseY = c.height - 60;

      // castle silhouette with battlements + pointed arches
      cx.fillStyle = '#0d0a1a';
      function tower(x, w, h) {
        cx.fillRect(x, baseY - h, w, h);
        // crenellations
        for (let t = 0; t < w; t += 14) cx.fillRect(x + t, baseY - h - 10, 8, 10);
        // pointed roof for thin towers
        if (w < 40) {
          cx.beginPath();
          cx.moveTo(x - 4, baseY - h - 10);
          cx.lineTo(x + w / 2, baseY - h - 40);
          cx.lineTo(x + w + 4, baseY - h - 10);
          cx.fill();
        }
        // gothic arch windows (faint glow)
        cx.fillStyle = 'rgba(120,90,200,0.35)';
        for (let wy = baseY - h + 20; wy < baseY - 20; wy += 40) {
          cx.fillRect(x + w / 2 - 5, wy, 10, 18);
        }
        cx.fillStyle = '#0d0a1a';
      }
      tower(c.width * 0.05, 60, 180);
      tower(c.width * 0.18, 30, 240);
      tower(c.width * 0.3, 90, 150);
      tower(c.width * 0.55, 70, 200);
      tower(c.width * 0.7, 28, 260);
      tower(c.width * 0.82, 80, 170);

      // gliding gargoyle silhouette
      const gx = c.width - ((frame * 1.1) % (c.width + 200)) + 100;
      const gy = c.height * 0.32 + Math.sin(frame * 0.02) * 30;
      const flap = Math.sin(frame * 0.18) * 10;
      cx.fillStyle = '#05030d';
      cx.fillRect(gx - 5, gy, 10, 14);
      cx.fillStyle = '#0a0618';
      cx.beginPath();
      cx.moveTo(gx - 5, gy + 2);
      cx.lineTo(gx - 40, gy - 6 - flap);
      cx.lineTo(gx - 26, gy + 6);
      cx.closePath();
      cx.fill();
      cx.beginPath();
      cx.moveTo(gx + 5, gy + 2);
      cx.lineTo(gx + 40, gy - 6 - flap);
      cx.lineTo(gx + 26, gy + 6);
      cx.closePath();
      cx.fill();

      frame++;
      if (!reducedMotion) requestAnimationFrame(draw);
    }
    draw();
  }

  // ===== CONTACT: POCAHONTAS (Sega Genesis forest + flowing river) =====
  function createRiverForest(container) {
    const { c } = makeCanvas(container);
    const cx = c.getContext('2d');
    let frame = 0;

    const leaves = Array.from({ length: 9 }, (_, i) => ({
      x0: (i * 0.13) % 1, y0: 0.16 + ((i * 0.17) % 0.5),
      sp: 0.0011 + (i % 4) * 0.0004,
      amp: 22 + (i % 3) * 14, ph: i * 1.3,
      color: ['#e88aa0', '#f2a65a', '#ffd23f', '#e86a5a'][i % 4],
      s: 5 + (i % 3) * 2,
    }));
    const fireflies = Array.from({ length: 4 }, (_, i) => ({
      x: 0.22 + i * 0.18, y: 0.38 + (i % 2) * 0.18, ph: i * 1.7,
    }));

    function drawTrunk(x, w, topY, bottomY, color) {
      cx.fillStyle = color;
      cx.beginPath();
      cx.moveTo(x, bottomY);
      cx.lineTo(x + w * 0.18, topY);
      cx.lineTo(x + w * 0.82, topY);
      cx.lineTo(x + w, bottomY);
      cx.closePath();
      cx.fill();
    }

    function draw() {
      // deep blue-teal forest gradient
      const grad = cx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, '#0d2b3e');
      grad.addColorStop(0.65, '#123a38');
      grad.addColorStop(1, '#14352c');
      cx.fillStyle = grad;
      cx.fillRect(0, 0, c.width, c.height);

      const groundY = c.height - 150;

      // distant lighter trunks for depth
      [0.2, 0.46, 0.6, 0.86].forEach((fx, i) => {
        drawTrunk(fx * c.width, 26 + (i % 2) * 10, c.height * 0.06, groundY + 20, '#1b4a52');
      });

      // dark canopy masses along the top
      cx.fillStyle = '#0a2520';
      for (let i = 0; i < 6; i++) {
        const ex = (i / 5) * c.width;
        cx.beginPath();
        cx.ellipse(ex, -10, 140, 70 + (i % 3) * 26, 0, 0, Math.PI * 2);
        cx.fill();
      }

      // big foreground tree on the left with a curving branch
      cx.fillStyle = '#0a1f2e';
      cx.beginPath();
      cx.moveTo(c.width * 0.02, c.height);
      cx.lineTo(c.width * 0.05, 0);
      cx.lineTo(c.width * 0.13, 0);
      cx.lineTo(c.width * 0.12, c.height);
      cx.closePath();
      cx.fill();
      cx.strokeStyle = '#0a1f2e';
      cx.lineWidth = 18;
      cx.lineCap = 'round';
      cx.beginPath();
      cx.moveTo(c.width * 0.1, c.height * 0.22);
      cx.quadraticCurveTo(c.width * 0.3, c.height * 0.3, c.width * 0.42, c.height * 0.16);
      cx.stroke();
      // hanging vines from the branch
      cx.strokeStyle = '#11332c';
      cx.lineWidth = 3;
      [0.2, 0.28, 0.36].forEach((fx, i) => {
        const vx = fx * c.width;
        cx.beginPath();
        cx.moveTo(vx, c.height * 0.24);
        cx.quadraticCurveTo(vx + Math.sin(frame * 0.02 + i) * 5, c.height * 0.33, vx - 3, c.height * 0.42);
        cx.stroke();
      });

      // mossy ground ledge
      cx.fillStyle = '#2e7d4f';
      cx.fillRect(0, groundY, c.width, 64);
      cx.fillStyle = '#56b86b';
      cx.beginPath();
      cx.moveTo(0, groundY + 8);
      for (let x = 0; x <= c.width; x += 26) {
        cx.lineTo(x, groundY + 8 + Math.sin(x * 0.05) * 5);
      }
      cx.lineTo(c.width, groundY);
      cx.lineTo(0, groundY);
      cx.fill();
      cx.fillStyle = '#1f5c3a';
      cx.fillRect(0, groundY + 56, c.width, 8);

      // flowing river
      const riverY = c.height - 90;
      cx.fillStyle = '#1b3a6b';
      cx.fillRect(0, riverY, c.width, 90);
      cx.fillStyle = '#142b50';
      cx.fillRect(0, riverY, c.width, 7);
      // two ripple layers scrolling at different speeds
      for (let rowI = 0; rowI < 3; rowI++) {
        const ry = riverY + 22 + rowI * 22;
        for (let i = 0; i < Math.ceil(c.width / 90) + 1; i++) {
          const rx = ((i * 90 + frame * (1.1 + rowI * 0.35) + rowI * 45) % (c.width + 90)) - 45;
          const bob = Math.sin(frame * 0.05 + i + rowI) * 2;
          cx.fillStyle = rowI === 1 ? 'rgba(111,159,216,0.65)' : 'rgba(63,111,174,0.7)';
          cx.beginPath();
          cx.roundRect(rx, ry + bob, 38 - rowI * 6, 4, 2);
          cx.fill();
        }
      }
      // lily pads
      [0.3, 0.64].forEach((fx, i) => {
        const lx = fx * c.width;
        const ly = riverY + 34 + i * 18 + Math.sin(frame * 0.04 + i * 2) * 2;
        cx.fillStyle = '#3a8f5f';
        cx.beginPath();
        cx.ellipse(lx, ly, 17, 7, 0, 0, Math.PI * 2);
        cx.fill();
        cx.fillStyle = '#1b3a6b';
        cx.beginPath();
        cx.moveTo(lx, ly);
        cx.lineTo(lx + 17, ly - 4);
        cx.lineTo(lx + 17, ly + 4);
        cx.closePath();
        cx.fill();
      });

      // drifting leaves (colors of the wind)
      leaves.forEach((lf) => {
        const t = (lf.x0 + frame * lf.sp) % 1.12;
        const lx = t * (c.width + 60) - 30;
        const ly = lf.y0 * c.height + Math.sin(t * 7 + lf.ph) * lf.amp;
        const rot = Math.sin(t * 11 + lf.ph) * 0.9;
        cx.save();
        cx.translate(lx, ly);
        cx.rotate(rot);
        cx.fillStyle = lf.color;
        cx.beginPath();
        cx.ellipse(0, 0, lf.s, lf.s * 0.45, 0, 0, Math.PI * 2);
        cx.fill();
        cx.restore();
      });

      // fireflies
      fireflies.forEach((ff) => {
        const a = 0.25 + (Math.sin(frame * 0.05 + ff.ph) + 1) * 0.3;
        const fx = ff.x * c.width + Math.sin(frame * 0.013 + ff.ph) * 24;
        const fy = ff.y * c.height + Math.cos(frame * 0.017 + ff.ph) * 16;
        const fg = cx.createRadialGradient(fx, fy, 0, fx, fy, 9);
        fg.addColorStop(0, 'rgba(255,240,150,' + a + ')');
        fg.addColorStop(1, 'rgba(255,240,150,0)');
        cx.fillStyle = fg;
        cx.fillRect(fx - 9, fy - 9, 18, 18);
      });

      frame++;
      if (!reducedMotion) requestAnimationFrame(draw);
    }
    draw();
  }

  // Apply backgrounds
  createSpaceShooter(document.getElementById('hero-bg'));
  createMarioLevel(document.getElementById('exp-bg'));
  createAgrabah(document.getElementById('proj-bg'));
  createGargoyles(document.getElementById('edu-bg'));
  createRiverForest(document.getElementById('contact-bg'));

  // ===== CHARACTER POSE + SPEECH PER SECTION =====
  const speech = document.getElementById('char-speech');
  const sectionOrder = ['hero', 'experience', 'projects', 'education', 'contact'];

  const poseMap = {
    hero:       { pose: 'wave',      text: 'Hi, I’m Fedor!',             opts: {} },
    experience: { pose: 'point',     text: 'Let’s-a go!',                 opts: { mustache: true } },
    projects:   { pose: 'celebrate', text: 'A whole new world!',         opts: {} },
    education:  { pose: 'thumbsup',  text: 'We live again!',             opts: {} },
    contact:    { pose: 'open',      text: 'Just around the riverbend!', opts: {} },
  };

  let currentSection = '';

  // The observer only signals that a section boundary crossed the viewport
  // center band; the active section itself is derived from current geometry.
  // (Entry order is not reliable when jumping across several sections.)
  function updateActiveSection() {
    const mid = window.innerHeight / 2;
    for (const id of sectionOrder) {
      const r = document.getElementById(id).getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) {
        if (id !== currentSection && poseMap[id]) {
          currentSection = id;
          const { pose, text, opts } = poseMap[id];

          setPose(pose, opts);

          speech.textContent = text;
          speech.classList.add('visible');
          clearTimeout(speech._hideTimer);
          speech._hideTimer = setTimeout(() => speech.classList.remove('visible'), 3000);
        }
        break;
      }
    }
  }

  const sectionObserver = new IntersectionObserver(updateActiveSection, {
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0,
  });

  sectionOrder.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  // ===== CHARACTER LANDS ON THE GRASS (page finale) =====
  // The character normally floats centered in the viewport. As the contact
  // section scrolls into view he glides down and plants his feet on the mossy
  // river bank, so scrolling to the end of the page grounds him on the grass.
  const charSvg = document.getElementById('char-svg');
  const contactSection = document.getElementById('contact');

  function groundCharacter() {
    const svgH = charSvg.getBoundingClientRect().height;
    if (!svgH) return; // character hidden on small screens
    const r = contactSection.getBoundingClientRect();
    const half = window.innerHeight / 2;
    // 0 while contact is below mid-viewport, 1 once it fills the viewport
    const p = Math.min(1, Math.max(0, 1 - r.top / half));
    if (p > 0) {
      const groundY = r.bottom - 112;
      const centeredFeetY = half + svgH / 2;
      const feetY = centeredFeetY + (groundY - centeredFeetY) * p;
      character.style.transform = 'translateY(' + (feetY - svgH - half) + 'px)';
    } else {
      character.style.transform = '';
    }
  }
  window.addEventListener('scroll', groundCharacter, { passive: true });
  window.addEventListener('resize', groundCharacter);
  groundCharacter();
});
