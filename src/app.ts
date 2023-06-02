const fastify = require('fastify')();
const productRouter = require('./modules/product/product.router');
const cors = require("fastify-cors")

fastify.register(cors, {
  //origin: "*",
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

/* fastify.addHook('onRequest', (request, reply,payload, done) => {
  // Set CORS headers
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  reply.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  reply.header('Access-Control-Allow-Credentials', 'true');

  // Continue processing the request
  done(null, payload);
}); */

fastify.register(productRouter);

fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log('Server is listening on http://localhost:3000');
});
