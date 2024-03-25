import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { Admin } from './entity/admins.entity';
import { JwtGuard } from '../auth/jwtAuth.guard';

@Controller('admins')
export class AdminsController {
  constructor(private adminsService: AdminsService) {}

  @Get(':id')
  @UseGuards(JwtGuard)
  async findAdminById(@Param('id') id: Admin['id']): Promise<Admin> {
    return this.adminsService.findAdminById(id);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminsService.getAllAdmins();
  }

  @Post()
  @UseGuards(JwtGuard)
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    await this.adminsService.createAdmin(createAdminDto);
    throw new HttpException('Админ успешно создан', HttpStatus.CREATED);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async updateAdmin(@Param('id') id: Admin['id'], @Body() updateAdminDto: UpdateAdminDto) {
    const message = await this.adminsService.updateAdmin(id, updateAdminDto);
    throw new HttpException(message, HttpStatus.OK);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteAdmin(@Param('id') id: Admin['id']) {
    const message = await this.adminsService.deleteAdmin(id);
    throw new HttpException(message, HttpStatus.OK);
  }
}
