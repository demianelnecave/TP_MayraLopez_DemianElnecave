const express = require('express');
const app = express();
const PORT = 3300;

app.use(express.json());

app.post('/api/books', (req, res) => {
  console.log('Datos del nuevo libro:', req.body);
  res.json({ message: 'Libro creado exitosamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
}); 
//En la terminal, ejecuta el siguiente comando para iniciar el servidor:
node server.js
