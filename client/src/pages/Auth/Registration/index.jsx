import React, { useEffect } from 'react'
import Header from '../../../components/Header/Header.jsx';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectIsRegged } from '../../../redux/slices/authSlice.js';
import { useForm } from 'react-hook-form';

export default function Registration() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isRegged = useSelector(selectIsRegged);

    const { error } = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            userRole: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (values) => {
        dispatch(registerUser(values));
    }

    useEffect(() => {
        if (isRegged) {
            navigate('/auth/login');
        }
    }, [isRegged, navigate])

    return (
        <>
            <Header />
            <div className='container'>
                <Form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            {...register('username', { required: 'Username field is required!' })}
                        />
                    </Form.Group>
    
                    {errors.username && <div>{errors.username.message}</div>}
                    <Form.Group controlId='formRole'>
                        <Form.Label>Your Role</Form.Label>
                        <Form.Select
                            aria-label="role-select"
                            {...register('userRole', { required: true })}
                        >
                            <option value={''} disabled></option>
                            <option value={'author'}>Author</option>
                            <option value={'reviewer'}>Reviewer</option>
                        </Form.Select>
                    </Form.Group>
                    {errors.userRole && <div>{errors.userRole.message}</div>}
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            {...register('email', { required: 'Email field is required!' })}
                        />
                    </Form.Group>
                    {errors.email && <div>{errors.email.message}</div>}
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type='password'
                            name="password"
                            {...register('password', { required: 'Password field is required!' })}
                        />
                    </Form.Group>
                    {errors.email && <div>{errors.password.message}</div>}
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    {error && <div>{error}</div>}
                </Form>
            </div>

        </>

    )
}
