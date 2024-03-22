export default function findBotAdmin(adminsIdsArr: number[], botId: number): boolean {
  return !!adminsIdsArr.find((id) => id === botId);
}
