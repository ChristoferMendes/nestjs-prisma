import { DatabaseError } from '../DatabaseError';
import { ForeignKeyConstraintError } from '../ForeignKeyConstraintError';
import { NotFoundError } from '../NotFoundError';
import { PrismaClientError } from '../PrismaClientError';
import { UniqueContraintError } from '../UniqueConstraintError';

enum PrismaErrors {
  UniqueConStraintFail = 'P2002',
  ForeignKeyConstraint = 'P2003',
  DependentRecordNotFound = 'P2025',
}

const { UniqueConStraintFail, DependentRecordNotFound, ForeignKeyConstraint } =
  PrismaErrors;

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  const prismaErrors = {
    [UniqueConStraintFail]: (e: PrismaClientError) =>
      new UniqueContraintError(e),
    [ForeignKeyConstraint]: (e: PrismaClientError) =>
      new ForeignKeyConstraintError(e),
    [DependentRecordNotFound]: () => new NotFoundError('Record not found'),
  };

  const prismaCode = e.code as PrismaErrors;

  const prismaErrorHandler = prismaErrors[prismaCode];

  const verifyPrismaHandler = typeof prismaErrorHandler === 'function';

  if (verifyPrismaHandler) return prismaErrorHandler(e);

  return new DatabaseError(e.message);
};
