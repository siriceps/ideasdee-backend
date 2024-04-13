import { registerAs } from '@nestjs/config';
import { AppConfigurationConfigProvider } from './application.constant';
import { AppConfiguration } from './application.interface';
import { castJSONtoValue } from './application.utils';

export const appConfiguration = registerAs(
	AppConfigurationConfigProvider,
	(): AppConfiguration => ({
		port: castJSONtoValue(process.env.PORT) || 80,
		prefix: castJSONtoValue(process.env.PREFIX) ?? 'api',
		swaggerIsEnabled: castJSONtoValue(process.env.SWAGGER_IS_ENABLE),
	}),
);
