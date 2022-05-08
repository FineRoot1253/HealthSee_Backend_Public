module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "exerciselist",
      {
        EX_Name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            comment: "null",
          },
          EX_KO_Name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            comment: "null",
          },
        Review_Count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: "null",
          },
        Review_AVG: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: "null",
        }
      },
      {
        tableName: "exerciselist",
        timestamps: false,
      }
    );
  };
  