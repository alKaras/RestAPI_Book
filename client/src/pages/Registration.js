import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header.jsx';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../axios.js'

export default function Registration() {
    const [isRegistered, setIsRegistered] = useState(false);
    const [errorState, setErrorState] = useState('');
    const [formReg, setFormReg] = useState({
        username: '',
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setFormReg({ ...formReg, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/auth/signup', formReg);
            console.log(response.data);
            setIsRegistered(true);
        } catch (error) {
            setIsRegistered(false);
            setErrorState("Error " + error);
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (isRegistered) {
            navigate('/auth/login')
        }
    }, [isRegistered, navigate])

    return (
        <>
            <Header />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" name="username" value={formReg.username} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={formReg.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formPformPlaintextPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="passsword" name="password" value={formReg.password} onChange={handleChange} />
                </Form.Group>
                {errorState && <p>{errorState}</p>}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>

        </>

    )
}
