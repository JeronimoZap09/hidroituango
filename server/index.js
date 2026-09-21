const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../')));

// Ruta para leer los datos del archivo db.json
app.get('/api/personal', (req, res) => {
  try {
    const rutaDb = path.join(__dirname, '../db.json');
    const rawData = fs.readFileSync(rutaDb, 'utf8');
    const data = JSON.parse(rawData);
    
    res.json(data.personal);
  } catch (error) {
    console.error('Error al leer db.json:', error);
    res.status(500).json({ mensaje: 'Error al obtener la información del personal' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});