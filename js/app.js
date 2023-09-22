let currentPage = 1; // Página actual
let totalPages = 1000; 
let apiUrl = 'https://rickandmortyapi.com/api/character'; // URL de la API
function loadCharacters(url) {
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    displayCharacters(data);
      });
}
 
function displayCharacters(data) {
  const main = document.querySelector('main');
  main.innerHTML = ''; // Limpiar el contenido actual

  data.results.forEach(personaje => {
    const article = document.createRange().createContextualFragment(
      `
        <article>
          <div class="image-container">
            <img src="${personaje.image}" alt="Personaje">
          </div>

          <h2>${personaje.name}</h2>
          <span>Gender: ${personaje.gender}</span><br>
          <span>Species: ${personaje.species}</span><br>
          <span>Status: ${personaje.status}</span><br>
          <span>Origin: ${personaje.origin.name}</span><br>
        </article>
      `
    );

    main.append(article);
  });
}

// Función para cargar la página siguiente
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    const nextPageUrl = `${apiUrl}?page=${currentPage}`;
    loadCharacters(nextPageUrl);
  }
}

// Función para cargar la página anterior
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    const prevPageUrl = `${apiUrl}?page=${currentPage}`;
    loadCharacters(prevPageUrl);
  }
}
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

nextButton.addEventListener('click', nextPage);
prevButton.addEventListener('click', prevPage);

// Cargar los personajes de la página actual al cargar la página
loadCharacters(apiUrl);
