const express = require('express');
const produtoRouter = require('../src/routes/ProdutoRouter');

module.exports = (app) => {
    app.use(express.json());
    app.use('/produto', produtoRouter);
};
