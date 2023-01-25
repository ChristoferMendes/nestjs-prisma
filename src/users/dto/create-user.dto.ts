import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { generateString } from 'src/shared/autoGenString';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', default: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email',
    default: `GENERATEDEMAIL${generateString(4)}@gmail.com`,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Define if the user is admin',
    default: false,
  })
  @IsBoolean()
  admin: boolean;
}
