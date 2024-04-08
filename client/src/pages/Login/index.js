import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios.js'

export default function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [isLogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        })
    };

    const onSubmit = async (values) => {
        const { resp } = await axios.post('/user/auth/login', user);
        setIsLogged(true);
        if (resp.datatoken) {
            window.localStorage.setItem('token', resp.data.token);
        }
        console.log(resp.data);
    }

    // useEffect(() => {
    //     if (isLogged) {
    //         navigate('/');
    //     }
    // }, [isLogged, navigate])

    return (
        <>
            <Header />
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={user.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formPass">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="passsword" name="password" value={user.password} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>

        </>

    )
}
