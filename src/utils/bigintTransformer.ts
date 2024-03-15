import { ValueTransformer } from 'typeorm';

export const bigintTransformer: ValueTransformer = {
  to: (entityValue: number) => BigInt(entityValue),
  from: (databaseValue: string): number => {
    return parseInt(databaseValue, 10) as number;
  },
};
