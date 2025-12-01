'use client';

import { useState } from 'react';
import { useGitHubSearch } from '../hooks/useGitHubSearch';
import SearchForm from './SearchForm';
import RepositoryCard from './RepositoryCard';
import Pagination from './Pagination';
import styles from '../styles/RepoSearch.module.css';

export default function RepoSearch() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const { repos, loading, totalCount, error, searchRepos } = useGitHubSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRepos(query, 1);
    setPage(1);
    setHasSearched(true);
  };

  const handlePageChange = (newPage: number) => {
    searchRepos(query, newPage);
    setPage(newPage);
  };

  const handleClear = () => {
    setQuery('');
    setPage(1);
    setHasSearched(false);
  };

  const totalPages = Math.min(Math.ceil(totalCount / 12), Number(process.env.NEXT_PUBLIC_MAX_PAGES) || 83);

  return (
    <div className={styles.container}>
      <div className={styles.fixedHeader}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <div className={styles.titleContainer}>
              <div className={styles.iconContainer}>
                <svg className={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className={styles.title}>
                 Search GitHub repositories
              </h1>
            </div>
          </div>
          <SearchForm
            query={query}
            loading={loading}
            hasSearched={hasSearched}
            onQueryChange={setQuery}
            onSubmit={handleSearch}
            onClear={handleClear}
          />
        </div>
      </div>

      <div className={styles.mainContent}>
        {totalCount > 0 && (
          <div className={styles.resultsCount}>
            <p className={styles.resultsText}>
              Found <span className={styles.resultsNumber}>{totalCount.toLocaleString()}</span> repositories
            </p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}

        <div className={styles.grid}>
          {repos.map((repo) => (
            <RepositoryCard key={repo.id} repo={repo} />
          ))}
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          loading={loading}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}