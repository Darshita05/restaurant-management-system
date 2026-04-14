const user = JSON.parse(localStorage.getItem("user"));

// 🔐 PROTECTION
if (!user || user.role !== "admin") {
  alert("Access Denied");
  window.location.href = "login.html";
}

// ================= USERS =================
async function loadUsers() {
  const res = await fetch("http://localhost:5000/admin/users", {
    headers: {
      "email": user.email
    }
  });

  const users = await res.json();

  let html = "<h2>Users</h2>";

  users.forEach(u => {
    html += `<p>${u.name} - ${u.email} - ${u.role}</p>`;
  });

  document.getElementById("data").innerHTML = html;
}

// ================= ORDERS =================
async function loadOrders() {
  const res = await fetch("http://localhost:5000/admin/orders", {
    headers: {
      "email": user.email
    }
  });

  const orders = await res.json();

  let html = "<h2>Orders</h2>";

  orders.forEach(o => {
    html += `
      <div style="border:1px solid black;margin:10px;padding:10px;">
        <p>User: ${o.userEmail}</p>
        <p>Total: ₹${o.totalAmount}</p>
        <p>Status: ${o.status}</p>

        <button onclick="updateStatus('${o._id}','Preparing')">Preparing</button>
        <button onclick="updateStatus('${o._id}','Delivered')">Delivered</button>
      </div>
    `;
  });

  document.getElementById("data").innerHTML = html;
}

// ================= UPDATE =================
async function updateStatus(id, status) {
  await fetch(`http://localhost:5000/admin/order/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "email": user.email
    },
    body: JSON.stringify({ status })
  });

  loadOrders();
}