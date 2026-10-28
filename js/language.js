function applyLanguage(lang) {
  const t = translations[lang];

  if (!t) return;

  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.dataset.lang;

    if (t[key]) {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll("[data-placeholder]").forEach((el) => {
    const key = el.dataset.placeholder;

    if (t[key]) {
      el.placeholder = t[key];
    }
  });

  localStorage.setItem("language", lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("languageSelector");

  const saved = localStorage.getItem("language") || "en";

  applyLanguage(saved);

  if (selector) {
    selector.value = saved;

    selector.addEventListener("change", function (e) {
      applyLanguage(e.target.value);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const selector = document.getElementById("languageSelector");

  const savedLanguage = localStorage.getItem("language") || "en";

  applyLanguage(savedLanguage);

  if (selector) {
    selector.value = savedLanguage;

    selector.addEventListener("change", (e) => {
      applyLanguage(e.target.value);
    });
  }
});
