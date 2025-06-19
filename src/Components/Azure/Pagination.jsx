//pagination logic
const generatePageNumbers = (page, totalPages) => {
    const pages = [];
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    pages.push(1);
    if (page > 4) pages.push("left-ellipsis");

    for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
    ) {
        pages.push(i);
    }

    if (page < totalPages - 3) pages.push("right-ellipsis");

    pages.push(totalPages);
    return pages;
};

const Pagination = ({ page, totalPages, setPage }) => {
  const pagesToShow = generatePageNumbers(page, totalPages);

  return (
    <nav
      className="mt-6 flex justify-center mb-10 p-4 items-center gap-2 flex-wrap"
      aria-label="Pagination"
    >
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="px-3 py-2 rounded border text-md font-medium bg-white text-[#20629b] disabled:opacity-50 hover:bg-gray-200 transition"
        aria-label="Previous page"
      >
        Previous
      </button>
      
      {pagesToShow.map((p, index) =>
        typeof p === "string" ? (
          <span
            key={`${p}-${index}`}
            className="px-2 text-[#20629b] text-sm select-none"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => setPage(p)}
            aria-current={page === p ? "page" : undefined}
            className={`px-3 py-2 rounded border text-sm font-medium transition ${
              page === p
                ? "bg-[#20629b] text-white shadow"
                : "bg-white text-[#20629b] hover:bg-gray-200"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        className="px-3 py-2 rounded border text-md font-medium bg-white text-[#20629b] disabled:opacity-50 hover:bg-gray-200 transition"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;

