import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { Admin } from './entity/admins.entity';

@Injectable()
export class AdminsRepository {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<InsertResult> {
    return await this.adminsRepository
      .createQueryBuilder('admins')
      .insert()
      .into(Admin)
      .values(createAdminDto)
      .execute();
  }

  async findAllAdmins(): Promise<[Admin[], number] | []> {
    return await this.adminsRepository.createQueryBuilder('admins').getManyAndCount();
  }

  async findOneById(id: number): Promise<Admin | null> {
    return await this.adminsRepository.createQueryBuilder('admins').where('admins.id = :id', { id }).getOne();
  }

  async findOneByTelegramId(telegramId: number): Promise<Admin | null> {
    return await this.adminsRepository
      .createQueryBuilder('admins')
      .where('admins.telegramId = :telegramId', { telegramId })
      .getOne();
  }

  async deleteAdminById(id: number): Promise<DeleteResult> {
    return await this.adminsRepository
      .createQueryBuilder('admins')
      .delete()
      .from(Admin)
      .where('id = :id', { id })
      .execute();
  }

  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto): Promise<UpdateResult> {
    return await this.adminsRepository
      .createQueryBuilder('admins')
      .update(Admin)
      .set(updateAdminDto)
      .where('id = :id', { id })
      .execute();
  }
}
