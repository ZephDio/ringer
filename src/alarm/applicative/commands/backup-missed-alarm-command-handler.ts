import { DateProvider } from "../../../shared/date-provider";
import { BackupService } from "../services/backup-service";
import { AlarmStore } from "../store/alarm-store";


export class BackupMissedAlarmCommand {
    constructor() { }
}

export class BackupMissedAlarmCommandHandler {
    constructor(public readonly alarmStore : AlarmStore,public backupService : BackupService,public dateProvider: DateProvider) { }

    async handle(_command : BackupMissedAlarmCommand) : Promise<void> {
        const alarms = await this.alarmStore.getMissedAlarmsFrom(this.dateProvider.now());
        for (const alarm of alarms) {
            this.backupService.backupAlarm(alarm,this.alarmStore)
        }
    }
}


