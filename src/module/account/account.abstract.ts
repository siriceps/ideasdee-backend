export abstract class ExampleServiceAbstract {
	abstract getHello(): string;
}

export interface AccountServiceAbstract {
	// getById(id: number, privacy?: boolean): Promise<any>;
	findAll(): Promise<any>;
	// search(args: any): Promise<any>;
	create(args: any): Promise<any>;
	patch(id: number, args: Partial<any>): Promise<any>;
}
