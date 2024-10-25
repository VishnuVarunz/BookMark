import { useState } from 'react';

function BookmarkForm({ addBookmark }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBookmark({ title, url, time: new Date().toLocaleString() });
    setTitle('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Bookmark Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        className="form-control mb-2"
        placeholder="Bookmark URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary">Add Bookmark</button>
    </form>
  );
}

export default BookmarkForm;
