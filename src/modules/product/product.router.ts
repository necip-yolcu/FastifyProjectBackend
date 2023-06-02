const productController = require('./product.controller');


async function productRouter(fastify) {
  fastify.get('/products',  productController.getProducts);
  fastify.post('/products/add',  productController.createProduct);
  fastify.put('/products/update/:id', productController.updateProducts);
  fastify.delete('/products/delete/:id', productController.deleteProducts);
}

export default productRouter
