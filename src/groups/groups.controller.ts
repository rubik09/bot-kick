import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';

import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import { Group } from './entity/groups.entity';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get(':id')
  async findGroupById(@Param('id') id: Group['id']): Promise<Group> {
    return this.groupsService.findGroupById(id);
  }

  @Get()
  async getAllGroups(): Promise<Group[]> {
    return this.groupsService.getAllGroups();
  }

  @Post()
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    await this.groupsService.createGroup(createGroupDto);
    throw new HttpException('Группа успешно создана', HttpStatus.CREATED);
  }

  @Patch(':id')
  async updateGroup(@Param('id') id: Group['id'], @Body() updateGroupDto: UpdateGroupDto) {
    const message = await this.groupsService.updateGroup(id, updateGroupDto);
    throw new HttpException(message, HttpStatus.OK);
  }

  @Delete(':id')
  async deleteGroup(@Param('id') id: Group['id']) {
    const message = await this.groupsService.deleteGroup(id);
    throw new HttpException(message, HttpStatus.OK);
  }
}
