import { PickType } from '@nestjs/mapped-types';

import { AdminDto } from './admin.dto';

export class CreateAdminDto extends PickType(AdminDto, ['telegramId', 'username', 'adminRoles']) {}
