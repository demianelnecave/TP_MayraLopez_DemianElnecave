fetch('http://localhost:3300/api/books/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Nuevo Libro',
    author: 'Autor Nuevo',
    date: 'Fecha de Lanzamiento',
    Rating: 'rating',
    Comentario: 'banner',
    // Puedes agregar más campos según tu modelo de datos
  }),
})
.then(response => response.json())
.then(data => {
  console.log('Libro creado:', data);
})
.catch(error => {
  console.error('Error al crear libro:', error);
});
//Para crear un nuevo libro, se usa una solicitud POST con la Fetch API//
