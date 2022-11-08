const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Camionero extends Model {}

Camionero.init({
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nombre: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    salario: DataTypes.STRING,
    poblacion: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'camionero',
    tableName: 'camioneros'
})

module.exports = Camionero