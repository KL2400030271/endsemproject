// debug login.js - paste entire file as replacement
localStorage.removeItem("users");
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  

  { username: "user",  password: "user123", role: "user" }
];
localStorage.setItem("users", JSON.stringify(users));
console.log("Stored users:", JSON.parse(localStorage.getItem("users")));

const form = document.getElementById("loginForm");
if (!form) {
  console.error("loginForm not found. Make sure index.html has id=\"loginForm\" on the form.");
} else {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const usernameRaw = document.getElementById("username");
    const passwordRaw = document.getElementById("password");
    const roleRadio = document.querySelector('input[name="role"]:checked');

    if (!usernameRaw || !passwordRaw || !roleRadio) {
      alert("Form elements missing. Check element IDs and radio name.");
      console.error("Missing elements:", { usernameRaw, passwordRaw, roleRadio });
      return;
    }

    const username = usernameRaw.value.trim();
    const password = passwordRaw.value.trim();
    const role = roleRadio.value;

    console.log("Login attempt:", { username, password, role });

    const stored = JSON.parse(localStorage.getItem("users") || "[]");
    console.log("Stored users at login:", stored);

    const user = stored.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      console.log("Login success:", user);
      if (user.role === "admin") window.location.href = "admin.html";
      else window.location.href = "user.html";
    } else {
      // Provide clear feedback about what mismatched
      const byName = stored.find(u => u.username === username);
      if (!byName) {
        alert("No user found with that username.");
        console.warn("No user found with username:", username);
      } else if (byName.password !== password) {
        alert("Password incorrect for that username.");
        console.warn("Password mismatch for:", username, "expected:", byName.password);
      } else if (byName.role !== role) {
        alert("Role selected does not match that user's role.");
        console.warn("Role mismatch for:", username, "expected role:", byName.role, "selected:", role);
      } else {
        alert("Invalid username, password, or role selection.");
        console.warn("Unknown login failure:", { username, password, role, stored });
      }
    }
  });
}
