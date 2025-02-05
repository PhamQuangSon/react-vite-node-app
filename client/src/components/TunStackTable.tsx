import { type FC, useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import SearchInput from "@/components/SearchInput";
import type { TArticle } from "@/store/articleStore";
import type { SortingState } from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type THead = {
  key: string;
  title: string;
  sort: boolean;
};

type TProps = {
  heads: THead[];
  rows: TArticle[];
};

const TunStackTable: FC<TProps> = ({ heads, rows }) => {
  const columnHelper = createColumnHelper<any>();
  const nav = useNavigate();

  const [data, setData] = useState(() => []);

  const columns = useMemo(() => {
    const cols: any[] = [];
    heads?.map((item: any) => {
      cols.push(
        columnHelper.accessor(item.key, {
          header: () => item.title,
          cell: (info) => info.renderValue(),
          footer: (info) => info.column.id,
        })
      );
    });
    return cols;
  }, [columnHelper, heads]);

  useEffect(() => {
    const rows_ = rows.reverse();
    setData(rows_);
  }, [rows]);
  //   const rerender = useReducer(() => ({}), {})[1];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    // filterFns: {
    //   fuzzy: fuzzyFilter,
    // },
    state: {
      sorting,
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    // globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full p-2 overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
        <div className="flex md:flex-row items-center justify-start gap-2 relative w-full">
          <div className="">
            <button
              className="p-2 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
              onClick={() => {
                nav("/article?new");
              }}
            >
              <Plus size={16} strokeWidth={1.25} className="dark:text-white" />
            </button>
          </div>
          <div className="w-full md:w-2/3">
            <h4 className="text-xl font-extrabold leading-tight text-gray-900 py-1 lg:text-2xl dark:text-white my-2 relative animate animate-fade-up animate-duration-1000 animate-delay-300">
              <span className="">Articles | List of article </span>
              <span className="absolute bottom-0 left-0 w-full h-px bg-sky-400 dark:bg-white opacity-25"></span>
            </h4>
          </div>
        </div>
        <div className="basis-1/4">
          <SearchInput onSearch={setGlobalFilter} classExtend={"w-full"} />
        </div>
      </div>
      <div className="relative rounded-xl overflow-auto">
        <div className="shadow-sm overflow-x-auto my-8">
          <table className="border-collapse table-auto w-full text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="border-b dark:border-slate-600 font-medium p-3 text-slate-400 dark:text-slate-200 text-left uppercase"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-blue-50 hover:text-white hover:shadow-md text-left"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border-b dark:border-slate-600 font-medium p-3 text-slate-400 dark:text-slate-200 text-left uppercase"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>
        </div>
      </div>
      <div className="h-4" />
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-sm">
        <div className="flex items-center gap-2">
          <button
            className="px-1 py-1 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={16} className="dark:text-white" />
          </button>
          <button
            className="px-1 py-1 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={16} className="dark:text-white" />
          </button>
          <button
            className="px-1 py-1 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={16} className="dark:text-white" />
          </button>
          <button
            className="px-1 py-1 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={16} className="dark:text-white" />
          </button>
        </div>
        <div className="flex flex-row xs:flex-col md:flex-row items-center gap-2">
          <div className="flex items-center gap-2">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </div>
          <div className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded-full w-16 text-center dark:text-indigo-500"
            />
            <select
              className="rounded-full bg-emerald-600 text-white hover:text-background py-1 px-2 no-underline"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* <div>{table.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
      <button onClick={() => rerender()} className='border p-2'>
        Rerender
      </button> */}
    </div>
  );
};

export default TunStackTable;
