import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from '../axios.js'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Moment from 'react-moment'
import { Link } from 'react-router-dom';
export default function Home() {

    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(null);

    const fetchData = async () => {
        try {
            const resp = await axios.get('/book/getBooks');
            setBooks(resp.data.data);
            setIsLoading(false);
        } catch (error) {
            console.log("Error fetching data");
            setIsLoading(true);
        }
    }

    

    useEffect(() => {
        fetchData();
    }, [isDeleted])

    const deleteBook = async (id) => {
        const respDel = await axios.delete(`/book/deleteBook/${id}`);
        setIsDeleted(id);
    }

    const handleDelete = (id) => {
        deleteBook(id);
    }


    return (
        <>
            <Header />
            <Container className='mt-4'>
                <Row>
                    {
                        !isLoading ? books.map(book => (
                            <Col key={book.id} md={4} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        <Card.Text style={{ color: 'gray' }}>{book.isbn}</Card.Text>
                                        <Card.Text>Author: {book.author}</Card.Text>
                                        <Card.Text>Publisher: {book.publisher}</Card.Text>
                                        <Card.Text>Number of Pages: {book.numOfPage}</Card.Text>
                                        <Card.Text>Publishing Date: <Moment format="YYYY/MM/DD">
                                            {book.pubdate}
                                        </Moment>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant="primary" className="me-4"><Link style={{ textDecoration: "none", color: "#fff" }} to={`/edit-book/${book._id}`}>Edit</Link></Button>
                                        <Button variant="danger" onClick={() => { handleDelete(book._id) }}>Delete</Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )) :

                            <>
                                Loading...
                            </>

                    }
                </Row>
            </Container>
        </>
    )
}