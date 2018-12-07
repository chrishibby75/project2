module.exports = (sequelize, DataTypes) => {
    var Store = sequelize.define('Store', {
        potion: {
            type: DataTypes.INTEGER,
            defaultValue: 5,
            price: 300
        },
        food: {
            type: DataTypes.INTEGER,
            defaultValue: 5,
            price: 250
        },
        weapons: {
            type: DataTypes.INTEGER,
            defaultValue: 2,
            price: 600
        }
    })
    return Store
}