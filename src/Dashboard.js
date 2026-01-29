import { useState } from 'react';
import { Form, Dropdown, Accordion, Card } from 'react-bootstrap';
import './Dashboard.css';
import { childDetails } from './childData';

const Dashboard = () => {
    const [searchInput, setSearchInput] = useState('');
    const [selectedChild, setSelectedChild] = useState(null);
    const [age, setAge] = useState('');

    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }
        
        return calculatedAge;
    };

    const handleChildSelect = (child) => {
        setSelectedChild(child);
        setSearchInput(child.firstName);
        setAge(calculateAge(child.dateOfBirth).toString());
    };

    const handleAddNewChild = () => {
        setSelectedChild(null);
        setSearchInput('');
        setAge('');
    };

    const filteredChildren = childDetails.filter(child => new RegExp(searchInput, 'i').test(child.firstName));
    const shouldShowSuggestions = searchInput && !selectedChild && filteredChildren.length > 0;

    const accordions = ["FINE_MOTOR","GROSS_MOTOR","PLAY_SKILL","SOCIAL_INTERACTION","ADL","SENSORY_INTEGRATION","BALANCE_AND_COORDINATION","BILATERAL_INTEGRATION","BRAIN_GYM","HIGHER_FUNCTIONING"];

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Grace</h1>
                <p>Childcare Management System</p>
            </header>

            <Card className="dashboard-card">
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3 responsive-form-group">
                            <Form.Label>Child Name :</Form.Label>
                            <div className="responsive-input-wrapper">
                                <Form.Control
                                    type="text"
                                    placeholder="Search child name"
                                    value={searchInput}
                                    onChange={(e) => {
                                        setSearchInput(e.target.value);
                                        setSelectedChild(null);
                                    }}
                                />
                                {shouldShowSuggestions && (
                                    <div className="suggestions">
                                        {filteredChildren.map((child, idx) => (
                                            <div key={idx} onClick={() => handleChildSelect(child)} className="suggestion-item">
                                                {child.firstName}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {searchInput && !selectedChild && filteredChildren.length === 0 && (
                                    <div className="suggestions">
                                        <div onClick={handleAddNewChild} className="suggestion-item" style={{ fontWeight: 'bold', color: '#007bff' }}>
                                            + Add new child: {searchInput}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Form.Label>Age :</Form.Label>
                            <Form.Control 
                                className="responsive-age-input" 
                                type="text" 
                                value={age} 
                                onChange={(e) => setAge(e.target.value)}
                                disabled={selectedChild !== null}
                                placeholder={selectedChild ? 'Auto-calculated' : 'Enter age'}
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="dashboard-card">
                <Card.Header>
                    <h5>Assesments</h5>
                </Card.Header>
                <Card.Body>
                    <Accordion alwaysOpen>
                        {accordions.map((accordionHeader, idx) => {
                            return (
                                <Accordion.Item eventKey={idx.toString()} key={accordionHeader}>
                                    <Accordion.Header>
                                        {accordionHeader}
                                        {/* {selectedFilters[accordionHeader] && (
                                            <span className="badge bg-info ms-2">
                                                {selectedFilters[accordionHeader]}
                                            </span>
                                        )} */}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Group className="responsive-accordion-form">
                                            <Form.Label>Goal 1</Form.Label>
                                            <div className="responsive-dropdown-wrapper">
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        variant="secondary"
                                                        className="w-100 text-start"
                                                    >
                                                        {/* {selectedFilters[accordionHeader] || 'Select Goal level'} */}
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="w-100">
                                                        {/* {options.map((option, idx) => (
                                                            <Dropdown.Item
                                                                key={idx}
                                                                onClick={() => handleFilterChange(sectionKey, option)}
                                                            >
                                                                {option}
                                                            </Dropdown.Item>
                                                        ))} */}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
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