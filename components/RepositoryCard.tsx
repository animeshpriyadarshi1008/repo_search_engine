import { GitHubRepository } from '../types/github';
import styles from '../styles/RepositoryCard.module.css';

interface RepositoryCardProps {
  repo: GitHubRepository;
}

export default function RepositoryCard({ repo }: RepositoryCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.ownerInfo}>
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className={styles.avatar}
          />
          <span className={styles.ownerName}>{repo.owner.login}</span>
        </div>

        <h3 className={styles.repoName}>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repoLink}
          >
            {repo.name}
          </a>
        </h3>

        <p className={styles.description}>
          {repo.description || 'No description available'}
        </p>

        <div className={styles.stats}>
          <div className={styles.starContainer}>
            <div className={styles.starInfo}>
              <svg className={styles.starIcon} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {formatNumber(repo.stargazers_count)}
            </div>
          </div>
          {repo.language && (
            <span className={styles.languageBadge}>
              {repo.language}
            </span>
          )}
        </div>

        <p className={styles.updatedDate}>
          Updated {repo.updated_at.split('T')[0]}
        </p>
      </div>
    </div>
  );
}