import { Module } from "@nestjs/common";
import { AlarmStore } from "./applicative/store/alarm-store";
import { AlarmStoreInMemory } from "./infrastructure/store/alarm-store-inmemo";
import { AlarmController } from "./infrastructure/alarm-controller";
import { CreateAlarmCommandHandler } from "./applicative/commands/create-alarm-command-handler";
import { IdProvider, UuidIdProvider } from "../shared/id-provider";
import { DateProvider, NodeDateProvider } from "../shared/date-provider";
import { AcknowledgeAlarmCommandHandler } from "./applicative/commands/acknowledge-alarm-command-handler";
import { GetAlarmsQueryHandler } from "./applicative/queries/get-alarms-query-handler";



const alarmStore = {
    provide: AlarmStore,
    useFactory: () => {
        return new AlarmStoreInMemory();
    },
};

const idProvider = {
    provide: IdProvider,
    useFactory: () => {
        return new UuidIdProvider();
    },
};

const dateProvider = {
    provide: DateProvider,
    useFactory: () => {
        return new NodeDateProvider();
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

const getAlarmsQueryHandler = { 
    provide: GetAlarmsQueryHandler,
    inject: [AlarmStore, DateProvider],
    useFactory: (alarmStore: AlarmStore, dateProvider: DateProvider) => {
        return new GetAlarmsQueryHandler(alarmStore, dateProvider);
    }
}

const stores = [alarmStore]
const core = [idProvider, dateProvider]
const commands = [createAlarmCommandHandler, acknowledgeAlarmCommandHandler];
const queries = [getAlarmsQueryHandler];

@Module({
    controllers: [AlarmController],
    providers: [...stores, ...core , ...commands, ...queries],
})
export class AlarmModule { }