import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod'
const productInput = ({
    name: z.string(),
    picture: z.string().optional()
})
const productGenerated = ({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
});
const createProductSchema = z.object({
 ...productInput,
 
})
const productResponseSchema = z.object({
    ...productInput,
    $id: productGenerated.id,
    createdAt: productGenerated.createdAt,
    updatedAt: productGenerated.updatedAt,
  });
  
  

const productsResponseSchema = z.array(productResponseSchema)
 
export type CreateProductInput = z.infer<typeof createProductSchema>
export const { schemas: productSchemas ,$ref} = buildJsonSchemas({
    createProductSchema,
    productResponseSchema,
    productsResponseSchema,
  });
  