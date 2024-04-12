import { INestApplication, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaErrorCode } from './enum/error.enum';

export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger('PrismaService');

	async onModuleInit(): Promise<void> {
		await this.$connect();
		this.$use(async (params, next) => {
			try {
				return await next(params);
			} catch (err) {
				if (err.code === PrismaErrorCode.DUPLICATE_UNIQUE_FIELD) {
					throw err;
				}
				throw err;
			}
		});
	}

	async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}

	async enableShutdownHooks(app: INestApplication): Promise<void> {
		process.on('beforeExit', async () => {
			await this.$disconnect();
			await app.close();
		});
	}
}
