const FONT_BUTTONS = [
  { value: "Parastoo", label: "پرستو" },
  { value: "Ray", label: "فونت ری" },
  { value: "ganj", label: "گنجنامه" },
  { value: "nas", label: "ایران نستعلیق" },
  { value: "yekan", label: "یکان" },
  { value: "naskh", label: "نسخ" },
  { value: "vazir", label: "وزیرمتن" },
  { value: "iran", label: "ایران" },
  { value: "gandom", label: "گندم" },
  { value: "rooznameh", label: "روزنامه" },
  { value: "shablon", label: "شابلون" },
  { value: "gulzar", label: "گلزار" },
];

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

function applyPoemWidthSetting() {
  chrome.storage.sync.get("isPoemWidthLimited", function (data) {
    const isLimited = data.isPoemWidthLimited;
    const poems = document.querySelectorAll(".poem");
    poems.forEach((poem) => {
      poem.style.maxWidth = isLimited ? "80%" : "752px";
    });
  });
}

function createSettingsStyleElement() {
  if (document.getElementById("ganjoor-floating-settings-style")) {
    return;
  }

  const style = document.createElement("style");
  style.id = "ganjoor-floating-settings-style";
  style.textContent = `
    #ganjoor-floating-settings {
      position: fixed;
      bottom: 24px;
      left: 24px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      z-index: 2147483647;
      direction: rtl;
      font-family: "vazir", sans-serif;
      color: #577ca7;
    }

    #ganjoor-floating-settings * {
      box-sizing: border-box;
      font-family: inherit;
    }

    #ganjoor-floating-settings .ganjoor-settings-toggle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 1px solid #426d9e;
      background-color: #0d0d1a;
      color: #5a98df;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 16px rgba(3, 3, 137, 0.35);
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    #ganjoor-floating-settings .ganjoor-settings-toggle:hover {
      background-color: #030389;
      color: #ffffff;
    }

    #ganjoor-floating-settings .ganjoor-settings-toggle:focus {
      outline: 2px solid #5a98df;
      outline-offset: 2px;
    }

    #ganjoor-floating-settings .ganjoor-settings-panel {
      width: min(300px, calc(100vw - 32px));
      background-color: #0d0d1a;
      border: 1px solid #426d9e;
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 12px 32px rgba(3, 3, 137, 0.35);
      color: inherit;
    }

    #ganjoor-floating-settings .ganjoor-settings-panel[hidden] {
      display: none;
    }

    #ganjoor-floating-settings h3 {
      margin: 0 0 16px;
      text-align: center;
      font-size: 16px;
      color: #5a98df;
    }

    #ganjoor-floating-settings .ganjoor-settings-group {
      margin-bottom: 12px;
    }

    #ganjoor-floating-settings .ganjoor-settings-group:last-of-type {
      margin-bottom: 0;
    }

    #ganjoor-floating-settings .ganjoor-group-title {
      display: block;
      margin-bottom: 8px;
      color: #5a98df;
      font-size: 13px;
      font-weight: 700;
    }

    #ganjoor-floating-settings .ganjoor-font-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    #ganjoor-floating-settings .ganjoor-font-button {
      flex: 1 1 calc(50% - 6px);
      border-radius: 10px;
      border: none;
      padding: 6px 0;
      background-color: rgba(75, 179, 249, 0.07);
      color: #426d9e;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }

    #ganjoor-floating-settings .ganjoor-font-button:hover {
      background-color: #030389;
      color: #5a98df;
      transform: scale(1.03);
    }

    #ganjoor-floating-settings .ganjoor-font-button.ganjoor-active {
      background-color: #0529b9;
      color: #ffffff;
      font-weight: 700;
      transform: none;
    }

    #ganjoor-floating-settings .ganjoor-control-row {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid #426d9e;
      border-radius: 20px;
      padding: 4px 8px;
      background-color: rgba(75, 179, 249, 0.07);
    }

    #ganjoor-floating-settings .ganjoor-control-row button {
      flex: 0 0 32px;
      height: 32px;
      border-radius: 8px;
      border: none;
      background-color: transparent;
      color: #5a98df;
      font-size: 18px;
      cursor: pointer;
      transition: color 0.2s ease, transform 0.2s ease;
    }

    #ganjoor-floating-settings .ganjoor-control-row button:hover {
      color: #ffffff;
      transform: scale(1.1);
    }

    #ganjoor-floating-settings .ganjoor-control-label {
      flex: 1 1 auto;
      text-align: center;
      color: #5a98df;
      font-weight: 700;
      font-size: 13px;
    }

    #ganjoor-floating-settings .ganjoor-toggle-width {
      width: 100%;
      border: none;
      border-radius: 10px;
      padding: 8px 12px;
      background-color: rgba(75, 179, 249, 0.07);
      color: #426d9e;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }

    #ganjoor-floating-settings .ganjoor-toggle-width:hover {
      background-color: #030389;
      color: #5a98df;
      transform: scale(1.03);
    }

    #ganjoor-floating-settings .ganjoor-toggle-width.ganjoor-active {
      background-color: #0529b9;
      color: #ffffff;
    }
  `;

  document.head.appendChild(style);
}

function createFloatingSettingsMenu() {
  if (document.getElementById("ganjoor-floating-settings")) {
    return;
  }

  createSettingsStyleElement();

  const container = document.createElement("div");
  container.id = "ganjoor-floating-settings";

  const toggleButton = document.createElement("button");
  toggleButton.className = "ganjoor-settings-toggle";
  toggleButton.type = "button";
  toggleButton.setAttribute("aria-label", "باز کردن تنظیمات گنجوریار");
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.textContent = "⚙️";

  const panel = document.createElement("div");
  panel.className = "ganjoor-settings-panel";
  panel.setAttribute("hidden", "");

  panel.innerHTML = `
    <h3>تنظیمات گنجوریار</h3>
    <div class="ganjoor-settings-group">
      <span class="ganjoor-group-title">انتخاب فونت</span>
      <div class="ganjoor-font-buttons"></div>
    </div>
    <div class="ganjoor-settings-group">
      <span class="ganjoor-group-title">اندازه فونت</span>
      <div class="ganjoor-control-row">
        <button type="button" data-action="increase-font">+</button>
        <span class="ganjoor-control-label" data-display="font-size">16px</span>
        <button type="button" data-action="decrease-font">-</button>
      </div>
    </div>
    <div class="ganjoor-settings-group">
      <span class="ganjoor-group-title">ارتفاع سطر</span>
      <div class="ganjoor-control-row">
        <button type="button" data-action="increase-line">+</button>
        <span class="ganjoor-control-label" data-display="line-height">1.7</span>
        <button type="button" data-action="decrease-line">-</button>
      </div>
    </div>
    <div class="ganjoor-settings-group">
      <button type="button" class="ganjoor-toggle-width" data-action="toggle-width">عریض‌سازی شعر</button>
    </div>
  `;

  container.appendChild(panel);
  container.appendChild(toggleButton);
  document.body.appendChild(container);

  const fontButtonsContainer = panel.querySelector(".ganjoor-font-buttons");
  const fontDisplay = panel.querySelector('[data-display="font-size"]');
  const lineDisplay = panel.querySelector('[data-display="line-height"]');
  const widthToggle = panel.querySelector('[data-action="toggle-width"]');

  FONT_BUTTONS.forEach((font) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ganjoor-font-button";
    button.textContent = font.label;
    button.dataset.fontValue = font.value;
    fontButtonsContainer.appendChild(button);

    button.addEventListener("click", function () {
      chrome.storage.sync.set({ selectedFont: font.value }, function () {
        applyStoredFontSettings();
        updateActiveFontButton(font.value);
      });
    });
  });

  function updateActiveFontButton(selectedFont) {
    fontButtonsContainer
      .querySelectorAll(".ganjoor-font-button")
      .forEach((btn) => {
        if (btn.dataset.fontValue === selectedFont) {
          btn.classList.add("ganjoor-active");
        } else {
          btn.classList.remove("ganjoor-active");
        }
      });
  }

  function updateFontSizeDisplay(fontSize) {
    fontDisplay.textContent = fontSize;
  }

  function updateLineHeightDisplay(lineHeight) {
    lineDisplay.textContent = lineHeight;
  }

  function updateWidthToggle(isLimited) {
    if (isLimited) {
      widthToggle.classList.add("ganjoor-active");
    } else {
      widthToggle.classList.remove("ganjoor-active");
    }
  }

  panel
    .querySelector('[data-action="increase-font"]')
    .addEventListener("click", function () {
      chrome.storage.sync.get(["fontSize"], function (data) {
        let fontSize = parseInt(data.fontSize, 10) || 16;
        fontSize = Math.max(10, fontSize + 2);
        const fontSizeValue = fontSize + "px";
        chrome.storage.sync.set({ fontSize: fontSizeValue }, function () {
          updateFontSizeDisplay(fontSizeValue);
          applyStoredFontSettings();
        });
      });
    });

  panel
    .querySelector('[data-action="decrease-font"]')
    .addEventListener("click", function () {
      chrome.storage.sync.get(["fontSize"], function (data) {
        let fontSize = parseInt(data.fontSize, 10) || 16;
        fontSize = Math.max(10, fontSize - 2);
        const fontSizeValue = fontSize + "px";
        chrome.storage.sync.set({ fontSize: fontSizeValue }, function () {
          updateFontSizeDisplay(fontSizeValue);
          applyStoredFontSettings();
        });
      });
    });

  panel
    .querySelector('[data-action="increase-line"]')
    .addEventListener("click", function () {
      chrome.storage.sync.get(["lineHeight"], function (data) {
        let lineHeight = parseFloat(data.lineHeight) || 1.7;
        lineHeight = Math.max(1, Math.round((lineHeight + 0.1) * 100) / 100);
        const lineHeightValue = lineHeight.toString();
        chrome.storage.sync.set({ lineHeight: lineHeightValue }, function () {
          updateLineHeightDisplay(lineHeightValue);
          applyStoredFontSettings();
        });
      });
    });

  panel
    .querySelector('[data-action="decrease-line"]')
    .addEventListener("click", function () {
      chrome.storage.sync.get(["lineHeight"], function (data) {
        let lineHeight = parseFloat(data.lineHeight) || 1.7;
        lineHeight = Math.max(1, Math.round((lineHeight - 0.1) * 100) / 100);
        const lineHeightValue = lineHeight.toString();
        chrome.storage.sync.set({ lineHeight: lineHeightValue }, function () {
          updateLineHeightDisplay(lineHeightValue);
          applyStoredFontSettings();
        });
      });
    });

  widthToggle.addEventListener("click", function () {
    chrome.storage.sync.get(["isPoemWidthLimited"], function (data) {
      const isLimited = !data.isPoemWidthLimited;
      chrome.storage.sync.set({ isPoemWidthLimited: isLimited }, function () {
        updateWidthToggle(isLimited);
        applyPoemWidthSetting();
      });
    });
  });

  toggleButton.addEventListener("click", function () {
    const isHidden = panel.hasAttribute("hidden");
    if (isHidden) {
      panel.removeAttribute("hidden");
      toggleButton.setAttribute("aria-expanded", "true");
    } else {
      panel.setAttribute("hidden", "");
      toggleButton.setAttribute("aria-expanded", "false");
    }
  });

  chrome.storage.sync.get(
    ["selectedFont", "fontSize", "lineHeight", "isPoemWidthLimited"],
    function (data) {
      const selectedFont = data.selectedFont || "Parastoo";
      const fontSize = data.fontSize || "16px";
      const lineHeight = data.lineHeight || "1.7";
      const isLimited = !!data.isPoemWidthLimited;

      updateActiveFontButton(selectedFont);
      updateFontSizeDisplay(fontSize);
      updateLineHeightDisplay(lineHeight);
      updateWidthToggle(isLimited);
    }
  );

  chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName !== "sync") {
      return;
    }

    let shouldApplyFontSettings = false;

    if (Object.prototype.hasOwnProperty.call(changes, "selectedFont")) {
      const newFont = changes.selectedFont.newValue || "Parastoo";
      updateActiveFontButton(newFont);
      shouldApplyFontSettings = true;
    }

    if (Object.prototype.hasOwnProperty.call(changes, "fontSize")) {
      const newFontSize = changes.fontSize.newValue || "16px";
      updateFontSizeDisplay(newFontSize);
      shouldApplyFontSettings = true;
    }

    if (Object.prototype.hasOwnProperty.call(changes, "lineHeight")) {
      const newLineHeight = changes.lineHeight.newValue || "1.7";
      updateLineHeightDisplay(newLineHeight);
      shouldApplyFontSettings = true;
    }

    if (shouldApplyFontSettings) {
      applyStoredFontSettings();
    }

    if (Object.prototype.hasOwnProperty.call(changes, "isPoemWidthLimited")) {
      const isLimited = !!changes.isPoemWidthLimited.newValue;
      updateWidthToggle(isLimited);
      applyPoemWidthSetting();
    }
  });

  document.addEventListener("click", function (event) {
    if (!container.contains(event.target) && !panel.hasAttribute("hidden")) {
      panel.setAttribute("hidden", "");
      toggleButton.setAttribute("aria-expanded", "false");
    }
  });
}

applyStoredFontSettings();
applyPoemWidthSetting();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createFloatingSettingsMenu);
} else {
  createFloatingSettingsMenu();
}
