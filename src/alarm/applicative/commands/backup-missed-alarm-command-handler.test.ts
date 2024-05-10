import { DateProvider, FakeDateProvider } from "../../../shared/date-provider";
import { Alarm, AlarmId } from "../../domain/alarm";
import { AlarmStoreInMemory } from "../../infrastructure/store/alarm-store-inmemo";
import { BackupStrategy } from "../backup-strategy/backup-strategy";
import { BackupService } from "../services/backup-service";
import { AlarmStore } from "../store/alarm-store";
import { AcknowledgeAlarmCommand, AcknowledgeAlarmCommandHandler } from "./acknowledge-alarm-command-handler";
import { BackupMissedAlarmCommand, BackupMissedAlarmCommandHandler } from "./backup-missed-alarm-command-handler";

describe('acknowledge alarm', () => {

    let dateProvider: DateProvider
    let stored: Alarm[] = [];
    let store : AlarmStore;
    let handler : BackupMissedAlarmCommandHandler;
    let service : BackupService;
    let firstStrategyTrace :  string[]
    let failingBackupStrategyOne : BackupStrategy
    let secondStrategyTrace :   string[]
    let successfulBackupStrategyTwo : BackupStrategy
    let thirdStrategyTrace :   string[]
    let neverToBeCalledBackupStrategyThree : BackupStrategy
    
    beforeEach(() => {
        firstStrategyTrace = []
        secondStrategyTrace = []
        thirdStrategyTrace = []
        const alarmMissed = new Alarm(new AlarmId('1'), new Date("2024-05-06T14:29"));
        const otherAlarmMissed = new Alarm(new AlarmId('2'), new Date("2024-05-06T14:28"));
        const alarmPending = new Alarm(new AlarmId('3'), new Date("2024-05-06T14:31"));
        stored.push(alarmMissed, otherAlarmMissed, alarmPending);
        store = new AlarmStoreInMemory(stored);
        dateProvider = new FakeDateProvider(new Date("2024-05-06T14:30"))
        failingBackupStrategyOne = {
                async notify(alarm : Alarm){
                    firstStrategyTrace.push(alarm.id.value)
                    return
                }
        } 
        successfulBackupStrategyTwo = {
            async notify(alarm : Alarm){
                alarm.acknowledge()
                store.save(alarm)
                secondStrategyTrace.push(alarm.id.value)
                return
            }
        } 
        neverToBeCalledBackupStrategyThree = {
            async notify(alarm : Alarm){
                thirdStrategyTrace.push(alarm.id.value)
                return
            }
        } 
        service = new BackupService([failingBackupStrategyOne, successfulBackupStrategyTwo, neverToBeCalledBackupStrategyThree]);

 
        handler = new BackupMissedAlarmCommandHandler(store,service,dateProvider);
    });

    it('should call every strategy until the alarm is noted acknowledged', async () => {
        const command = new BackupMissedAlarmCommand();
        await handler.handle(command);
        
        const alarmMissed = await store.getAlarm(new AlarmId('1'))
        expect(alarmMissed.acknowledged).toBe(true);

        expect(firstStrategyTrace).toContain('1');
        expect(firstStrategyTrace).toContain('2');
        expect(firstStrategyTrace).not.toContain('3');

        expect(secondStrategyTrace).toContain('1');
        expect(secondStrategyTrace).toContain('2');
        expect(secondStrategyTrace).not.toContain('3');

        expect(thirdStrategyTrace).not.toContain('1');
        expect(thirdStrategyTrace).not.toContain('2');
        expect(thirdStrategyTrace).not.toContain('3');
    })

})