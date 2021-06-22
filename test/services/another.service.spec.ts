import { AnotherService } from '../../src/services/another.service';

describe('AnotherService', () => {
  let service: AnotherService;

  beforeAll(() => {
    service = new AnotherService();
  });

  it('should return pong text', async () => {
    const response = await service.ping();
    expect(response).toBe('pong from another service');
  });
});
