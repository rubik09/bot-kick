import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

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
  async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<void> {
    await this.groupsService.createGroup(createGroupDto);
  }

  @Patch(':id')
  async updateGroup(@Param('id') id: Group['id'], @Body() updateGroupDto: UpdateGroupDto): Promise<void> {
    await this.groupsService.updateGroup(id, updateGroupDto);
  }

  @Delete(':id')
  async deleteGroup(@Param('id') id: Group['id']): Promise<void> {
    await this.groupsService.deleteGroup(id);
  }
}
