import { ConflictError } from './ConflictError';
import { PrismaClientError } from './PrismaClientError';

export class ForeignKeyConstraintError extends ConflictError {
  constructor(e: PrismaClientError) {
    const uniqueFiled = e.meta.field_name;
    super(`Foreign key constraint failed. Field name: ${uniqueFiled}`);
  }
}
