import { PostgreBookRepository } from "../../../repositories/book/book-postgres-repositories";
import { BookGetController } from "./book-get-controller";
import { BookGetUseCase } from "./book-get-usecase";

const poostgreBookRepository = new PostgreBookRepository();

const bookGetUseCase = new BookGetUseCase(
    poostgreBookRepository
);

const bookGetController = new BookGetController(
    bookGetUseCase
);

export { bookGetUseCase, bookGetController }