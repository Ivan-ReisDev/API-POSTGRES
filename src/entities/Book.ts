export class Book {
    public readonly id?: string;
    public title: string;
    public author: string;
    public publishedYear: number;

    constructor(props: Omit<Book, "id">, id?: string) {
        this.title = props.title;
        this.author = props.author;
        this.publishedYear = props.publishedYear;
        if (id !== undefined) {
            this.id = id;
        }
    }
}