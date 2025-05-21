import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('repos')
export class RepoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  owner: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  stars: number;

  @Column()
  forks: number;

  @Column()
  openIssues: number;

  @Column({ type: 'timestamp' })
  createdAtUTC: Date;

  @CreateDateColumn()
  addedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.repos, { onDelete: 'CASCADE' })
  user: UserEntity;
}
