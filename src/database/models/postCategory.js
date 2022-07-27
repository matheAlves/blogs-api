const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  postId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'BlogPosts',
      key: 'id'
    }
  },
  categoryId: { 
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const postCategory = sequelize.define('PostCategory', attributes, {
    tableName: 'PostCategories',
    timestamps: false,
  });

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: postCategory,
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: postCategory,
    });
  };
  return postCategory;
};