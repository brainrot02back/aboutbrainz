document.addEventListener("DOMContentLoaded", () => {
    // ================= DevTools Cloaker =================
    document.addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener("keydown", e => {
        if (["F12"].includes(e.key)) e.preventDefault();
        if (e.ctrlKey && e.shiftKey && ["i", "j"].includes(e.key.toLowerCase())) e.preventDefault();
        if (e.ctrlKey && e.key.toLowerCase() === "u") e.preventDefault();
    });

    let devDetected = false;
    const threshold = 160;
    setInterval(() => {
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;
        if (widthDiff || heightDiff) {
            if (!devDetected) {
                devDetected = true;
                document.body.innerHTML = "";
                document.body.style.backgroundColor = "#151515";

                const audio = new Audio("assets/audio/earrap.wav");
                audio.play().catch(() => {});

                let toggle = false;
                setInterval(() => {
                    document.body.style.backgroundColor = toggle ? "#ffffff" : "#151515";
                    toggle = !toggle;
                }, 50);
            }
        } else devDetected = false;
    }, 500);
});

