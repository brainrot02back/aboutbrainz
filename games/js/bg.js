// ================= Clean Starfield =================
const canvas = document.getElementById("canvas") || (() => {
    const c = document.createElement("canvas");
    c.id = "canvas";
    document.body.prepend(c);
    return c;
})();
const ctx = canvas.getContext("2d");

let stars = [];
const NUM_STARS = 160;
const mouse = { x: 0, y: 0 };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create stars
for (let i = 0; i < NUM_STARS; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        glow: Math.random() * 0.5 + 0.5,
        twinkle: Math.random() * 0.05,
        color: `hsl(${Math.random() * 360}, 80%, 85%)`
    });
}

// Mouse parallax
canvas.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function drawStars() {
    // CLEAR THE CANVAS completely each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "lighter";

    stars.forEach(s => {
        // Twinkle
        s.glow += (Math.random() - 0.5) * s.twinkle;
        s.glow = Math.min(Math.max(s.glow, 0.3), 1);

        // Parallax offset based on mouse
        const offsetX = (mouse.x - canvas.width / 2) * 0.001 * s.radius;
        const offsetY = (mouse.y - canvas.height / 2) * 0.001 * s.radius;

        const gradient = ctx.createRadialGradient(s.x + offsetX, s.y + offsetY, 0, s.x + offsetX, s.y + offsetY, s.radius * 6);
        gradient.addColorStop(0, `rgba(255,255,255,${s.glow})`);
        gradient.addColorStop(0.5, s.color);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(s.x + offsetX, s.y + offsetY, s.radius * 2, 0, Math.PI * 2);
        ctx.fill();
    });

    // Connect stars with gradient lines
    ctx.beginPath();
    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x + (mouse.x - canvas.width / 2) * 0.001 * stars[i].radius;
            const dy = stars[i].y - stars[j].y + (mouse.y - canvas.height / 2) * 0.001 * stars[i].radius;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const grad = ctx.createLinearGradient(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
                grad.addColorStop(0, stars[i].color);
                grad.addColorStop(1, stars[j].color);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 0.3;
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
            }
        }
    }
    ctx.stroke();
}

function updateStars() {
    stars.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
    });
}

function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}
animate();

// Handle resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
