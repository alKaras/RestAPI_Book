import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import axios from '../../axios'
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export const CreateReview = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [body, setBody] = useState('');
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        if (isSent) {
            navigate('/');
        }
    })

    const handleSend = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`/review/create/${id}`, { body }).then(() => {
                setIsSent(true);
                alert('Review is sent!');
            }).catch((error) => {
                setIsSent(false);
                console.log(error);
            })
        } catch (error) {
            console.log('Error ' + error);
        }
    }

    return (
        <>
            <Header />
            <div className={`container`} style={{ marginTop: '15px' }}>
                <h2 style={{ textAlign: 'center' }}>Write review</h2>

                <Form onSubmit={handleSend} className='form'>
                    <Form.Group className="mb-3" controlId="ControlTextarea">
                        <Form.Label>Book Review</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            style={{ resize: 'none' }}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Send Review
                    </Button>
                </Form>
            </div>
        </>
    )
}
