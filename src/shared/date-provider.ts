

export abstract class DateProvider {
    abstract now(): Date
}

export class NodeDateProvider implements DateProvider {
    now() {
        return new Date()
    }
}


export class FakeDateProvider implements DateProvider {
    constructor(private readonly date: Date) { }
    now() {
        return this.date
    }
}

export class DateBuilder{
    static inOneMinute(dateProvider : DateProvider) {
        const now = dateProvider.now()
        return new Date(now.getTime() + 60000)
    }

    static inTwoMinutes(dateProvider : DateProvider) {
        const now = dateProvider.now()
        return new Date(now.getTime() + 120000)
    }


    static passedOneMinute(dateProvider : DateProvider) {
        const now = dateProvider.now()
        return new Date(now.getTime() - 60000)
    }

    static passedOneHour(dateProvider : DateProvider) {
        const now = dateProvider.now()
        return new Date(now.getTime() - 3600000)
    }

    static passedTwoHours(dateProvider : DateProvider) {
        const now = dateProvider.now()
        return new Date(now.getTime() - 7200000)
    }
}