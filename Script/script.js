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
})

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
