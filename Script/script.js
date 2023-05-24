// Importazione navbar
document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("navbar");

  if (navbarContainer) {
    fetch("/navbar.html")
      .then((response) => response.text())
      .then((html) => {
        navbarContainer.innerHTML = html;
      })
      .catch((error) => {
        console.warn("Errore nel caricamento della navbar:", error);
      });
  }
});
