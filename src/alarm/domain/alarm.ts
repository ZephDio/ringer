export class AlarmId {
    constructor(public value: string) { }
}

export class Alarm {
    constructor(public id: AlarmId, public time: Date) {
    }
}