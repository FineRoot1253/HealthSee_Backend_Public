module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "exerciseview",
      {
        EX_Name: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
          comment: "null",
        },
        // EX_Video: {
        //   type: DataTypes.STRING(45),
        //   allowNull: false,
        //   comment: "null",
        // },
        EX_Description: {
          type: DataTypes.STRING(1000),
          allowNull: false,
          comment: "null",
        },
        EX_Creation_Date: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "null",
        },
        EX_Update_Date: {
          type: DataTypes.DATE,
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
        tableName: "exerciseview",
        timestamps: false,
      }
    );
  };
  