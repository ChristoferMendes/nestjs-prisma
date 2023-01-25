import { DatabaseError } from '../DatabaseError';
import { PrismaClientError } from '../PrismaClientError';
import { UniqueContraintError } from '../UniqueConstraintError';

enum PrismaErrors {
  UniqueContraintFail = 'P2002',
}

const { UniqueContraintFail } = PrismaErrors;

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  const prismaErrors = {
    [UniqueContraintFail]: (e: PrismaClientError) =>
      new UniqueContraintError(e),
  };

  const prismaCode = e.code as PrismaErrors;

  const prismaErrorHandler = prismaErrors[prismaCode];

  const verifyPrismaHandler = typeof prismaErrorHandler === 'function';

  if (verifyPrismaHandler) return prismaErrorHandler(e);

  return new DatabaseError(e.message);
};
