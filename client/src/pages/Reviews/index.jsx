import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import { Accordion } from 'react-bootstrap';
import Moment from 'react-moment';

export const Reviews = () => {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const fetchReviews = async () => {
        try {
            await axios.get(`/review/fetch-review/${id}`).then((res) => {
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

    useEffect(() => {
        fetchReviews()
    }, [])

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
                                    <Accordion.Header style={{ fontWeight: 'bold', marginTop: '0' }}>
                                        <div>
                                            Written by:  {obj.reviewer.username}
                                            <Moment format="YYYY/MM/DD">

                                            </Moment>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div><strong>Review:</strong> <br /> {obj.body}</div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )
                    })
                        :
                        <>
                            <div style={{textAlign: 'center', fontWeight: 'bold'}}>
                                No reviews for this book yet
                            </div>
                        </>

                    }
                </div>
            </div>
        </>
    )
}
