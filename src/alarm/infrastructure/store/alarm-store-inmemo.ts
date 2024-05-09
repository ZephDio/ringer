import { AlarmStore } from "../../applicative/store/alarm-store";
import { Alarm, AlarmId } from "../../domain/alarm";

export class AlarmStoreInMemory implements AlarmStore {
    constructor(public store: Alarm[] = []) {
    }

    async save(alarm: Alarm): Promise<void> {
        const existingAlarm = this.store.find(a => a.id.value === alarm.id.value);
        if(!existingAlarm){
            this.store.push(alarm);
            return
        }
        const index = this.store.indexOf(existingAlarm);
        this.store[index] = alarm;
    }

    async getWatchableAlarms(from : Date) {
        return this.store.filter(alarm => alarm.time.getTime() > from.getTime());
    }

    async getAlarm(id: AlarmId){
        const alarm = this.store.find(alarm => alarm.id.value === id.value);
        if (!alarm) throw new Error(`Alarm with id ${id} not found`);
        return alarm;
    }
}