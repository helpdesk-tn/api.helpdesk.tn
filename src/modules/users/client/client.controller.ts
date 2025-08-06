import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { ClientEntity } from 'src/database/models/client.entity';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';

@ApiTags('CLIENTS MGMT')
@UseInterceptors(TransformResponseInterceptor)
@Controller({ version: '1', path: 'client' })
export class ClientController {

    constructor(private readonly clientService: ClientService) { }

    @Post()
    @ApiBody({ type: ClientEntity, })
    create(@Body() paylaod: Partial<ClientEntity>) {
        return this.clientService.create(paylaod);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.clientService.getOne(id);
    }

    @Get()
    getAll() {
        return this.clientService.getAll();
    }

    @Put(':id')
    @ApiBody({ type: ClientEntity, })
    update(
        @Body() payload: Partial<ClientEntity>,
        @Param('id') id: string) {
        return this.clientService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.clientService.delete(id);
    }
}
