const router = require('express').Router();
const path = require('path');

// Listar camioneros --> /drivers
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/camioneros/listarCamionero.html'));
})

// Crear camionero --> /drivers/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/camioneros/crearCamionero.html'));
})

// Editar camionero --> /drivers/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/camioneros/editarCamionero.html'));
})

module.exports = router;