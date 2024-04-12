import { Prisma } from '@prisma/client';
import _ from 'lodash';
export type KeySorting = {
	[key: string]: Prisma.SortOrder;
};

export type TransformStringToSortObjectArgs = {
	value: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function sortOrDefault(sort: any, defaultValue: any): any {
	if (sort == undefined || sort == null) {
		return defaultValue;
	}

	const sortable = _.omitBy(sort, _.isNil);
	if (Object.keys(sortable).length == 0) {
		return defaultValue;
	}

	return sort;
}

export function transformStringToSortingObject(args: TransformStringToSortObjectArgs): KeySorting {
	const value = args.value;
	if (_.isString(value)) {
		const keys = _.replace(value, / /g, '').split(',');
		return transformStringArrayToSortingObject(keys);
	}

	return undefined;
}

/**
 * Returns the key of object with Prisma.SortOrder
 * @param orders string array that contain -key.
 */
export function transformStringArrayToSortingObject<T>(orders: string[]): T {
	const orderCondition = orders.reduce((total, order) => {
		const hasOrderSymbol = order[0] === '-';
		const sorting = hasOrderSymbol ? Prisma.SortOrder.desc : Prisma.SortOrder.asc;
		const keyword = hasOrderSymbol ? order.substring(1) : order;
		total[keyword] = sorting;

		return total;
	}, {});

	return orderCondition as T;
}
