/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize, DataTypes) => {  
  const user = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, { 
    timestamps: false,
    tableName: 'Users'
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost,
      { foreignKey: 'id', as: 'user' });
  };

  return user;
};