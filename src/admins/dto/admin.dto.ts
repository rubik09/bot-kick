import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsString, Length, Max, Min } from 'class-validator';

import { AdminRoles } from '../admins.constants';
import { Admins } from '../entity/admins.entity';

export class AdminDto {
  @IsInt()
  id: Admins['id'];

  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(10000)
  @Max(99999999999)
  telegramId: Admins['telegramId'];

  @IsString()
  @Length(3, 40)
  username: Admins['username'];

  @IsEnum(AdminRoles)
  adminRoles: Admins['adminRoles'];
}
