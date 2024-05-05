import React, { useEffect, useState } from 'react'
import axios from '../axios.js'
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bookByIdData, getBookById, updateBook } from '../redux/slices/bookSlice.js';
import { useForm } from 'react-hook-form';

export default function EditPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const dispatch = useDispatch();
    const bookIsUpdated = useSelector((state) => state.books.books.isUpdated === 'done');
    // const book = useSelector(bookByIdData);

    useEffect(() => {

        if (bookIsUpdated) {
            navigate('/');
        }
    }, [dispatch, bookIsUpdated]);

    const { error } = useSelector((state) => state.books);
    // console.log(book);
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            title: '',
            author: '',
            publishDate: '',
            publisher: '',
            numOfPage: '',
        },
        mode: 'onChange'
    });

    // const onSubmit = (values) => {
    //     dispatch(updateBook(values));
    // }



    return (
        <div>
            <h2>Create New Book</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formIsbn">
                    <Form.Label>ISBN:</Form.Label>
                    <Form.Control
                        type="text"
                        name="isbn"
                        disabled
                    // value={book.isbn}
                    />
                </Form.Group>
                {/* {errors.isbn && <div>{errors.isbn.message}</div>} */}
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
                    UpdateBook
                </Button>

                {error && <div>{error}</div>}
            </Form>
        </div>
    )
}
