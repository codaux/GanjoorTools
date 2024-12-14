function applyStoredFontSettings() {
  chrome.storage.sync.get(
    ["selectedFont", "fontSize", "lineHeight"],
    function (data) {
      const font = data.selectedFont || "Parastoo";
      const fontSize = data.fontSize || "16px";
      const lineHeight = data.lineHeight || "1.7"; // مقدار پیش‌فرض line-height

      document.querySelectorAll(".m1 p, .m2 p").forEach(function (el) {
        el.style.fontFamily = font;
        el.style.fontSize = fontSize;
        el.style.lineHeight = lineHeight;
      });
    }
  );
}

// اجرای تنظیمات هنگام بارگذاری صفحه
applyStoredFontSettings();

function applyPoemWidthSetting() {
  chrome.storage.sync.get("isPoemWidthLimited", function (data) {
    const isLimited = data.isPoemWidthLimited;
    const poems = document.querySelectorAll(".poem");
    poems.forEach((poem) => {
      poem.style.maxWidth = isLimited ? "80%" : "752px";
    });
  });
}

// اجرای تنظیمات هنگام بارگذاری صفحه
applyPoemWidthSetting();
