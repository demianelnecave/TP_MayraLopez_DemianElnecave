function showBooksTemplate() {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const tableBooks = document.querySelector('#list-table-mercadoLibros tbody');
    tableBooks.innerHTML = '';
    books.forEach((book, index) => {
        let tr = `<tr>
                    <td>${book.title}</td>
                    <td>${book.autor}</td>
                    <td>${book.release_date}</td>
                    <td>${book.rating}</td>
                    <td>${book.opinion}</td>
                    <td>
                        <button class="btn-cac" onclick='updateBook(${book.id})'><i class="fa fa-pencil"></i></button>
                        <button class="btn-cac" onclick='deleteBookAlert(${book.id})'><i class="fa fa-trash"></i></button>
                    </td>
                </tr>`;
        tableBooks.insertAdjacentHTML("beforeend", tr);
    });
}

function saveBook(event) {
    event.preventDefault();
    const form = document.querySelector('#form-books');

    const inputId = document.querySelector('#id-books');
    const inputTitle = document.querySelector('#title');
    const inputAutor = document.querySelector('#autor');
    const inputReleaseDate = document.querySelector('#release-date');
    const inputRating = document.querySelector('#rating');
    const inputOpinion = document.querySelector('#opinion-form');

    if (inputTitle.value && inputAutor.value && inputReleaseDate.value && inputRating.value && inputOpinion.value) {
        let books = JSON.parse(localStorage.getItem('books')) || [];

        if (inputId.value) {
            let bookFind = books.find(book => book.id == inputId.value);
            if (bookFind) {
                bookFind.title = inputTitle.value;
                bookFind.autor = inputAutor.value;
                bookFind.release_date = inputReleaseDate.value;
                bookFind.rating = inputRating.value;
                bookFind.opinion = inputOpinion.value;
            }
        } else {
            let newBook = {
                id: books.length + 1,
                title: inputTitle.value,
                autor: inputAutor.value,
                release_date: inputReleaseDate.value,
                rating: inputRating.value,
                opinion: inputOpinion.value,
            }
            books.push(newBook);
        }
        localStorage.setItem('books', JSON.stringify(books));
        showBooksTemplate();
        form.reset();
        Swal.fire({
            title: '¡Éxito!',
            text: 'Operación exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    } else {
        Swal.fire({
            title: '¡Error!',
            text: 'Por favor completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}

function updateBook(bookId) {
    let books = JSON.parse(localStorage.getItem('books'));
    let bookToUpdate = books.find(book => book.id === bookId);
    if (bookToUpdate) {
        const inputId = document.querySelector('#id-books');
        const inputTitle = document.querySelector('#title');
        const inputAutor = document.querySelector('#autor');
        const inputReleaseDate = document.querySelector('#release-date');
        const inputRating = document.querySelector('#rating');
        const inputOpinion = document.querySelector('#opinion-form');
        inputId.value = bookToUpdate.id;
        inputTitle.value = bookToUpdate.title;
        inputAutor.value = bookToUpdate.autor;
        inputReleaseDate.value = bookToUpdate.release_date;
        inputRating.value = bookToUpdate.rating;
        inputOpinion.value = bookToUpdate.opinion;
    }
}

function deleteBook(bookId) {
    let books = JSON.parse(localStorage.getItem('books'));
    books = books.filter(book => book.id !== bookId);
    localStorage.setItem('books', JSON.stringify(books));
    showBooksTemplate();
}

function deleteBookAlert(bookId) {
    let books = JSON.parse(localStorage.getItem('books'));
    let bookToDelete = books.find(book => book.id === bookId);

    if (bookToDelete) {
        Swal.fire({
            title: "¿Está seguro de eliminar el libro?",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                books = books.filter(book => book.id !== bookToDelete.id);
                localStorage.setItem('books', JSON.stringify(books));
                showBooksTemplate();
                Swal.fire("¡Libro Eliminado!", "", "success");
            }
        });
    } else {
        Swal.fire({
            title: '¡Error!',
            text: 'No se puede eliminar el libro.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const btnSaveBook = document.querySelector('#form-books');
    btnSaveBook.addEventListener('submit', saveBook);
    showBooksTemplate();
});
