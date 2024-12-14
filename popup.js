function setFont(font, fontSize, lineHeight) {
  document.querySelectorAll(".m1 p , .m2 p").forEach(function (el) {
    el.style.fontFamily = font;
    el.style.fontSize = fontSize;
    el.style.lineHeight = lineHeight;
  });
}

// تغییر فونت و ذخیره آن
function changeFont(font) {
  chrome.storage.sync.get(["fontSize", "lineHeight"], function (data) {
    const fontSize = data.fontSize || "16px";
    const lineHeight = data.lineHeight || "1.7";

    chrome.storage.sync.set({ selectedFont: font }, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: setFont,
          args: [font, fontSize, lineHeight],
        });
      });
    });

    // اضافه کردن کلاس active به دکمه‌ی انتخاب شده و حذف آن از بقیه دکمه‌ها
    const buttons = document.querySelectorAll("button[font-name]");
    buttons.forEach((btn) => {
      if (btn.getAttribute("font-name") === font) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  });
}

// تغییر اندازه فونت
function changeFontSize(increment) {
  chrome.storage.sync.get(
    ["fontSize", "lineHeight", "selectedFont"],
    function (data) {
      let fontSize = parseInt(data.fontSize) || 16;
      fontSize = Math.max(fontSize + increment, 10);
      chrome.storage.sync.set({ fontSize: fontSize + "px" }, function () {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              function: setFont,
              args: [
                data.selectedFont || "Parastoo",
                fontSize + "px",
                data.lineHeight || "1.7",
              ],
            });
          }
        );
      });
    }
  );
}

// تغییر فاصله سطر
function changeLineHeight(increment) {
  chrome.storage.sync.get(
    ["lineHeight", "fontSize", "selectedFont"],
    function (data) {
      let lineHeight = parseFloat(data.lineHeight) || 1.7;
      lineHeight = Math.max(lineHeight + increment, 1); // جلوگیری از کاهش بیش از حد
      chrome.storage.sync.set(
        { lineHeight: lineHeight.toString() },
        function () {
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: setFont,
                args: [
                  data.selectedFont || "Parastoo",
                  data.fontSize || "16px",
                  lineHeight,
                ],
              });
            }
          );
        }
      );
    }
  );
}

// Event Listeners برای دکمه‌های تغییر اندازه فونت و فاصله سطر
document
  .getElementById("increaseFontSize")
  .addEventListener("click", function () {
    changeFontSize(2);
  });

document
  .getElementById("decreaseFontSize")
  .addEventListener("click", function () {
    changeFontSize(-2);
  });

document
  .getElementById("increaseLineHeight")
  .addEventListener("click", function () {
    changeLineHeight(0.1);
  });

document
  .getElementById("decreaseLineHeight")
  .addEventListener("click", function () {
    changeLineHeight(-0.1);
  });

// بارگذاری تنظیمات ذخیره‌شده هنگام باز کردن popup
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(
    ["selectedFont", "fontSize", "lineHeight"],
    function (data) {
      const font = data.selectedFont || "Parastoo";
      const fontSize = data.fontSize || "16px";
      const lineHeight = data.lineHeight || "1.7";

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: setFont,
          args: [font, fontSize, lineHeight],
        });
      });

      // اضافه کردن کلاس active به دکمه‌ی فونت ذخیره‌شده
      const buttons = document.querySelectorAll("button[font-name]");
      buttons.forEach((btn) => {
        if (btn.getAttribute("font-name") === font) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }
  );
});

// افزودن Event Listener برای دکمه‌های تغییر فونت
document.addEventListener("click", function (event) {
  if (
    event.target.tagName === "BUTTON" &&
    event.target.hasAttribute("font-name")
  ) {
    const font = event.target.getAttribute("font-name");
    changeFont(font);
  }
});

function togglePoemWidth() {
  chrome.storage.sync.get("isPoemWidthLimited", function (data) {
    const isLimited = !data.isPoemWidthLimited; // تغییر وضعیت
    chrome.storage.sync.set({ isPoemWidthLimited: isLimited }, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: (isLimited) => {
            const poems = document.querySelectorAll(".poem");
            poems.forEach((poem) => {
              poem.style.maxWidth = isLimited ? "80%" : "752px";
            });
          },
          args: [isLimited],
        });
      });

      // به‌روزرسانی کلاس active در دکمه
      const button = document.getElementById("togglePoemWidth");
      if (isLimited) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  });
}

// اضافه کردن Event Listener برای دکمه
document
  .getElementById("togglePoemWidth")
  .addEventListener("click", togglePoemWidth);

// بارگذاری وضعیت ذخیره‌شده دکمه هنگام باز کردن popup
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get("isPoemWidthLimited", function (data) {
    const button = document.getElementById("togglePoemWidth");
    if (data.isPoemWidthLimited) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
});
