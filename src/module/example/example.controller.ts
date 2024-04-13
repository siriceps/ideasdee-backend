import { Controller, Get, HttpCode, HttpStatus, Logger, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ins } from 'src/common/module/application';
import { ExampleService } from './example.service';

@ApiTags('example')
@Controller('example')
export class ExampleController {
	private readonly logger = new Logger(ExampleController.name);

	constructor(private exampleService: ExampleService) {}

	@Get('/')
	@HttpCode(HttpStatus.BAD_GATEWAY)
	get(@Req() req: Request): string {
		this.logger.log(ins(req['id']));
		return this.exampleService.getHello();
	}
}
