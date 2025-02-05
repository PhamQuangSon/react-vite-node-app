import { type FC } from "react";
import { Calendar, HandHeart, MessageCircle } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

import type { TComment } from "@/components/Comment";

import "react-lazy-load-image-component/src/effects/blur.css";

interface ArticleListProps {
  id: number;
  title: string;
  comments: TComment[];
  clapCount: number;
  content: string;
  author: string; // Removed quotes for author
  createdAt: string;
  description: string;
  image: string;
  slice?: number;
  classExtend?: {
    wrapper: string;
    contentDiv: string;
    imgDiv: string;
  };
}

const InfoItem: FC<ArticleListProps> = ({
  id,
  title,
  comments,
  content,
  clapCount,
  author,
  description,
  createdAt,
  image,
  classExtend,
}) => {
  return (
    <article
      key={id}
      className={`${classExtend?.wrapper || "flex flex-col md:flex-row"} bg-white dark:bg-sky-50 rounded-xl shadow-md overflow-hidden animate animate-fade-right animate-duration-1000 animate-delay-300`}
    >
      <div className={`${classExtend?.imgDiv || "md:w-1/3 p-4"}`}>
        {/*  imgDiv */}
        <div className="relative group break-inside-avoid overflow-hidden h-48">
          <LazyLoadImage
            src={image}
            alt={title}
            effect="blur"
            wrapperClassName="w-full h-full"
            className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105 aspect-square"
          />
          <Link
            to={"/post?id=1"}
            className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-colors duration-300 flex items-center justify-center z-0"
          >
            <span className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center px-4">
              {title}
            </span>
          </Link>
        </div>
      </div>
      {/*  contentDiv */}
      <div
        className={`${classExtend?.contentDiv || "md:w-2/3 md:order-first"} p-4 `}
      >
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold flex items-center justify-start">
          <LazyLoadImage
            className="mr-4 w-10 h-10 rounded-full inline"
            src={image}
            alt={title}
            effect="blur"
          />
          <span className="text-xl font-bold text-gray-900 dark:text-sky-400">
            {author}
          </span>
        </div>
        {/*  Content */}
        <h2 className="info-item-title">
          <Link
            to={"/post?id=1"}
            className="block mt-2 text-lg leading-tight font-medium text-black hover:underline"
          >
            {title}
          </Link>
        </h2>
        <p className="mt-1 text-slate-500">{description}</p>
        <p className="text-base text-gray-500 dark:text-gray-400">{content}</p>

        {/*  Footer */}
        <ul className="son-list flex flex-row gap-4 text-base text-gray-500 dark:text-gray-400">
          <li>
            <Calendar size={16} strokeWidth={1.25} className="inline mr-2" />
            {createdAt}
          </li>
          <li>
            <HandHeart size={16} strokeWidth={1.5} className="inline" />
            <div className="inline pl-1">{clapCount || 0}</div>
          </li>
          <li>
            <MessageCircle size={16} strokeWidth={1.5} className="inline" />
            <div className="inline pl-1">{comments.length || 0}</div>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default InfoItem;
