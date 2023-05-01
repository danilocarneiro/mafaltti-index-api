const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const {validateToken} = require("../middlewares/validateToken");
const router = express.Router();
require('dotenv').config();

// Cadastra UM novo usuário
router.post("/", validateToken, async (req,res) =>{
    let data = req.body;
    // Criptografa a senha
    data.password = await bcrypt.hash(data.password, 8);
    await User.create(data)
    .then(() => {
        return res.json({
            error: false,
            message: "Usuário cadastrado com sucesso!"
        })
    }).catch(() =>{
        return res.status(400).json({
            error: true,
            message: "Erro. Usuário NÃO cadastrado."
        })
    })
});

//Retorna os dados de TODOS os usuários
router.get("/", validateToken, async (req,res) =>{
    await User.findAll({
        attributes: ['id', 'name', 'email', 'password'],
        order: [['id', 'DESC']]
    })
    .then((users) => {
        return res.json({
            error: false,
            message: "Lista de usuários retornada com sucesso!",
            users
        })
    }).catch(() =>{
        return res.status(400).json({
            error: true,
            message: "Erro. Nenhum usuário encontrado."
        })
    })
});

// Retorna os dados de UM usuário
router.get("/:id", validateToken, async (req,res) =>{
    const {id} = req.params;
    User.findByPk(id,{attributes: ['id', 'name', 'email', 'password']})
    .then((user) => {
        return res.json({
            error: false,
            message: "Usuário retornado com sucesso!",
            user
        })
    }).catch(() =>{
        return res.status(400).json({
            error: true,
            message: "Erro. Nenhum usuário encontrado."
        })
    })
});

// Atualiza UM usuário
router.put("/", validateToken, async (req,res) =>{
    const {id} = req.body;
    await User.update(req.body,{where:{id}})
    .then(() => {
        return res.json({
            error: false,
            message: "Usuário editado com sucesso!",
        })
    }).catch(() =>{
        return res.status(400).json({
            error: true,
            message: "Erro. Usuário NÃO editado."
        })
    })
});

// Remove UM usuário
router.delete("/:id", validateToken, async (req,res) =>{
    const {id} = req.params;
    await User.destroy({where: {id}})
    .then((user) => {
        return res.json({
            error: false,
            message: "Usuário removido com sucesso!",
        })
    }).catch(() =>{
        return res.status(400).json({
            error: true,
            message: "Erro. Usuário NÃO removido."
        })
    })    
});

// Atualiza senha de UM usuário
router.put("/password", validateToken, async (req,res) =>{
    let data = req.body;
    data.password = await bcrypt.hash(data.password, 8);
    await User.update({password: data.password},{where:{id: data.id}})
    .then((user) => {
        return res.json({
            error: false,
            message: "Senha do usuário editada com sucesso!",
        })
    }).catch(() =>{
        return res.status(400).json({
            error: true,
            message: "Erro. Senha do usuário NÃO editada."
        })
    })
});

module.exports = router;