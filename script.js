document.addEventListener('DOMContentLoaded', () => {
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

  // ===== 8-BIT CHARACTER (faces LEFT toward content) =====
  const canvas = document.getElementById('pixel-char');
  const ctx = canvas.getContext('2d');
  canvas.width = 96;
  canvas.height = 128;

  const P = 3; // pixel size

  function px(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * P, y * P, P, P);
  }

  function row(y, startX, colors) {
    colors.forEach((c, i) => { if (c) px(startX + i, y, c); });
  }

  const S = '#f5c6a0';      // skin
  const SD = '#d4a070';      // skin dark
  const H = '#6b4226';       // hair
  const HD = '#4a2e18';      // hair dark
  const SH = '#707070';      // shirt
  const SHD = '#5a5a5a';     // shirt dark
  const SHL = '#888';        // shirt light
  const J = '#3b6db5';       // jeans
  const JD = '#2a4f82';      // jeans dark
  const JL = '#4a80c8';      // jeans light
  const SHO = '#8B6914';     // shoe
  const SHOD = '#5a4510';    // shoe dark
  const G = '#c0a880';       // glasses frame
  const GD = '#a08860';      // glasses dark
  const GL = '#d8e8f0';      // lens glare
  const E = '#2d5a2d';       // eye color
  const EP = '#1a3a1a';      // eye pupil
  const W = '#fff';          // white
  const BK = '#2d2d2d';      // black
  const BT = '#5a4510';      // belt
  const BU = '#c0a040';      // buckle
  const M = '#c07060';       // mouth
  const ST = '#b8a090';      // stubble
  const GUN = '#444';        // gun
  const GUND = '#222';       // gun dark
  const FLASH = '#ffd23f';   // muzzle flash

  // Character facing LEFT (toward page content)
  function drawHead(mustache) {
    row(0, 9, [H, H, H, H, H, H, H, H, H, H]);
    row(1, 8, [HD, H, H, H, H, H, H, H, H, H, HD]);
    row(2, 7, [HD, H, H, H, H, H, H, H, H, H, H, HD]);
    row(3, 7, [H, H, H, H, H, H, H, H, H, H, H, H]);
    row(4, 7, [H, H, H, H, H, H, H, H, H, H, H, H]);

    row(5, 7, [H, S, S, S, S, S, S, S, S, S, S, H]);
    row(6, 7, [H, S, S, S, S, S, S, S, S, S, S, H]);

    row(7, 7, [H, S, HD, HD, HD, S, S, HD, HD, HD, S, H]);

    row(8,  7, [null, S, G, G, G, G, G, G, G, G, S]);
    row(9,  7, [null, S, G, GL, E, G, G, GL, E, G, S]);
    row(10, 7, [null, S, G, EP, EP, G, G, EP, EP, G, S]);
    row(11, 7, [null, S, G, G, G, GD, G, G, G, G, S]);

    row(12, 8, [S, S, S, S, SD, S, S, S, S, S]);
    row(13, 8, [S, S, S, SD, SD, S, S, S, S, S]);

    if (mustache) {
      row(14, 8, [HD, HD, HD, HD, HD, HD, HD, HD, HD, HD]);
      row(15, 8, [S, S, M, M, M, M, S, S, S, S]);
    } else {
      row(14, 8, [S, S, M, M, M, M, S, S, S, S]);
      row(15, 8, [S, S, S, M, M, S, S, S, S, S]);
    }

    row(16, 8, [S, ST, S, S, S, S, ST, S, S, S]);
    row(17, 8, [S, ST, ST, S, S, ST, ST, S, S, S]);
    row(18, 9, [S, S, S, S, S, S, S, S]);

    row(8, 6, [H]);
    row(9, 6, [H]);
    row(10, 6, [HD]);
    row(11, 6, [S]);
    row(12, 6, [S]);
    row(13, 6, [SD]);

    row(9, 5, [G]);
    row(10, 5, [G]);
  }

  function drawNeck() {
    row(19, 11, [S, S, S, S]);
    row(20, 11, [S, S, S, S]);
  }

  function drawTorso() {
    row(21, 8, [SH, SH, SH, SH, SH, SH, SH, SH, SH, SH]);
    row(22, 7, [SH, SH, SH, SH, SH, SH, SH, SH, SH, SH, SH]);
    row(23, 7, [SH, SH, SH, SHD, SH, SH, SH, SHD, SH, SH, SH]);
    row(24, 7, [SH, SH, SH, SH, SHL, SH, SH, SH, SH, SH, SH]);
    row(25, 7, [SHD, SH, SH, SH, SH, SH, SH, SH, SH, SH, SHD]);
    row(26, 7, [SHD, SH, SH, SHD, SH, SH, SH, SHD, SH, SH, SHD]);
    row(27, 7, [SHD, SH, SH, SH, SH, SH, SH, SH, SH, SH, SHD]);
    row(28, 8, [SHD, SH, SH, SH, SH, SH, SH, SH, SHD]);
  }

  function drawBelt() {
    row(29, 8, [BT, BT, BT, BU, BU, BT, BT, BT, BT]);
  }

  function drawLegs() {
    row(30, 8, [J, J, J, J, J, J, J, J, J]);
    row(31, 8, [J, J, J, JD, null, J, J, J, J]);
    row(32, 8, [J, J, J, null, null, J, J, J, J]);
    row(33, 8, [J, JL, J, null, null, J, JL, J]);
    row(34, 8, [J, J, J, null, null, J, J, J]);
    row(35, 8, [JD, J, J, null, null, J, J, JD]);
    row(36, 8, [JD, J, JD, null, null, JD, J, JD]);
    row(37, 8, [J, J, J, null, null, J, J, J]);
  }

  function drawShoes() {
    row(38, 7, [SHO, SHO, SHO, SHO, null, null, SHO, SHO, SHO, SHO]);
    row(39, 6, [SHO, SHO, SHO, SHO, SHOD, null, null, SHO, SHO, SHO, SHO]);
    row(40, 6, [SHOD, SHOD, SHOD, SHOD, SHOD, null, null, SHOD, SHOD, SHOD, SHOD]);
  }

  function drawShadow() {
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.ellipse(13 * P, 41.5 * P, 7 * P, 1.5 * P, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // ===== ARMS =====
  function drawArmsDefault() {
    row(22, 5, [SH, SH]); row(23, 4, [SH, SH]); row(24, 4, [SH, SH]);
    row(25, 3, [SHD, SH]); row(26, 3, [S, S]); row(27, 3, [S, SD]);
    row(22, 18, [SH, SH]); row(23, 19, [SH, SH]); row(24, 19, [SH, SH]);
    row(25, 20, [SH, SHD]); row(26, 20, [S, S]); row(27, 20, [SD, S]);
  }

  function drawArmsWave() {
    row(22, 5, [SH, SH]); row(23, 4, [SH, SH]); row(24, 4, [SH, SH]);
    row(25, 3, [SHD, SH]); row(26, 3, [S, S]); row(27, 3, [S, SD]);
    row(19, 18, [SH, SH]); row(18, 19, [SH, SH]); row(17, 20, [SH, SH]);
    row(16, 21, [S, S]); row(15, 21, [S, S]);
    row(14, 21, [S, null, S]); row(13, 21, [S, S, S]);
  }

  function drawArmsPoint() {
    row(22, 5, [SH, SH]); row(23, 4, [SH, SH]); row(24, 3, [SH, SH]);
    row(25, 2, [SH, SH]); row(26, 1, [S, S]); row(27, 0, [S, SD]);
    px(0, 26, S);
    row(22, 18, [SH, SH]); row(23, 19, [SH, SH]); row(24, 19, [SH, SH]);
    row(25, 20, [SH, SHD]); row(26, 20, [S, S]); row(27, 20, [SD, S]);
  }

  function drawArmsCelebrate() {
    row(19, 5, [SH, SH]); row(18, 4, [SH, SH]); row(17, 3, [SH, SH]);
    row(16, 2, [S, S]); row(15, 2, [S, S]);
    row(19, 18, [SH, SH]); row(18, 19, [SH, SH]); row(17, 20, [SH, SH]);
    row(16, 21, [S, S]); row(15, 21, [S, S]);
  }

  function drawArmsThumbsUp() {
    row(22, 5, [SH, SH]); row(23, 4, [SH, SH]); row(24, 3, [SH, SH]);
    row(25, 3, [S, S]); row(24, 2, [S]); row(23, 2, [S]);
    row(22, 2, [S]); row(21, 2, [S]); row(20, 2, [S]);
    row(22, 18, [SH, SH]); row(23, 19, [SH, SH]); row(24, 19, [SH, SH]);
    row(25, 20, [SH, SHD]); row(26, 20, [S, S]); row(27, 20, [SD, S]);
  }

  function drawArmsShoot(flash) {
    // Near arm extended LEFT holding a gun (toward content)
    row(23, 5, [SH, SH]); row(24, 4, [SH, SH]); row(24, 3, [S, S]);
    // Gun
    row(23, 1, [GUND, GUND]);
    row(24, 0, [GUN, GUN, GUN, GUN]);
    row(25, 1, [GUND, GUND]);
    if (flash) {
      px(-1 < 0 ? 0 : 0, 24, FLASH);
      ctx.fillStyle = FLASH;
      ctx.fillRect(-2 * P, 23 * P, 2 * P, 3 * P);
      ctx.fillRect(-3 * P, 24 * P, 1 * P, 1 * P);
    }
    // Far arm relaxed
    row(22, 18, [SH, SH]); row(23, 19, [SH, SH]); row(24, 19, [SH, SH]);
    row(25, 20, [SH, SHD]); row(26, 20, [S, S]); row(27, 20, [SD, S]);
  }

  function drawCharacter(pose, opts) {
    opts = opts || {};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShadow();
    drawHead(opts.mustache);
    drawNeck();
    drawTorso();
    drawBelt();
    drawLegs();
    drawShoes();

    switch (pose) {
      case 'wave':      drawArmsWave(); break;
      case 'point':     drawArmsPoint(); break;
      case 'celebrate': drawArmsCelebrate(); break;
      case 'thumbsup':  drawArmsThumbsUp(); break;
      case 'shoot':     drawArmsShoot(opts.flash); break;
      default:          drawArmsDefault(); break;
    }
  }

  drawCharacter('wave');

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
      const bob = Math.sin(frame * 0.05 + ph) * u;
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
      ship.x += ship.dir * 0.0025;
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
      requestAnimationFrame(draw);
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
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ===== PROJECTS: ALADDIN (Agrabah) =====
  function createAgrabah(container) {
    const { c } = makeCanvas(container);
    const cx = c.getContext('2d');
    let frame = 0;
    const gems = Array.from({ length: 5 }, (_, i) => ({
      x: 0.12 + i * 0.18, y: 0.25 + (i % 3) * 0.12,
      tw: i, color: ['#4ecdc4', '#ff6b6b', '#ffd23f', '#b39ddb', '#5fd0ff'][i],
    }));

    function draw() {
      const grad = cx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, '#3a2a6e');
      grad.addColorStop(0.5, '#c96a3a');
      grad.addColorStop(1, '#f2a65a');
      cx.fillStyle = grad;
      cx.fillRect(0, 0, c.width, c.height);

      // moon
      cx.fillStyle = 'rgba(255,240,200,0.85)';
      cx.beginPath();
      cx.arc(c.width * 0.8, c.height * 0.2, 36, 0, Math.PI * 2);
      cx.fill();

      const horizon = c.height - 90;

      // palace silhouettes
      cx.fillStyle = '#2a1a3e';
      function dome(x, w, h) {
        cx.fillRect(x, horizon - h, w, h);
        cx.beginPath();
        cx.arc(x + w / 2, horizon - h, w / 2, Math.PI, 0);
        cx.fill();
        // spike
        cx.fillRect(x + w / 2 - 2, horizon - h - w / 2 - 14, 4, 14);
      }
      dome(c.width * 0.1, 50, 120);
      dome(c.width * 0.22, 70, 170);
      dome(c.width * 0.34, 44, 100);
      dome(c.width * 0.62, 60, 150);
      dome(c.width * 0.74, 40, 110);
      // minarets
      cx.fillRect(c.width * 0.5, horizon - 200, 16, 200);
      cx.beginPath();
      cx.moveTo(c.width * 0.5 - 4, horizon - 200);
      cx.lineTo(c.width * 0.5 + 8, horizon - 230);
      cx.lineTo(c.width * 0.5 + 20, horizon - 200);
      cx.fill();

      // sand dunes
      cx.fillStyle = '#d9a441';
      cx.beginPath();
      cx.moveTo(0, horizon);
      for (let x = 0; x <= c.width; x += 20) {
        cx.lineTo(x, horizon + Math.sin(x * 0.01) * 12);
      }
      cx.lineTo(c.width, c.height);
      cx.lineTo(0, c.height);
      cx.fill();
      cx.fillStyle = '#b8842f';
      cx.fillRect(0, c.height - 30, c.width, 30);

      // gems twinkle
      gems.forEach((gm) => {
        gm.tw += 0.06;
        const s = 6 + Math.sin(gm.tw) * 3;
        const gx = gm.x * c.width, gy = gm.y * c.height;
        cx.fillStyle = gm.color;
        cx.beginPath();
        cx.moveTo(gx, gy - s);
        cx.lineTo(gx + s, gy);
        cx.lineTo(gx, gy + s);
        cx.lineTo(gx - s, gy);
        cx.closePath();
        cx.fill();
        cx.fillStyle = 'rgba(255,255,255,0.7)';
        cx.fillRect(gx - 2, gy - 2, 3, 3);
      });

      // magic carpet drifting
      const carpetX = ((frame * 0.6) % (c.width + 160)) - 80;
      const carpetY = c.height * 0.35 + Math.sin(frame * 0.03) * 14;
      cx.save();
      cx.translate(carpetX, carpetY);
      cx.fillStyle = '#b3306b';
      cx.fillRect(0, 0, 60, 14);
      cx.fillStyle = '#ffd23f';
      cx.fillRect(0, 4, 60, 3);
      cx.fillStyle = '#4ecdc4';
      for (let t = 0; t < 60; t += 10) cx.fillRect(t, 11, 4, 8);
      // tassels wave
      cx.fillStyle = '#b3306b';
      cx.fillRect(-6, 2 + Math.sin(frame * 0.2) * 2, 6, 4);
      cx.fillRect(60, 2 + Math.cos(frame * 0.2) * 2, 6, 4);
      cx.restore();

      frame++;
      requestAnimationFrame(draw);
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
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ===== CONTACT: DOOM (hell) =====
  function createDoomHell(container) {
    const { c } = makeCanvas(container);
    const cx = c.getContext('2d');
    let frame = 0;

    function draw() {
      const grad = cx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, '#2a0808');
      grad.addColorStop(0.5, '#5a1408');
      grad.addColorStop(1, '#1a0404');
      cx.fillStyle = grad;
      cx.fillRect(0, 0, c.width, c.height);

      const horizon = c.height - 110;

      // jagged mountains
      cx.fillStyle = '#1a0606';
      cx.beginPath();
      cx.moveTo(0, horizon);
      let up = true;
      for (let x = 0; x <= c.width; x += 40) {
        cx.lineTo(x, horizon - (up ? 50 : 14));
        up = !up;
      }
      cx.lineTo(c.width, c.height);
      cx.lineTo(0, c.height);
      cx.fill();

      // distant imp silhouettes
      [0.25, 0.55].forEach((p, i) => {
        const ix = p * c.width;
        const iy = horizon - 6 + Math.sin(frame * 0.06 + i) * 3;
        cx.fillStyle = '#3a0c0c';
        cx.fillRect(ix - 8, iy - 22, 16, 18);
        cx.fillRect(ix - 12, iy - 16, 4, 10);
        cx.fillRect(ix + 8, iy - 16, 4, 10);
        cx.fillRect(ix - 6, iy - 4, 5, 8);
        cx.fillRect(ix + 1, iy - 4, 5, 8);
        // glowing eyes
        cx.fillStyle = '#ff3b2b';
        cx.fillRect(ix - 5, iy - 17, 3, 3);
        cx.fillRect(ix + 2, iy - 17, 3, 3);
      });

      // fire strip
      const fireY = c.height - 40;
      for (let x = 0; x < c.width; x += 8) {
        const h = 20 + Math.sin(x * 0.3 + frame * 0.3) * 10 + Math.random() * 10;
        cx.fillStyle = '#ff6b1a';
        cx.fillRect(x, fireY - h, 8, h);
        cx.fillStyle = '#ffd23f';
        cx.fillRect(x + 2, fireY - h * 0.5, 4, h * 0.5);
      }
      cx.fillStyle = '#7a1e08';
      cx.fillRect(0, fireY, c.width, 40);

      frame++;
      requestAnimationFrame(draw);
    }
    draw();
  }

  // Apply backgrounds
  createSpaceShooter(document.getElementById('hero-bg'));
  createMarioLevel(document.getElementById('exp-bg'));
  createAgrabah(document.getElementById('proj-bg'));
  createGargoyles(document.getElementById('edu-bg'));
  createDoomHell(document.getElementById('contact-bg'));

  // ===== TRANSITION OVERLAY =====
  const overlay = document.getElementById('transition-overlay');
  const octx = overlay.getContext('2d');
  function sizeOverlay() {
    overlay.width = window.innerWidth;
    overlay.height = window.innerHeight;
  }
  sizeOverlay();
  window.addEventListener('resize', sizeOverlay);

  let transitionActive = false;

  function playTransition(theme) {
    if (transitionActive) return;
    transitionActive = true;
    overlay.classList.add('active');
    const W = overlay.width, H = overlay.height;
    const start = performance.now();
    const dur = 800;

    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      octx.clearRect(0, 0, W, H);

      if (theme === 'space') {
        // warp stars + ship streak
        for (let i = 0; i < 60; i++) {
          const a = (i / 60) * Math.PI * 2;
          const r = t * Math.max(W, H);
          octx.strokeStyle = 'rgba(150,200,255,' + (1 - t) + ')';
          octx.lineWidth = 2;
          octx.beginPath();
          octx.moveTo(W / 2 + Math.cos(a) * r * 0.6, H / 2 + Math.sin(a) * r * 0.6);
          octx.lineTo(W / 2 + Math.cos(a) * r, H / 2 + Math.sin(a) * r);
          octx.stroke();
        }
        const shx = t * (W + 200) - 100;
        octx.fillStyle = '#5fd0ff';
        octx.fillRect(shx, H / 2 - 8, 40, 16);
        octx.fillStyle = '#ffd23f';
        octx.fillRect(shx - 30, H / 2 - 2, 30, 4);
      } else if (theme === 'mario') {
        // coins sweep + green band
        octx.fillStyle = 'rgba(92,148,252,' + (1 - Math.abs(t - 0.5) * 2) * 0.5 + ')';
        octx.fillRect(0, 0, W, H);
        for (let i = 0; i < 12; i++) {
          const cxp = (i / 12) * W;
          const cyp = H * 0.5 - Math.sin(t * Math.PI + i) * 120;
          const w = Math.abs(Math.cos(t * 8 + i)) * 18 + 4;
          octx.fillStyle = '#ffd23f';
          octx.fillRect(cxp - w / 2, cyp, w, 28);
        }
      } else if (theme === 'aladdin') {
        // carpet swoosh + sparkles
        const cxp = t * (W + 240) - 120;
        const cyp = H * 0.5 + Math.sin(t * Math.PI) * -60;
        octx.save();
        octx.translate(cxp, cyp);
        octx.rotate(Math.sin(t * Math.PI) * 0.2);
        octx.fillStyle = '#b3306b';
        octx.fillRect(0, 0, 90, 20);
        octx.fillStyle = '#ffd23f';
        octx.fillRect(0, 6, 90, 4);
        octx.restore();
        for (let i = 0; i < 20; i++) {
          const sx = cxp - i * 14;
          const sy = cyp + Math.sin(i + t * 10) * 16 + 10;
          octx.fillStyle = 'rgba(255,230,109,' + (1 - i / 20) + ')';
          octx.fillRect(sx, sy, 4, 4);
        }
      } else if (theme === 'gargoyles') {
        // dark stone shutter from top+bottom + gliding bat
        const band = (t < 0.5 ? t : 1 - t) * H;
        octx.fillStyle = '#0a0618';
        octx.fillRect(0, 0, W, band);
        octx.fillRect(0, H - band, W, band);
        const bx = W - t * (W + 200) + 100;
        const by = H * 0.4 + Math.sin(t * 10) * 30;
        const flap = Math.sin(t * 30) * 14;
        octx.fillStyle = '#000';
        octx.fillRect(bx - 5, by, 10, 16);
        octx.beginPath();
        octx.moveTo(bx - 5, by + 2); octx.lineTo(bx - 46, by - flap); octx.lineTo(bx - 28, by + 8); octx.fill();
        octx.beginPath();
        octx.moveTo(bx + 5, by + 2); octx.lineTo(bx + 46, by - flap); octx.lineTo(bx + 28, by + 8); octx.fill();
      } else if (theme === 'doom') {
        // red flash + muzzle burst
        const a = (1 - Math.abs(t - 0.3) / 0.7);
        octx.fillStyle = 'rgba(170,20,10,' + Math.max(0, a) * 0.7 + ')';
        octx.fillRect(0, 0, W, H);
        if (t < 0.4) {
          octx.fillStyle = '#ffd23f';
          const r = (0.4 - t) * 400;
          octx.beginPath();
          octx.arc(W * 0.7, H * 0.6, r, 0, Math.PI * 2);
          octx.fill();
        }
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        octx.clearRect(0, 0, W, H);
        overlay.classList.remove('active');
        transitionActive = false;
      }
    }
    requestAnimationFrame(frame);
  }

  // ===== CHARACTER POSE + SPEECH + TRANSITION PER SECTION =====
  const character = document.getElementById('character');
  const speech = document.getElementById('char-speech');
  const sectionOrder = ['hero', 'experience', 'projects', 'education', 'contact'];

  const poseMap = {
    hero:       { pose: 'wave',      text: 'Pew pew!',          theme: 'space',     opts: {} },
    experience: { pose: 'point',     text: 'Lets-a go!',        theme: 'mario',     opts: { mustache: true } },
    projects:   { pose: 'celebrate', text: 'A whole new world!',theme: 'aladdin',   opts: {} },
    education:  { pose: 'thumbsup',  text: 'We live again!',    theme: 'gargoyles', opts: {} },
    contact:    { pose: 'shoot',     text: 'Rip and tear!',     theme: 'doom',      opts: {} },
  };

  let currentSection = '';
  let animInterval = null;

  function startIdle(id) {
    if (animInterval) clearInterval(animInterval);
    const { pose, opts } = poseMap[id];
    if (pose === 'wave') {
      let t = false;
      animInterval = setInterval(() => { t = !t; drawCharacter(t ? 'wave' : 'default', opts); }, 550);
    } else if (pose === 'shoot') {
      let t = false;
      animInterval = setInterval(() => { t = !t; drawCharacter('shoot', { flash: t }); }, 400);
    }
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          const id = entry.target.id;
          if (id !== currentSection && poseMap[id]) {
            const isFirst = currentSection === '';
            currentSection = id;
            const { pose, text, theme, opts } = poseMap[id];

            drawCharacter(pose, opts);
            startIdle(id);

            speech.textContent = text;
            speech.classList.add('visible');
            clearTimeout(speech._hideTimer);
            speech._hideTimer = setTimeout(() => speech.classList.remove('visible'), 3000);

            if (!isFirst) playTransition(theme);
          }
        }
      });
    },
    { threshold: [0.4] }
  );

  sectionOrder.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
});
