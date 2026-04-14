// GET USER
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "login.html";
} else {
  const name = user.name || "User";
  const email = user.email || "";

  // SMALL ICON
  document.getElementById("userInitial").innerText =
    name.charAt(0).toUpperCase();

  // BIG ICON
  document.getElementById("bigInitial").innerText =
    name.charAt(0).toUpperCase();

  // TEXT
  document.getElementById("fullName").innerText = name;
  document.getElementById("emailText").innerText = email;
}

// CLICK ICON → OPEN POPUP
document.getElementById("userInitial").addEventListener("click", function () {
  const card = document.getElementById("profileCard");

  if (card.style.display === "block") {
    card.style.display = "none";
  } else {
    card.style.display = "block";
  }
});

// CLOSE WHEN CLICK OUTSIDE
window.addEventListener("click", function (e) {
  if (
    !e.target.closest("#profileCard") &&
    !e.target.closest("#userInitial")
  ) {
    document.getElementById("profileCard").style.display = "none";
  }
});

// LOGOUT
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// NAVIGATION
function goHome() {
  window.location.href = "home.html";
}

function goMenu() {
  window.location.href = "menu.html";
}