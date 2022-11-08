const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Paquete extends Model {}

Paquete.init({
    destinatario: DataTypes.STRING,
    direcciondeldestinatario: DataTypes.STRING,
    descripcion: DataTypes.STRING
}, {
    sequelize,
    modelName: 'paquete',
    tableName: 'paquetes'
})

module.exports = Paquete