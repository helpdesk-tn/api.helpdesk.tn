import { NestMiddleware, Injectable, HttpException, HttpStatus, BadRequestException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ClientService } from "src/modules/users/client/client.service";
import { StaffService } from "src/modules/users/staff/staff.service";

@Injectable()
export class StaffExistsMiddleware implements NestMiddleware {

    constructor(
        private readonly service: StaffService,
        private readonly clientService: ClientService

    ) { }

    async use(req: Request, res: Response, next: NextFunction) {


        const method = req.method;
        const id = req.params.id || req.body.id || null;
        const email = req.body.email || null;

        if (method === 'POST' || method === 'PUT') {
            const client = await this.clientService.getOne(id, email);
            if (client) {
                throw new HttpException(`Email "${email}" already exists`, HttpStatus.FORBIDDEN);
            }
            return next();
        }

        const staff = await this.service.getOne(id, undefined);

        if (!staff) {
            throw new HttpException(`Staff with ID ${id} not found`, HttpStatus.NOT_FOUND);
        }

        next();
    }
}