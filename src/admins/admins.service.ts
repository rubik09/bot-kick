import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

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

    const admin = await this.adminsRepository.findOneById(id);

    if (!admin) {
      this.logger.error(`admin with id: ${id} not found`);
      throw new HttpException(`admin with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }

    this.logger.debug(`admin successfully get by id: ${id}`);

    return admin;
  }

  async findOneByTelegramId(id: Admin['id']): Promise<Admin> {
    this.logger.log(`Trying to admin info by telegramId: ${id}`);

    const admin = await this.adminsRepository.findOneByTelegramId(id);

    if (!admin) {
      this.logger.error(`admin with id: ${id} not found`);
      throw new HttpException(`admin with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }

    this.logger.debug(`admin successfully get by telegramId: ${id}`);

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

    const { telegramId, username } = createAdminDto;

    const admin = await this.adminsRepository.findOneByTelegramId(telegramId);

    if (admin) {
      this.logger.error(`admin with telegramId: ${telegramId} already exist`);
      throw new HttpException(`admin with telegramId: ${telegramId} already exist`, HttpStatus.BAD_REQUEST);
    }

    this.adminsRepository.createAdmin(createAdminDto);

    this.logger.debug(`admin successfully created with id: ${telegramId} and name: ${username}`);
  }

  async deleteAdmin(id: Admin['id']): Promise<string> {
    this.logger.log(`Trying to delete admin by id: ${id}`);

    const { affected } = await this.adminsRepository.deleteAdminById(id);

    this.logger.debug(`Admin successfully deleted. ${affected}`);

    return affected ? 'Админ успешно удалён' : 'При удалении админа возникла ошибка';
  }

  async updateAdmin(id: Admin['id'], updateAdminDto: UpdateAdminDto): Promise<string> {
    this.logger.log(`Trying to update admin by id: ${id}`);

    const { affected } = await this.adminsRepository.updateAdmin(id, updateAdminDto);

    this.logger.debug(`Admin successfully updated. ${affected}`);

    return affected ? 'Админ успешно обновлён' : 'При обновлении админа возникла ошибка';
  }
}
