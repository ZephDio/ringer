import { DateBuilder, DateProvider } from "../../../shared/date-provider";
import { AlarmStore } from "../store/alarm-store";

export class GetAlarmsQuery {
}

export class GetAlarmsQueryHandler {
    constructor(private readonly alarmStore: AlarmStore,public dateProvider : DateProvider) { }

    async handle(_command: GetAlarmsQuery){
        const triggerTimeThreshold = DateBuilder.passedOneHour(this.dateProvider);
        return this.alarmStore.getWatchableAlarms(triggerTimeThreshold);
    }
}