const router = require('express').Router()
const { Paquete } = require('../database/models')

router.get("/:id", (req, res) => {
    Paquete.findByPk(req.params.id).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Paquete.findAll({}).then(list => {
        res.json(list)
    })
})

router.post("/create", (req, res) => {
    Paquete.create({
        destinatario: req.body.destinatario,
        direcciondeldestinatario: req.body.direcciondeldestinatario,
        descripcion: req.body.descripcion
    }).then(paquete => {
        res.json(paquete)
    }).catch(error => {
        res.json(error)
    })
})

router.put('/update/:id', (req, res) => {
    Paquete.update({
        destinatario: req.body.destinatario,
        direcciondeldestinatario: req.body.direcciondeldestinatario,
        descripcion: req.body.descripcion
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
    Paquete.destroy({
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