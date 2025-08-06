import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffEntity } from 'src/database/models/staff.entity';
import { Repository, TypeORMError } from 'typeorm';

@Injectable()
export class StaffService {

    constructor(
        @InjectRepository(StaffEntity)
        private readonly staffRepository: Repository<StaffEntity>,
    ) { }

    async create(payload: Partial<StaffEntity>): Promise<StaffEntity> {
        try {
            const newUser = this.staffRepository.create({
                ...payload
            })
            return await this.staffRepository.save(newUser)
        } catch (error) {
            if (error instanceof TypeORMError)
                throw new ForbiddenException('Credentials taken');
        }
    }

    async getAll(): Promise<StaffEntity[]> {
        try {
            return await this.staffRepository.find();
        }
        catch (error) {
            throw new InternalServerErrorException('Failed to retrieve staffs');
        }
    }

    async getOne(id?: string, email?: string): Promise<StaffEntity | null> {

        try {
            console.log("id", id, "email ", email);
            let staff: StaffEntity | null;

            if (id) {
                staff = await this.staffRepository.findOne({ where: { id } });
            } else if (email) {
                staff = await this.staffRepository.findOne({ where: { email } });
            }

            return staff;
        } catch (error) {
            throw new InternalServerErrorException('Database error occurred');
        }
    }

    async update(id: string, payload: Partial<StaffEntity>) {
        try {
            await this.staffRepository.update(
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
            await this.staffRepository.delete({ id });
        } catch (error) {
            if (error instanceof TypeORMError)
                throw new ForbiddenException('Database operation failed');
            throw error;
        }
    }
}
