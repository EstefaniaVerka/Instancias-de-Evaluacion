const router = require('express').Router();
const path = require('path');

// Listar provincias --> /provinces
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/listarProvincia.html'));
})

// Crear provincia --> /provinces/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/crearProvincia.html'));
})

// Editar provincia --> /provinces/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/editarProvincia.html'));
})

module.exports = router;