import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.model";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'client' })
export class ClientEntity extends BaseEntity {

  @ApiProperty()
  @Column({ type: 'varchar', length: '250', nullable: true })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: '1250', nullable: true })
  last_name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: '250', nullable: true, unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: '250', nullable: true })
  authentication_id: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: '250', nullable: true })
  phone: string;

  @ApiProperty()
  @Column({ type: 'simple-array', nullable: true })
  Project: string[];

}
