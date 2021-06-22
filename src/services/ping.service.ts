import { Service } from 'typedi';
import { AnotherService } from './another.service';

@Service()
export class PingService {
  constructor(private readonly anotherService: AnotherService) {}

  async ping(): Promise<string> {
    return this.anotherService.ping();
  }
}
