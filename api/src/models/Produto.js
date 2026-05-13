const mongoose = require('mongoose'); // importa biblioteca

const Produto = mongoose.model('Produto', {
    nome: String,
    preco: Number,
    descricao: String
});

module.exports = Produto;
