import { Book } from "../../../entities/Book";
import { IBookRepository } from "../../../repositories/book/IBook-repositories";
import { BookCreateRequestDTO } from "./book-create-DTO";
import { BookCreateValidate } from "./validator/validate";

export class BookCreateUseCase {
    constructor(
        private bookRepository: IBookRepository,
        private bookCreateValidate: BookCreateValidate
    ) { }

    public async execute(data: BookCreateRequestDTO): Promise<void> {
        await this.bookCreateValidate.validate(data);

        const newPost = new Book(data);

        await this.bookRepository.created(newPost);

    }
}
