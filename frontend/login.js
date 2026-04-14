document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // ✅ Validation
  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    // ✅ LOGIN SUCCESS
    if (data.message === "Login successful") {

      // 🔥 SAVE USER (including role)
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔥 ROLE BASED REDIRECT
      if (data.user.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "home.html";
      }

    } else {
      alert(data.message);
    }

  } catch (err) {
    alert("Server error");
  }
});