import { type FC, useEffect, useState } from "react";

import Message from "@/components/Message";
import RelativePost from "@/components/RelativePost";
import { fetchArticles, fetchSearchResults } from "@/services/articleService";
import type { TArticle } from "@/store/articleStore";
import { useArticleStore } from "@/store/articleStore";
import { useQuery } from "@tanstack/react-query";

const Home: FC = () => {
  const [message, setMessage] = useState('');
  const [dataFromServer, setDataFromServer] = useState(null);
  const [inputData, setInputData] = useState('');

  useEffect(() => {
    fetch('/api/hello') // No localhost needed, Vercel routes correctly
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error("Error:", error));
  }, []);

  const sendDataToServer = async () => {
    try {
      const response = await fetch('/api/data', { // No localhost needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: inputData }),
      });
      const data = await response.json();
      setDataFromServer(data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  
  const searchQuery = useArticleStore((state) => state.searchQuery);
  const setArticles = useArticleStore((state) => state.setArticles);

  const { data, error, isLoading } = useQuery<{ articles: TArticle[] }>({
    queryKey: ["articles"],
    queryFn: fetchArticles,
    staleTime: 120000, // 2 minutes
  });

  const {
    data: searchResults,
    error: searchError,
    isLoading: searchLoading,
  } = useQuery<{ articles: TArticle[] }>({
    queryKey: ["searchResults", searchQuery],
    queryFn: () => fetchSearchResults(searchQuery),
    enabled: !!searchQuery, // Only run the query if searchQuery is not empty
  });

  useEffect(() => {
    if (data && data.articles?.length > 0) {
      setArticles(data.articles);
    }
  }, [data, setArticles]);

  if (isLoading) {
    return <Message text="Loading articles..." />;
  }

  if (error) {
    return <Message text={`Error: ${error.message}`} />;
  }

  if (searchLoading) {
    return <Message text="Loading search results..." />;
  }

  if (searchError) {
    // return (
    //   <h2 className="text-center uppercase tracking-widest text-gray-500">
    //     Error: {searchError.message}
    //   </h2>
    // );
  }
  const filteredArticles = data
    ? searchQuery !== ""
      ? data.articles.filter(
          (article) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data.articles
    : [];

  return (
    <>
      <h1>{message}</h1>
      <div>
        <input type="text" value={inputData} onChange={(e) => setInputData(e.target.value)} />
        <button onClick={sendDataToServer}>Send</button>
        {dataFromServer && <p>Server Response: {JSON.stringify(dataFromServer)}</p>}
      </div>
      <RelativePost
        title=""
        articles={
          searchResults?.articles ??
          (filteredArticles.length !== 0
            ? filteredArticles
            : (data?.articles ?? []))
        }
        showContent={true}
        classExtend={{
          wrapperItem: "flex flex-col",
          wrapper: "flex flex-col md:flex-row",
          contentDiv: "md:w-2/3 md:order-first",
          imgDiv: "md:w-1/3 p-4",
        }}
      />
    </>
  );
};

export default Home;
