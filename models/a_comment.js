/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('a_comment', {
		ACO_Code: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
        },
        ACO_Writer_NickName: {
			type: DataTypes.STRING(16),
			allowNull: false
        },
        ACO_Content: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
        ACO_Creation_Date: {
			type: DataTypes.DATE,
			allowNull: false
        },
        ACO_State: {
			type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: "0",
        },
        Album_AL_Code: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
            references: {
                model: 'album',
                key: 'AL_Code'
            }
        },
        Album_Account_AC_NickName: {
            type: DataTypes.STRING(16),
            allowNull: false,
            primaryKey: true,
                references: {
                    model: 'album',
                    key: 'Account_AC_NickName'
                }
            }
	}, {
		tableName: 'a_comment',
		timestamps: false,
	});
};
