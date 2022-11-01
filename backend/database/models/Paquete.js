const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Paquete extends Model {}

Paquete.init({
    destinatario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    direcciondeldestinatario: DataTypes.STRING,
    descripcion: DataTypes.STRING
}, {
    sequelize,
    modelName: 'paquete',
    tableName: 'paquetes'
})

module.exports = Paquete