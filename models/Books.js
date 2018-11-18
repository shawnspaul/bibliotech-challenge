module.exports = function(connection,DataTypes) {
	const Books = connection.define('books', 
		{
			institutions: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				validate: {
					notEmpty: true,
				}
			},
			isbn: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				}
			},
			title: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: true,
				}
			},
			author: {
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
			      fields: ['isbn'],
			    },
			    {
			    	name: 'by_institution',
			    	fields: ['institutions'],
			    },
		    ]
		}
	);

	return Books;
};