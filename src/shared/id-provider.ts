import { v4 as uuidv4 } from 'uuid';
export abstract class IdProvider {
    abstract generateId(): string
}

export class FakeIdProvider implements IdProvider {

    constructor(private readonly id: string) {}
    generateId() {
        return this.id
    }
}

export class UuidIdProvider implements IdProvider {
    generateId() {
        return uuidv4()
    }
}