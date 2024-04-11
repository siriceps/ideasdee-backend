import { Injectable } from '@nestjs/common';
import { ExampleServiceAbstract } from './example.abstract';

@Injectable()
export class ExampleService implements ExampleServiceAbstract {
	getHello(): string {
		return 'Hello World !!!';
	}
}
