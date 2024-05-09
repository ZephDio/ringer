import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { CreateAlarmCommand, CreateAlarmCommandHandler } from "../applicative/commands/create-alarm-command-handler";
import { GetAlarmsQuery, GetAlarmsQueryHandler } from "../applicative/queries/get-alarms-query-handler";
import { AcknowledgeAlarmCommand, AcknowledgeAlarmCommandHandler } from "../applicative/commands/acknowledge-alarm-command-handler";
import { AlarmId } from "../domain/alarm";

@Controller('alarms')
export class AlarmController {
    constructor(private readonly createAlarmCommandHandler: CreateAlarmCommandHandler,private readonly getAlarmsQueryHandler: GetAlarmsQueryHandler, private readonly acknowledgeAlarmCommandHandler: AcknowledgeAlarmCommandHandler) {
    }

    @Post('create')
    async createAlarm(@Body('alarmTime') alarmTime : string) {
        const date = new Date(alarmTime)
        if(isNaN(date.getTime())) throw new Error('Invalid date')
        await this.createAlarmCommandHandler.handle(new CreateAlarmCommand(date));
        return 'created'
    }

    @Get('watchable')
    async getWatchableAlarms() {
        const query = new GetAlarmsQuery()
        const alarms = await this.getAlarmsQueryHandler.handle(query)
        return alarms
    }

    @Post('acknowledge/:id')
    async acknowledgeAlarm(@Param('id') id: string) {
        const command = new AcknowledgeAlarmCommand(new AlarmId(id))
        await this.acknowledgeAlarmCommandHandler.handle(command)
        return 'acknowledged'
    }
}