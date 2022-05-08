module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "exerciserate",
      {
        EX_Name: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
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
        },
        One_Count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: "null",
        },
        Two_Count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: "null",
        },
        Three_Count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: "null",
        },
        Four_Count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: "null",
        },
        Five_Count: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            comment: "null",
        },
      },
      {
        tableName: "exerciserate",
        timestamps: false,
      }
    );
  };
  