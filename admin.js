// Redirect to login if not logged in
const loggedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
if (!loggedUser || loggedUser.role !== "admin") {
  alert("Access denied! Admins only.");
  window.location.href = "index.html";
}

document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "index.html";
});
