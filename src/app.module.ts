import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor, ResponseInterceptor } from './common/interceptor';
import { ApplicationModule } from './common/module/application/application.module';
import { ExampleModule } from './module/example';

@Module({
	imports: [ApplicationModule, ExampleModule],
	providers: [
		{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
		{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
	],
})
export class AppModule {}
