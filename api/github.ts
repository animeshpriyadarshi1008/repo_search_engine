import { GitHubSearchResponse } from '../types/github';

const GITHUB_API_BASE = process.env.NEXT_PUBLIC_GITHUB_API_BASE_URL;
const SEARCH_ENDPOINT = process.env.NEXT_PUBLIC_GITHUB_SEARCH_ENDPOINT;
const DEFAULT_PER_PAGE = Number(process.env.NEXT_PUBLIC_DEFAULT_PER_PAGE) || 12;

export const githubApi = {
  searchRepositories: async (query: string, page: number = 1, perPage: number = DEFAULT_PER_PAGE): Promise<GitHubSearchResponse> => {
    const url = `${GITHUB_API_BASE}${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return response.json();
  }
};