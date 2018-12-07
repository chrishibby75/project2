module.exports = (sequelize, DataTypes)=>{
    var Character = sequelize.define("Character", {
        character_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1,100]
            }
        },
        gold: {
            type: DataTypes.INTEGER,
            defaultValue: 2000,
        },
        assets: {
            type: DataTypes.STRING,
            defaultValue: 0
        },
        potion: {
            type: DataTypes.String,
            defaultValue: 0
        },
        food: {
            type: DataTypes.STRING,
            defaultValue: 0
        }

    })
    Character.hasOne(models.Game);
    return Character
}