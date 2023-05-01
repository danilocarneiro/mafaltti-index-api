const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB, 
                                process.env.DB_USER,
                                process.env.DB_PASS,
                                {
                                    host: process.env.DB_HOST,
                                    dialect: process.env.DB_LIB
                                });

sequelize.authenticate()
.then(function(){
    console.log("Conexão com o banco de dados realizada com sucesso!");
}).catch(function(){
    console.log("Conexão com o banco de dados NÃO realizada.");
})
module.exports = sequelize;