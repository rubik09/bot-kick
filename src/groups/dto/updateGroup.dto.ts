import { PickType } from '@nestjs/mapped-types';

import { GroupDto } from './group.dto';

export class UpdateGroupDto extends PickType(GroupDto, ['groupName']) {}
