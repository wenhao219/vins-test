// pages/books/index.tsx

import { NextPage } from 'next';
import Link from 'next/link';
import axios from 'axios';
import styles from './BookList.module.css';

type Book = {
    id: number;
    title: string;
    author: string;
    genre: string;
    description: string;
    isbn: string;
    image: string;
    published_date: string;
    publisher: string;
};

type BookListProps = {
    books: Book[];
};

const tableHeaderStyle = {
    padding: '8px',
    // textAlign: 'left',
    backgroundColor: '#f2f2f2',
    borderBottom: '1px solid #ddd',
};

const BookList: NextPage<BookListProps> = ({ books }) => {
    return (
        <div>
            <h1>Book List</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Description</th>
                        <th>ISBN</th>
                        <th>Published Date</th>
                        <th>Publisher</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.isbn}>
                            <td>
                                <Link
                                    href={`/book/${encodeURIComponent(book.isbn)}?title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}&genre=${encodeURIComponent(book.genre)}&description=${encodeURIComponent(book.description)}&published_date=${encodeURIComponent(book.published_date)}&image=${encodeURIComponent(book.image)}&publisher=${encodeURIComponent(book.publisher)}`}
                                >
                                    {book.title}
                                </Link>
                            </td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.description}</td>
                            <td>{book.isbn}</td>
                            <td>{book.published_date}</td> {/* Assuming published_date is already formatted as string */}
                            <td>{book.publisher}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;

export async function getServerSideProps() {
    try {
        // Make API call using Axios
        const response = await axios.get('https://fakerapi.it/api/v1/books');
        const data = response.data;

        // Process data as needed
        const books: Book[] = data.data.map((book: any) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            description: book.description,
            isbn: book.isbn,
            image: book.image,
            published_date: book.published, // Assuming published_date is already a string
            publisher: book.publisher
        }));

        return {
            props: {
                books,
            },
        };
    } catch (error) {
        console.error('Error fetching books:', error);
        return {
            props: {
                books: [],
            },
        };
    }
}
