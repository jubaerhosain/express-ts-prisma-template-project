import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';
import { BookDto } from './dto/book.dto';
import { BookQueryDto } from './dto/book-query.dto';

@Injectable()
export class BooksService {
    constructor(private readonly booksRepository: BooksRepository) {}

    async create(createBookDto: CreateBookDto): Promise<BookDto> {
        return await this.booksRepository.create(createBookDto);
    }

    findAll(query: BookQueryDto): Promise<BookDto[]> {
        return this.booksRepository.findAll(query);
    }

    async findOne(id: number): Promise<BookDto> {
        const book = await this.booksRepository.findOne(id);

        if (!book) {
            throw new NotFoundException({ message: `book with id: ${id} was not found` });
        }

        return book;
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<BookDto> {
        const isExists = await this.booksRepository.isExistById(id);

        if (!isExists) {
            throw new NotFoundException({ message: `book with id: ${id} was not found` });
        }

        const updatedBook = await this.booksRepository.update(id, updateBookDto);
        return updatedBook;
    }

    async remove(id: number) {
        const isExists = await this.booksRepository.isExistById(id);

        if (!isExists) {
            throw new NotFoundException({ message: `book with id: ${id} was not found` });
        }
        
        return this.booksRepository.remove(id);
    }
}
