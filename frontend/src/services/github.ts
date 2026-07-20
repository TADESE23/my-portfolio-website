import axios from 'axios';
import { GithubRepo } from '../types';

const GITHUB_USERNAME = 'TADESE23';

export const fetchGithubRepos = async (): Promise<GithubRepo[]> => {
  try {
    const response = await axios.get<any[]>(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
    );
    return response.data.map(repo => ({
      name: repo.name,
      html_url: repo.html_url,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks,
      language: repo.language,
      updated_at: repo.updated_at,
    }));
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
};

export const fetchGithubStats = async () => {
  try {
    const userRes = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`);
    return {
      public_repos: userRes.data.public_repos,
      followers: userRes.data.followers,
      following: userRes.data.following,
      created_at: userRes.data.created_at,
    };
  } catch (error) {
    console.error('Error fetching GitHub user stats:', error);
    return {
      public_repos: 12,
      followers: 18,
      following: 22,
      created_at: '2021-03-12T00:00:00Z',
    };
  }
};
