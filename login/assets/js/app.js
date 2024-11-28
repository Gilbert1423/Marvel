const public_key = '6726c5c59ff8ae94387d8730ad24222a';
const private_key = 'b218222539876931dc456353e799476f9a934087';
const characte_url = 'https://gateway.marvel.com/v1/public/characters';
const comic_url = 'https://gateway.marvel.com/v1/public/comics';
const creadores_url = 'https://gateway.marvel.com/v1/public/creators';
const eventos_url = 'https://gateway.marvel.com/v1/public/events';
const series_url = 'https://gateway.marvel.com/v1/public/series';
const historias_url = 'https://gateway.marvel.com/v1/public/stories';
let offset = 0;
let currentUrl = characte_url; // Variable para almacenar la URL actual

const getData = async (url, offset = 0) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const hash = md5(timestamp + private_key + public_key);

    const response = await fetch(`${url}?ts=${timestamp}&apikey=${public_key}&hash=${hash}&offset=${offset}`);
    const data = await response.json();
    return data;
};

const updatePageTitle = (url) => {
    const pageTitle = document.getElementById('pageTitle');
    if (url === characte_url) {
        pageTitle.innerText = "Personajes";
    } else if (url === comic_url) {
        pageTitle.innerText = "Cómics";
    } else if (url === creadores_url) {
        pageTitle.innerText = "Creadores";
    } else if (url === eventos_url) {
        pageTitle.innerText = "Eventos";
    } else if (url === series_url) {
        pageTitle.innerText = "Series";
    } else if (url === historias_url) {
        pageTitle.innerText = "Historias";
    }
};

const updatePageNumber = () => {
    const pageNumber = document.getElementById('pageNumber');
    pageNumber.innerText = `Página ${Math.floor(offset / 20) + 1}`;
};

function addData(data, url) {
    const dataContainer = document.getElementById('data');
    dataContainer.innerHTML = ''; // Limpia el contenedor de datos

    dataContainer.innerHTML += '<h2 id="pageTitle"></h2>'; // Añade el elemento de título
    updatePageTitle(url); // Actualiza el título de la página

    data.forEach(item => {
        if (url === characte_url) {
            dataContainer.innerHTML += `
            <div class="card">
                <h2>${item.name}</h2>
                <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.name}">
                <p>${item.description || "No description available."}</p>
            </div>`;
        } else if (url === comic_url) {
            dataContainer.innerHTML += `
            <div class="card1">
                <h2>${item.title}</h2>
                <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.title}">
                <p>${item.series.name || "No series available."}</p>
                <p><strong>Issue Number:</strong> ${item.issueNumber}</p>
            </div>`;
        } else if (url === creadores_url) {
            dataContainer.innerHTML += `
            <div class="card2">
                <h2>${item.fullName}</h2>
                <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.fullName}">
                <p>${item.comics.available} comics available</p>
                <p>${item.stories.available} stories available</p>
            </div>`;
        } else if (url === eventos_url) {
            dataContainer.innerHTML += `
            <div class="card3">
                <h2>${item.title}</h2>
                <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.title}">
                <p>${item.description || "No description available."}</p>
                <p><strong>Start:</strong> ${item.start} <strong>End:</strong> ${item.end}</p>
            </div>`;
        } else if (url === series_url) {
            dataContainer.innerHTML += `
            <div class="card4">
                <h2>${item.title}</h2>
                <img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.title}">
                <p>${item.events.available} events available</p>
                <p><strong>Start Year:</strong> ${item.startYear} <strong>End Year:</strong> ${item.endYear}</p>
            </div>`;
        } else if (url === historias_url) {
            dataContainer.innerHTML += `
            <div class="card5">
                <h2>${item.title}</h2>
                <p><strong>Type:</strong> ${item.type}</p>
            </div>`;
        }
    });

    updatePageNumber(); // Actualiza el número de página
}

const loadContent = (url) => {
    currentUrl = url; // Actualiza la URL actual
    getData(url, offset).then(response => {
        document.getElementById('checkbox').checked = false;
        console.log(response.data.results);
        addData(response.data.results, url);
    });
};

// Event Listeners for menu items
document.getElementById('characters').addEventListener('click', () => loadContent(characte_url));
document.getElementById('comics').addEventListener('click', () => loadContent(comic_url));
document.getElementById('Creadores').addEventListener('click', () => loadContent(creadores_url));
document.getElementById('Eventos').addEventListener('click', () => loadContent(eventos_url));
document.getElementById('series').addEventListener('click', () => loadContent(series_url));
document.getElementById('Historias').addEventListener('click', () => loadContent(historias_url));

// Event Listeners for pagination
const prevBtn = document.getElementById('atras');
const nextBtn = document.getElementById('siguiente');

prevBtn.addEventListener('click', () => {
    if (offset >= 20) {
        offset -= 20;
        loadContent(currentUrl); // Usa la URL actual
    }
});

nextBtn.addEventListener('click', () => {
    offset += 20;
    loadContent(currentUrl); // Usa la URL actual
});

// Initial load
loadContent(characte_url);
