const router = require('express').Router()
const camioneroRouter = require('./Camionero.routes')
const paqueteRouter = require('./Paquete.routes')
const provinciaRouter = require('./Provincia.routes')
const camionRouter = require('./Camion.routes')

router.use('/camioneros', camioneroRouter)
router.use('/paquetes', paqueteRouter)
router.use('/provincias', provinciaRouter)
router.use('/camiones', camionRouter)

module.exports = router;