import React, { useEffect } from 'react'
import Header from '../../components/Header/Header.jsx'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Moment from 'react-moment'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, fetchRemovedBook } from '../../redux/slices/bookSlice.js';
import { userInfo } from '../../redux/slices/authSlice.js';
export default function Home() {

    const dispatch = useDispatch();
    const { books } = useSelector((state) => state.books);
    const bookIsDeleted = useSelector((state) => state.books.books.isDeleted === 'done');
    const bookIsLoading = useSelector((state) => state.books.books.isLoading === 'loading');
    const user = useSelector(userInfo);
    const isLoadedUser = useSelector((state) => state.auth.isLoading === 'loaded');
    const userRole = isLoadedUser ? (user.userRole ? user.userRole : 'reader') : null;
    console.log(user);

    useEffect(() => {
        dispatch(fetchBooks());

        if (bookIsDeleted) {
            dispatch(fetchBooks());
        }
    }, [dispatch, bookIsDeleted]);

    const handleDelete = (id) => {
        dispatch(fetchRemovedBook(id));
    }

    return (
        <>
            <>
                < Header />
                <Container className='mt-4'>
                    <Row>
                        {
                            !bookIsLoading ? (books.items).map(book => (
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
                                        {isLoadedUser && userRole === 'author' ?
                                            <Card.Footer>
                                                <Button variant="primary" className="me-4"><Link style={{ textDecoration: "none", color: "#fff" }} to={`/edit-book/${book._id}`}>Edit</Link></Button>
                                                <Button variant="danger" onClick={() => { handleDelete(book._id) }}>Delete</Button>
                                            </Card.Footer>
                                            : userRole === 'reviewer' ?
                                                <>
                                                    <Card.Footer>
                                                        <Button variant="primary" className="me-4">
                                                            <Link style={{ textDecoration: "none", color: "#fff" }} to={`/write-review/${book._id}`}>
                                                                Write Review
                                                            </Link>
                                                        </Button>
                                                    </Card.Footer>
                                                </>
                                                :
                                                <>
                                                </>
                                        }

                                    </Card>
                                </Col>
                            )) :

                                <>
                                    <p>loading...</p>
                                </>
                        }
                    </Row>
                </Container>
            </>
        </>
    )
}