import { Book } from "../../../entities/Book";
import { ApiError } from "../../../lib/helpers/errors/apiErros";
import { IBookRepository } from "../../../repositories/book/IBook-repositories";
import { BookGetDTO } from "./book-get-DTO";

export class BookGetUseCase {
    constructor(private bookRepository: IBookRepository) { }

    public async execute(title?: string): Promise<Book | Book[]> {
        const books = await this.bookRepository.find(title);

        if (Array.isArray(books)) {
            return books as BookGetDTO[];
        }

        if (books) {
            return books as BookGetDTO;
        }

        throw new ApiError("Nenhum Livro encontrado", 404);
    }
}
