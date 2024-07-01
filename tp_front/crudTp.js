class Book{

    constructor(id,titulo,autor,rating,fechaLanzamiento,comentario){
        this.id=id;
        this.titulo=titulo;
        this.autor=autor;
        this.rating=rating;
        this.fechaLanzamiento=fechaLanzamiento;
        this.comentario=comentario
    }

}


function showbooks(){
    
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let books = JSON.parse(localStorage.getItem('books')) || [];

    //buscar elemento HTML donde quiero insertar las libros
    const tbodybooks = document.querySelector('#list-table-books tbody');
    // const tbodybooks = document.getElementById('#tbody-table-books');
    //limpio el contenido de la tabla
    tbodybooks.innerHTML = '';
    books.forEach(book => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
                        <td>${book.titulo}</td>
                        <td>${book.autor}</td>
                        <td>${book.rating}</td>
                        <td>${book.fechaLanzamiento}</td>
                        <td>
                            <img src="${book.comentario}" alt="${book.titulo}" width="30%">
                        </td>
                        <td>
                            <button class="btn-cac" onclick='updatebook(${book.id})'><i class="fa fa-pencil" ></button></i>
                            <button class="btn-cac" onclick='deletebook(${book.id})'><i class="fa fa-trash" ></button></i>
                        </td>
                    </tr>
        `;
        tbodybooks.insertAdjacentHTML('beforeend',tr);
    });

}

/**
 * funcion que permite agregar o modificar una libro al listado de libros
 * almacenado en el localstorage
 */
function saveBook(){
    
    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#form-book');

    //obtengo los inputs del formulario
    const inputId = document.querySelector('#id-books');
    const inputTitulo = document.querySelector('#titulo');
    const inputAutor = document.querySelector('#autor');
    const inputRating = document.querySelector('#rating');
    const inputFechaLanzamiento = document.querySelector('#release-date');
    const inputComentario = document.querySelector('#opinion-form');

    //Realizo una validación simple de acuerdo al contenido del value del input del titulo
    if(inputTitulo.value.trim() !== ''){
        //Busca en localstorage el item books, si no existe asigna el array vacio.
        let books = JSON.parse(localStorage.getItem('books')) || [];

        //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputId.value!==""){
            //Busco dentro del arraya de books el objeto a editar
            const bookFind = books.find(book => book.id == inputId.value);
            //Si existe actualizo el objeto
            if (bookFind) {
              bookFind.titulo = inputTitulo.value;
              bookFind.autor = inputAutor.value;
              bookFind.rating = inputRating.value;
              bookFind.fechaLanzamiento = inputFechaLanzamiento.value;
              bookFind.comentario = inputComentario.value;
            }
        }else{
            let newBook = new Book(
                books.length+1,
                inputTitulo.value,
                inputAutor.value,
                inputRating.value,
                inputFechaLanzamiento.value,
                inputComentario.value,
            );
            books.push(newBook);
        }

        //Se actualiza el array de libros en el localstorage
        localStorage.setItem('books',JSON.stringify(books));
        showbooks();
        //Se limpian los inputs del formulario
        form.reset();
        Swal.fire({
            titulo: 'Exito!',
            text: 'Operacion exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }else{
        Swal.fire({
            titulo: 'Error!',
            text: 'Por favor completa el campo Titulo.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }

}

/**
 * Funcion que permite cargar el formulario para editar un libro
 * de acuedo al id del libro
 * @param {number} bookId id book que se va a actualizar
 */
function updatebook(bookId){
    let books = JSON.parse(localStorage.getItem('books'));
    //se utiliza el metodo find para poder asegurarnos que exista un libro con el id que queremos eliminar.
    let bookToUpdate = books.find(book => book.id===bookId);
    if(bookToUpdate){
        //Se buscan los elementos HTML del input
        const inputId = document.querySelector('#id-book');
        const inputTitulo = document.querySelector('#titulo');
        const inputAutor = document.querySelector('#autor');
        const inputRating = document.querySelector('#rating');
        const inputFechaLanzamiento = document.querySelector('#release-date');
        const inputComentario = document.querySelector('#comentario-form');
        //Se cargan los inputs con los valores de la libro encontrada
        inputId.value = bookToUpdate.id;
        inputTitulo.value = bookToUpdate.titulo;
        inputAutor.value = bookToUpdate.autor;
        inputRating.value = bookToUpdate.rating;
        inputFechaLanzamiento.value = bookToUpdate.fechaLanzamiento;
        inputComentario.value = bookToUpdate.comentario;
    }
}

/**
 * Function que permite eliminar una libro del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} bookId id book que se va a eliminar
 */
function deletebook(bookId){
    let books = JSON.parse(localStorage.getItem('books'));
    //se utiliza el metodo find para poder asegurarnos que exista una libro con el id que queremos eliminar.
    let bookToDelete = books.find(book => book.id===bookId);
    if(bookToDelete){
        //se utiliza el metodo filter para actualizar el array de books, sin tener el elemento encontrado en cuestion.
        books = books.filter(book => book.id !== bookToDelete.id);
        //se actualiza el localstorage
        localStorage.setItem('books',JSON.stringify(books));
        showbooks();
        Swal.fire({
            titulo: 'Exito!',
            text: 'La libro fue eliminada.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }
}

// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSavebook = document.querySelector('#btn-save-book');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSavebook.addEventListener('click',saveBook);
    showbooks();
});