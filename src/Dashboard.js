import React, { useState } from 'react';
import { Form, Dropdown, Accordion, Card } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [age, setAge] = useState('');

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
                <h1>Grace</h1>
                <p>Childcare Management System</p>
            </header>

            <Card className="dashboard-card">
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" style={{display:"flex", alignItems:"center"}}>
                            <Form.Label style={{marginRight:"10px", whiteSpace:"nowrap"}}>Child Name :</Form.Label>
                            <div style={{position:"relative", flex:2, marginRight:"20px"}}>
                                <Form.Control
                                    type="text"
                                    placeholder="Search child name"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                {searchInput && searchOptions.filter(option => new RegExp(searchInput, 'i').test(option)).length > 0 && (
                                    <div className="suggestions" style={{border: '1px solid #ccc', maxHeight: '200px', overflowY: 'auto', position: 'absolute', background: 'white', zIndex: 1000, width: '100%', top: '100%'}}>
                                        {searchOptions.filter(option => new RegExp(searchInput, 'i').test(option)).map((option, idx) => (
                                            <div key={idx} onClick={() => setSearchInput(option)} style={{padding: '5px', cursor: 'pointer', borderBottom: '1px solid #eee'}}>
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Form.Label style={{marginRight:"10px", whiteSpace:"nowrap"}}>Age :</Form.Label>
                            <Form.Control style={{flex:1}} type="text" value={age} onChange={(e) => setAge(e.target.value)} />
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