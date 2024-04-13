import { Inject, Injectable, Logger } from '@nestjs/common';
import { AppConfigurationConfigProvider } from 'src/common/module/application/application.constant';
import { AppConfiguration } from 'src/common/module/application/application.interface';
import { inspect } from 'util';
import { ExampleServiceAbstract } from './example.abstract';

@Injectable()
export class ExampleService implements ExampleServiceAbstract {
	private readonly logger = new Logger(ExampleService.name);

	constructor(@Inject(AppConfigurationConfigProvider) private appConfig: AppConfiguration) {}

	getHello(): string {
		this.logger.log(inspect(this.appConfig));
		return 'Hello World !!!';
	}
}
