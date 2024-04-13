import { InspectOptions, inspect } from 'util';

export function ins(data: any, options?: InspectOptions): string {
	return inspect(data, { colors: true, compact: false, ...options });
}

export function castJSONtoValue(data: any): any {
	try {
		return JSON.parse(data);
	} catch (error) {
		return data;
	}
}
