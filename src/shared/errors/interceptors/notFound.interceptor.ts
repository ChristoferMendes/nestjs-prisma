import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { NotFoundError } from '../NotFoundError';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof NotFoundError) {
          throw new NotFoundException(error.message);
        }

        throw error;
      }),
    );
  }
}
