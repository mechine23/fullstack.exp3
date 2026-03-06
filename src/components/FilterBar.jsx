export default function FilterBar({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="filter-bar">
      <span className="filter-icon">⌕</span>
      <input
        className="filter-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Filter"
      />
      {value && (
        <button
          type="button"
          className="filter-clear"
          onClick={() => onChange('')}
          aria-label="Clear filter"
        >
          ×
        </button>
      )}
    </div>
  )
}
