import { NestMiddleware, Logger, Injectable, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { StaffService } from "src/modules/staff/staff.service";

@Injectable()
export class StaffExistsMiddleware implements NestMiddleware {

    private readonly logger = new Logger(StaffExistsMiddleware.name)

    constructor(private readonly staffService: StaffService) { }

    async use(req: Request, res: Response, next: NextFunction) {

        var staffId = req.params.id
        if (!staffId) {
            staffId = req.body.id;
        }

        const staff = await this.staffService.getOne(staffId);

        if (!staff) {
            throw new NotFoundException(`Staff with ID ${staffId} not found`);
        }

        next();
    }
}