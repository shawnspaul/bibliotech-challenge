Instructions to run application

1. Create a postgres database
2. Store the connection information for the database in config/config.json
3. Create an .env file and set "ENVIRONMENT" equal to "development"
4. Run npm install
5. Run npm start (this will create the tables the database and run the application on localhost:3000) 
6. Run sequelize db:seed:all to populate the books and institutions tables
7. Now you're ready to test the api in postman
8. Please note: Post requests must be JSON