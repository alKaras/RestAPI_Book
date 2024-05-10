import React, { useEffect } from 'react'
import Header from '../../../components/Header/Header.jsx';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, selectIsLogged } from '../../../redux/slices/authSlice.js';

export default function Login() {
    const isLogged = useSelector(selectIsLogged);
    const { error } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = (values) => {
        dispatch(loginUser(values));
    }

    useEffect(() => {
        if (isLogged) {
            navigate('/');
        }
    }, [isLogged, navigate]);
    return (
        <>
            <Header />
            <div className='container'>
                <Form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email"
                            name="email"
                            {...register('email', { required: 'Email is required field!' })}
                        />
                    </Form.Group>
                    {errors.email && <div>{errors.email.message}</div>}
                    <Form.Group controlId="formPass">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            {...register('password', { required: 'Password is required field!' })}
                        />
                    </Form.Group>
                    {errors.password && <div>{errors.password.message}</div>}
    
                    <div className='flex-container button-row' >
                        <Button style={{margin: '0'}} variant="primary" type="submit">
                            Login
                        </Button>
                        <Link style={{ marginLeft: "24px" }} to={'/auth/register'}>Register</Link>
                    </div>
    
                    {error && <div>{error}</div>}
                </Form>
            </div>

        </>

    )
}
