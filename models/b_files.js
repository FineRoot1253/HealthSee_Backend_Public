/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "b_files",
    {
      BF_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      BF_Name: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      BF_Type: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      BF_Files: {
        type: DataTypes.BLOB("long"),
        allowNull: true,
      },
      Board_BO_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "board",
          key: "BO_Code",
        },
      },
    },
    {
      tableName: "b_files",
      timestamps: false,
    }
  );
};
