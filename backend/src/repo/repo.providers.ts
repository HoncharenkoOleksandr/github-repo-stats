import { DataSource } from 'typeorm';
import { RepoEntity } from './entities/repo.entity';

export const RepoProviders = [
  {
    provide: 'REPO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RepoEntity),
    inject: ['DATA_SOURCE'],
  },
];
