module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("blogs", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,  
      allowNull: false,
    },

    userEmail:{
      type:DataTypes.STRING
    },

    img: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
  });

  return Blog;
};
