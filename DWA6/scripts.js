import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

import { QuerySelector } from './theme.js';


// Event Listeners
QuerySelector.searchCancelBtn.addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false;
});

QuerySelector.settingsCancelBtn.addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false;
});

QuerySelector.headerSearchBtn.addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
});

QuerySelector.headerSettingsBtn.addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true;
});

QuerySelector.listCloseBtn.addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false;
});


//Day & Night Mode
QuerySelector.settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }

    document.querySelector('[data-settings-overlay]').open = false;
});


//Search Button
// Function to filter books based on the provided filters
function filterBooks(books, filters) {
    const result = [];

    for (const book of books) {
        let genreMatch = filters.genre === 'any';

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) {
                genreMatch = true;
            }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === 'any' || book.author === filters.author) &&
            genreMatch
        ) {
            result.push(book);
        }
    }

    return result;
}

// Function to create a book preview element
function createBookPreviewElement(book, authors) {
    const { author, id, image, title } = book;
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

    return element;
}

// Function to render book previews to a target element (Search)
function renderBookPreviews(bookPreviews, targetElement) {
    const fragment = document.createDocumentFragment();
    for (const bookPreview of bookPreviews) {
        const element = createBookPreviewElement(bookPreview.book, bookPreview.authors);
        fragment.appendChild(element);
    }
    targetElement.innerHTML = '';
    targetElement.appendChild(fragment);
}

// Event listener for the search form submission
QuerySelector.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const filteredBooks = filterBooks(books, filters);

    if (filteredBooks.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show');
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show');
    }

    const bookPreviews = filteredBooks
        .slice(0, BOOKS_PER_PAGE)
        .map((book) => ({ book, authors }));

    renderBookPreviews(bookPreviews, QuerySelector.listItems);

    let page = 1;
    QuerySelector.listButton.enable = (filteredBooks.length - (page * BOOKS_PER_PAGE)) < 1;

    // Hide the overlay after search is clicked
    document.querySelector('[data-search-overlay]').open = false;
});


//Preview Books With More Details
QuerySelector.listItems.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
        if (active) break;

        if (node?.dataset?.preview) {
            let result = null;

            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook;
            }

            active = result;
        }
    }

    if (active) {
        document.querySelector('[data-list-active]').open = true;
        document.querySelector('[data-list-blur]').src = active.image;
        document.querySelector('[data-list-image]').src = active.image;
        document.querySelector('[data-list-title]').innerText = active.title;
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
        document.querySelector('[data-list-description]').innerText = active.description;
    }
});


(function () {
    function renderBookPreviews(books, container) {
        const fragment = document.createDocumentFragment();

        for (const { author, id, image, title } of books) {
            const element = createBookPreviewElement(author, id, image, title);
            fragment.appendChild(element);
        }

        container.appendChild(fragment);
    }

    function createBookPreviewElement(author, id, image, title) {
        const element = document.createElement('button');
        element.classList = 'preview';
        element.setAttribute('data-preview', id);

        const imageElement = document.createElement('img');
        imageElement.classList = 'preview__image';
        imageElement.src = image;
        element.appendChild(imageElement);

        const infoElement = document.createElement('div');
        infoElement.classList = 'preview__info';
        element.appendChild(infoElement);

        const titleElement = document.createElement('h3');
        titleElement.classList = 'preview__title';
        titleElement.innerText = title;
        infoElement.appendChild(titleElement);

        const authorElement = document.createElement('div');
        authorElement.classList = 'preview__author';
        authorElement.innerText = authors[author];
        infoElement.appendChild(authorElement);

        return element;
    }

    const matches = books.slice(0, BOOKS_PER_PAGE);
    const starting = document.createDocumentFragment();
    renderBookPreviews(matches, starting);
    document.querySelector('[data-list-items]').appendChild(starting);
})();



//Genre and Author filtre
const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    genreHtml.appendChild(element)
}

document.querySelector('[data-search-genres]').appendChild(genreHtml)

const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml)





//Show More
document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
document.querySelector('[data-list-button]') = (matches.length - (page * BOOKS_PER_PAGE)) > 0

document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`