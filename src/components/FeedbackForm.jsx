import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';

function FeedbackForm() {
    const [show, setShow] = useState(false);
    const [experience, setExperience] = useState(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const formRef = useRef(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = new FormData(formRef.current);
        formData.append('Experience', experience);

        fetch("https://script.google.com/macros/s/AKfycbzU3vzpYnNRB-wWUvpHa02_Qb0ReKCp83l22Cfc-I11ts1pQBwCXP2OuYw-rgKWxP8R/exec", {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then((data) => {
                setLoading(false);
                setMessage(data.msg || "Feedback submitted successfully!");
            })
            .catch(err => {
                setLoading(false);
                setMessage("Error submitting feedback. Please try again.");
                console.error(err);
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Submit Feedback
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    name="Name"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formExperience">
                                <Form.Label>How was your experience?</Form.Label>
                                <ButtonGroup>
                                    {[1, 2, 3, 4, 5].map(level => (
                                        <Button
                                            key={level}
                                            variant={experience === level ? 'primary' : 'outline-primary'}
                                            onClick={() => setExperience(level)}
                                        >
                                            {level === 1 ? '😞' : level === 2 ? '😕' : level === 3 ? '😐' : level === 4 ? '🙂' : '😁'}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formProject">
                                <Form.Label>Which project did you love the most?</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter project name"
                                    name="Project"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formImprovement">
                                <Form.Label>How can we make this better?</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="Improvement"
                                    required
                                />
                            </Form.Group>
                            {loading ? (
                                <div className="d-flex justify-content-center mb-3">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            ) : (
                                <Button variant="success" type="submit">
                                    Submit Feedback
                                </Button>
                            )}
                        </Form>
                        {message && (
                            <div className="mt-3">
                                <p>{message}</p>
                            </div>
                        )}
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FeedbackForm;
