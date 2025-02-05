import { type FC, useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";

import type { THead } from "@/components/TunStackTable";
import TunStackTable from "@/components/TunStackTable";
import type { TArticle } from "@/store/articleStore";
import { useArticleStore } from "@/store/articleStore";

const Articles: FC = () => {
  const articles = useArticleStore((state) => state.articles);
  const deleteItem = useArticleStore((state) => state.delete);
  const setSelectArticle = useArticleStore((state) => state.setSelectArticle);
  const [deleted, setDeleted] = useState<number[]>([]);
  const nav = useNavigate();

  const heads: THead[] = [
    {
      key: "id",
      title: "Id",
      sort: false,
    },
    {
      key: "title",
      title: "Title",
      sort: true,
    },
    {
      key: "author",
      title: "Author",
      sort: true,
    },
    {
      key: "createdAt",
      title: "Created At",
      sort: true,
    },
    {
      key: "updatedAt",
      title: "Updated At",
      sort: true,
    },
    {
      key: "tags",
      title: "Tags",
      sort: true,
    },
    {
      key: "actions",
      title: "Actions",
      sort: true,
    },
  ];

  const onDelete = (id: number) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure for delete this Item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteItem(id);
            setDeleted([...deleted, id]);
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const onEdit = (detail: TArticle) => {
    setSelectArticle(detail);
    nav(`/article?id=${detail.id}`);
  };

  const dataTable = useMemo(() => {
    const data = articles || [];
    const dataRows: TArticle[] = [];
    data.forEach((row: TArticle) => {
      if (!deleted.includes(row.id))
        dataRows.push({
          id: row.id,
          title: row.title,
          author: row.author,
          description: row.description,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          actions: (
            <>
              <div className="flex gap-2">
                <button
                  className="bg-blue-200 hover:bg-blue-600 text-white font-bold p-1 flex items-center justify-center rounded-full"
                  onClick={() => onEdit(row)}
                >
                  <Pencil
                    size={16}
                    strokeWidth={1.25}
                    className="dark:text-white"
                  />
                </button>
                <button
                  className="bg-red-200 hover:bg-red-600 text-white font-bold p-1 flex items-center justify-center rounded-full"
                  onClick={() => onDelete(row.id)}
                >
                  <Trash2
                    size={16}
                    strokeWidth={1.25}
                    className="dark:text-white"
                  />
                </button>
              </div>
            </>
          ),
          comments: row.comments,
          clapCount: row.clapCount,
          content: row.content,
          email: row.email,
          tags: row.tags,
          image: row.image,
        });
    });
    return dataRows;
  }, [articles]);

  return (
    <>
      <main className="pt-4 px-4 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 dark:text-white antialiased min-h-[calc(100vh-120px)] mx-auto max-w-screen-xl">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden animate animate-fade-right animate-duration-1000 animate-delay-300">
          <TunStackTable heads={heads} rows={dataTable} />
        </div>
      </main>
    </>
  );
};

export default Articles;
