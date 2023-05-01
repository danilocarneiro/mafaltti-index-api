const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validateToken} = require("../middlewares/validateToken");
const router = express.Router();
require('dotenv').config();

// Login
router.post("/", async (req,res) => {
    const user = await User.findOne({
        attributes: ['id','password'],
        where: {email: req.body.email}});
    if(user === null){
        return res.status(400).json({
            error: true,
            message: "Erro. Usuário e/ou senha incorreto(s)."
        })
    }
    // Verifica se a senha está correta
    if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.status(400).json({
            error: true,
            message: "Erro. Usuário e/ou senha incorreto(s)."
        })
    }
    
    // Gera token
    const token = jwt.sign(
        {id: user.id}, 
        process.env.SECRET, 
        {expiresIn: '1d'}
    );

    return res.json({
        error: false,
        message: "Login realizado com sucesso!",
        token
    })
});

router.get("/validate-token", validateToken, async(req,res) => {
    await User.findByPk(req.userId,{attributes: ['id', 'name', 'email']})
    .then((user) => {
        return res.json({
            error: false, 
            message: "Token válido",
            user
        });
    }).catch(() => {
        return res.status(400).json({
            error: true,
            message: "Erro. Autenticação necessária."
        });      
    })
})

module.exports = router;