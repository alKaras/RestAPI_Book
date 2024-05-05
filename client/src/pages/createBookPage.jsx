import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios.js';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createBook } from '../redux/slices/bookSlice.js';

export default function CreateBookPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const bookIsCreated = useSelector((state) => state.books.books.isCreated === 'done');

    const { error } = useSelector((state) => state.books);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            isbn: '',
            title: '',
            author: '',
            publishDate: '',
            publisher: '',
            numOfPage: '',
        },
        mode: 'onChange'
    });

    const onSubmit = (values) => {
        dispatch(createBook(values));
    }

    useEffect(() => {
        if (bookIsCreated) {
            navigate('/');
        }
    }, [dispatch, bookIsCreated]);

    return (
        <div>
            <h2>Create New Book</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formIsbn">
                    <Form.Label>ISBN:</Form.Label>
                    <Form.Control
                        type="text"
                        name="isbn"
                        {...register('isbn', { required: 'Isbn field is required!' })}
                    />
                </Form.Group>
                {errors.isbn && <div>{errors.isbn.message}</div>}
                <Form.Group controlId="formTitle">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        {...register('title', { required: 'Title field is required!' })}
                    />
                </Form.Group>
                {errors.title && <div>{errors.isbn.message}</div>}
                <Form.Group controlId="formAuthor">
                    <Form.Label>Author:</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        {...register('author', { required: 'Author field is required1' })}
                    />
                </Form.Group>
                {errors.author && <div>{errors.isbn.message}</div>}
                <Form.Group controlId="formPubDate">
                    <Form.Label>Publishing Date:</Form.Label>
                    <Form.Control
                        type="date"
                        name="pubdate"
                        {...register('publishDate', { required: 'Publishind date field is required!' })}
                    />
                </Form.Group>
                {errors.publishDate && <div>{errors.isbn.message}</div>}
                <Form.Group controlId="formPublisher">
                    <Form.Label>Publisher:</Form.Label>
                    <Form.Control
                        type="text"
                        name="publisher"
                        {...register('publisher', { required: 'Publisher field is required!' })}
                    />
                </Form.Group>
                {errors.publisher && <div>{errors.isbn.message}</div>}
                <Form.Group controlId="formNumOfPage">
                    <Form.Label>Number of Pages:</Form.Label>
                    <Form.Control
                        type="number"
                        name="numOfPage"
                        {...register('numOfPage', { required: 'Number of Page field is required!' })}
                    />
                </Form.Group>
                {errors.numOfPage && <div>{errors.isbn.message}</div>}

                <Button variant="primary" type="submit">
                    Create Book
                </Button>

                {error && <div>{error}</div>}
            </Form>
        </div>
    )
}
