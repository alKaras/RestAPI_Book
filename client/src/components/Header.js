import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from '../axios'

export default function Header() {

    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);

    const fetchUser = async () => {
        try {
            const resp = await axios.get('/user/getUser');
            setUser(resp.data.data);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Book-List</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href='create-book'>Create Book</Nav.Link>
                        {isAuth ? <Nav.Link href='#'>👋{user.username}</Nav.Link> : <Nav.Link href='auth/login'>Authorization</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}