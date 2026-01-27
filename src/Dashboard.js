import React, { useState } from 'react';
import { Form, Dropdown, Accordion, Card } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedFilters, setSelectedFilters] = useState({});

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    const handleFilterChange = (section, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [section]: value
        }));
    };

    const searchOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    const filterOptions = {
        section1: ['Filter A', 'Filter B', 'Filter C'],
        section2: ['Filter X', 'Filter Y', 'Filter Z'],
        section3: ['Filter P', 'Filter Q', 'Filter R']
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Production-Ready React Application</p>
            </header>

            <Card className="dashboard-card">
                <Card.Header>
                    <h5>Search & Filter</h5>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Search Field</Form.Label>
                            <Dropdown className="w-100">
                                <Dropdown.Toggle variant="primary" className="w-100 text-start">
                                    {searchValue || 'Select an option'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100">
                                    {searchOptions.map((option, idx) => (
                                        <Dropdown.Item
                                            key={idx}
                                            onClick={() => handleSearchChange(option)}
                                        >
                                            {option}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="dashboard-card">
                <Card.Header>
                    <h5>Advanced Filters</h5>
                </Card.Header>
                <Card.Body>
                    <Accordion defaultActiveKey="0">
                        {Object.entries(filterOptions).map((entry, idx) => {
                            const [sectionKey, options] = entry;
                            return (
                                <Accordion.Item eventKey={idx.toString()} key={sectionKey}>
                                    <Accordion.Header>
                                        Filter Section {idx + 1}
                                        {selectedFilters[sectionKey] && (
                                            <span className="badge bg-info ms-2">
                                                {selectedFilters[sectionKey]}
                                            </span>
                                        )}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Group>
                                            <Form.Label>Choose a filter</Form.Label>
                                            <Dropdown className="w-100">
                                                <Dropdown.Toggle 
                                                    variant="secondary" 
                                                    className="w-100 text-start"
                                                >
                                                    {selectedFilters[sectionKey] || 'Select filter'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="w-100">
                                                    {options.map((option, idx) => (
                                                        <Dropdown.Item
                                                            key={idx}
                                                            onClick={() => handleFilterChange(sectionKey, option)}
                                                        >
                                                            {option}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Form.Group>
                                    </Accordion.Body>
                                </Accordion.Item>
                            );
                        })}
                    </Accordion>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Dashboard;