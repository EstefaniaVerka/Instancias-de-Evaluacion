const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Provincia extends Model {}

Provincia.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    codigo: DataTypes.STRING,

}, {
    sequelize,
    modelName: 'provincia',
    tableName: 'provincias'
})

module.exports = Provincia