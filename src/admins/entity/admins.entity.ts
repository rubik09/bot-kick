import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { bigintTransformer } from '../../utils/bigintTransformer';
import { AdminRoles } from '../admins.constants';

@Entity({ name: 'admins' })
export class Admins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'bigint',
    transformer: bigintTransformer,
  })
  telegramId: number;

  @Column({ type: 'varchar', length: 40 })
  username: string;

  @Column({ type: 'enum', enum: AdminRoles, default: AdminRoles.ADMIN })
  adminRoles: AdminRoles;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;
}
