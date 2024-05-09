import { DateProvider, FakeDateProvider } from "../../../shared/date-provider";
import { FakeIdProvider, IdProvider } from "../../../shared/id-provider";
import { Alarm } from "../../domain/alarm";
import { AlarmStoreInMemory } from "../../infrastructure/store/alarm-store-inmemo";
import { AlarmStore } from "../store/alarm-store";
import { CreateAlarmCommand, CreateAlarmCommandHandler } from "./create-alarm-command-handler";


describe('create alarm', () => {
    let dateProvider: DateProvider
    let stored: Alarm[] = [];
    let store : AlarmStore;
    let handler : CreateAlarmCommandHandler;
    let idProvider: IdProvider;

    beforeEach(() => {
        dateProvider = new FakeDateProvider(new Date("2024-05-06T14:30"))
        idProvider = new FakeIdProvider('34');
        store = new AlarmStoreInMemory(stored);
        handler = new CreateAlarmCommandHandler(store, idProvider);
    });

    it('should create alarm', async () => {
        const command = new CreateAlarmCommand(new Date());
        await handler.handle(command);
        expect(stored).toHaveLength(1);
    })

    it('should not create an alarm with a time passed', async () => {
        const command = new CreateAlarmCommand(new Date());
    })

})