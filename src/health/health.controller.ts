import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  async health() {
    await this.prisma.$queryRaw`SELECT 1`;
    return { ok:true, version:'20.1.1', database:true, service:'moduler-masraf-v20' };
  }
}
