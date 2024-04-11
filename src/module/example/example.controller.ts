import { Controller, Get } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
	constructor(private exampleService: ExampleService) {}

	@Get('/')
	get(): string {
		return this.exampleService.getHello();
	}
}
