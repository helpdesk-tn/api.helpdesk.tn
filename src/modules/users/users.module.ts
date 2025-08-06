import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/models/user.entity';
import { StaffController } from './staff/staff.controller';
import { StaffService } from './staff/staff.service';
import { StaffEntity } from 'src/database/models/staff.entity';
import { StaffExistsMiddleware } from 'src/common/middleware/staff-exists.middleware';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { ClientEntity } from 'src/database/models/client.entity';
import { ClientExistsMiddleware } from 'src/common/middleware/client-exists.middleware';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      StaffEntity,
      ClientEntity
    ]),
  ],
  controllers: [
    StaffController,
    ClientController
  ],
  providers: [
    StaffService,
    ClientService
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(StaffExistsMiddleware)
      .exclude({ path: 'v1/staff', method: RequestMethod.GET })
      .forRoutes(StaffController)

      .apply(ClientExistsMiddleware)
      .exclude({ path: 'v1/client', method: RequestMethod.GET })
      .forRoutes(ClientController);

  }
}
