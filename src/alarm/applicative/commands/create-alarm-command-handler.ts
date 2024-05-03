import { Injectable } from "@nestjs/common";
import { Alarm, AlarmId } from "../../domain/alarm";
import { AlarmStore } from "../store/alarm-store";

export class CreateAlarmCommand {
    constructor(public time: Date) { }
}

export class CreateAlarmCommandHandler {
    constructor(private readonly alarmStore: AlarmStore) { } // private readonly idProvider: IdProvider

    async handle(command: CreateAlarmCommand): Promise<AlarmId> {
        console.log('CreateAlarmCommandHandler.execute', command)
        const id = '34'
        const alarmId = new AlarmId(id)
        const alarm = new Alarm(alarmId, command.time);
        await this.alarmStore.createAlarm(alarm);
        return alarmId
    }
}