/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "a_picture",
    {
      AP_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      AP_Picture: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      },
      AP_Picture_Type: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      Album_AL_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "album",
          key: "AL_Code",
        },
      },
    },
    {
      tableName: "a_picture",
      timestamps: false,
    }
  );
};
