const router = require('express').Router()
const { Camion } = require('../database/models')

router.get("/:id", (req, res) => {
    Camion.findByPk(req.params.id).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Camion.findAll({}).then(list => {
        res.json(list)
    })
})

router.post("/create", (req, res) => {
    Camion.create({
        matricula: req.body.matricula,
        modelo: req.body.modelo,
        tipo: req.body.tipo,
        potencia: req.body.potencia,
    }).then(camion => {
        res.json(camion)
    }).catch(error => {
        res.json(error)
    })
})

router.put('/update/:id', (req, res) => {
    Camion.update({
        matricula: req.body.matricula,
        modelo: req.body.modelo,
        tipo: req.body.tipo,
        potencia: req.body.potencia,
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
    Camion.destroy({
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