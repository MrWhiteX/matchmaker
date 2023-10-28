import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";

interface IProps {
  pagesCount: number;
  href: string;
  currentPage: string;
  filters: string[];
}

const Pagination = ({
  pagesCount,
  href,
  currentPage = "1",
  filters = [],
}: IProps) => {
  const [pages, setPages] = useState<string[]>([]);

  const paginationUrl = (page: string) => {
    let url = `${href}?page=${page}`;
    filters.forEach((fil) => (url = `${url}&${fil}`));

    return url;
  };

  useEffect(() => {
    const tmpPages = [];
    for (let i = 0; i < pagesCount; i++) {
      tmpPages.push(i + 1);
    }
    setPages(tmpPages.map((num) => num.toString()));
  }, [pagesCount]);

  return (
    <ul className="flex mt-5 justify-center">
      {pages.map((page) => {
        return (
          <Link href={paginationUrl(page)} key={page}>
            <li
              className={classNames(
                "mx-1 px-3 py-2 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg cursor-pointer",
                {
                  "bg-gray-200": currentPage !== page,
                  "bg-gray-400": currentPage === page,
                }
              )}
            >
              <a className="font-bold">{page}</a>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default Pagination;
