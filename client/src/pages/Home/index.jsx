import React, { useEffect } from 'react'
import Header from '../../components/Header/Header.jsx'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Moment from 'react-moment'
import homeStyle from './Home.module.scss'
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
    console.log(books);

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
                <Container className={`mt-4 ${homeStyle.root}`}>
                    <Row>
                        {
                            !bookIsLoading ? (books.items).map((book, index) => (
                                <Col key={index} md={4} className="mb-4">
                                    <Card className={homeStyle.card}>
                                        <Card.Body>
                                            <Card.Title>{book.title}</Card.Title>
                                            <Card.Text style={{ color: 'gray' }}>{book.isbn}</Card.Text>
                                            <Card.Text><strong>Author:</strong> {book.author}</Card.Text>
                                            <Card.Text><strong>Publisher:</strong> {book.publisher}</Card.Text>
                                            <Card.Text><strong>Number of Pages:</strong> {book.numOfPage}</Card.Text>

                                            <Card.Text><strong>Publishing Date:</strong> <Moment format="YYYY/MM/DD">
                                                {book.pubdate}
                                            </Moment>
                                            </Card.Text>

                                        </Card.Body>
                                        {isLoadedUser && (userRole === 'author' && user._id === book.addedBy._id) ?
                                            <Card.Footer className={homeStyle.footer}>
                                                <div className={homeStyle['footer-actions']}>
                                                    <Button title='edit book' variant="primary" className="me-3"><Link style={{ textDecoration: "none", color: "#fff" }} to={`/edit-book/${book._id}`}><i class="fa-solid fa-pen"></i></Link></Button>
                                                    <Button title='delete book' variant="danger" onClick={() => { handleDelete(book._id) }}><i class="fa-solid fa-trash-can"></i></Button>
                                                    <Button title='check reviews' style={{ marginLeft: '15px' }} variant="info">
                                                        <Link style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }} to={`/reviews/${book._id}`}>Reviews <i class="fa-solid fa-magnifying-glass"></i></Link>
                                                    </Button>
                                                </div>
                                                <Card.Text style={{ color: 'gray' }}><strong style={{ fontSize: '14px' }}>Added by:</strong> {book.addedBy.username}</Card.Text>
                                            </Card.Footer>
                                            : userRole === 'reviewer' ?
                                                <>
                                                    <Card.Footer className={homeStyle.footer}>
                                                        <div className={homeStyle['footer-actions']}>
                                                            <Button title='write reviews' variant="primary" className="me-2">
                                                                <Link style={{ textDecoration: "none", color: "#fff" }} to={`/write-review/${book._id}`}>
                                                                    <i class="fa-solid fa-file-pen"></i>
                                                                </Link>
                                                            </Button>
                                                            <Button title='check reviews' style={{ marginLeft: '15px' }} variant="info">
                                                                <Link style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }} to={`/reviews/${book._id}`}>Reviews <i class="fa-solid fa-magnifying-glass"></i></Link>
                                                            </Button>
                                                        </div>
                                                        <Card.Text style={{ color: 'gray' }}><strong style={{ fontSize: '14px' }}>Added by:</strong> {book.addedBy.username}</Card.Text>

                                                    </Card.Footer>
                                                </>
                                                : !isLoadedUser ?
                                                    <>
                                                        <Card.Footer className={homeStyle.footer}>
                                                            <div className={homeStyle['footer-actions']}>
                                                                <Button title='check reviews' style={{ marginLeft: '15px' }} variant="info">
                                                                    <Link style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold' }} to={`/reviews/${book._id}`}>Reviews <i class="fa-solid fa-magnifying-glass"></i></Link>
                                                                </Button>
                                                            </div>
                                                            <Card.Text style={{ color: 'gray' }}><strong style={{ fontSize: '14px' }}>Added by:</strong> {book.addedBy.username}</Card.Text>
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