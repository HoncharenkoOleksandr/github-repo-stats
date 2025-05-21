import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { RepoEntity } from './entities/repo.entity';
import {
  EXIST_REPO,
  GITHUB_API_URL,
  INVALID_REPO,
  NOT_FOUND_REPO,
} from './repo.constants';
import { GitHubResponse, RepoEntityResponse } from './repo.types';

@Injectable()
export class RepoService {
  constructor(
    @Inject('REPO_REPOSITORY')
    private repoRepository: Repository<RepoEntity>,
  ) {}

  async addRepo(path: string, user: UserEntity): Promise<RepoEntityResponse> {
    const [owner, repo] = path.split('/');
    if (!owner || !repo) {
      throw new NotFoundException(INVALID_REPO);
    }

    const isExistRepo = await this.repoRepository.findOne({
      where: { name: repo, owner, user: { id: user.id } },
      relations: { user: true },
    });

    if (isExistRepo) {
      throw new BadRequestException(EXIST_REPO);
    }

    try {
      const response: GitHubResponse = await axios.get(
        `${GITHUB_API_URL}/repos/${owner}/${repo}`,
      );
      if (!response) {
        throw new NotFoundException(INVALID_REPO);
      }

      const data = response.data;

      const repoEntity = this.repoRepository.create({
        owner: data.owner.login,
        name: data.name,
        url: data.html_url,
        stars: data.stargazers_count,
        forks: data.forks_count,
        openIssues: data.open_issues_count,
        createdAtUTC: new Date(data.created_at),
        user,
      });

      const savedRepo = await this.repoRepository.save(repoEntity);

      return {
        ...savedRepo,
        createdAtUTC: savedRepo.createdAtUTC.getTime(),
      };
    } catch (error) {
      console.error(error);
      throw new NotFoundException(INVALID_REPO);
    }
  }

  async getUserRepos(user: UserEntity): Promise<RepoEntityResponse[]> {
    const repos = await this.repoRepository.find({
      where: { user: { id: user.id } },
    });
    if (!repos) {
      return [];
    }
    return repos.map((r) => ({ ...r, createdAtUTC: r.createdAtUTC.getTime() }));
  }

  async remove(id: string, user: UserEntity) {
    const repo = await this.repoRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!repo || repo.user.id !== user.id) {
      throw new NotFoundException(NOT_FOUND_REPO);
    }

    await this.repoRepository.remove(repo);
  }

  async refresh(id: string, user: UserEntity): Promise<RepoEntityResponse> {
    const repo = await this.repoRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!repo || repo.user.id !== user.id) {
      throw new NotFoundException(NOT_FOUND_REPO);
    }

    const response: GitHubResponse = await axios.get(
      `${GITHUB_API_URL}/repos/${repo.owner}/${repo.name}`,
    );

    if (!response) {
      throw new NotFoundException(INVALID_REPO);
    }

    const data = response.data;

    repo.stars = data.stargazers_count;
    repo.forks = data.forks_count;
    repo.openIssues = data.open_issues_count;
    repo.createdAtUTC = new Date(data.created_at);

    const savedRepo = await this.repoRepository.save(repo);

    return {
      ...savedRepo,
      createdAtUTC: savedRepo.createdAtUTC.getTime(),
    };
  }
}
