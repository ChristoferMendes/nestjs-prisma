import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { ConflictError } from '../ConflictError';

@Injectable()
export class ConflictInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof ConflictError) {
          throw new ConflictException(error.message);
        }

        throw error;
      }),
    );
  }
}
