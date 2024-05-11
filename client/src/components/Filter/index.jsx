import React, { useState } from 'react'
import filterStyle from '../Filter/Filter.module.scss'
import { Accordion } from 'react-bootstrap';

export default function Filter({ applyFilters }) {
    const [filters, setFilters] = useState({
        author: '',
        title: '',
        publisher: '',
        pubdate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value })
    }
    console.log(filters);
    const handleApplyFilters = () => {
        applyFilters(filters);
        setTimeout(() => {
            setFilters({
                author: '',
                title: '',
                publisher: '',
                pubdate: ''
            })
        }, 2000)
    }
    return (
        <Accordion className={`container ${filterStyle.root}`}>
            <Accordion.Header className={filterStyle['filter-header']}>
                <span>Filter</span>
            </Accordion.Header>
            <Accordion.Body as={'div'} className={filterStyle['filter-body']}>
                <input type="text" name="author" placeholder="Author" value={filters.author} onChange={handleChange} />
                <input type="text" name="title" placeholder="Title" value={filters.title} onChange={handleChange} />
                <input type="text" name="publisher" placeholder="Publisher" value={filters.publisher} onChange={handleChange} />
                <input type="date" name="pubdate" placeholder="Publishing Date" value={filters.pubdate} onChange={handleChange} />
                <button
                    className={`btn btn-primary ${filterStyle['filter-btn']}`}
                    onClick={handleApplyFilters}>
                    Apply
                </button>
            </Accordion.Body>
        </Accordion>
    )
}
