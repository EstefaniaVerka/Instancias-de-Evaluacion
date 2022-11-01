const router = require('express').Router()
const { Provincia } = require('../database/models')

router.get("/:id", (req, res) => {
    Provincia.findByPk(req.params.id).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Provincia.findAll({}).then(list => {
        res.json(list)
        })
})

router.post("/create", (req, res) => {
    Provincia.create({
        nombre: req.body.nombre,
        codigo: req.body.codigo

    }).then(provincia => {
        res.json(provincia)
    }).catch(error => {
        res.json(error)
    })
})



router.put('/update/:id', (req, res) => {
    Provincia.update({
        nombre: req.body.nombre,
        codigo: req.body.codigo
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
    Provincia.destroy({
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