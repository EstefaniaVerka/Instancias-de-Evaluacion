const router = require('express').Router()
const { Camionero } = require('../database/models')

router.get("/:id", (req, res) => { // es un get que te reconoce al ID
    Camionero.findByPk(req.params.id).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Camionero.findAll({}).then(list => {
        res.json(list)
    })
})


router.post("/create", (req, res) => {
    Camionero.create({
        dni: req.body.dni,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        salario: req.body.salario,
        poblacion: req.body.poblacion
    }).then(camionero => { 
        res.json(camionero) 
    }).catch(error => {
        res.json(error)
    })
})

router.put('/update/:id', (req, res) => {
    Camionero.update({
        dni: req.body.dni,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        salario: req.body.salario,
        poblacion: req.body.poblacion
    }, {
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

router.delete('/delete/:id', (req, res) => {
    Camionero.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

module.exports = router