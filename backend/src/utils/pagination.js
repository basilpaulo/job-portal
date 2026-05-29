const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
};

const getPaginationData = (count, data, page, limit) => {
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(count / limit);
  return {
    totalItems: count,
    totalPages,
    currentPage,
    itemsPerPage: limit,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};

module.exports = { getPagination, getPaginationData };