import { Module } from '@nestjs/common';
import { AccountServiceProvider } from './account.constant';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
	controllers: [AccountController],
	providers: [
		AccountService,
		{
			provide: AccountServiceProvider,
			useExisting: AccountService,
		},
	],
	exports: [AccountServiceProvider],
})
export class AccountModule {}
