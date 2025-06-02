import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    app.enableCors({
        origin: '*',
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        }),
    );
    app.useStaticAssets({ root: join(__dirname, '..', 'public') });

    const config = new DocumentBuilder()
        .setVersion(process.env.npm_package_version ?? '1')
        .addBearerAuth()
        .setTitle('Financing Simulator API')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/doc', app, documentFactory);

    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
