Instructions to run application

1. create a postgres database
2. store the connection information for the database in config/config.json and in .env
3. run npm install
4. run npm start (this will create the tables the database and run the application on localhost:3000) 
5. run sequelize db:seed:all to populate the books and institutions tables
6. now you're ready to test the api in postman