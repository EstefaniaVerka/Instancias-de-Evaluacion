const router = require('express').Router();
const path = require('path');

// Listar paquetes --> /packages
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/listarPaquete.html'));
})

// Crear paquete --> /package/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/crearPaquete.html'));
})

// Editar paquete --> /packages/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/editarPaquete.html'));
})

module.exports = router;