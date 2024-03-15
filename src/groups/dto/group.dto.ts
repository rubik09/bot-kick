import { Transform } from 'class-transformer';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';

import { Group } from '../entity/groups.entity';

export class GroupDto {
  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(10000)
  @Max(99999999999999)
  telegramId: Group['telegramId'];

  @IsString()
  @Length(3, 50)
  groupName: Group['groupName'];
}
