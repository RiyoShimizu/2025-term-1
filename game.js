// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Target
let x = canvas.width / 2;
let y = canvas.height / 2;
let radius = 35;
let scale = 1;
let angle = 0;
let hitTimer = 0;

// Score & combo
let score = 0;
let combo = 0;

// Touch
canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const t = e.touches[0];

  const dx = t.clientX - x;
  const dy = t.clientY - y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < radius) {
    // HIT
    score += 1 + combo;
    combo++;
    scale = 1.4;
    hitTimer = 15;

    // New position
    x = Math.random() * (canvas.width - 100) + 50;
    y = Math.random() * (canvas.height - 100) + 50;
  } else {
    // MISS
    combo = 0;
  }
});

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Animations
  scale += (1 - scale) * 0.2;
  angle += 0.05;
  if (hitTimer > 0) hitTimer--;

  // Draw target
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.fillStyle = hitTimer > 0 ? "#ff69b4" : "#ffb6c1";
  ctx.beginPath();
  ctx.arc(0, 0, radius * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // UI
  ctx.fillStyle = "white";
  ctx.font = "22px Arial";
  ctx.fillText("Score: " + score, 20, 35);
  ctx.fillText("Combo: " + combo, 20, 65);

  requestAnimationFrame(gameLoop);
}

gameLoop();
