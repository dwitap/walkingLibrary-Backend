"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Books extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Books.hasMany(models.Items)
            Books.hasMany(models.Carts)
            // define association here
        }
    }
    Books.init(
        {
            title: DataTypes.STRING,
            author: DataTypes.STRING,
            release_year: DataTypes.STRING,
            ISBN: DataTypes.STRING,
            publisher: DataTypes.STRING,
            genre: DataTypes.STRING,
            pages: DataTypes.INTEGER,
            language: DataTypes.STRING,
            stock: DataTypes.INTEGER,
            image_url: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Books",
        }
    )
    return Books
}
