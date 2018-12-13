module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    game_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [6, 24]
      }
    },
    area: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
   
    
  });
  Game.associate = models => {
      Game.belongsTo(models.Character,{
        foreignKey: {
        allowNull: true
      }})
  }
  return Game;
};
