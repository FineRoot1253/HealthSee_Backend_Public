/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('album', {
		AL_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		AL_Thumbnail: {
			type: DataTypes.BLOB("long"),
			allowNull: false,
		  },
        AL_Creation_Date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		AL_Content: {
			type: DataTypes.STRING(1000),
			allowNull: false
		},
		AL_Scope: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: "0",
          },
        Account_AC_NickName: {
        type: DataTypes.STRING(16),
        allowNull: false,
        primaryKey: true,
            references: {
                model: 'account',
                key: 'AC_NickName'
            }
        }
	}, {
		tableName: 'album',
		timestamps: false,
	});
};
