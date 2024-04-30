// pages/books/[id].tsx

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Book = {
  title: string;
  author: string;
  genre: string;
  description: string;
  published_date: string;
  image: string;
  publisher: string;
};

const BookDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      // Decode query parameters from URL
      const { title, author, genre, description, published_date, image, publisher } = router.query;
      
      // Create book object from decoded data
      const decodedBook: Book = {
        title: typeof title === 'string' ? decodeURIComponent(title) : '',
        author: typeof author === 'string' ? decodeURIComponent(author) : '',
        genre: typeof genre === 'string' ? decodeURIComponent(genre) : '',
        description: typeof description === 'string' ? decodeURIComponent(description) : '',
        published_date: typeof published_date === 'string' ? decodeURIComponent(published_date) : '',
        image: typeof image === 'string' ? decodeURIComponent(image) : '',
        publisher: typeof publisher === 'string' ? decodeURIComponent(publisher) : '',
      };

      setBook(decodedBook);
    }
  }, [id, router.query]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={'http://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1500191671l/61663._SY475_.jpg'} alt="Book Cover" />
      <h1>Title: {book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Published Date:</strong> {book.published_date}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
    </div>
  );
};

export default BookDetailsPage;
