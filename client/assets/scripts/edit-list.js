// Importazione del pulsante per la modifica della lista
document.addEventListener("DOMContentLoaded", function () {
  const navbarContainer = document.getElementById("edit-button");

  if (navbarContainer) {
    fetch("/assets/edit-button.html")
      .then((response) => response.text())
      .then((html) => {
        navbarContainer.innerHTML = html;
      })
      .catch((error) => {
        console.warn("Errore nel caricamento del pulsante:", error);
      });
  }
})

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  let startIndex = decodedCookie.indexOf(name);

  if (startIndex == -1) {
      return null; // Cookie not found
  }

  // Move startIndex to the beginning of the cookie value
  startIndex += name.length;

  let endIndex = decodedCookie.indexOf("=", startIndex);
  if (endIndex == -1) {
      endIndex = decodedCookie.length;
  }

  const cookieValue = decodedCookie.substring(startIndex, endIndex);
  return decodeURIComponent(cookieValue);
}




function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}

// Funzione per abilitare la modalità di modifica
function enableEditMode() {
  let slider = document.getElementById('edit-switch');
  let tutorial = document.getElementById('new-button');
  let statusString = document.getElementById('edit-status');

  if (slider.checked) {
    console.log(getCookie("editMode"));
    if (getCookie("editMode") === null) {
      let token = prompt("Inserisci il token per modificare la lista:");

      if (token) {
        fetch('http://localhost:3000/check-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })
          .then(response => {
            if (!response.ok) {
              slider.checked = false;
            }
            return response.json();
          })
          .then(data => {
            if (data.message === "OK") {
              statusString.innerHTML = "Scrittura";
              tutorial.style.display = "block";
              setCookie("editMode", token, 1);
              console.log(getCookie("editMode"));
            } else {
              alert(data.message);
              slider.checked = false;
            }
          })
          .catch(error => {
            alert('Errore: ' + error.message);
            slider.checked = false;
          });
      } else {
        alert('Inserisci un token valido');
        slider.checked = false;
      }
    } else {
      statusString.innerHTML = "Scrittura";
      tutorial.style.display = "block";
    }
  } else {
    statusString.innerHTML = "Lettura";
    tutorial.style.display = "none";
  }

}

// Aperura e chiusura del form
function openUploadForm() {
  let form = document.getElementById('upload-form-container');
  form.style.display = "flex";
}
function closeUploadForm() {
  let form = document.getElementById('upload-form-container');
  form.style.display = "none";
}