import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.model";
import { ApiProperty } from "@nestjs/swagger";
import { ClientEntity } from "./client.entity";

@Entity({ name: 'ticket' })
export class TicketEntity extends BaseEntity {

  @ApiProperty()
  @Column({ type: 'varchar', length: '250', nullable: true })
  title: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: '1250', nullable: true })
  description: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: '250', nullable: true})
  prioriety: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: '250', nullable: true, default:'PENDING' })
  status: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: '250', nullable: true })
  type: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: '250', nullable: true })
  file_path: string;

  @ManyToOne(()=>ClientEntity, (client)=> client)
  client: ClientEntity;

}
