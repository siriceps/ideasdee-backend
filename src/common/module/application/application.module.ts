import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfiguration } from './application.config';
import { AppConfigurationConfigProvider } from './application.constant';
import { AppConfiguration } from './application.interface';
import { PrismaModule } from '../prisma';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			load: [appConfiguration],
			envFilePath: ['.env'],
		}),
		PrismaModule,
	],
	providers: [
		{
			provide: AppConfigurationConfigProvider,
			inject: [ConfigService],
			useFactory: (configService: ConfigService): AppConfiguration => {
				return configService.get<AppConfiguration>(AppConfigurationConfigProvider);
			},
		},
	],
	exports: [AppConfigurationConfigProvider],
})
export class ApplicationModule {}
