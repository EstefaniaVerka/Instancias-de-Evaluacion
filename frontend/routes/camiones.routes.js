const router = require('express').Router();
const path = require('path');

// Listar camiones --> /trucks
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/camiones/listarCamion.html'));
})

// Crear camion --> /trucks/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/camiones/crearCamion.html'));
})

// Editar camion --> /trucks/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/camiones/editarCamion.html'));
})

module.exports = router;