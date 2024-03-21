import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsString, Length, Max, Min } from 'class-validator';

import { AdminRoles, AdminState } from '../admins.constants';
import { Admin } from '../entity/admins.entity';

export class AdminDto {
  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(10000)
  @Max(99999999999)
  telegramId: Admin['telegramId'];

  @IsString()
  @Length(3, 40)
  username: Admin['username'];

  @IsEnum(AdminRoles)
  adminRoles: Admin['adminRoles'];

  @IsEnum(AdminState)
  adminState: Admin['adminState'];

  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(10000)
  @Max(99999999999)
  telegramIdToDelete: number;
}
