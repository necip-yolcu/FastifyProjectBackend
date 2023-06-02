
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProducts(req: FastifyRequest, reply: FastifyReply) {
  const products = await prisma.products.findMany();
  console.log("products", products);

  reply.code(201).send(products);
}
async function deleteProducts(req: FastifyRequest, reply: FastifyReply) {
  const productId = parseInt(req.query.id);
  console.log("productId", productId);

  const deleted = await prisma.products.delete(
    {
      where: {
        id: productId
      }
    }
  )
  console.log(deleted);
  if (deleted) {
    return reply.code(201).send({ message: " Product Has Been Deleted Succesfully!! " });

  } else {
    return reply.code(400).send({ message: " Product Could Not Deleted!! " });
  }



}
async function updateProducts(req: FastifyRequest, reply: FastifyReply) {
  const productId = Number(req.query.id);

  const { name, picture } = req.body;
  const product = await prisma.products.findUnique({
    where: { id: productId }
  });
  if (!product) {

    return reply.code(404).send({ message: 'Product not found' });
  }
  const updatedProduct = await prisma.products.update({
    where: { id: productId },
    data: {
      name: name,
      picture: picture
    }
  })
  reply.code(201).send(updatedProduct);
}

async function createProduct(req: FastifyRequest, reply: FastifyReply) {
  console.log("req_body",req.body)
  const { name, picture } = req.body;
  const newProduct = await prisma.products.create({
    data: {
      name,
      picture,
    },
  });
  reply.code(201).send(newProduct);
}

async function getProductById(req: FastifyRequest, reply: FastifyReply) {
  const productId = Number(req.params.id);
  const product = await prisma.products.findUnique({
    where: { id: productId },
  }) as Product | null; // Type assertion to specify the expected type
  if (!product) {
    reply.code(404).send({ message: 'Product not found' });
    return;
  }
  reply.send(product);
}

export {
  getProducts,
  createProduct,
  getProductById,
  deleteProducts,
  updateProducts

};
