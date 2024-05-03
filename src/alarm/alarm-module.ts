import { Module } from "@nestjs/common";
import { AlarmStore } from "./applicative/store/alarm-store";
import { AlarmStoreInMemory } from "./infrastructure/store/alarm-store-inmemo";
import { AlarmController } from "./infrastructure/alarm-controller";
import { CreateAlarmCommandHandler } from "./applicative/commands/create-alarm-command-handler";



const alarmStore = {
    provide: AlarmStore,
    useFactory: () => {
        return new AlarmStoreInMemory();
    },
};

const createAlarmCommandHandler = {
    provide: CreateAlarmCommandHandler,
    inject: [AlarmStore],
    useFactory: (alarmStore: AlarmStore) => {
        return new CreateAlarmCommandHandler(alarmStore);
    },
};


@Module({
    controllers: [AlarmController],
    providers: [alarmStore, createAlarmCommandHandler],
})
export class AlarmModule { }