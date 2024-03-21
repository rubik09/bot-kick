import { AdminActions } from './admins.constants';
import { Admin } from './entity/admins.entity';

export type TAdminsActions = {
  [key in AdminActions]: (text: string, admin: Admin) => Promise<void>;
};
