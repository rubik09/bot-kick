import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

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
    return await this.adminsRepository.createQueryBuilder().insert().into(Admin).values(createAdminDto).execute();
  }

  async findAllAdmins(): Promise<Admin[]> {
    return await this.adminsRepository.createQueryBuilder('admin').getMany();
  }

  async findOneByUsername(username: Admin['username']): Promise<Admin> {
    return await this.adminsRepository
      .createQueryBuilder('admin')
      .where('admin.username = :username', { username })
      .getOne();
  }

  async findOneById(id: Admin['id']): Promise<Admin> {
    return await this.adminsRepository.createQueryBuilder('admin').where('admin.id = :id', { id }).getOne();
  }

  async findOneByTelegramId(telegramId: Admin['telegramId']): Promise<Admin> {
    return await this.adminsRepository
      .createQueryBuilder('admin')
      .where('admin.telegramId = :telegramId', { telegramId })
      .getOne();
  }

  async deleteAdminById(id: Admin['id']): Promise<number> {
    const { affected } = await this.adminsRepository
      .createQueryBuilder()
      .delete()
      .from(Admin)
      .where('id = :id', { id })
      .execute();
    return affected;
  }

  async updateAdmin(id: Admin['id'], updateAdminDto: UpdateAdminDto): Promise<number> {
    const { affected } = await this.adminsRepository
      .createQueryBuilder()
      .update(Admin)
      .set(updateAdminDto)
      .where('id = :id', { id })
      .execute();
    return affected;
  }
}
