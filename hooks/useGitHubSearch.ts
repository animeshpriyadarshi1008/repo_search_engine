import { useState } from 'react';
import { GitHubRepository } from '../types/github';
import { githubApi } from '../api/github';

export function useGitHubSearch() {
  const [repos, setRepos] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const searchRepos = async (query: string, page: number = 1) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await githubApi.searchRepositories(query, page);
      setRepos(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setRepos([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  return {
    repos,
    loading,
    totalCount,
    error,
    searchRepos
  };
}