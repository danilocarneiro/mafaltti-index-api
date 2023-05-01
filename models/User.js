const Sequelize = require("sequelize");
const db = require("./db");

const User = db.define("users",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
    }
});

// Cria table no banco de dados se não existe
User.sync({});

// Verifica e altera a tabela sincronizando com a model
User.sync({alter:true});

module.exports = User;