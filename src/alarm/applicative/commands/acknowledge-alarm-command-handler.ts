import { Command, CommandHandler } from "../../../shared/cqs/commands-queries"
import { AlarmId } from "../../domain/alarm"
import { AlarmStore } from "../store/alarm-store"

export class AcknowledgeAlarmCommand implements Command {
    type = 'acknowledge-alarm'
    constructor(public alarmId: AlarmId) { }
}

export class AcknowledgeAlarmCommandHandler implements CommandHandler<AcknowledgeAlarmCommand> {
    constructor(private readonly store: AlarmStore) { }

    async handle(command: AcknowledgeAlarmCommand) {
        const alarm = await this.store.getAlarm(command.alarmId)
        alarm.acknowledge()
        await this.store.save
    }
}