import { Book } from "../../entities/Book";
import { ApiError } from "../../lib/helpers/errors/apiErros";
import { prismaCliente } from "../database/prisma";
import { IBookRepository } from "./IBook-repositories";

export class PostgreBookRepository implements IBookRepository {
  public async find(title?: string): Promise<Book[]> {
    if (title) {
      const books = await prismaCliente.book.findMany({
        where: {
          title: {
            contains: title,
            mode: 'insensitive',
          },
        },
      });

      if (books.length <= 0) {
        throw new ApiError(`Nenhum livro encontrado com o título contendo "${title}".`, 404);
      }

      return books.map(book => new Book({
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
      }, book.id));
    } else {
      const books = await prismaCliente.book.findMany();

      if (books.length <= 0) {
        throw new ApiError(`Nenhum livro encontrado.`, 404);
      }

      return books.map(book => new Book({
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
      }, book.id));
    }
  }

  public async created(data: Book): Promise<boolean> {
    const newBook = await prismaCliente.book.create({
      data: {
        title: data.title,
        author: data.author,
        publishedYear: data.publishedYear
      }
    });

    if (newBook) return true;

    throw new ApiError(`Erro desconhecido`, 500);
  }

  public async isBookExist(title: string): Promise<boolean> {
    const book = await prismaCliente.book.findFirst({
      where: { title: title },
    });

    if (book) {
      return true;
    }

    return false;

  }

}
