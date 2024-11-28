import { FastifyInstance, FastifyRequest } from "fastify";
import { bookGetController } from "../core/book/get";
import { bookCreateController } from "../core/book/create";

interface BookGetQuery {
    title?: string;
}

export async function bookRoutes(app: FastifyInstance) {
    app.get<{ Querystring: BookGetQuery }>('/books', (request: FastifyRequest<{ Querystring: BookGetQuery }>, reply) => {
        bookGetController.handle(request, reply);
    });

    app.post('/books', (request: FastifyRequest, reply) => {
        bookCreateController.handle(request, reply);
    });


}
