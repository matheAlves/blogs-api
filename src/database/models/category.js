/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize, DataTypes) => {  
  const model = sequelize.define("Category", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  }, { 
    timestamps: false,
    tableName: 'Categories'
  });


  return model;
};