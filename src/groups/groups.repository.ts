import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import { Group } from './entity/groups.entity';

@Injectable()
export class GroupsRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto): Promise<InsertResult> {
    return await this.groupRepository.createQueryBuilder().insert().into(Group).values(createGroupDto).execute();
  }

  async findAllGroups(): Promise<Group[]> {
    return await this.groupRepository.createQueryBuilder('group').getMany();
  }

  async findOneByGroupName(groupName: Group['groupName']): Promise<Group> {
    return await this.groupRepository
      .createQueryBuilder('group')
      .where('group.groupName = :groupName', { groupName })
      .getOne();
  }

  async findOneById(id: Group['id']): Promise<Group> {
    return await this.groupRepository.createQueryBuilder('group').where('group.id = :id', { id }).getOne();
  }

  async findOneByTelegramId(telegramId: Group['telegramId']): Promise<Group> {
    return await this.groupRepository
      .createQueryBuilder('group')
      .where('group.telegramId = :telegramId', { telegramId })
      .getOne();
  }

  async deleteGroupById(id: Group['id']): Promise<number> {
    const { affected } = await this.groupRepository
      .createQueryBuilder()
      .delete()
      .from(Group)
      .where('id = :id', { id })
      .execute();
    return affected;
  }

  async updateGroup(id: Group['id'], updateGroupDto: UpdateGroupDto): Promise<number> {
    const { affected } = await this.groupRepository
      .createQueryBuilder()
      .update(Group)
      .set(updateGroupDto)
      .where('id = :id', { id })
      .execute();
    return affected;
  }
}
