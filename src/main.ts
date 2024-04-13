import { Logger, ValidationPipe } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { AppModule } from './app.module';
import { appConfiguration, ins } from './common/module/application';

async function bootstrap() {
	const logger = new Logger(NestApplication.name);
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
			ignoreDuplicateSlashes: true,
			ignoreTrailingSlash: true,
			genReqId: () => uuidv4(),
		}),
	);
	const appConfig = appConfiguration();
	const { port, prefix, swaggerIsEnabled } = appConfig;
	const { server } = app.getHttpAdapter().getInstance();

	app.setGlobalPrefix(prefix);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	if (server) server.maxHeadersCount = 16 * 1024; // 16KB;
	if (swaggerIsEnabled) {
		const swaggerConfig = new DocumentBuilder().setTitle('API Documents').build();

		const document = SwaggerModule.createDocument(app, swaggerConfig, {
			ignoreGlobalPrefix: true,
		});
		SwaggerModule.setup(prefix, app, document);
	}

	await app.listen(port);
	logger.log(`🚀 Application is running on port: ${ins(port)}`);
}
bootstrap();
