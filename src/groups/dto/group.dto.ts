import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

import { Groups } from '../entity/groups.entity';

export class GroupDto {
  @IsInt()
  id: Groups['id'];

  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  @Min(10000)
  @Max(99999999999999)
  telegramId: Groups['telegramId'];
}
