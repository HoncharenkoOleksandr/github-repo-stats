import { ApiProperty } from '@nestjs/swagger';

export class AddRepoDto {
  @ApiProperty()
  path: string;
}
