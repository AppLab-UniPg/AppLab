// Verifica se ci troviamo sulla pagina dei tutorial
switch(document.title) {
    case 'AppLab Tutorial':
        document.addEventListener('DOMContentLoaded', function () {
            // Fai una richiesta al server per ottenere i dati dei tutorial
            fetch('http://localhost:3000/tutorial')
                .then(response => {
                    // Verifica se la risposta del server è ok
                    if (!response.ok) {
                        throw new Error('Errore durante il recupero dei dati dei tutorial');
                    }
                    // Parsa la risposta in formato JSON
                    return response.json();
                })
                .then(data => {
                    // Manipola i dati ottenuti e renderli nella pagina web
                    renderTutorial(data);
                })
                .catch(error => {
                    // Gestisci eventuali errori
                    console.error('Si è verificato un errore:', error);
                });

            function renderTutorial(listatutorial) {
                const container = document.getElementById('grid');

                // Cicla attraverso i tutorial e crea un elemento per ciascuno
                listatutorial.forEach(tutorial => {
                    const tutorialElement = document.createElement('div');
                    tutorialElement.classList.add('card'); // Aggiungi la classe .card
                    tutorialElement.onclick = function() {
                        location.href = 'subtutorial.html?titolo=' + tutorial.Titolo;
                    };

                    // Costruisci il contenuto HTML del tutorial
                    const tutorialHTML = `
                        <img class="book_cover" src="${tutorial.Pathimg}">
                        <p class="didascalia">${tutorial.Descrizione}</p>
                        <h4 class="titolo" >${tutorial.Titolo}</h4>
                    `;

                    // Imposta il contenuto HTML del tutorial
                    tutorialElement.innerHTML = tutorialHTML;

                    // Aggiungi il tutorial al contenitore
                    container.appendChild(tutorialElement);
                });
            }
        });
        break;

    case 'AppLab Subtutorial':
        document.addEventListener('DOMContentLoaded', function () {
            // Fai una richiesta al server per ottenere i dati dei tutorial
            fetch('http://localhost:3000/subtutorial?' + new URLSearchParams(window.location.search).toString())
                .then(response => {
                    // Verifica se la risposta del server è ok
                    if (!response.ok) {
                        throw new Error('Errore durante il recupero dei dati dei subtutorial');
                    }
                    // Parsa la risposta in formato JSON
                    return response.json();
                })
                .then(data => {
                    // Manipola i dati ottenuti e renderli nella pagina web
                    console.log(data);
                    renderSubtutorial(data);
                })
                .catch(error => {
                    // Gestisci eventuali errori
                    console.error('Si è verificato un errore:', error);
                });

            function renderSubtutorial(listasubtutorial) {
                const container = document.getElementById('list');

                // Cicla attraverso i subtutorial e crea un elemento per ciascuno
                listasubtutorial.forEach(subtutorial => {
                    const subtutorialElement = document.createElement('div');
                    subtutorialElement.classList.add('chapter'); // Aggiungi la classe .chapter

                    // Costruisci il contenuto HTML del subtutorial
                    const subtutorialHTML = `
                        <h3 class="titolo">${subtutorial.Titolo}</h3>
                        <div class="pulsanti">
                            <button class="slides" href="${subtutorial.PathPresentazione}">Slides</button>
                            <button class="esercizi" href="${subtutorial.PathEsercizi}">Esercizi</button>
                        </div>
                        <p class="didascalia">${subtutorial.Descrizione}</p>
                    `;

                    // Imposta il contenuto HTML del tutorial
                    subtutorialElement.innerHTML = subtutorialHTML;

                    // Aggiungi il tutorial al contenitore
                    container.appendChild(subtutorialElement);
                });
            }
        });
        break;
    
    case 'Upload':
        document.addEventListener('DOMContentLoaded', function () {
            // Fai una richiesta al server per ottenere i dati dei tutorial
            fetch('http://localhost:3000/list-tutorial')
                .then(response => {
                    // Verifica se la risposta del server è ok
                    if (!response.ok) {
                        throw new Error('Errore durante il recupero dei dati dei subtutorial');
                    }
                    // Parsa la risposta in formato JSON
                    return response.json();
                })
                .then(data => {
                    // Manipola i dati ottenuti e renderli nella pagina web
                    listaTutorial(data);
                })
                .catch(error => {
                    // Gestisci eventuali errori
                    console.error('Si è verificato un errore:', error);
                });

            function listaTutorial(elencotutorial) {
                const mySelect = document.getElementById('tutorial');

                // Cicla attraverso i subtutorial e crea un elemento per ciascuno
                elencotutorial.forEach(tutorial => {
                    const option = document.createElement('option');
                    option.value = tutorial.Titolo;
                    option.text = tutorial.Titolo;
                    mySelect.add(option);
                });
            }
        });
        break;

    default:
        console.error('Errore: titolo della pagina non riconosciuto');
        break;
}