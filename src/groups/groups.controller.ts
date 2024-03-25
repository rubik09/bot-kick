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

import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import { Group } from './entity/groups.entity';
import { GroupsService } from './groups.service';
import { JwtGuard } from '../auth/jwtAuth.guard';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get(':id')
  async findGroupById(@Param('id') id: Group['id']): Promise<Group> {
    return this.groupsService.findGroupById(id);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAllGroups(): Promise<Group[]> {
    return this.groupsService.getAllGroups();
  }

  @Post()
  @UseGuards(JwtGuard)
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    await this.groupsService.createGroup(createGroupDto);
    throw new HttpException('Группа успешно создана', HttpStatus.CREATED);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  async updateGroup(@Param('id') id: Group['id'], @Body() updateGroupDto: UpdateGroupDto) {
    const message = await this.groupsService.updateGroup(id, updateGroupDto);
    throw new HttpException(message, HttpStatus.OK);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteGroup(@Param('id') id: Group['id']) {
    const message = await this.groupsService.deleteGroup(id);
    throw new HttpException(message, HttpStatus.OK);
  }
}
