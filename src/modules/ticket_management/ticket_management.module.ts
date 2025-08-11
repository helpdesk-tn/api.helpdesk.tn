import { Module } from '@nestjs/common';
import { TicketController } from './ticket/ticket.controller';
import { TicketService } from './ticket/ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from 'src/database/models/ticket.entity';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      TicketEntity,
    ]),
    UsersModule
  ],
  controllers: [TicketController],
  providers: [
    TicketService,
  ]
})
export class TicketManagementModule {}
