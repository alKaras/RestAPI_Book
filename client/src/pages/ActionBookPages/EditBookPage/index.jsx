import React, { useEffect, useState } from 'react'
import axios from '../../../axios.js'
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Header from '../../../components/Header/Header.jsx';

export default function EditPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [numPages, setNumPages] = useState(0);
    const [bookIsUpdated, setIsUpdated] = useState(false);
    console.log(bookIsUpdated);
    useEffect(() => {

        if (bookIsUpdated) {
            navigate('/');
        }
    }, [bookIsUpdated]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/book/editBook/${id}`, { title, author, publisher, numPages }).then(() => {
                setIsUpdated(true);
                alert('Book is up to date!');
            }).catch((e) => {
                setIsUpdated(false);
            });
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <Header />
            <div className='form-create container'>
                <h2>Update Book</h2>
                <Form className='form' onSubmit={handleUpdate}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author:</Form.Label>
                        <Form.Control
                            type="text"
                            name="author"
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPublisher">
                        <Form.Label>Publisher:</Form.Label>
                        <Form.Control
                            type="text"
                            name="publisher"
                            onChange={(e) => setPublisher(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNumPages">
                        <Form.Label>Number of Pages:</Form.Label>
                        <Form.Control
                            type="number"
                            name="numPages"
                            onChange={(e) => setNumPages(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        UpdateBook
                    </Button>
                </Form>
            </div>
        </>
    )
}
