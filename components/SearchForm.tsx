import styles from '../styles/SearchForm.module.css';

interface SearchFormProps {
  query: string;
  loading: boolean;
  hasSearched: boolean;
  onQueryChange: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClear: () => void;
}

export default function SearchForm({ query, loading, hasSearched, onQueryChange, onSubmit, onClear }: SearchFormProps) {
  const handleButtonClick = (e: React.FormEvent) => {
    if (hasSearched) {
      e.preventDefault();
      onClear();
    } else {
      onSubmit(e);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleButtonClick}>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search for repositories, topics, or languages..."
            className={styles.input}
          />
          <button
            type="submit"
            disabled={loading || (!hasSearched && !query.trim())}
            className={`${styles.button} ${hasSearched ? styles.clearButton : styles.searchButton}`}
          >
            {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                Searching
              </div>
            ) : hasSearched ? (
              'Clear'
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}