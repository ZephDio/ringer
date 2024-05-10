import { Module } from "@nestjs/common";
import { DateProvider, NodeDateProvider } from "./date-provider";
import { IdProvider, UuidIdProvider } from "./id-provider";

const idProvider = {
    provide: IdProvider,
    useFactory: () => {
        return new UuidIdProvider();
    },
};

const dateProvider = {
    provide: DateProvider,
    useFactory: () => {
        return new NodeDateProvider();
    },
};


@Module({
    providers: [idProvider, dateProvider],
    exports: [idProvider, dateProvider]
})
export class CoreModule {}