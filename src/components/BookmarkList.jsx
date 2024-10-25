import { useState } from 'react';
import CustomPagination from './CustomPagination';

function BookmarkList({ bookmarks, deleteBookmark }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const bookmarksPerPage = 5;

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(search.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * bookmarksPerPage;
  const indexOfFirst = indexOfLast - bookmarksPerPage;
  const currentBookmarks = filteredBookmarks.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="list-group">
        {currentBookmarks.map((bookmark, index) => (
          <li key={index} className="list-group-item">
            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.title}</a>
            <span className="text-muted"> - {bookmark.time}</span>
            <button
              className="btn btn-danger btn-sm float-end"
              onClick={() => deleteBookmark(index)}
            >Delete</button>
          </li>
        ))}
      </ul>
      <CustomPagination
        currentPage={currentPage}
        total={filteredBookmarks.length}
        setPage={setCurrentPage}
        itemsPerPage={bookmarksPerPage}
      />
    </>
  );
}

export default BookmarkList;
