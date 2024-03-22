import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { CreateGroupDto } from './dto/createGroup.dto';
import { UpdateGroupDto } from './dto/updateGroup.dto';
import { Group } from './entity/groups.entity';
import { GroupsRepository } from './groups.repository';
import { BotService } from '../bot/bot.service';
import findBotAdmin from '../utils/findAdmin';

@Injectable()
export class GroupsService {
  private readonly logger = new Logger(GroupsService.name);
  constructor(
    private groupsRepository: GroupsRepository,
    private botService: BotService,
  ) {}

  async findGroupById(id: Group['id']): Promise<Group> {
    this.logger.log(`Trying to get group info by id: ${id}`);

    const group = await this.groupsRepository.findOneById(id);

    if (!group) {
      this.logger.error(`Group with id: ${id} not found`);
      throw new HttpException(`Group with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }

    this.logger.debug(`Group successfully get by id: ${id}`);

    return group;
  }

  async getAllGroups(): Promise<Group[]> {
    this.logger.log(`Trying to get all groups`);

    const [groups, count] = await this.groupsRepository.findAllGroups();

    this.logger.debug(`${count} Groups successfully get`);

    return groups;
  }

  async getAllGroupsId(): Promise<number[]> {
    this.logger.log(`Trying to get all groups`);

    const [groups, count] = await this.groupsRepository.findAllGroups();

    this.logger.debug(`${count} Groups successfully get`);

    return groups.map(({ telegramId }) => telegramId);
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<void> {
    this.logger.log(`Trying to create group`);

    const { telegramId, groupName } = createGroupDto;

    const group = await this.groupsRepository.findOneByTelegramId(telegramId);

    if (group) {
      this.logger.error(`Group with telegramId: ${telegramId} already exist`);
      throw new HttpException(`Group with telegramId: ${telegramId} already exist`, HttpStatus.BAD_REQUEST);
    }

    const adminsIdsArr = await this.botService.getChatAdministratorIds(telegramId);
    const bot = await this.botService.getMe();

    if (!findBotAdmin(adminsIdsArr, bot.id)) {
      this.logger.error(`Bot is not admin in this group.`);
      throw new HttpException(`Bot is not admin in this group.`, HttpStatus.NOT_FOUND);
    }

    this.groupsRepository.createGroup(createGroupDto);

    this.logger.debug(`Group successfully created with id: ${telegramId} and name: ${groupName}`);
  }

  async deleteGroup(id: Group['id']): Promise<string> {
    this.logger.log(`Trying to delete group by id: ${id}`);

    const { affected } = await this.groupsRepository.deleteGroupById(id);

    this.logger.debug(`Group successfully deleted by id. ${affected}`);

    return affected ? 'Группа успешно удалена' : 'При удалении группы возникла ошибка';
  }

  async updateGroup(id: Group['id'], updateGroupDto: UpdateGroupDto): Promise<string> {
    this.logger.log(`Trying to update group by id: ${id}`);

    const group = await this.groupsRepository.findOneById(id);

    if (!group) {
      this.logger.error(`Group with id: ${id} not exist`);
      throw new HttpException(`Group with id: ${id} not exist`, HttpStatus.BAD_REQUEST);
    }

    const { affected } = await this.groupsRepository.updateGroup(id, updateGroupDto);

    this.logger.debug(`Group successfully updated by id. ${affected}`);

    return affected ? 'Группа успешно обновлена' : 'При обновлении группы возникла ошибка';
  }
}
