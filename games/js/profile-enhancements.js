document.addEventListener("DOMContentLoaded", () => {
  /* ========== Quote Typing + Rotating ========== */
  const quoteElem = document.querySelector(".quote");
  const quotes = [
    "“don't diss petite woman they're like pocket femboys — bill cosby”",
    "“Code is like humor. When you have to explain it, it’s bad. — alberto einstein”",
    "“ilovefemboys67 — elli”",
    "“In a world without fences and walls, who needs Gates and Windows? — droid gates”",
  ];
  let quoteIndex = 0;

  function typeQuote(text, i = 0, callback) {
    if (!quoteElem) return;
    if (i === 0) {
      quoteElem.innerHTML = ""; // Clear before typing starts
    }
    if (i < text.length) {
      quoteElem.innerHTML += text.charAt(i);
      setTimeout(() => typeQuote(text, i + 1, callback), 30);
    } else if (callback) {
      setTimeout(callback, 2500); // wait 2.5s before next quote
    }
  }

  function showNextQuote() {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    typeQuote(quotes[quoteIndex], 0, showNextQuote);
  }

  // Start typing the first quote and chain the rest
  typeQuote(quotes[quoteIndex], 0, showNextQuote);
});

