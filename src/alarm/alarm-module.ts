import { Module } from "@nestjs/common";
import { AlarmStore } from "./applicative/store/alarm-store";
import { AlarmStoreInMemory } from "./infrastructure/store/alarm-store-inmemo";
import { AlarmController } from "./infrastructure/alarm-controller";
import { CreateAlarmCommandHandler } from "./applicative/commands/create-alarm-command-handler";
import { IdProvider, UuidIdProvider } from "../shared/id-provider";
import { DateProvider, NodeDateProvider } from "../shared/date-provider";
import { AcknowledgeAlarmCommandHandler } from "./applicative/commands/acknowledge-alarm-command-handler";
import { GetAlarmsQueryHandler } from "./applicative/queries/get-alarms-query-handler";
import { CoreModule } from "../shared/core-module";
import { BackupMissedAlarmCommandHandler } from "./applicative/commands/backup-missed-alarm-command-handler";
import { BackupService } from "./applicative/services/backup-service";
import { PhoneSmsBackupStrategy } from "./infrastructure/backup-strategy/phone-sms";
import { WebBrowserBackupStrategy } from "./infrastructure/backup-strategy/web-borwser";



const alarmStore = {
    provide: AlarmStore,
    useFactory: () => {
        return new AlarmStoreInMemory();
    },
};

const createAlarmCommandHandler = {
    provide: CreateAlarmCommandHandler,
    inject: [AlarmStore, IdProvider],
    useFactory: (alarmStore: AlarmStore, idProvider : IdProvider) => {
        return new CreateAlarmCommandHandler(alarmStore, idProvider);
    },
};

const acknowledgeAlarmCommandHandler = {
    provide: AcknowledgeAlarmCommandHandler,
    inject: [AlarmStore],
    useFactory: (alarmStore: AlarmStore) => {
        return new AcknowledgeAlarmCommandHandler(alarmStore);
    },
};

const backupMissedAlarmCommandHandler = {
    provide: BackupMissedAlarmCommandHandler,
    inject: [AlarmStore],
    useFactory: (alarmStore: AlarmStore, dateProvider: DateProvider) => {
        const webBrowserStrategy = new WebBrowserBackupStrategy();
        const smsStrategy = new PhoneSmsBackupStrategy();
        const backupService = new BackupService([webBrowserStrategy, smsStrategy]);
        return new BackupMissedAlarmCommandHandler(alarmStore, backupService,dateProvider);
    },
};

const getAlarmsQueryHandler = { 
    provide: GetAlarmsQueryHandler,
    inject: [AlarmStore, DateProvider],
    useFactory: (alarmStore: AlarmStore, dateProvider: DateProvider) => {
        return new GetAlarmsQueryHandler(alarmStore, dateProvider);
    }
}

const stores = [alarmStore]
const commands = [createAlarmCommandHandler, acknowledgeAlarmCommandHandler, backupMissedAlarmCommandHandler];
const queries = [getAlarmsQueryHandler];

@Module({
    imports: [CoreModule],
    controllers: [AlarmController],
    providers: [...stores, ...commands, ...queries]
})
export class AlarmModule { }