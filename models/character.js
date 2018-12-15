module.exports = (sequelize, DataTypes)=>{
    var Character = sequelize.define("Character", {
        character_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:[1,100]
            }
        },
        sleepy:{
            type:DataTypes.STRING,
            defaultValue: "yes"
        },
        hp: {
            type: DataTypes.INTEGER,
            defaultValue: 100
        },
        gold: {
            type: DataTypes.INTEGER,
            defaultValue: 2000,
        },
        assets: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        potion: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        food: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        },
    {
        timestamps: false
    })
    Character.associate = models => {
    Character.hasOne(models.Game);
    }
    return Character
}