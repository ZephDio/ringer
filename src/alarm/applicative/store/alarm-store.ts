import { Alarm, AlarmId } from "../../domain/alarm";

export abstract class AlarmStore {
    abstract save(alarm: Alarm): Promise<void>
    abstract getAlarm(id: AlarmId): Promise<Alarm>

    abstract getWatchableAlarms(from : Date): Promise<Alarm[]>

}