Instructions to run application

1. Create a postgres database
2. Store the connection information for the database in config/config.json and in .env
3. Run npm install
4. Run npm start (this will create the tables the database and run the application on localhost:3000) 
5. Run sequelize db:seed:all to populate the books and institutions tables
6. Now you're ready to test the api in postman
7. Please note: Post requests must be JSON