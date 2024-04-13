import {
	CallHandler,
	ExecutionContext,
	HttpStatus,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	private formatResponse(context: ExecutionContext, result: unknown): FastifyReply {
		const request = context.switchToHttp().getRequest<FastifyRequest>();
		const response = context.switchToHttp().getResponse<FastifyReply>();
		const statusCode = response.statusCode ?? HttpStatus.OK;

		return response.status(statusCode).send({
			requestId: request['id'],
			statusCode: statusCode,
			message: HttpStatus[response.statusCode] ?? 'OK',
			data: result ?? null,
		});
	}

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		if (context.getType() === 'http')
			return next.handle().pipe(
				tap({
					next: (val): FastifyReply => this.formatResponse(context, val),
					error: (err) => err,
				}),
			);
		return next.handle();
	}
}
