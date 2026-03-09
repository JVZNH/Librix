// src/utils/librasRain.js
export function startLibrasRain({
  imagePath = "/libras/",
  imageFiles = [
    "a.svg","b.svg","c.svg","d.svg","e.svg","f.svg","g.svg","h.svg",
    "i.svg","j.svg","l.svg","m.svg","n.svg","o.svg","p.svg","q.svg",
    "r.svg","s.svg","t.svg","u.svg","v.svg","x.svg","z.svg"
  ],
  fallbackEmojis = ["🤟","👌","✌️","👍","👎","🤙","🫰","👐","✋","👉","👈","☝️"],

  fontSize = 120,                 // imagens maiores
  baseSpeedPxPerSec = 26,        // queda levemente mais suave
  trailAlpha = 0.09,             // rastro mais visível
  startDelay = 0
} = {}) {

  const canvas = document.getElementById("libras-rain");
  if (!canvas) return () => {};

  const ctx = canvas.getContext("2d", { alpha: true });

  let columns = 0;
  let drops = [];
  let bgGradient = null;

  const images = [];
  let imagesLoaded = 0;
  let usingImages = true;

  let rafId = null;
  let lastTs = performance.now();
  let running = true;


  // ---------------------------------------------------------
  // 🔵 PRÉ-CARREGAMENTO DAS IMAGENS
  // ---------------------------------------------------------
  function preloadImages() {
    return new Promise((resolve) => {
      if (!imageFiles || imageFiles.length === 0) {
        usingImages = false;
        return resolve(false);
      }

      imagesLoaded = 0;
      images.length = 0;

      imageFiles.forEach((file, idx) => {
        const img = new Image();
        img.src = imagePath + file;

        img.onload = () => {
          images[idx] = img;
          imagesLoaded++;
          if (imagesLoaded === imageFiles.length) resolve(true);
        };

        img.onerror = () => {
          images[idx] = undefined;
          imagesLoaded++;
          if (imagesLoaded === imageFiles.length) resolve(true);
        };
      });

      setTimeout(() => resolve(true), 5000);
    });
  }




  // ---------------------------------------------------------
  // 🔵 DIMENSÕES E COLUNAS
  // ---------------------------------------------------------
  function setDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.max(2, Math.floor(canvas.width / fontSize));

    drops = Array(columns)
      .fill(0)
      .map(() => ({
        y: Math.random() * canvas.height * -0.5,
        speed: baseSpeedPxPerSec * (0.6 + Math.random() * 0.8),
        fade: 0,
        swingOffset: Math.random() * 1000
      }));

    // gradiente
    bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGradient.addColorStop(0, "#1f74ff");
    bgGradient.addColorStop(0.6, "#1eaedb");
    bgGradient.addColorStop(1, "#4cd6ff");
  }




  // ---------------------------------------------------------
  // 🔵 DESENHO DO FRAME
  // ---------------------------------------------------------
  function drawFrame(ts) {
    if (!running) return;

    const deltaMs = Math.min(60, ts - lastTs);
    const delta = deltaMs / 1000;
    lastTs = ts;

    // fundo bonito
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // rastro
    ctx.fillStyle = `rgba(0,0,0,${trailAlpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellW = canvas.width / columns;
    const centerX = cellW / 2;

    for (let i = 0; i < columns; i++) {
      const drop = drops[i];
      const px = i * cellW + centerX;
      const py = drop.y;

      // fade-in suave
      drop.fade = Math.min(1, drop.fade + delta * 0.8);

      // oscilação horizontal (swing)
      const swing = Math.sin((ts + drop.swingOffset) / 400) * 15;

      const img = images[i % images.length];
      if (usingImages && img && img.complete && img.naturalWidth !== 0) {

        // scale maior
        const scale = Math.min(1, fontSize / Math.max(img.width, img.height));
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const drawX = px - drawW / 2 + swing;

        ctx.save();
        ctx.globalAlpha = drop.fade * 0.95;

        // glow bonito
        ctx.shadowColor = "rgba(255,255,255,0.9)";
        ctx.shadowBlur = 20;

        ctx.drawImage(img, drawX, py, drawW, drawH);
        ctx.restore();

      } else {
        // fallback emoji
        ctx.save();
        ctx.globalAlpha = drop.fade;
        ctx.fillStyle = "#fff";
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(fallbackEmojis[0], px + swing, py);
        ctx.restore();
      }

      // cair
      drop.y += drop.speed * delta;

      // reset
      if (drop.y > canvas.height + 100) {
        drop.y = -200;
        drop.fade = 0;
        drop.speed = baseSpeedPxPerSec * (0.6 + Math.random() * 0.8);
        drop.swingOffset = Math.random() * 1000;
      }
    }

    rafId = requestAnimationFrame(drawFrame);
  }



  // ---------------------------------------------------------
  // 🔵 INICIALIZAÇÃO
  // ---------------------------------------------------------
  async function init() {
    await preloadImages();

    const anyValid = images.some(img => img && img.naturalWidth);
    if (!anyValid) usingImages = false;

    setDimensions();
    lastTs = performance.now();

    if (startDelay > 0) {
      setTimeout(() => rafId = requestAnimationFrame(drawFrame), startDelay);
    } else {
      rafId = requestAnimationFrame(drawFrame);
    }
  }

  window.addEventListener("resize", setDimensions);
  init();




  // ---------------------------------------------------------
  // 🔴 STOP — necessário pro React useEffect
  // ---------------------------------------------------------
  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("resize", setDimensions);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return stop;
}
