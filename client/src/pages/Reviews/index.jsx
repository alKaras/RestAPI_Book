import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import { Accordion } from 'react-bootstrap';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../../redux/slices/authSlice';

export const Reviews = () => {

    const { alias } = useParams();
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [reviewIsDeleted, setIsDeleted] = useState(false);
    const user = useSelector(userInfo);
    const isLoadedUser = useSelector((state) => state.auth.isLoading === 'loaded');
    console.log(user);
    const fetchReviews = async () => {
        try {
            await axios.get(`/review/fetch-review/${alias}`).then((res) => {
                setIsLoaded(true);
                if ((res.data.data).length === 0) {
                    setData([]);
                } else {
                    setData(res.data.data);
                }

            }).catch((err) => {
                console.log(err);
                setIsLoaded(false);
            })
        } catch (error) {
            alert('Something went wrong! ' + error);
        }
    }

    const reviewDeleting = async (id) => {
        try {
            await axios.delete(`/review/delete/${id}`)
            
        } catch (error) {
            alert('something went wrong!' + error)
            setIsDeleted(false);
        }
    }

    const handleDelete = (id) => {
        reviewDeleting(id);
        setIsDeleted(true);
    }

    console.log("isDeleted? ", reviewIsDeleted);

    useEffect(() => {
        fetchReviews()

        if (reviewIsDeleted) {
            fetchReviews();
            setIsDeleted(false);
        }
    }, [reviewIsDeleted])

    console.log(data);
    return (
        <>
            <Header />
            <div style={{ marginTop: '15px' }} className="container">
                <h2 style={{ textAlign: 'center' }}>
                    {(isLoaded && data.length !== 0) ? <>Reviews for book "{data[0].bookId.title}" by {data[0].bookId.author}</> : <></>}

                </h2>
                <div style={{ marginTop: '25px' }}>
                    {(isLoaded && data.length !== 0) ? data.map((obj, index) => {
                        return (
                            <Accordion style={{ marginBottom: '15px', marginTop: '25px' }} key={index}>
                                <Accordion.Item eventKey='0'>
                                    <Accordion.Header style={{ fontWeight: 'bold', marginTop: '0', display: 'flex', alignItems: 'center' }}>
                                        <span style={{ marginRight: 'auto' }}><strong>Written by:</strong> {obj.reviewer.username} </span>
                                        <Moment format="DD/MM/YYYY HH:mm:ss" style={{ color: 'gray', marginLeft: '800px' }}>
                                            {obj.createdAt}
                                        </Moment>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {isLoadedUser && (user._id === obj.bookId.addedBy || user._id === obj.reviewer._id) ?
                                            <button className='btn btn-danger' onClick={() => handleDelete(obj._id)} style={{ marginTop: '10px' }}><i class="fa-solid fa-eraser"></i></button>
                                            :
                                            <></>
                                        }
                                        <div><strong>Review:</strong> <br /> {obj.body}</div>

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )
                    })
                        :
                        <>
                            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                No reviews for this book yet
                            </div>
                        </>

                    }
                </div>
            </div>
        </>
    )
}
