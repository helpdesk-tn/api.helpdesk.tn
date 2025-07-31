import { ForbiddenException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/database/models/client.entity';
import { Repository, TypeORMError } from 'typeorm';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
    ) { }

    async create(payload: Partial<ClientEntity>): Promise<ClientEntity> {
        try {
            const newUser = this.clientRepository.create({
                ...payload
            })

            return await this.clientRepository.save(newUser)
        } catch (error) {
            if (error instanceof TypeORMError)
                console.log("the errror :", error.message)
            throw new ForbiddenException('Credentials taken');
        }
    }

    async getAll(): Promise<ClientEntity[]> {
        try {

            return await this.clientRepository.find();

        }
        catch (error) {
            throw new InternalServerErrorException('Failed to retrieve clients');
        }
    }

    async getOne(id: string): Promise<ClientEntity> {
        try {
            const foundUser = await this.clientRepository.findOne({
                where: { id }
            });
            if (!foundUser) {
                throw new InternalServerErrorException('client not found');
            }

            return foundUser;
        }
        catch (error) {
            throw new ForbiddenException('Failed to retrieve client');
        }
    }

    async update(id: string, payload: Partial<ClientEntity>) {
        try {
            await this.clientRepository.update(
                { id },
                { ...payload }
            )

        } catch (error) {
            if (error instanceof TypeORMError)
                throw new ForbiddenException('Database operation failed, duplicate found ');
            throw error;
        }
    }

    async delete(id: string) {

        try {
            await this.clientRepository.delete({ id });
        } catch (error) {
            if (error instanceof TypeORMError)
                throw new ForbiddenException('Database operation failed');
            throw error;
        }
    }
}
