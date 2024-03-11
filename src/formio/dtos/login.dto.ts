/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class Credential {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}