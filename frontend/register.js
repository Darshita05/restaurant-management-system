document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/signup", {  // ✅ FIXED API
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (data.message === "Signup successful") {
      alert("Account created");
      window.location.href = "login.html";
    } else {
      alert(data.message);
    }

  } catch (err) {
    alert("Server error");
  }
});