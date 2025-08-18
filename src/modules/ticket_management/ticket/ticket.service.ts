import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { TicketEntity } from "src/database/models/ticket.entity";
import { ClientService } from "src/modules/users/client/client.service";
import { Repository, TypeORMError } from "typeorm";

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    private readonly clientService: ClientService
  ) { }

  async create(
    payload: Partial<TicketEntity>,
    id: string
  ): Promise<TicketEntity> {

    const client = await this.clientService.getOne(id);
    if (!client) throw new NotFoundException('Client Not Found ');
    const newTicket = this.ticketRepository.create({
      ...payload,
      client,
    });

    return await this.ticketRepository.save(newTicket);
  }

  async getAll(): Promise<TicketEntity[]> {
    try {
      return await this.ticketRepository.find();
    } catch (error) {
      throw new InternalServerErrorException("Failed to retrieve ");
    }
  }

  async getAllByClientId(id: string): Promise<TicketEntity[]> {
    const tickets = await this.ticketRepository.find({
      where: { client: { id } },
      relations: ["client"],
    });

    return tickets;
  }

  async getOne(id?: string): Promise<TicketEntity> {
    try {
      let ticket: TicketEntity;
      if (id) {
        ticket = await this.ticketRepository.findOne({ where: { id } });
      }
      return ticket;
    } catch (error) {
      throw new NotFoundException("Database error occurred");
    }
  }

  async update(id: string, payload: Partial<TicketEntity>) {
    try {
      await this.ticketRepository.update({ id }, { ...payload });
    } catch (error) {
      if (error instanceof TypeORMError)
        throw new ForbiddenException(
          "Database operation failed, duplicate found "
        );
      throw error;
    }
  }

  async delete(id: string) {

    const ticket = await this.ticketRepository.find({ where: { id } });

    if (!ticket) throw new NotFoundException('Ticket Not Found ');
    await this.ticketRepository.delete({ id });

  }
}
