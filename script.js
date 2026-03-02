// Elements
const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggleBtn");

const meterBar = document.getElementById("meterBar");
const strengthText = document.getElementById("strengthText");
const hintText = document.getElementById("hintText");

const chkLength = document.getElementById("chkLength");
const chkLower = document.getElementById("chkLower");
const chkUpper = document.getElementById("chkUpper");
const chkNumber = document.getElementById("chkNumber");
const chkSymbol = document.getElementById("chkSymbol");

// Helper: mark checklist item valid/invalid
function setValid(el, isValid) {
  el.classList.toggle("valid", isValid);
}

// Basic scoring model (beginner-friendly + easy to explain in README)
function evaluatePassword(pw) {
  const checks = {
    length: pw.length >= 12,
    lower: /[a-z]/.test(pw),
    upper: /[A-Z]/.test(pw),
    number: /[0-9]/.test(pw),
    symbol: /[^A-Za-z0-9]/.test(pw),
  };

  // Score: 0..5 (one point per check)
  let score = 0;
  for (const key in checks) {
    if (checks[key]) score++;
  }

  // Convert score -> label + bar %
  let label = "—";
  let percent = 0;

  if (pw.length === 0) {
    label = "—";
    percent = 0;
  } else if (score <= 2) {
    label = "Weak";
    percent = 25;
  } else if (score === 3) {
    label = "Okay";
    percent = 55;
  } else if (score === 4) {
    label = "Strong";
    percent = 80;
  } else {
    label = "Very strong";
    percent = 100;
  }

  return { checks, score, label, percent };
}

function updateUI() {
  const pw = passwordInput.value;
  const { checks, label, percent } = evaluatePassword(pw);

  // Checklist UI
  setValid(chkLength, checks.length);
  setValid(chkLower, checks.lower);
  setValid(chkUpper, checks.upper);
  setValid(chkNumber, checks.number);
  setValid(chkSymbol, checks.symbol);

  // Strength text
  strengthText.textContent = `Strength: ${label}`;

  // Meter bar
  meterBar.style.width = `${percent}%`;

  // Meter color (simple mapping)
  if (pw.length === 0) {
    meterBar.style.background = "#334155";
    meterBar.style.boxShadow = "0 0 18px rgba(0, 255, 157, 0.22)";
    hintText.textContent = "Tip: Use a password generator and a password manager!";
    return;
  }

  if (label === "Weak") {
    meterBar.style.background = "#ef4444"; // red
    hintText.textContent = "Increasing length and adding more character variety!";
  } else if (label === "Okay") {
    meterBar.style.background = "#f59e0b"; // amber
    hintText.textContent = "Not bad — but longer is stronger! Also add more variety for better strength!";
  } else if (label === "Strong") {
    meterBar.style.background = "#22c55e"; // green
    hintText.textContent = "Nice one! — Consider using a passphrase for even better security!";
  } else {
    meterBar.style.background = "#16a34a"; // darker green
    hintText.textContent = "Bloody love this one — long and varied. But avoid reusing passwords across sites!";
  }
}

// Events
passwordInput.addEventListener("input", updateUI);

// Show/Hide toggle
toggleBtn.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  toggleBtn.textContent = isHidden ? "Hide" : "Show";
  toggleBtn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
});

// Initial state
updateUI();
