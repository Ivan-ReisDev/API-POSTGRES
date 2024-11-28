import { Book } from "../../entities/Book";

export interface IBookRepository {
    find(title?: string): Promise<Book[] | Book>;
    created(data: Book): Promise<boolean>
    isBookExist(title: string): Promise<boolean>
}