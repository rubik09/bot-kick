import { PickType } from '@nestjs/mapped-types';

import { GroupDto } from './group.dto';

export class DeleteGroupDto extends PickType(GroupDto, ['groupName']) {}
