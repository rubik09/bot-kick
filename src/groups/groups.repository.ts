import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

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
    return await this.groupRepository
      .createQueryBuilder('groups')
      .insert()
      .into(Group)
      .values(createGroupDto)
      .execute();
  }

  async findAllGroups(): Promise<[Group[], number] | []> {
    return await this.groupRepository.createQueryBuilder('groups').getManyAndCount();
  }

  async findOneById(id: number): Promise<Group | null> {
    return await this.groupRepository.createQueryBuilder('groups').where('groups.id = :id', { id }).getOne();
  }

  async findOneByTelegramId(telegramId: number): Promise<Group | null> {
    return await this.groupRepository
      .createQueryBuilder('groups')
      .where('groups.telegramId = :telegramId', { telegramId })
      .getOne();
  }

  async deleteGroupById(id: number): Promise<DeleteResult> {
    return await this.groupRepository
      .createQueryBuilder('groups')
      .delete()
      .from(Group)
      .where('id = :id', { id })
      .execute();
  }

  async updateGroup(id: number, updateGroupDto: UpdateGroupDto): Promise<UpdateResult> {
    return await this.groupRepository
      .createQueryBuilder('groups')
      .update(Group)
      .set(updateGroupDto)
      .where('id = :id', { id })
      .execute();
  }
}
