import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): { [key: string]: string } {
        return {
            message: `Financing Simulator API (2): ${new Date().toISOString()}`,
        };
    }
}
