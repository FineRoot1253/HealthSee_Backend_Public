module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
      "member_view",
      {
        ME_Code: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        Account_AC_NickName: {
          type: DataTypes.STRING(16),
          allowNull: false,
          primaryKey: true,
          // references: {
          //   model: "account",
          //   key: "AC_NickName",
  
          // },
        },
        ME_Weight: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: "0",
        },
        ME_Height: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: "0",
        },
        ME_Gender: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: "1",
        },
        ME_Scope: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: "0",
        },
        ME_Board_Count : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        ME_My_Album_Count : {
          type : DataTypes.INTEGER,
          allowNull : false,
      },
      ME_Others_Album_Count : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
        ME_Birth: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        ME_Profile_Photo: {
          type: DataTypes.BLOB("long"),
          allowNull: true,
        },
        ME_Profile_Type: {
          type: DataTypes.STRING(16),
          allowNull: true,
        },
      },
      {
        tableName: "member_view",
        timestamps: false,
      }
    );
  };
