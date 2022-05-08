/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('b_healthsee', {
		BH_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		BH_Push_NickName: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		BH_Creation_Date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		Board_BO_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'board',
				key: 'BO_Code'
			}
		}
	}, {
		tableName: 'b_healthsee',
		timestamps: false
	});
};