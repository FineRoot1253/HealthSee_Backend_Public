/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('boardlist', {
		BO_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0',
			primaryKey: true,
		},	
		BO_Writer_NickName: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		BO_Title: {
			type: DataTypes.STRING(60),
			allowNull: false
		},
		BO_Hit: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0'
		},
		BO_Creation_Date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		BO_Comment_Count: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		BO_Healthsee_Count: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		BO_Report_Count: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		BO_State: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: "0",
		  }
	}, {
		tableName: 'boardlist',
		timestamps: false,
	});
};
