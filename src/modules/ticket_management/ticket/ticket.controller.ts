import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';
import { TicketService } from './ticket.service';
import { TicketEntity } from 'src/database/models/ticket.entity';

@ApiTags('TICKETS MGMT')
@UseInterceptors(TransformResponseInterceptor)
@Controller({ version: '1', path: 'ticket' })
export class TicketController {

      constructor(private readonly ticketService: TicketService) { }
    
        @Post('client/:id')
        @ApiBody({ type: TicketEntity, })
        create(
            @Body() paylaod: Partial<TicketEntity>,
            @Param('id') id:string
        ) {
            return this.ticketService.create(paylaod,id);
        }
    
        @Get(':id')
        getOne(@Param('id') id: string) {
            return this.ticketService.getOne(id);
        }
    
        @Get()
        getAll() {
            return this.ticketService.getAll();
        }
    
        @Put(':id')
        @ApiBody({ type: TicketEntity, })
        update(
            @Body() payload: Partial<TicketEntity>,
            @Param('id') id: string) {
            return this.ticketService.update(id, payload);
        }
    
        @Delete(':id')
        delete(@Param('id') id: string) {
            return this.ticketService.delete(id);
        }

}
