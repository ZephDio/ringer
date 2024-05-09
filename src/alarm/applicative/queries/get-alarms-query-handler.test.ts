import { DateBuilder, DateProvider, FakeDateProvider } from "../../../shared/date-provider";
import { FakeIdProvider } from "../../../shared/id-provider";
import { Alarm, AlarmId } from "../../domain/alarm";
import { AlarmStoreInMemory } from "../../infrastructure/store/alarm-store-inmemo";
import { AlarmStore } from "../store/alarm-store";
import { GetAlarmsQuery, GetAlarmsQueryHandler } from "./get-alarms-query-handler";


describe('get alarms', () => {
    let stored: Alarm[] = [];
    let store : AlarmStore;
    let handler : GetAlarmsQueryHandler;
    let dateProvider: DateProvider

    beforeEach(() => {
        dateProvider = new FakeDateProvider(new Date("2024-05-06T14:30"))
        stored.push(new Alarm(new AlarmId('1'), DateBuilder.inOneMinute(dateProvider)))
        stored.push(new Alarm(new AlarmId('2'), DateBuilder.passedOneMinute(dateProvider)))
        stored.push(new Alarm(new AlarmId('3'), DateBuilder.passedTwoHours(dateProvider)))
        store = new AlarmStoreInMemory(stored);
        handler = new GetAlarmsQueryHandler(store, dateProvider);
    });

    it('should get alarms', async () => {
        const command = new GetAlarmsQuery();
        const alarms = await handler.handle(command);
        expect(alarms).toHaveLength(2);
        expect(alarms[0].id.value).toBe('1');
        expect(alarms[1].id.value).toBe('2');
    })

})