import { PickType } from '@nestjs/mapped-types';

import { GroupDto } from './group.dto';

export class CreateGroupDto extends PickType(GroupDto, ['telegramId', 'groupName']) {}
