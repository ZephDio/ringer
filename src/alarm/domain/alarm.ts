export class AlarmId {
    constructor(public value: string) { }
}

export class Alarm {
    constructor(public id: AlarmId, public time: Date,public acknowledged: boolean = false) {
    }

    acknowledge(){
        this.acknowledged = true;
    }
}