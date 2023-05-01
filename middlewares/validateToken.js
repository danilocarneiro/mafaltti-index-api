const jwt = require('jsonwebtoken');
const { promisify } = require('util');
require('dotenv').config();

// Valida token
async function validateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({
            error: true,
            message: "Erro.  Autenticação necessária."
        });
    };
    const [bearer, token] = authHeader ? authHeader.split(' ') : "";
    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Erro. Autenticação necessária."
        });
    };
    try {
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
        req.userId = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({
            erro: true,
            mensagem: "Erro. Autenticação necessária."
        });
    }
}

exports.validateToken = validateToken;
