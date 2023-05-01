const express = require("express");
const cors = require("cors");
const app = express();
const routeUsers = require("./routes/users");
const routeLogin = require("./routes/login");
require('dotenv').config();

const port = process.env.PORT;

// Receber dados em JSON
app.use(express.json());

// Inclui o CORS para permitir acesso externo a API
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers","X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

//Rotas Users
app.use("/users", routeUsers);

//Rotas Login
app.use("/login", routeLogin);

app.listen(port, () => {
    console.log("Servidor iniciado com sucesso na porta " +
                port + ".");
});