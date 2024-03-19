import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';

import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { Admin } from './entity/admins.entity';

@Controller('admins')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  @Get(':id')
  async findAdminById(@Param('id') id: Admin['id']): Promise<Admin> {
    return this.adminsService.findAdminById(id);
  }

  @Get()
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminsService.getAllAdmins();
  }

  @Post()
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    await this.adminsService.createAdmin(createAdminDto);
    throw new HttpException('Админ успешно создан', HttpStatus.CREATED);
  }

  @Patch(':id')
  async updateAdmin(@Param('id') id: Admin['id'], @Body() updateAdminDto: UpdateAdminDto) {
    await this.adminsService.updateAdmin(id, updateAdminDto);
    throw new HttpException('Админ успешно обновлён', HttpStatus.OK);
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: Admin['id']) {
    await this.adminsService.deleteAdmin(id);
    throw new HttpException('Админ успешно удалён', HttpStatus.OK);
  }
}