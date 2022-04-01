"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BookModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var author_schema_1 = require("../author/author.schema");
var author_service_1 = require("../author/author.service");
var book_resolver_1 = require("./book.resolver");
var book_schema_1 = require("./book.schema");
var book_service_1 = require("./book.service");
var BookModule = /** @class */ (function () {
    function BookModule() {
    }
    BookModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    { name: book_schema_1.Book.name, schema: book_schema_1.BookSchema },
                    { name: author_schema_1.Author.name, schema: author_schema_1.AuthorSchema },
                ]),
            ],
            providers: [book_resolver_1.BookResolver, book_service_1.BookService, author_service_1.AuthorService]
        })
    ], BookModule);
    return BookModule;
}());
exports.BookModule = BookModule;
