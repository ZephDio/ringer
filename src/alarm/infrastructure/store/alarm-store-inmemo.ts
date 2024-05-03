import { AlarmStore } from "../../applicative/store/alarm-store";
import { Alarm } from "../../domain/alarm";

export class AlarmStoreInMemory implements AlarmStore {
    constructor(public store: Alarm[] = []) {
    }

    async createAlarm(alarm: Alarm): Promise<void> {
        console.log('alarmStore', alarm.id.value)
        this.store.push(alarm);
    }
}