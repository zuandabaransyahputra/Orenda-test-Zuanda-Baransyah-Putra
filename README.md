Procedure for running orenda api:
1. cd orenda-api
2. npm install
3. npx sequelize-cli db:create
4. npx sequelize-cli db:migrate
5. npm start
6. using this postman to test the api "https://documenter.getpostman.com/view/15319674/2s93eX1YZV"

Procedure for running orenda client:
1. cd orenda-client
2. npm install
3. create file .env in the root and copy .env.example content
4. make sure the server of orenda api already on
5. npm start

Procedure for running logical test:
1. cd Logical_test
2. node palindrome_number.js