module.exports = function(connection,DataTypes) {
	const Institution = connection.define('institution', 
		{
			name: {
				type: DataTypes.STRING,
				validate: {
					isAlphanumeric: true,
					notEmpty: true,
				}
			},
			url: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				}
			},
			email_domain: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				}
			},
		}, 
		{
		  indexes: [
			    {
			    	unique: true,
			    	name: 'by_email_domain',
			    	fields: ['email_domain'],
			    },
		    ]
		}
	);
	
	return Institution;
};