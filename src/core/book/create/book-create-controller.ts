import { FastifyRequest, FastifyReply } from "fastify";
import { BookCreateUseCase } from "./book-create-usecase";
import { BookCreateRequestDTO } from "./book-create-DTO";
import { ApiError } from "../../../lib/helpers/errors/apiErros";

export class BookCreateController {
    constructor(private bookCreateUseCase: BookCreateUseCase) { }

    async handle(req: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const { title, author, publishedYear } = req.body as BookCreateRequestDTO;

            const data: BookCreateRequestDTO = {
                title,
                author,
                publishedYear
            };

            await this.bookCreateUseCase.execute(data);
            reply.status(201).send({ message: "Livro criado com sucesso" });
        } catch (error) {
            if (error instanceof ApiError) {
                reply.status(error.statusCode).send({
                    error: error.message,
                    details: error.details || 'Sem detalhes',
                });
            } else {
                reply.status(500).send({
                    error: 'Erro desconhecido',
                });
            }
        }
    }
}
