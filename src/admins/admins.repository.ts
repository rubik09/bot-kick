import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { Admin } from './entity/admins.entity';

@Injectable()
export class AdminsRepository {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    return await this.adminsRepository.save(createAdminDto);
  }

  async findAllAdmins(): Promise<Admin[]> {
    return await this.adminsRepository.find();
  }

  async findOneByUsername(username: Admin['username']): Promise<Admin> {
    return await this.adminsRepository.findOne({
      where: { username },
    });
  }

  async findOneById(id: Admin['id']): Promise<Admin> {
    return await this.adminsRepository.findOne({
      where: { id },
    });
  }

  async findOneByTelegramId(telegramId: Admin['telegramId']): Promise<Admin> {
    return await this.adminsRepository.findOne({
      where: { telegramId },
    });
  }

  async deleteAdminById(id: Admin['id']): Promise<number> {
    const { affected } = await this.adminsRepository.delete(id);
    return affected;
  }

  async updateAdmin(id: Admin['id'], updateAdminDto: UpdateAdminDto): Promise<number> {
    const { affected } = await this.adminsRepository.update({ id }, updateAdminDto);
    return affected;
  }
}
