import { Module } from '@nestjs/common';
import { AlarmModule } from '../alarm/alarm-module';


@Module({
    imports: [AlarmModule]
})
export class AppModule { }