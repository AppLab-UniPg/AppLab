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

// Funzione per abilitare la modalità di modifica
function enableEditMode() {
  let slider = document.getElementById('edit-switch');
  let tutorial = document.getElementById('new-button');
  let statusString = document.getElementById('edit-status');

  if (slider.checked) {
    //Se nell'url non c'è il parametro editMode=true non permetto la modifica
    if (!window.location.search.includes('editMode=true')) {
        //Popup con inserimento password
        let password = prompt("Inserisci il token per modificare la lista:");
        if (password !== '{}64O#@vX^q)KF;o<QrSb"c//w#W>A') {
          alert("Token non valido");
          slider.checked = false;
          return;
        }

        //mando la password inserita al server tramite post per verificare se è corretta
        /*if (password) {
          fetch('http://localhost:3000/check-token')
          .then(response => {
            console.log(response);
            if (!response.ok) {
              slider.checked = false;
              throw new Error('Errore durante il recupero dei dati dei tutorial');
            }
            return response.json();
          })
          .then(data => {
            if (data.message === "OK") {
              //Aggiungere il parametro editMode=true all'url per mantenere la modalità di modifica anche dopo il refresh della pagina
              window.history.pushState({}, '', '?editMode=true');
              statusString.innerHTML = "Scrittura";
              tutorial.style.display = "block";
              alert(data.message);
            } else {
              alert(data.message);
              slider.checked = false;
            }
          })
          .catch(error => alert('Errore: ' + error.message));
        } else {
          alert('Token non inserito');
        }*/
    }
    //Aggiungere il parametro editMode=true all'url per mantenere la modalità di modifica anche dopo il refresh della pagina
    const params = new URLSearchParams(window.location.search);
    params.set('editMode', true);
    const newURL = `${window.location.origin}${window.location.pathname}?${params}`;
    window.history.pushState({}, '', newURL);

    statusString.innerHTML = "Scrittura";
    tutorial.style.display = "block";    
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