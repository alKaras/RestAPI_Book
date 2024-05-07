import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { logout, selectIsLogged, userInfo } from '../../redux/slices/authSlice';

export default function Header() {

    const isAuth = useSelector(selectIsLogged)
    const user = useSelector(userInfo);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthLocation = (location.pathname === '/auth/login' || location.pathname === '/auth/register');
    const isLoadedUser = useSelector((state) => state.auth.isLoading === 'loaded');
    const userRole = isLoadedUser ? (user.userRole ? user.userRole : 'reader') : null;
    console.log(userRole);

    const handleLogout = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
        navigate('/');
    }



    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href='/'>Book-List</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav style={{ marginLeft: 'auto' }}>
                        { userRole === 'reviewer' ? <Nav.Link href='reviews'>Write Review</Nav.Link> : userRole === 'author' ? <Nav.Link href='create-book'>Create Book</Nav.Link> : <><Nav.Link href='reviews'>Reviews</Nav.Link></>}
                        {isAuth ?
                            <>
                                <Nav.Link href='#'>👋{user.username}</Nav.Link>
                                <Button variant='warning' onClick={handleLogout}>Exit</Button>
                            </>
                            : isAuthLocation ? <Nav.Link disabled href='auth/login'>Authorization</Nav.Link>
                                :

                                <>
                                    
                                    <Nav.Link href='auth/login'>Authorization</Nav.Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}