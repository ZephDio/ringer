import { Alarm, AlarmId } from "../../domain/alarm";
import { AlarmStoreInMemory } from "../../infrastructure/store/alarm-store-inmemo";
import { AlarmStore } from "../store/alarm-store";
import { AcknowledgeAlarmCommand, AcknowledgeAlarmCommandHandler } from "./acknowledge-alarm-command-handler";

describe('acknowledge alarm', () => {

    let stored: Alarm[] = [];
    let store : AlarmStore;
    let handler : AcknowledgeAlarmCommandHandler;
    
    beforeEach(() => {
        const alarm = new Alarm(new AlarmId('test'), new Date());
        stored.push(alarm);
        store = new AlarmStoreInMemory(stored);
        handler = new AcknowledgeAlarmCommandHandler(store);
    });

    it('should acknowledge alarm', async () => {
        const command = new AcknowledgeAlarmCommand(new AlarmId('test'));
        await handler.handle(command);
        
        expect(stored[0].acknowledged).toBe(true);
    })

})