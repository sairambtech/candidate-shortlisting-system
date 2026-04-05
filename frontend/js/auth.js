const API_URL = "http://localhost:5000/api";

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value
    };

    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    const data = await res.json();

    if (res.ok) {
      message.textContent = "Registration successful. Please login.";
      registerForm.reset();
    } else {
      message.textContent = data.message || "Registration failed";
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const loginData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      if (data.role === "RECRUITER") {
        window.location.href = "./recruiter-dashboard.html";
      } else {
        window.location.href = "./hr-dashboard.html";
      }
    } else {
      message.textContent = data.message || "Login failed";
    }
  });
}