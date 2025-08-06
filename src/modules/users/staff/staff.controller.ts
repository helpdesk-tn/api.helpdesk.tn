import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { StaffService } from './staff.service';
import { StaffEntity } from 'src/database/models/staff.entity';
import { TransformResponseInterceptor } from 'src/common/interceptors/transform-response.interceptor';

@ApiTags('STAFF MGMT')
@UseInterceptors(TransformResponseInterceptor)
@Controller({ version: '1', path: 'staff' })
export class StaffController {
    constructor(private readonly staffService: StaffService) { }

    @Post()
    @ApiBody({ type: StaffEntity, })
    create(@Body() paylaod: Partial<StaffEntity>) {
        return this.staffService.create(paylaod);
    }

    @Get(':id')
    getOne(@Param('id') id: string,) {
        return this.staffService.getOne(id);
    }

    @Get()
    getAll() {
        return this.staffService.getAll();
    }

    @Put(':id')
    @ApiBody({ type: StaffEntity, })
    update(
        @Body() payload: Partial<StaffEntity>,
        @Param('id') id: string) {
        return this.staffService.update(id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.staffService.delete(id);
    }
}
