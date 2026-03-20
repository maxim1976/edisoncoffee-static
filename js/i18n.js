// Edison Coffee i18n — vanilla JS language switcher
// Uses data-i18n attributes and localStorage

(function () {
  const SUPPORTED = ["zh-hant", "en", "ja", "ko"];
  const DEFAULT_LANG = "zh-hant";

  function getLang() {
    const stored = localStorage.getItem("lang");
    return SUPPORTED.includes(stored) ? stored : DEFAULT_LANG;
  }

  function applyTranslations(lang) {
    const dict = TRANSLATIONS[lang];
    if (!dict) return;

    // Update all [data-i18n] elements
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // Update [data-i18n-placeholder] for inputs
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) {
        el.placeholder = dict[key];
      }
    });

    // Update <html lang>
    const htmlLangMap = {
      "zh-hant": "zh-Hant",
      "en": "en",
      "ja": "ja",
      "ko": "ko",
    };
    document.documentElement.lang = htmlLangMap[lang] || lang;

    // Update active state on switcher buttons
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.classList.toggle("lang-active", btn.dataset.lang === lang);
    });
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem("lang", lang);
    applyTranslations(lang);
  }

  // Initialise on DOM ready
  document.addEventListener("DOMContentLoaded", function () {
    const lang = getLang();
    applyTranslations(lang);

    // Wire up switcher buttons
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.dataset.lang);
      });
    });

    // Mobile nav toggle
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    if (hamburger && mobileMenu) {
      hamburger.addEventListener("click", function () {
        const open = mobileMenu.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", open);
      });
    }
  });
})();
