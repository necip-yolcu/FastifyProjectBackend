import Fastify from "fastify";
import productRoutes from "./modules/product/product.router";
import  productSchemas  from "./modules/product/product.schema";
const server = Fastify();

server.get('/healthCheck', async function (req, res) {
    return { status: "OK" };
})

async function main() {
    server.addSchema(productSchemas);
    server.register(productRoutes, { prefix: "api/products" })
    await server.listen({ port: 3000 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server is running on ${address}`);
    });
}
main()