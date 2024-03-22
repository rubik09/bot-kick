import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { bigintTransformer } from '../../utils/bigintTransformer';
import { AdminRoles, AdminState } from '../admins.constants';

@Entity({ name: 'admins' })
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'bigint',
    transformer: bigintTransformer,
    unique: true,
  })
  telegramId: number;

  @Column({ type: 'varchar', length: 40, unique: true })
  username: string;

  @Column({ type: 'enum', enum: AdminRoles, default: AdminRoles.ADMIN })
  adminRoles: AdminRoles;

  @Column({ type: 'enum', enum: AdminState, default: null })
  adminState: AdminState;

  @Column({
    type: 'bigint',
    default: 0,
  })
  telegramIdToDelete: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: Date;
}
