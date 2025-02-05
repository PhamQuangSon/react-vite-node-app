import { type FC, useCallback, useState } from "react";
// eslint-disable-next-line no-restricted-imports
import _ from "lodash";
import { Search } from "lucide-react";

import type { TArticle } from "@/store/articleStore";
import { useArticleStore } from "@/store/articleStore";

type TSearchQueryProps = {
  classExtend?: string;
  onResults: (results: TArticle[]) => void;
  onQuery: (searchQuery: string) => void;
};

const SearchQuery: FC<TSearchQueryProps> = ({ onResults, onQuery }) => {
  const articles = useArticleStore((state) => state.articles);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [results, setResults] = useState<TArticle[]>([]);
  const [query, setQuery] = useState("");

  // Function to call the API
  const fetchResults = async (searchQuery: string) => {
    try {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      onResults(filtered);
      onQuery(searchQuery);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Use lodash's debounce to delay the API call
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchResults = useCallback(
    _.debounce((searchQuery: string) => fetchResults(searchQuery), 500),
    []
  );

  // Handle search input change
  const handleInputChange = (value: string) => {
    const newQuery = String(value);
    setQuery(newQuery);

    // Call the debounced function
    debouncedFetchResults(newQuery);
  };

  return (
    <div className="relative flex items-center sm:my-2">
      <input
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        className="py-1 px-2 pl-8 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded-full sm:mr-2 w-full"
        placeholder="Search..."
      />
      <span className="absolute inset-y-0 left-2 search-icon flex items-center justify-center dark:text-gray-800">
        <Search size={20} strokeWidth={1.5} />
      </span>
    </div>
  );
};
export default SearchQuery;
