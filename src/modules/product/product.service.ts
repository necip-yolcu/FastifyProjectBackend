import prisma from "../../utils/prisma";
import { CreateProductInput } from "./product.schema";

export async function createProduct(data: CreateProductInput) {
    return prisma.product.create({
        data,
    });

}
export async function getProducts() {
    return prisma.product.findMany({
        select: {
            İD:true,
            name: true,
            picture: true
        }
    });
}