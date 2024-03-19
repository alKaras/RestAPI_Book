import React, { useEffect, useState } from 'react'
import axios from '../axios.js'
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

export default function EditPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setbook] = useState({
        isbn: '',
        title: '',
        author: '',
        pubdate: null,
        publisher: '',
        numOfPage: '',
    });
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if (isUpdated) {
            navigate('/')
        }
    }, [isUpdated, navigate]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setbook({
            ...book,
            [name]: value
        });
    };

    const updateBook = async (id, book) => {
        try {
            const resp = await axios.put(`/book/editBook/${id}`, book);
            setIsUpdated(true);
            console.log(resp.data);
        } catch (error) {
            console.log("Error editing " + error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBook(id, book);
    }
    return (
        <div>
        <h2>Update Book</h2>
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
                Update Book
            </Button>
        </Form>
    </div>
    )
}
