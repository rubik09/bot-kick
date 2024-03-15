import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { AdminsRepository } from './admins.repository';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { Admin } from './entity/admins.entity';

@Injectable()
export class AdminsService {
  private readonly logger = new Logger(AdminsService.name);
  constructor(private adminsRepository: AdminsRepository) {}

  async findAdminById(id: Admin['id']): Promise<Admin> {
    this.logger.log(`Trying to admin info by id: ${id}`);

    const admin = this.adminsRepository.findOneById(id);

    if (!admin) {
      this.logger.error(`admin with id: ${id} not found`);
      throw new HttpException(`admin with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }

    this.logger.debug(`admin successfully get by id: ${id}`);

    return admin;
  }

  async findAdminByUsername(username: Admin['username']): Promise<Admin> {
    this.logger.log(`Trying to get admin by username: ${username}`);

    const admin = this.adminsRepository.findOneByUsername(username);

    if (!admin) {
      this.logger.error(`admin with username: ${username} not found`);
      throw new HttpException(`admin with username: ${username} not found`, HttpStatus.NOT_FOUND);
    }

    this.logger.debug(`admin successfully get by username: ${username}`);

    return admin;
  }

  async getAllAdmins(): Promise<Admin[]> {
    this.logger.log(`Trying to get all Admins`);

    const [admins, count] = await this.adminsRepository.findAllAdmins();

    this.logger.debug(`${count} Admins successfully get`);

    return admins;
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<void> {
    this.logger.log(`Trying to create admin`);

    const { telegramId } = createAdminDto;

    const admin = await this.adminsRepository.findOneByTelegramId(telegramId);

    if (admin) {
      this.logger.error(`admin with telegramId: ${telegramId} already exist`);
      throw new HttpException(`admin with telegramId: ${telegramId} already exist`, HttpStatus.BAD_REQUEST);
    }

    await this.adminsRepository.createAdmin(createAdminDto);

    this.logger.debug(`admin successfully created`);
  }

  async deleteAdmin(id: Admin['id']): Promise<DeleteResult> {
    this.logger.log(`Trying to delete admin by id: ${id}`);

    const admin = await this.adminsRepository.findOneById(id);

    if (!admin) {
      this.logger.error(`Admin with id: ${id} not exist`);
      throw new HttpException(`Admin with id: ${id} not exist`, HttpStatus.BAD_REQUEST);
    }

    const deletedAdmin = await this.adminsRepository.deleteAdminById(id);

    this.logger.debug(`Admin successfully deleted by id: ${id}`);

    return deletedAdmin;
  }

  async updateAdmin(id: Admin['id'], updateAdminDto: UpdateAdminDto): Promise<UpdateResult> {
    this.logger.log(`Trying to update admin by id: ${id}`);

    const admin = await this.adminsRepository.findOneById(id);

    if (!admin) {
      this.logger.error(`Admin with id: ${id} not exist`);
      throw new HttpException(`Admin with id: ${id} not exist`, HttpStatus.BAD_REQUEST);
    }

    const updatedAdmin = await this.adminsRepository.updateAdmin(id, updateAdminDto);

    this.logger.debug(`Admin successfully updated by id: ${id}`);

    return updatedAdmin;
  }
}
