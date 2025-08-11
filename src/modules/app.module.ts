import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/database/config';

// Modules
import { UsersModule } from './users/users.module';
import { TicketManagementModule } from './ticket_management/ticket_management.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    TicketManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
