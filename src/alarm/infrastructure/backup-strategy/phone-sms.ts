import { BackupStrategy } from "../../applicative/backup-strategy/backup-strategy";
import { Alarm } from "../../domain/alarm";


export class PhoneSmsBackupStrategy implements BackupStrategy {
    async notify(alarm : Alarm) {
        console.log(`A Sms as been send to the user fro ${alarm.id.value}`);
        await new Promise(resolve => setTimeout(resolve, 30000));
        return
    }
}