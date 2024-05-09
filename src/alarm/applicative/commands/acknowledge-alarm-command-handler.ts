import { AlarmId } from "../../domain/alarm"
import { AlarmStore } from "../store/alarm-store"

export class AcknowledgeAlarmCommand{
    constructor(public alarmId: AlarmId) { }
}

export class AcknowledgeAlarmCommandHandler {
    constructor(private readonly store: AlarmStore) { }

    async handle(command: AcknowledgeAlarmCommand) {
        const alarm = await this.store.getAlarm(command.alarmId)
        alarm.acknowledge()
        await this.store.save
    }
}