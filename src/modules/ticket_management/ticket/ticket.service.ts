import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { TicketEntity } from 'src/database/models/ticket.entity';
import { ClientService } from 'src/modules/users/client/client.service';
import { Repository, TypeORMError } from 'typeorm';


@Injectable()
export class TicketService {
      constructor(
            @InjectRepository(TicketEntity)
            private readonly ticketRepository: Repository<TicketEntity>,
            private readonly clientService: ClientService,

        ) { }
    
        async create(payload: Partial<TicketEntity>, id:string): Promise<TicketEntity> {
            try {
                const client = await this.clientService.getOne(id);
                if(!client) throw new NotFoundError('user not found ');

                const newUser = this.ticketRepository.create({
                    ...payload,
                    client:client
                    
                })
    
                return await this.ticketRepository.save(newUser)
            } catch (error) {
                if (error instanceof TypeORMError)
                    throw new ForbiddenException('Credentials taken');
            }
        }
    
        async getAll(): Promise<TicketEntity[]> {
            try {
    
                return await this.ticketRepository.find();
    
            }
            catch (error) {
                throw new InternalServerErrorException('Failed to retrieve ');
            }
        }
    
        async getOne(id?: string, email?: string): Promise<TicketEntity> {
    
            try {
                let client: TicketEntity;
                if (id) {
                    client = await this.ticketRepository.findOne({ where: { id } });
                }
    
                return client;
            } catch (error) {
                throw new NotFoundError('Database error occurred');
            }
        }
    
        async update(id: string, payload: Partial<TicketEntity>) {
            try {
                await this.ticketRepository.update(
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
                await this.ticketRepository.delete({ id });
            } catch (error) {
                if (error instanceof TypeORMError)
                    throw new ForbiddenException('Database operation failed');
                throw error;
            }
        }

    
}
