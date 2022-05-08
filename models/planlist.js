/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('planlist', {
		PL_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '0',
			primaryKey: true,
		},	
		PL_Writer_NickName: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		PL_Title: {
			type: DataTypes.STRING(60),
			allowNull: false
		},
		PL_Creation_Date: {
			type: DataTypes.DATE,
			allowNull: false
        },
        PL_Routin: {
            type: DataTypes.STRING(2000),
            allowNull: false
        },
        PL_Scope: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        P_Healthsee_Count: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
        P_Report_Count: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		P_Evaluation_Count: {
			type: DataTypes.BIGINT,
			allowNull: true
        },
	}, {
		tableName: 'planlist',
		timestamps: false,
	});
};
