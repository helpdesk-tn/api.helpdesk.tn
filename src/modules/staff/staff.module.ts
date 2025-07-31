import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from 'src/database/models/staff.entity';
import { StaffExistsMiddleware } from 'src/common/middleware/staff-exists.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StaffEntity,
    ]),
  ],
  controllers: [StaffController],
  providers: [StaffService]
})
export class StaffModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StaffExistsMiddleware)
      .exclude({ path: '/v1/staffs', method: RequestMethod.POST })
      .exclude({ path: '/v1/staffs', method: RequestMethod.GET })
      .forRoutes(StaffController)

  }
}
