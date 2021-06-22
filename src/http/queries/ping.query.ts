import { IsNumberString } from 'class-validator';

export class PingQuery {
  @IsNumberString()
  readonly test: number;
}
