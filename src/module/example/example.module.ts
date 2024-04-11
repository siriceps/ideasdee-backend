import { Module } from '@nestjs/common';
import { ExampleServiceProvider } from './example.constant';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

@Module({
	controllers: [ExampleController],
	providers: [
		ExampleService,
		{
			provide: ExampleServiceProvider,
			useExisting: ExampleService,
		},
	],
	exports: [ExampleServiceProvider],
})
export class ExampleModule {}
