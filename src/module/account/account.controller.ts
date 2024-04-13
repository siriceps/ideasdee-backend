import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ins } from 'src/common/module/application';
import { AccountService } from './account.service';

@ApiTags('account')
@Controller('account')
export class AccountController {
	private readonly logger = new Logger(AccountController.name);

	constructor(private accountService: AccountService) {}

	@Get('/')
	@HttpCode(HttpStatus.BAD_GATEWAY)
	async get(@Req() req: Request): Promise<string> {
		this.logger.log(ins(req['id']));
		return await this.accountService.findAll();
	}

	@Post('/')
	@HttpCode(HttpStatus.BAD_GATEWAY)
	async post(@Body() body: any): Promise<any> {
		return await this.accountService.create(body);
	}
}
