import { Test, TestingModule } from '@nestjs/testing';
import { Users23Controller } from './users23.controller';

describe('Users23Controller', () => {
  let controller: Users23Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Users23Controller],
    }).compile();

    controller = module.get<Users23Controller>(Users23Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
