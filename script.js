// script.js
const t1 = document.getElementById("t1");
const t2 = document.getElementById("t2");
const t3 = document.getElementById("t3");
const t4 = document.getElementById("t4");
const t5 = document.getElementById("t5");
const t6 = document.getElementById("t6");

const copyBtn = document.getElementById("copyBtn");
const copyLabel = document.getElementById("copyLabel");

copyBtn.addEventListener("click", copyText);

function getStoryText() {
  return `Important: the final fairy tale should be no more than 1300–1400 characters long.

Come up with a fairy tale on the theme of ${t1.value}.
The main character is ${t2.value}, they are ${t3.value}.
Their friend is ${t4.value}.
Once upon a time, something happened to them: ${t5.value}.
At the end of the story, it all turned out like this: ${t6.value}.`;
}

function copyText() {
  const text = getStoryText();

  // Modern Clipboard API (works on HTTPS / localhost)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(showSuccess)
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;

  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
    showSuccess();
  } catch (err) {
    alert("Copying is not supported in this environment");
  }

  document.body.removeChild(textarea);
}

function showSuccess() {
  copyBtn.classList.add("success");
  setTimeout(() => copyBtn.classList.remove("success"), 600);

  copyLabel.classList.add("show");
  setTimeout(() => copyLabel.classList.remove("show"), 2000);
}
