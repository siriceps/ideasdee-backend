import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { AppConfigurationConfigProvider } from 'src/common/module/application/application.constant';
import { AppConfiguration } from 'src/common/module/application/application.interface';
import { PrismaService } from 'src/common/module/prisma';
import { AccountServiceAbstract } from './account.abstract';

@Injectable()
export class AccountService implements AccountServiceAbstract {
	private readonly logger = new Logger(AccountService.name);

	constructor(
		@Inject(AppConfigurationConfigProvider) private appConfig: AppConfiguration,
		@Inject(PrismaService)
		private prismaService: PrismaService,
	) {}

	async findAll(): Promise<any> {
		return await this.prismaService.account.findMany();
	}
	async create(args: any): Promise<any> {
		if (args.password != args.confirmPassword) {
			throw new HttpException('message', HttpStatus.BAD_REQUEST);
		}

		// const passwordHash = await this.hashService.hash(args.password);
		const passwordHash = args.password;
		const createData: any = {
			username: args.username,
			email: args.email,
			password: passwordHash,
			title: args.title,
			firstName: args.firstName,
			middleName: args.middleName,
			lastName: args.lastName,
			profileImage: args.profileImage,
			backgroundImage: args.backgroundImage,
			phoneNumber: args.phoneNumber,
			role: args.role,
			gender: args.gender,
			bio: args.bio,
			miniBio: args.miniBio,
			dateBirth: args.dateBirth,
			isActive: args.isActive,
			isDisplay: args.isDisplay,
		};

		try {
			const account = await this.prismaService.account.create({
				data: createData,
			});

			// const accountInfo = new AccountProfileInfoDto(account);

			return account;
		} catch (err) {
			throw err;
		}
	}
	async patch(id: number, args: Partial<any>): Promise<any> {
		try {
			const account = await this.prismaService.account.update({
				where: {
					id: id,
				},
				data: {
					username: args.username,
					email: args.email,
					title: args.title,
					firstName: args.firstName,
					middleName: args.middleName,
					lastName: args.lastName,
					profileImage: args.profileImage,
					backgroundImage: args.backgroundImage,
					phoneNumber: args.phoneNumber,
					role: args.role,
					gender: args.gender,
					bio: args.bio,
					miniBio: args.miniBio,
					dateBirth: args.dateBirth,
					isActive: args.isActive,
					isDisplay: args.isDisplay,
				},
			});

			// const accountInfo = new AccountProfileInfoDto(account);

			return account;
		} catch (err) {
			throw err;
		}
	}
}
