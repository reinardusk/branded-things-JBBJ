export default function Pagination({
  nextPage,
  previousPage,
  page,
  pagination,
}) {
  return (
    <>
      <div className="flex bg-gray-100 justify-end items-center px-5 py-3">
        <div>
          <a
            className="mx-5 text-lg font-medium cursor-pointer"
            onClick={previousPage}
          >
            Previous
          </a>
          {/* page number masih hardcode */}
          <span className="text-lg font-medium">
            {page} of {pagination.totalPage === 0 ? 1 : pagination.totalPage}
          </span>
          <a
            className="mx-5 text-lg font-medium cursor-pointer"
            onClick={nextPage}
          >
            Next
          </a>
        </div>
      </div>
    </>
  );
}
