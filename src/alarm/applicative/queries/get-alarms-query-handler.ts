import { Query, QueryHandler } from "../../../shared/cqs/commands-queries";
import { DateBuilder, DateProvider } from "../../../shared/date-provider";
import { AlarmStore } from "../store/alarm-store";

export class GetAlarmsQuery implements Query {
    fetch = 'get-alarms'
}

export class GetAlarmsQueryHandler implements QueryHandler<GetAlarmsQuery> {
    constructor(private readonly alarmStore: AlarmStore, public dateProvider: DateProvider) { }

    async handle(_command: GetAlarmsQuery) {
        const triggerTimeThreshold = DateBuilder.passedOneHour(this.dateProvider);
        return this.alarmStore.getWatchableAlarms(triggerTimeThreshold);
    }
}