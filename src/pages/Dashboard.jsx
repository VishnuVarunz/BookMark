import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Form } from 'react-bootstrap';
import CustomPagination from '../components/CustomPagination';

function Dashboard({ user, onLogout }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedBookmark, setEditedBookmark] = useState({ title: '', url: '' });
  const navigate = useNavigate();

  const itemsPerPage = 5;
  const userKey = `bookmarks_${user.username}`;
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const storedBookmarks = JSON.parse(localStorage.getItem(userKey)) || [];
      setBookmarks(storedBookmarks);
    }
  }, [user, navigate, userKey]);

  const handleAddBookmark = (title, url) => {
    if (bookmarks.length >= 5) {
      alert('You can only add up to 5 bookmarks.');
      return;
    }
    const newBookmark = { title, url, time: new Date().toLocaleString() };
    const updatedBookmarks = [...bookmarks, newBookmark];
    setBookmarks(updatedBookmarks);
    localStorage.setItem(userKey, JSON.stringify(updatedBookmarks));
  };

  const handleDeleteBookmark = (index) => {
    const updatedBookmarks = bookmarks.filter((_, i) => i !== index);
    setBookmarks(updatedBookmarks);
    localStorage.setItem(userKey, JSON.stringify(updatedBookmarks));
  };

  const handleEditBookmark = (index) => {
    setEditingIndex(index);
    setEditedBookmark({ ...bookmarks[index] });
  };

  const handleSaveEdit = (index) => {
    const updatedBookmarks = [...bookmarks];
    updatedBookmarks[index] = { ...editedBookmark, time: new Date().toLocaleString() };
    setBookmarks(updatedBookmarks);
    localStorage.setItem(userKey, JSON.stringify(updatedBookmarks));
    setEditingIndex(null);
    setEditedBookmark({ title: '', url: '' });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedBookmark({ title: '', url: '' });
  };

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedBookmarks = filteredBookmarks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.max(1, Math.ceil(filteredBookmarks.length / itemsPerPage));

  return (
    <div className="container">
      <h2>Welcome, {user.username}</h2>
      <Button variant="danger" onClick={onLogout} className="mb-3">
        Logout
      </Button>

      <Form.Control
        type="text"
        placeholder="Search by title or URL"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-3"
      />

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const url = e.target.url.value;
          handleAddBookmark(title, url);
          e.target.reset();
        }}
      >
        <Form.Control type="text" name="title" placeholder="Bookmark Title" required className="mb-2" />
        <Form.Control type="url" name="url" placeholder="Bookmark URL" required className="mb-2" />
        <Button type="submit" variant="primary">Add Bookmark</Button>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>URL</th>
            <th>Added Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBookmarks.map((bookmark, index) => (
            <tr key={index}>
              {editingIndex === index ? (
                <>
                  <td>
                    <Form.Control
                      type="text"
                      value={editedBookmark.title}
                      onChange={(e) =>
                        setEditedBookmark((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      required
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="url"
                      value={editedBookmark.url}
                      onChange={(e) =>
                        setEditedBookmark((prev) => ({
                          ...prev,
                          url: e.target.value,
                        }))
                      }
                      required
                    />
                  </td>
                  <td>{bookmark.time}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleSaveEdit(index)}
                      className="me-2"
                    >
                      Save
                    </Button>
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{bookmark.title}</td>
                  <td><a href={bookmark.url}>{bookmark.url}</a></td>
                  <td>{bookmark.time}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleEditBookmark(index)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteBookmark(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      />
    </div>
  );
}

export default Dashboard;
