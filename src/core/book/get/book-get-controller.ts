import { FastifyRequest, FastifyReply } from "fastify";
import { BookGetUseCase } from "./book-get-usecase";
import { ApiError } from "../../../lib/helpers/errors/apiErros";

interface BookGetQuery {
    title?: string;
}

export class BookGetController {
    constructor(private bookGetUseCase: BookGetUseCase) { }
    async handle(request: FastifyRequest<{ Querystring: BookGetQuery }>, reply: FastifyReply): Promise<void> {
        try {
            const { title } = request.query;
            const books = title
                ? await this.bookGetUseCase.execute(title)
                : await this.bookGetUseCase.execute();
            reply.status(200).send({ books });

        } catch (error) {
            if (error instanceof ApiError) {
                reply.status(error.statusCode).send({
                    error: error.message,
                    details: error.details || 'Sem detalhes',
                });
            } else {
                reply.status(500).send({
                    error: 'Internal Server Error',
                });
            }
        }
    }

}
