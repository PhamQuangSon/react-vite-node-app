import { type FC, Suspense, useState } from "react";

import Message from "@/components/Message";
import RelativePost from "@/components/RelativePost";
import SearchQuery from "@/components/SearchQuery";
import type { TArticle } from "@/store/articleStore";

const Search: FC = () => {
  const [results, setResults] = useState<TArticle[]>([]);
  const [query, setQuery] = useState("");

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased min-h-[calc(100vh-120px)]">
        <div className="flex flex-col justify-between gap-6 px-4 mx-auto max-w-screen-xl ">
          <SearchQuery onResults={setResults} onQuery={setQuery} />
          {results.length > 0 ? (
            <Suspense fallback={<Message text="Loading app..." />}>
              <RelativePost
                title={`Results for ${query}`}
                articles={results}
                showContent={true}
                classExtend={{
                  wrapperItem: "flex flex-col",
                  wrapper: "flex flex-col md:flex-row",
                  contentDiv: "md:w-2/3 md:order-first",
                  imgDiv: "md:w-1/3 p-4",
                }}
              />
            </Suspense>
          ) : (
            <h2 className="text-center uppercase tracking-widest text-gray-500">
              404 | Not Found
            </h2>
          )}
        </div>
      </main>
    </>
  );
};

export default Search;
