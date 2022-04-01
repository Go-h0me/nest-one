import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import authors from '../data/authors';
import { Author, AuthorDocument } from './author.schema';
import { Model } from 'mongoose';



@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}
  async findById(id) {
    // const result = authors.filter((item) => item.id === id);

    // return result.length ? result[0] : null;

    return this.authorModel.findById(id).lean();
  }
  async findMany() {
      return this.authorModel.find().lean();

  }

  async createAuthor(input) {
      return this.authorModel.create(input)
  }
}
