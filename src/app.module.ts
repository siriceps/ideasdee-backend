import { Module } from '@nestjs/common';
import { ExampleModule } from './module/example';

@Module({
	imports: [ExampleModule],
})
export class AppModule {}
