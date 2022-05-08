/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ac_blacklist', {
		ACB_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		ACB_Blacklist_NickName: {
			type: DataTypes.STRING(16),
			allowNull: false
		},
		ACB_Creation_Date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		A_Comment_ACO_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'a_comment',
				key: 'ACO_Code'
			}
		},
		A_Comment_Album_AL_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'a_comment',
				key: 'Album_AL_Code'
			}
		}
	}, {
		tableName: 'ac_blacklist',
		timestamps: false,
	});
};
