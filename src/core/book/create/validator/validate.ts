import { ApiError } from "../../../../lib/helpers/errors/apiErros";
import { PostgreBookRepository } from "../../../../repositories/book/book-postgres-repositories";
import { BookCreateRequestDTO } from "../book-create-DTO";

export class BookCreateValidate {
    constructor(private postgresBookRepository: PostgreBookRepository) { }

    public async validate(data: BookCreateRequestDTO): Promise<void> {
        this.validateAuthor(data.author);
        await this.validateTitle(data.title);
        this.validateYear(data.publishedYear);
    }

    private validateAuthor(author: string): void {
        if (!author || typeof author !== "string" || author.trim() === "") {
            throw new ApiError('Autor é obrigatório e deve ser uma string válida', 400)
        }
    }

    private async validateTitle(title: string): Promise<void> {
        if (!title || typeof title !== "string") {
            throw new ApiError("Título é obrigatório e deve ser uma string", 400)
        }

        const isExist = await this.postgresBookRepository.isBookExist(title);

        if (isExist) {
            throw new ApiError("Este livro já existe em nosso banco de dados", 409)
        }
    }

    private validateYear(year: number): void {
        if (!Number.isInteger(year)) {
            throw new ApiError("Ano deve ser um número inteiro", 400)
        }

        const currentYear = new Date().getFullYear();

        if (year > currentYear) {
            throw new ApiError(`O ano deve ser igual ou menor a ${currentYear}`, 400)
        }
    }
}
