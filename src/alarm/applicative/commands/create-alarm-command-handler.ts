import { Injectable } from "@nestjs/common";
import { Alarm, AlarmId } from "../../domain/alarm";
import { AlarmStore } from "../store/alarm-store";
import { IdProvider } from "../../../shared/id-provider";

export class CreateAlarmCommand {
    constructor(public time: Date) { }
}

export class CreateAlarmCommandHandler {
    constructor(private readonly alarmStore: AlarmStore,public idProvider: IdProvider) { } // private readonly idProvider: IdProvider

    async handle(command: CreateAlarmCommand): Promise<AlarmId> {
        const alarmId = new AlarmId(this.idProvider.generateId())
        const alarm = new Alarm(alarmId, command.time);
        await this.alarmStore.save(alarm);
        return alarmId
    }
}