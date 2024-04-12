import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
	constructor(private accountService: AccountService) {}

	@Get('/')
	async get(): Promise<any> {
		return this.accountService.findAll();
	}

	@Post('/')
	async create(@Body() body: any): Promise<any> {
		return this.accountService.create(body);
	}
}
