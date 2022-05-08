/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('bc_reporter', {
		BCR_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		BCR_Reporter_NickName: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		BCR_Creation_Date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		B_Comment_BC_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'b_comment',
				key: 'BC_Code'
			}
		},
		B_Comment_Board_BO_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'b_comment',
				key: 'Board_BO_Code'
			}
		}
	}, {
		tableName: 'bc_reporter',
		timestamps: false,
	});
};
