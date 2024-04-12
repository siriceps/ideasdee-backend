import { Module } from '@nestjs/common';
import { AccountModule } from './module/account';
import { DatabaseModule } from './module/database/database.module';
import { ExampleModule } from './module/example';

@Module({
	imports: [ExampleModule, AccountModule, DatabaseModule],
})
export class AppModule {}
