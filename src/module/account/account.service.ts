import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { error } from 'console';
import { PrismaErrorCode } from '../database/enum/error.enum';
import { PrismaService } from '../database/prisma.service';
import { AccountServiceAbstract } from './account.abstract';

@Injectable()
export class AccountService implements AccountServiceAbstract {
	constructor(
		@Inject(PrismaService)
		private prismaService: PrismaService,
	) {}
	// getById(id: number, privacy?: boolean): Promise<any> {
	// 	throw new Error('Method not implemented.');
	// }
	async findAll(): Promise<any> {
		await this.prismaService.account.findMany();
	}
	// search(args: any): Promise<any> {
	// 	throw new Error('Method not implemented.');
	// }
	async create(args: any): Promise<any> {
		if (args.password != args.confirmPassword) {
			throw error;
		}

		// const passwordHash = await this.hashService.hash(args.password);
		const passwordHash = args.password;
		const createData: Prisma.AccountCreateInput = {
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
			if (err.code == PrismaErrorCode.NOT_FOUND) {
				throw err;
			}
		}
	}
}
