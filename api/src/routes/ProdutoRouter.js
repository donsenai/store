const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/ProdutoController');

/**
 * @openapi
 * /produto:
 *   post:
 *     tags:
 *         - Produto
 *     summary: Cria um novo produto
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *   get:
 *     tags:
 *         - Produto
 *     summary: Retorna todos os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 */
router.post('/', produtoController.create);
router.get('/', produtoController.getAll);

/**
 * @openapi
 * /produto/{id}:
 *   get:
 *     tags:
 *         - Produto
 *     summary: Retorna um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *   put:
 *     tags:
 *         - Produto
 *     summary: Atualiza um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *   delete:
 *     tags:
 *         - Produto
 *     summary: Deleta um produto pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 */
router.get('/:id', produtoController.getById);
router.put('/:id', produtoController.update);
router.delete('/:id', produtoController.delete);

module.exports = router;
