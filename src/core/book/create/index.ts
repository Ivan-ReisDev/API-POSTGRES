import { PostgreBookRepository } from "../../../repositories/book/book-postgres-repositories";
import { BookCreateController } from "./book-create-controller";
import { BookCreateUseCase } from "./book-create-usecase";
import { BookCreateValidate } from "./validator/validate";


const poostgreBookRepository = new PostgreBookRepository();

const bookCreateValidate = new BookCreateValidate(
    poostgreBookRepository
);

const bookCreateUseCase = new BookCreateUseCase(
    poostgreBookRepository,
    bookCreateValidate
);

const bookCreateController = new BookCreateController(
    bookCreateUseCase
);

export { bookCreateUseCase, bookCreateController }