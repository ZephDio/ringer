export abstract class Command {
    abstract type: string;
}

export abstract class CommandHandler<T extends Command> {
    abstract handle(command: T): any;
}

export abstract class Query {
    abstract fetch: string;
}

export abstract class QueryHandler<T extends Query> {
    abstract handle(command: T): Promise<any>
}
