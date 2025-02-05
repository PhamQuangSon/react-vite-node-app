import { useEffect, useState } from "react";

import InfoItem from "@/components/InfoItem";
import { Paginator } from "@/components/ui/paginator";
import type { TArticle } from "@/store/articleStore";

interface IProps {
  title: string;
  articles: TArticle[];
  showContent: boolean;
  slice?: number;
  classExtend?: {
    wrapperItem: string;
    wrapper: string;
    contentDiv: string;
    imgDiv: string;
  };
}
const RelativePost = (props: IProps) => {
  const [filteredPosts, setFilteredPosts] = useState<TArticle[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (props.articles.length > itemsPerPage) {
      const startItem = (currentPage - 1) * itemsPerPage + 1;
      const endItem = Math.min(
        currentPage * itemsPerPage,
        props.articles.length
      );
      const filtered = props.articles.slice(startItem, endItem);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(props.articles);
    }
  }, [props.articles, currentPage, itemsPerPage]);

  return (
    <>
      {/* Title Relative Post */}
      {props.title && (
        <h4 className="text-xl font-extrabold leading-tight text-gray-900 py-1 lg:text-2xl dark:text-white my-2 relative animate animate-fade-up animate-duration-1000 animate-delay-300">
          <span className="">{props.title}</span>
          <span className="absolute bottom-0 left-0 w-full h-px bg-sky-400 dark:bg-white opacity-25"></span>
        </h4>
      )}
      {/* Content Relative Post */}
      <div
        className={`${props.classExtend?.wrapperItem || "flex flex-col"} gap-4`}
      >
        {filteredPosts?.map((article: TArticle, index) => {
          const {
            id,
            title,
            comments,
            content,
            author,
            description,
            createdAt,
            image,
            clapCount,
          } = article;
          const truncatedContent = props.showContent
            ? `${content.slice(0, props.slice || 160)}...` || content
            : "";
          return (
            <InfoItem
              key={id ?? index}
              id={id ?? index}
              title={title}
              comments={comments}
              content={truncatedContent}
              author={author}
              description={description}
              createdAt={createdAt}
              image={image}
              clapCount={clapCount}
              classExtend={{
                wrapper: `${props.classExtend?.wrapper ? props.classExtend?.wrapper : "flex flex-col"}`,
                contentDiv: `${props.classExtend?.contentDiv || "w-full"}`,
                imgDiv: `${props.classExtend?.imgDiv || "w-full"}`,
              }}
            />
          );
        })}
      </div>
      {/* Paginator Relative Post */}
      {props.articles.length > itemsPerPage && (
        <Paginator
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={props.articles.length}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default RelativePost;
