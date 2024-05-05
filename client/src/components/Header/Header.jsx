import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from '../../axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Header() {

    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthLocation = (location.pathname === '/auth/login' || location.pathname === '/auth/register');
    console.log(`isAuth - ${isAuth}; isAuthPage = ${isAuthLocation}`);
    const fetchUser = async () => {
        try {
            const resp = await axios.get('/user/getUser');
            setUser(resp.data.data);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
            setIsAuth(false);
        }
    }


    const handleLogout = async (e) => {
        e.preventDefault();
        window.localStorage.removeItem('token');
        setIsAuth(false);
        navigate('/');
    }
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href='/'>Book-List</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={{ marginLeft: 'auto' }}>
                        <Nav.Link href='create-book'>Create Book</Nav.Link>
                        {isAuth ?
                            <>
                                <Nav.Link href='#'>👋{user.username}</Nav.Link>
                                <Button variant='warning' onClick={handleLogout}>Exit</Button>
                            </>
                            : isAuthLocation ? <Nav.Link disabled href='auth/login'>Authorization</Nav.Link> : <Nav.Link href='auth/login'>Authorization</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}