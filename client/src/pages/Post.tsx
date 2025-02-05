import { useState } from "react";
import { Calendar, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { FC } from "react";
import { useSearchParams } from "react-router-dom";

import type { TComment } from "@/components/Comment"; // Add this import statement
import Comment from "@/components/Comment"; // Add this import statement
import Message from "@/components/Message";
import RelativePost from "@/components/RelativePost";
import { fetchArticle } from "@/services/articleService";
import type { TArticle } from "@/store/articleStore";
import { useArticleStore } from "@/store/articleStore";
import { useQuery } from "@tanstack/react-query";

const Post: FC = () => {
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id") || "1";
  const articles = useArticleStore((state) => state.articles);
  const [collapse, setCollapse] = useState<boolean>(false);

  if (!articleId) {
    return <Message text="404 | Article Not Found" />;
  }
  const {
    data: selectedArticle,
    error,
    isLoading,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQuery<TArticle>({
    queryKey: ["article", articleId],
    queryFn: () => fetchArticle(articleId),
  });

  if (isLoading) {
    return <Message text="Loading article..." />;
  }

  if (error) {
    return <Message text={`Error: ${error.message}`} />;
  }

  const handleCommentSubmit = (newComment: TComment) => {
    console.log("handleCommentSubmit", newComment);
    if (selectedArticle?.comments) {
      selectedArticle.comments.push(newComment);
      // try {
      //   const response = await axiosInstance.post(COMMENT_ARTICLES, {
      //     text: data.comment,
      //     user: user.uid,
      //   });
      //   if (response.status === 200) {
      //     console.log("Post COMMENT_ARTICLES done");
      //   } else {
      //     console.error("Login failed:", response.data);
      //   }
      //   // Update the selectedArticle state
      // } catch (error) {
      //   console.error("Error fetching article:", error);
      //   // Handle error, e.g., display error message to user
      // }
    }
  };

  return (
    <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased container-fluid">
        <div className="flex flex-col md:flex-row justify-between gap-4 px-4 mx-auto max-w-screen-xl relative">
          <div
            className={`${collapse ? "" : "md:w-3/4"} animate animate-fade-right animate-duration-1000 animate-delay-300`}
          >
            <button
              className="px-0.5 py-0.5 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white md:block hidden absolute -top-7 right-0 right-center bg-white dark:bg-gray-900 shadow-md rounded z-50 animate animate-fade-down animate-duration-1000 animate-delay-300"
              onClick={() => setCollapse(!collapse)}
            >
              {collapse ? (
                <ChevronsLeft size={16} className="dark:text-white" />
              ) : (
                <ChevronsRight size={16} className="dark:text-white" />
              )}
            </button>
            {selectedArticle && (
              <>
                <figure className="mb-4 block animate animate-fade-down animate-duration-1000 animate-delay-300">
                  <img
                    src={selectedArticle.image}
                    className="mb-4 h-60 md:h-80 w-full object-cover rounded-lg align-middle leading-none shadow-lg"
                    alt="Taking up Water with a Spoon"
                  />
                </figure>
                <address className="flex items-center gap-2 row-start-2 items-center sm:items-start not-italic">
                  <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                      className="mr-4 w-10 h-10 rounded-full"
                      src={selectedArticle.image}
                      alt={selectedArticle.author}
                    />
                    <div>
                      <a
                        href="#"
                        className="text-xl font-bold text-gray-900 dark:text-white"
                      >
                        {selectedArticle.author}
                      </a>
                    </div>
                  </div>
                </address>
                <h1 className="text-3xl font-extrabold leading-tight text-gray-900 py-1 lg:text-4xl dark:text-white">
                  {selectedArticle.title}
                </h1>
                <p className="text-base text-gray-500 dark:text-gray-400">
                  {selectedArticle.description}
                </p>
                <div className="flex justify-between items-center mb-6">
                  <div className="left">
                    <ul className=" son-list ">
                      <li>
                        <Calendar
                          size={16}
                          strokeWidth={1.25}
                          className="inline mr-2 dark:text-white"
                        />
                        {selectedArticle.createdAt}
                      </li>
                    </ul>
                  </div>
                  <div className="right"></div>
                </div>
                <p
                  className="text-base text-gray-500 dark:text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: selectedArticle.content,
                  }}
                />
                <Comment
                  comments={selectedArticle.comments}
                  onComments={handleCommentSubmit}
                />
              </>
            )}
            <RelativePost
              title="Recomnend from Medium"
              articles={articles.slice(0, 8)}
              showContent={true}
              classExtend={{
                wrapperItem: "grid grid-cols-1 md:grid-cols-2",
                wrapper: "flex flex-col",
                contentDiv: "w-full",
                imgDiv: "w-full",
              }}
            />
          </div>

          {!collapse && (
            <div className="md:w-1/4">
              <RelativePost
                title="Relative Post"
                articles={articles.slice(0, 3)}
                showContent={false}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Post;
