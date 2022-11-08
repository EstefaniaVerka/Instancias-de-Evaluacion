
const { Paquete, Provincia} = require('./models')

Provincia.hasMany(Paquete, { foreignKey: 'provinciaId', as: 'paquete' })
Paquete.belongsTo(Provincia, { foreignKey: 'provinciaId', as: 'provincia' })

//Camionero.hasMany(Paquete,{ foreignKey: 'camioneroId' })
//Paquete.belongsTo(Camionero,{ foreignKey: 'camioneroId' })





  //este archivo no lo entiendo