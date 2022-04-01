import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import books from '../data/books';
import { Book, CreateBookInput, BookDocument } from './book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  books: Partial<Book>[];

  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<BookDocument>,
  ) {
    this.books = books;
  }
  async findMany() {
    return this.bookModel.find().lean();
  }

  async findById(id) {
    return this.bookModel.findById(id).lean();
    // const books = this.books.filter((book) => book.id === id);
    // if (books.length) {
    //   return books[0];
    // }
    // return null;
  }

  async findByAuthorId(authorId) {
    // return this.books.filter((book) => book.author === authorId);

    return this.bookModel.find({ author: authorId });
  }

  async createBook(book: CreateBookInput) {
    // this.books = [book, ...this.books];
    // return book;
    return this.bookModel.create(book);
  }
}
