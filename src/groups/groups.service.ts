import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import { Group } from './entity/groups.entity';
import { GroupsRepository } from './groups.repository';

@Injectable()
export class GroupsService {
  private readonly logger = new Logger(GroupsService.name);
  constructor(private groupsRepository: GroupsRepository) {}

  async findGroupById(id: Group['id']): Promise<Group> {
    this.logger.log(`Trying to get group info by id: ${id}`);

    const group = this.groupsRepository.findOneById(id);

    if (!group) {
      this.logger.error(`Group with id: ${id} not found`);
      throw new HttpException(`Group with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }

    this.logger.debug(`Group successfully get by id: ${id}`);

    return group;
  }

  async findGroupByGroupName(groupName: Group['groupName']): Promise<Group> {
    this.logger.log(`Trying to get group by name: ${groupName}`);

    const group = this.groupsRepository.findOneByGroupName(groupName);

    if (!group) {
      this.logger.error(`Group with name: ${groupName} not found`);
      throw new HttpException(`Group with name: ${groupName} not found`, HttpStatus.NOT_FOUND);
    }

    this.logger.debug(`Group successfully get by name: ${groupName}`);

    return group;
  }

  async getAllGroups(): Promise<Group[]> {
    this.logger.log(`Trying to get all groups`);

    const [groups, count] = await this.groupsRepository.findAllGroups();

    this.logger.debug(`${count} Groups successfully get`);

    return groups;
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<void> {
    this.logger.log(`Trying to create group`);

    const { telegramId } = createGroupDto;

    const group = await this.groupsRepository.findOneByTelegramId(telegramId);

    if (group) {
      this.logger.error(`Group with telegramId: ${telegramId} already exist`);
      throw new HttpException(`Group with telegramId: ${telegramId} already exist`, HttpStatus.BAD_REQUEST);
    }

    await this.groupsRepository.createGroup(createGroupDto);

    this.logger.debug(`Group successfully created`);
  }

  async deleteGroup(id: Group['id']): Promise<DeleteResult> {
    this.logger.log(`Trying to delete group by id: ${id}`);

    const group = await this.groupsRepository.findOneById(id);

    if (!group) {
      this.logger.error(`Group with id: ${id} not exist`);
      throw new HttpException(`Group with id: ${id} not exist`, HttpStatus.BAD_REQUEST);
    }

    const deletedGroup = await this.groupsRepository.deleteGroupById(id);

    this.logger.debug(` Group successfully deleted by id: ${id}`);

    return deletedGroup;
  }

  async updateGroup(id: Group['id'], updateGroupDto: UpdateGroupDto): Promise<UpdateResult> {
    this.logger.log(`Trying to update group by id: ${id}`);

    const group = await this.groupsRepository.findOneById(id);

    if (!group) {
      this.logger.error(`Group with id: ${id} not exist`);
      throw new HttpException(`Group with id: ${id} not exist`, HttpStatus.BAD_REQUEST);
    }

    const updatedGroup = await this.groupsRepository.updateGroup(id, updateGroupDto);

    this.logger.debug(`Group successfully updated by id: ${id}`);

    return updatedGroup;
  }
}
