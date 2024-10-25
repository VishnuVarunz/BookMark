import { Pagination } from 'react-bootstrap';

function CustomPagination({ currentPage, totalPages, setPage }) {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  if (totalPages <= 1) return null; // Don't render pagination if there's only 1 page

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}

export default CustomPagination;
