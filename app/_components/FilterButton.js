function FilterButton({ children, onFilter, isActive }) {
  return (
    <li>
      <button
        className={`hover:bg-primary-900 cursor-pointer px-4 py-2 capitalize transition-colors ${isActive ? "bg-primary-600 text-primary-50" : ""}`}
        onClick={onFilter}
      >
        {children}
      </button>
    </li>
  );
}

export default FilterButton;
