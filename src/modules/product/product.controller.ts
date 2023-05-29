import { FastifyRequest, FastifyReply } from "fastify";
import { createProduct } from "./product.service";
import { CreateProductInput } from "./product.schema";

export async function createProductHandler(
    req: FastifyRequest<{
        Body:CreateProductInput
    }>,
     reply: FastifyReply) {
  

    try {
        const product = await createProduct( {
            ...req.body
        })

        return reply.code(201).send({message:"Product has been added"});
    } catch (error) {
        console.log(error);
        return reply.code(500).send(error);
    }
}
