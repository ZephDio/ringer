import { Alarm } from "../../domain/alarm";
import { BackupStrategy } from "../backup-strategy/backup-strategy";
import { AlarmStore } from "../store/alarm-store";


export class BackupService {
    constructor(public readonly backupStrategies: BackupStrategy[]) {
    }
    
    async backupAlarm(alarm : Alarm,store : AlarmStore){
        let alarmNotified = alarm
        for (const backupStrategy of this.backupStrategies) {

            await backupStrategy.notify(alarm);

            const afterNotifyAlarm = await store.getAlarm(alarmNotified.id)
            alarmNotified = afterNotifyAlarm

            if (alarmNotified.acknowledged) {
                break;
            }
        }

        if(!alarmNotified.acknowledged){
           alarm.acknowledge()
           await store.save(alarm)
           console.log('Alarm missed by the user despite all the notifications :c')
        }

        console.log(`Alarm acknowledged by the user for ${alarm.id.value}`)
    }
}