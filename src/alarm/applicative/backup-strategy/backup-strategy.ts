import { Alarm } from "../../domain/alarm";


export abstract class BackupStrategy {
    abstract notify(alarm : Alarm): Promise<void>
}