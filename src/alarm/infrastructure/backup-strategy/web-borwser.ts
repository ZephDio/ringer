import { BackupStrategy } from "../../applicative/backup-strategy/backup-strategy";
import { Alarm } from "../../domain/alarm";


export class WebBrowserBackupStrategy implements BackupStrategy {
    async notify(alarm : Alarm) {
        console.log(`Alarm ${alarm.id.value} is ringing in your browser`);
        await new Promise(resolve => setTimeout(resolve, 30000));
        return
    }
}