import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import { Group } from './entity/groups.entity';

@Injectable()
export class GroupsRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    return await this.groupRepository.save(createGroupDto);
  }

  async findAllGroups(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async findOneByGroupName(groupName: Group['groupName']): Promise<Group> {
    return await this.groupRepository.findOne({
      where: { groupName },
    });
  }

  async findOneById(id: Group['id']): Promise<Group> {
    return await this.groupRepository.findOne({
      where: { id },
    });
  }

  async findOneByTelegramId(telegramId: Group['telegramId']): Promise<Group> {
    return await this.groupRepository.findOne({
      where: { telegramId },
    });
  }

  async deleteGroupById(id: Group['id']): Promise<number> {
    const { affected } = await this.groupRepository.delete(id);
    return affected;
  }

  async updateGroup(id: Group['id'], updateGroupDto: UpdateGroupDto): Promise<number> {
    const { affected } = await this.groupRepository.update({ id }, updateGroupDto);
    return affected;
  }
}
