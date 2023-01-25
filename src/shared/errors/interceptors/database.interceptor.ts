import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { DatabaseError } from '../DatabaseError';
import { handleDatabaseErrors } from '../utils/handle-database-errors';
import { isPrismaError } from '../utils/is-prisma-error';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaError(error)) {
          error = handleDatabaseErrors(error);
        }

        if (error instanceof DatabaseError) {
          throw new BadRequestException(error.message);
        }

        throw error;
      }),
    );
  }
}
