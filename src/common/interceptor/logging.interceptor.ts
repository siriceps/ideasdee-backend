import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IncomingHttpHeaders } from 'http';
import { Observable, tap } from 'rxjs';
import { UAParser } from 'ua-parser-js';

interface ResultAgent {
	ua: string;
	browser: Record<string, string>;
	engine: Record<string, string>;
	os: Record<string, string>;
	device: Record<string, string>;
	cpu: Record<string, string>;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger = new Logger(LoggingInterceptor.name);

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		if (context.getType() === 'http') {
			const { method, url, headers } = context.switchToHttp().getRequest<FastifyRequest>();
			const response = context.switchToHttp().getResponse<FastifyReply>();
			const userAgent = this.convertUserAgent(headers);
			const device = userAgent?.browser?.name ?? userAgent?.device?.vendor;
			const message = `Incoming request - ${device} - ${method} - ${url}`;
			this.logger.log(message);

			return next.handle().pipe(
				tap({
					next: () => this.logNext(response, context),
					error: (err) => this.logError(err, context),
				}),
			);
		}

		return next.handle();
	}

	private logNext(response: FastifyReply, context: ExecutionContext): void {
		const { method, url, headers } = context.switchToHttp().getRequest();
		const { statusCode } = response;
		const userAgent = this.convertUserAgent(headers?.['user-agent']);
		const message = `Outgoing response - ${userAgent?.browser?.name ?? userAgent?.device?.vendor} - ${statusCode} - ${method} - ${url}`;
		this.logger.log(message);
	}

	private logError(error: any, context: ExecutionContext): void {
		const { method, url, headers } = context.switchToHttp().getRequest();
		const userAgent = this.convertUserAgent(headers?.['user-agent']);
		const device = userAgent?.browser?.name ?? userAgent?.device?.vendor;
		const message = `Outgoing error response - ${device} - ${error['code'] ?? error['statusCode'] ?? 500} - ${method} - ${url}`;
		this.logger.error(message);
	}

	private convertUserAgent(headers: IncomingHttpHeaders): ResultAgent {
		const parser = new UAParser(headers?.['user-agent']);
		return parser.getResult();
	}
}
