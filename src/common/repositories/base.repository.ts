import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository {
  constructor(protected prisma: PrismaService) {}

  async isExistingData(entity: string, data: object): Promise<boolean> {
    return !!(await this.prisma[entity]?.findUnique({ where: data }));
  }
}
