import { Injectable } from '@nestjs/common';
import { Configuration } from '@prisma/client';
import { BaseRepository } from './base.repository';

@Injectable()
export class ConfigurationRepository extends BaseRepository {
  async findUniqueConfiguration({
    ram,
    color,
    storage_capacity,
    os_version,
  }): Promise<Configuration> {
    return this.prisma.configuration.findUnique({
      where: {
        configuration_unique_key: {
          ram,
          color,
          storage_capacity,
          os_version,
        },
      },
    });
  }
}
