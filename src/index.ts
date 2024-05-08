
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app-module';
import { Server } from "socket.io";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Alarm')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
    const io = new Server(app.getHttpServer(), { cors: { origin: '*' } });
    io.on('connection', (socket) => {
        console.log('a user connected');
    });
}
bootstrap();
