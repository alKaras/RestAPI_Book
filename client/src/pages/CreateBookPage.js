import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios.js';
import { Form, Button } from 'react-bootstrap';

export default function CreateBookPage() {
    const navigate = useNavigate();
    const [book, setBook] = useState({
        isbn: '',
        title: '',
        author: '',
        pubdate: null,
        publisher: '',
        numOfPage: '',
    });

    const [isCreated, setIsCreated] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value,
        })
    };

    const createBook = async (book) => {
        try {
            const resp = await axios.post('/book/createBook', book);
            setIsCreated(true);
            console.log(resp.data);
        } catch (error) {
            console.log("Error creating book " + error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createBook(book);
    }

    useEffect(() => {
        if (isCreated) {
            navigate('/');
        }
    }, [isCreated, navigate]);

    return (
        <div>
            <h2>Create New Book</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formIsbn">
                    <Form.Label>ISBN:</Form.Label>
                    <Form.Control type="text" name="isbn" value={book.isbn} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text" name="title" value={book.title} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formAuthor">
                    <Form.Label>Author:</Form.Label>
                    <Form.Control type="text"  name="author" value={book.author} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formPubDate">
                    <Form.Label>Publishing Date:</Form.Label>
                    <Form.Control type="date"  name="pubdate" value={book.pubdate} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formPublisher">
                    <Form.Label>Publisher:</Form.Label>
                    <Form.Control type="text"  name="publisher" value={book.publisher} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formNumOfPage">
                    <Form.Label>Number of Pages:</Form.Label>
                    <Form.Control type="number"  name="numOfPage" value={book.numOfPage} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Book
                </Button>
            </Form>
        </div>
    )
}
