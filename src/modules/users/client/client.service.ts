import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
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

    async getOne(id?: string, email?: string): Promise<ClientEntity> {

        try {
            let client: ClientEntity;
            if (email) {
                client = await this.clientRepository.findOne({ where: { email } });
            } else if (id) {
                client = await this.clientRepository.findOne({ where: { id } });
            }

            return client;
        } catch (error) {
            throw new NotFoundError('Database error occurred');
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
