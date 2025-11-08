// Redirect to login if not logged in
const loggedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
if (!loggedUser || loggedUser.role !== "user") {
  alert("Access denied! Users only.");
  window.location.href = "index.html";
}

document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "index.html";
});
