import { Alarm } from "../../domain/alarm";

export abstract class AlarmStore {
    abstract createAlarm(alarm: Alarm): Promise<void>
}