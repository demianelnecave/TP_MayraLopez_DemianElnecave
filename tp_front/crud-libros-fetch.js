const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {                  // recolecto los datos de la bb dd desde el front
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de libros
 * por medio del uso de template string de JS.
 */
async function showbooks(){
    let books =  await fetchData(BASEURL+'/api/books/', 'GET');
    const tablebooks = document.querySelector('#tbody-table-mercadoLibros');
    tablebooks.innerHTML='';
    books.forEach((book, index) => {
      let tr = `<tr>
                    <td>${book.title}</td>
                    <td>${book.autor}</td>
                    <td>${book.release_date}</td>
                    <td>${book.rating}</td>
                    <td>
                        <img src="${book.banner}" width="30%">
                    </td>
                    <td>
                        <button class="animated-button" onclick='updatebook(${book.id_book})'><i class="fa fa-pencil" ></button></i>
                        <button class="animated-button" onclick='deletebook(${book.id_book})'><i class="fa fa-trash" ></button></i>
                    </td>
                  </tr>`;
      tablebooks.insertAdjacentHTML("beforeend",tr);
    });
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de libro
 * @returns 
 */
async function savebook(){
    const idbook = document.querySelector('#id-books').value;
    const title = document.querySelector('#title-form').value;
    const autor = document.querySelector('#autor-form').value;
    const releaseDate = document.querySelector('#release-date-form').value;
    const rating = document.querySelector('#rating-form').value;
    const banner = document.querySelector('#banner-form').value;
    //VALIDACION DE FORMULARIO
    if (!title || !autor || !releaseDate || !rating || !banner) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos del libro
    const bookData = {
        title: title,
        autor: autor,
        release_date: releaseDate,
        rating: rating,
        banner: banner,
    };
  let result = null;
  // Si hay un idbook, realiza una petición PUT para actualizar la película existente
  if(idbook!==""){
    result = await fetchData(`${BASEURL}/api/books/${idbook}`, 'PUT', bookData);
  }else{
    // Si no hay idbook, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/books/`, 'POST', bookData);
  }
  
  const formbooks = document.querySelector('#form-books');
  formbooks.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showbooks();
}


/**
 * Function que permite eliminar un libro del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deletebook(id){
    Swal.fire({
        title: "Esta seguro de eliminar el libro?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed) {
          let response = await fetchData(`${BASEURL}/api/books/${id}`, 'DELETE');
          showbooks();
          Swal.fire(response.message, "", "success");
        }
    });
    
}

/**
 * Function que permite cargar el formulario con los datos de el libro 
 * para su edición
 * @param {number} id Id de el libro que se quiere editar
 */
async function updatebook(id){
    //Buscamos en el servidor el libro de acuerdo al id
    let response = await fetchData(`${BASEURL}/api/books/${id}`, 'GET');
    const idbook = document.querySelector('#id-books');
    const title = document.querySelector('#title-form');
    const autor = document.querySelector('#autor-form');
    const releaseDate = document.querySelector('#release-date-form');
    const rating = document.querySelector('#rating-form');
    const banner = document.querySelector('#banner-form');
    
    idbook.value = response.id_book;
    title.value = response.title;
    autor.value = response.autor;
    releaseDate.value = response.release_date;
    rating.value = response.rating;
    banner.value = response.banner;
}

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const formSaveBook = document.querySelector('#form-books');
    // //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    formSaveBook.addEventListener('submit',savebook);
    showbooks();
});
  