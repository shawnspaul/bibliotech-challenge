module.exports = function(connection,DataTypes) {
	const User = connection.define('user', 
		{
			institution: {
				type: DataTypes.INTEGER,
				validate: {
					notEmpty: true,
				}
			},
			name: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				}
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					isEmail: true,
					notEmpty: true,
				}
			},
			role: {
				type: DataTypes.STRING,
				validate: {
					isIn: {
						args: [['student','academic','administrator']],
						msg: "Role must be one of the following: student,academic, or administrator",
						notEmpty: true,
					},
				}
			},
			password: {
				type:DataTypes.STRING,
			},
		},
		{
			indexes: [
			    {
			    	unique: true,
			    	name: 'by_email',
			    	fields: ['email'],
			    },
			    {
			    	name: 'by_instituation',
			    	fields: ['institution'],
			    },
		    ]
		}
	);
	return User;
}