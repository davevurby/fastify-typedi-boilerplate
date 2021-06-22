import { Service } from "typedi";

@Service()
export class AnotherService {
    async ping(): Promise<string> {
        return 'pong from another service'
    }
}