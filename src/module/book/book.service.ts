import { Injectable } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BookService {

    constructor(private PrismaClient: PrismaService){}

    async create(data: BookDTO) {
        const bookExists = await this.PrismaClient.book.findFirst({
            where: {
                bar_code: data.bar_code
            }
        });

        if (bookExists) {
            throw new Error("Book already exists");
        }

        const book = await this.PrismaClient.book.create({data});
        return book;
    }

    async findAll(){
        return this.PrismaClient.book.findMany();
    }

    async update(id: string, data: BookDTO){
        const bookExists = await this.PrismaClient.book.findUnique({
            where: {
                id,
            }
        });

        if(!bookExists){
            throw new Error("Book is not a exists");           
        }

        return await this.PrismaClient.book.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: string){
        const bookExists = await this.PrismaClient.book.findUnique({
            where: {
                id,
            }
        });

        if(!bookExists){
            throw new Error("Book is not a exists");           
        }

        return this.PrismaClient.book.delete({
            where: {
                id,
            }
        })

    }
}
