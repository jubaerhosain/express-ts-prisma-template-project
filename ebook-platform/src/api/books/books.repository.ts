import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookDto } from './dto/book.dto';
import { BookQueryDto } from './dto/book-query.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createBookDto: CreateBookDto): Promise<BookDto> {
        const book = await this.prisma.book.create({
            data: createBookDto,
        });
        return book;
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<BookDto> {
        const updatedBook = await this.prisma.book.update({
            where: { id },
            data: updateBookDto,
        });
        return updatedBook;
    }

    async findOne(id: number): Promise<BookDto> {
        const book = await this.prisma.book.findUnique({
            where: { id },
        });
        return book;
    }

    async findAll(query: BookQueryDto): Promise<BookDto[]> {
        const { author, title, sort, order, limit } = query;

        const booksQuery = {
            where: {
                author: {
                    contains: author,
                },
                title: {
                    contains: title,
                },
            },
            orderBy:
                sort && order
                    ? {
                          [sort]: order,
                      }
                    : {},
            take: limit,
        };

        const books = await this.prisma.book.findMany(booksQuery);
        return books;
    }

    remove(id: number) {
        throw new Error('Method not implemented.');
    }

    async isExistById(id: number): Promise<boolean> {
        const book = await this.prisma.book.findUnique({ where: { id } });
        return book ? true : false;
    }
}
