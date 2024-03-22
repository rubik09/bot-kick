export default function findBotAdmin(adminsIdsArr: number[], botId: number): number {
  return adminsIdsArr.find((id) => id === botId);
}
