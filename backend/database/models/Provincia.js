const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Provincia extends Model {}

Provincia.init({
    nombre: DataTypes.STRING,
    codigo: DataTypes.STRING,

}, {
    sequelize,
    modelName: 'provincia',
    tableName: 'provincias'
})

module.exports = Provincia