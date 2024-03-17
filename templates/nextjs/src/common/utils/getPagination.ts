export const getPagination = (
  page: number,
  limit: number,
  totalDocuments: number
) => {
  const nextPage = page < Math.ceil(totalDocuments / limit) ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  return {
    nextPage,
    perPage: limit,
    previousPage,
    currentPage: page,
    totalPages: Math.ceil(totalDocuments / limit),
    total: totalDocuments,
  };
};
