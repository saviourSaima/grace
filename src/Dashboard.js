import { useState } from 'react';
import { Form, Dropdown, Accordion, Card } from 'react-bootstrap';
import './Dashboard.css';
import { childDetails } from './childData';
import { goalDetails } from './goalDetails';

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

    const GROSS_MOTOR = goalDetails.filter((goal) => goal.domain === "GROSS_MOTOR");
    const FINE_MOTOR = goalDetails.filter((goal) => goal.domain === "FINE_MOTOR");
    const BALANCE_AND_COORDINATION = goalDetails.filter((goal) => goal.domain === "BALANCE_AND_COORDINATION");
    const SOCIAL_INTERACTION = goalDetails.filter((goal) => goal.domain === "SOCIAL_INTERACTION");
    const ADL = goalDetails.filter((goal) => goal.domain === "ADL");
    const PLAY_SKILL = goalDetails.filter((goal) => goal.domain === "PLAY_SKILL");
    const BRAIN_GYM = goalDetails.filter((goal) => goal.domain === "BRAIN_GYM");
    const HIGHER_FUNCTIONING = goalDetails.filter((goal) => goal.domain === "HIGHER_FUNCTIONING");
    const BILATERAL_INTEGRATION = goalDetails.filter((goal) => goal.domain === "BILATERAL_INTEGRATION");
    const SENSORY_INTEGRATION = goalDetails.filter((goal) => goal.domain === "SENSORY_INTEGRATION");

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
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>GROSS MOTOR</Accordion.Header>
                          <Accordion.Body>
                            <div className="goals-grid">
                              {GROSS_MOTOR.map((goal, idx) => (
                                <div key={idx} className="goal-item">
                                  <div className="goal-row" style={{position:"relative"}}>
                                    <Form.Label className="goal-label">{goal.name}</Form.Label>
                                    <Dropdown style={{position:"absolute", right:"0"}}>
                                      <Dropdown.Toggle variant="success" id={`dropdown-${idx}`}>
                                        Achievement Level
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">NOT STARTED</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">BEGINNER</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">INTERMEDIATE</Dropdown.Item>
                                        <Dropdown.Item href="#/action-4">ADVANCED</Dropdown.Item>
                                        <Dropdown.Item href="#/action-5">MASTER</Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                          <Accordion.Header>FINE MOTOR</Accordion.Header>
                          <Accordion.Body>
                           <div className="goals-grid">
                              {FINE_MOTOR.map((goal, idx) => (
                                <div key={idx} className="goal-item">
                                  <div className="goal-row" style={{position:"relative"}}>
                                    <Form.Label className="goal-label">{goal.name}</Form.Label>
                                    <Dropdown style={{position:"absolute", right:"0"}}>
                                      <Dropdown.Toggle variant="success" id={`dropdown-${idx}`}>
                                        Achievement Level
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">NOT STARTED</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">BEGINNER</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">INTERMEDIATE</Dropdown.Item>
                                        <Dropdown.Item href="#/action-4">ADVANCED</Dropdown.Item>
                                        <Dropdown.Item href="#/action-5">MASTER</Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                          <Accordion.Header>BALANCE AND COORDINATION</Accordion.Header>
                          <Accordion.Body>
                            <div className="goals-grid">
                              {BALANCE_AND_COORDINATION.map((goal, idx) => (
                                <div key={idx} className="goal-item">
                                    <div className="goal-row" style={{position:"relative"}}>
                                        <Form.Label className="goal-label">{goal.name}</Form.Label>
                                        <Dropdown style={{position:"absolute", right:"0"}}>
                                          <Dropdown.Toggle variant="success" id={`dropdown-${idx}`}>
                                            Achievement Level
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">NOT STARTED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">BEGINNER</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">INTERMEDIATE</Dropdown.Item>
                                            <Dropdown.Item href="#/action-4">ADVANCED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-5">MASTER</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                          <Accordion.Header>SOCIAL INTERACTION</Accordion.Header>
                          <Accordion.Body>
                            <div className="goals-grid">
                              {SOCIAL_INTERACTION.map((goal, idx) => (
                                <div key={idx} className="goal-item">
                                    <div className="goal-row" style={{position:"relative"}}>
                                        <Form.Label className="goal-label">{goal.name}</Form.Label>
                                        <Dropdown style={{position:"absolute", right:"0"}}>
                                          <Dropdown.Toggle variant="success" id={`dropdown-${idx}`}>
                                            Achievement Level
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">NOT STARTED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">BEGINNER</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">INTERMEDIATE</Dropdown.Item>
                                            <Dropdown.Item href="#/action-4">ADVANCED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-5">MASTER</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                          <Accordion.Header>ADL</Accordion.Header>
                          <Accordion.Body>
                            <div className="goals-grid">
                              {ADL.map((goal, idx) => (
                                <div key={idx} className="goal-item">
                                    <div className="goal-row" style={{position:"relative"}}>
                                        <Form.Label className="goal-label">{goal.name}</Form.Label>
                                        <Dropdown style={{position:"absolute", right:"0"}}>
                                          <Dropdown.Toggle variant="success" id={`dropdown-${idx}`}>
                                            Achievement Level
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">NOT STARTED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">BEGINNER</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">INTERMEDIATE</Dropdown.Item>
                                            <Dropdown.Item href="#/action-4">ADVANCED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-5">MASTER</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                          <Accordion.Header>PLAY SKILL</Accordion.Header>
                          <Accordion.Body>
                            <div className="goals-grid">
                              {PLAY_SKILL.map((goal, idx) => (
                                <div key={idx} className="goal-item">
                                    <div className="goal-row" style={{position:"relative"}}>
                                        <Form.Label className="goal-label">{goal.name}</Form.Label>
                                        <Dropdown style={{position:"absolute", right:"0"}}>
                                          <Dropdown.Toggle variant="success" id={`dropdown-${idx}`}>
                                            Achievement Level
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">NOT STARTED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">BEGINNER</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">INTERMEDIATE</Dropdown.Item>
                                            <Dropdown.Item href="#/action-4">ADVANCED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-5">MASTER</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="6">
                          <Accordion.Header>BRAIN GYM</Accordion.Header>
                          <Accordion.Body>
                            <div className="goals-grid">
                              {BRAIN_GYM.map((goal, idx) => (
                                <div key={idx} className="goal-item">
                                    <div className="goal-row" style={{position:"relative"}}>
                                        <Form.Label className="goal-label">{goal.name}</Form.Label>
                                        <Dropdown style={{position:"absolute", right:"0"}}>
                                          <Dropdown.Toggle variant="success" id={`dropdown-${idx}`}>
                                            Achievement Level
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">NOT STARTED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">BEGINNER</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">INTERMEDIATE</Dropdown.Item>
                                            <Dropdown.Item href="#/action-4">ADVANCED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-5">MASTER</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="7">
                          <Accordion.Header>HIGHER FUNCTIONING</Accordion.Header>
                          <Accordion.Body>
                            <div className="goals-grid">
                              {HIGHER_FUNCTIONING.map((goal, idx) => (
                                <div key={idx} className="goal-item">
                                    <div className="goal-row" style={{position:"relative"}}>
                                        <Form.Label className="goal-label">{goal.name}</Form.Label>
                                        <Dropdown style={{position:"absolute", right:"0"}}>
                                          <Dropdown.Toggle variant="success" id={`dropdown-${idx}`}>
                                            Achievement Level
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">NOT STARTED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">BEGINNER</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">INTERMEDIATE</Dropdown.Item>
                                            <Dropdown.Item href="#/action-4">ADVANCED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-5">MASTER</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="8">
                          <Accordion.Header>BILATERAL INTEGRATION</Accordion.Header>
                          <Accordion.Body>
                            <div className="goals-grid">
                              {BILATERAL_INTEGRATION.map((goal, idx) => (
                                <div key={idx} className="goal-item">
                                    <div className="goal-row" style={{position:"relative"}}>
                                        <Form.Label className="goal-label">{goal.name}</Form.Label>
                                        <Dropdown style={{position:"absolute", right:"0"}}>
                                          <Dropdown.Toggle variant="success" id={`dropdown-${idx}`}>
                                            Achievement Level
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">NOT STARTED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">BEGINNER</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">INTERMEDIATE</Dropdown.Item>
                                            <Dropdown.Item href="#/action-4">ADVANCED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-5">MASTER</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="9">
                          <Accordion.Header>SENSORY INTEGRATION</Accordion.Header>
                          <Accordion.Body>
                            <div className="goals-grid">
                              {SENSORY_INTEGRATION.map((goal, idx) => (
                                <div key={idx} className="goal-item">
                                    <div className="goal-row" style={{position:"relative"}}>
                                        <Form.Label className="goal-label">{goal.name}</Form.Label>
                                        <Dropdown style={{position:"absolute", right:"0"}}>
                                          <Dropdown.Toggle variant="success" id={`dropdown-${idx}`}>
                                            Achievement Level
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">NOT STARTED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">BEGINNER</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">INTERMEDIATE</Dropdown.Item>
                                            <Dropdown.Item href="#/action-4">ADVANCED</Dropdown.Item>
                                            <Dropdown.Item href="#/action-5">MASTER</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Dashboard;