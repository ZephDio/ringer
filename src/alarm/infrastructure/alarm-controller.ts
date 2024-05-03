import { Controller, Get } from "@nestjs/common";
import { CreateAlarmCommand, CreateAlarmCommandHandler } from "../applicative/commands/create-alarm-command-handler";

@Controller('alarms')
export class AlarmController {
    constructor(private readonly createAlarmCommandHandler: CreateAlarmCommandHandler) {
    }

    @Get()
    async createAlarm(): Promise<void> {
        console.log(this.createAlarmCommandHandler)
        const date = new Date()
        await this.createAlarmCommandHandler.handle(new CreateAlarmCommand(date));
    }
}