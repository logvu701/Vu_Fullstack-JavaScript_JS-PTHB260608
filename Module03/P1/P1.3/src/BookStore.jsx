import React, { useState } from 'react';
import BookItem from './BookItem';

function BookStore() {
  const initialBooks = [
    { id: 1, name: 'Đắc Nhân Tâm', author: 'Dale Carnegie' },
    { id: 2, name: 'Nhà Giả Kim', author: 'Paulo Coelho' },
    { id: 3, name: 'Sapiens: Lược Sử Loài Người', author: 'Yuval Noah Harari' },
    { id: 4, name: 'Đọc Vị Bất Kỳ Ai', author: 'David J. Lieberman' }
  ];

  const [books, setBooks] = useState(initialBooks);

  const handleClearBooks = () => {
    setBooks([]);
  };

  const handleResetBooks = () => {
    setBooks(initialBooks);
  };

  return (
    <div className="bookstore-container">
      <div className="bookstore-controls">
        {books.length > 0 ? (
          <button className="control-btn clear-btn" onClick={handleClearBooks}>
            Xóa Toàn Bộ Kho
          </button>
        ) : (
          <button className="control-btn reset-btn" onClick={handleResetBooks}>
            Nạp Lại Kho Sách
          </button>
        )}
      </div>

      {books.length === 0 ? (
        <div className="empty-warehouse">
          <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          <p className="empty-message">Hiện chưa có cuốn sách nào trong kho</p>
        </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookStore;
