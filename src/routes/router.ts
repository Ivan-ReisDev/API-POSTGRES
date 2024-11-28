import { FastifyInstance } from "fastify";
import { bookRoutes } from "./book-router";

export async function appRoutes(fastify: FastifyInstance) {
    fastify.register(bookRoutes, { prefix: '/api' });
}
