import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AccountServiceProvider } from './account.constant';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
	imports: [DatabaseModule],
	controllers: [AccountController],
	providers: [
		AccountService,
		DatabaseModule,
		{
			provide: AccountServiceProvider,
			useExisting: AccountService,
		},
	],
	exports: [AccountServiceProvider],
})
export class AccountModule {}
