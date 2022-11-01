const router = require('express').Router();
const path = require('path');

const camionerosRouter = require('./camioneros.routes')
const paquetesRouter = require('./paquetes.routes')
const provinciasRouter = require('./provincias.routes')
const camionesRouter = require('./camiones.routes')

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
})

router.use('/drivers', camionerosRouter)
router.use('/packages', paquetesRouter)
router.use('/provinces', provinciasRouter)
router.use('/trucks', camionesRouter)

module.exports = router;