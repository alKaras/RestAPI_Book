import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header.jsx';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios.js'

export default function Login() {
    const [isLogged, setIsLogged] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/user/auth/login', { email, password });
            const { token, data } = response.data;
            localStorage.setItem('token', token);
            document.cookie = `token ${token}`
            setError('');
            setPassword('');
            setEmail('');
            setIsLogged(true);

        } catch (error) {
            setError('Invalid username or password');
            setIsLogged(false);
            setPassword('');
            setEmail('');
        }
    }

    useEffect(() => {
        if (isLogged) {
            navigate('/');
        }
    }, [isLogged, navigate]);




    return (
        <>
            <Header />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formPass">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="passsword" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                {error && <p>{error}</p>}
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <Link style={{marginLeft: "24px"}} to={'/auth/register'}>Register</Link>
            </Form>

        </>

    )
}
