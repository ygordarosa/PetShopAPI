
const { autenticaContaDB } = require('../useCases/segurancaUseCases');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    await autenticaContaDB(request.body)
        .then(conta => {
            const token = jwt.sign({ conta }, process.env.SECRET, {
                expiresIn: 300 //expira em 5 min
            })
            return response.json({ auth: true, token: token })
        })
        .catch(err => response.status(401).json({ auth: false, message: err }));
}

// verificação do token
function verificaJWT(request, response, next) {
    const token = request.headers['authorization'];
    if (!token) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return response.status(401).json({ auth: false, message: 'Erro ao autenticar o token.' });
        // Se o token for válido, salva no request para uso posterior
        console.log("Conta: " + JSON.stringify(decoded.conta));
        request.conta = decoded.conta;
        next();
    });
}

module.exports = {
    login, verificaJWT
}