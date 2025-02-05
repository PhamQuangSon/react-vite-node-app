import { type FC, type InputHTMLAttributes, useEffect, useState } from "react";
import { Search } from "lucide-react";

type TSearchInputProps = {
  classExtend?: string;
  onSearch: (search: string) => void;
};

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  classExtend,
  ...props
}: {
  value: string | number;
  onChange: (value: string) => void;
  debounce?: number;
  classExtend?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(String(value));
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <div className="relative flex items-center sm:my-2">
      <input
        {...props}
        className={`py-1 px-2 pl-8 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded-full sm:mr-2 ${classExtend}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span className="absolute inset-y-0 left-2 search-icon flex items-center justify-center dark:text-gray-800">
        <Search size={20} strokeWidth={1.5} />
      </span>
    </div>
  );
}

const SearchInput: FC<TSearchInputProps> = ({ classExtend, onSearch }) => {
  const [search, setSearch] = useState("");
  const handleSearch = (value: string) => {
    setSearch(String(value));
    onSearch(String(value)); // Call the onSearch prop with the search term
  };
  return (
    <DebouncedInput
      value={search || ""}
      onChange={handleSearch}
      classExtend={classExtend}
      placeholder="Search all..."
    />
  );
};
export default SearchInput;
