
import React,{ useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import FormContainer from '../Components/FormContainer';

const RegisterScreen = ({location, history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '/';

    const dispatch = useDispatch();
    const user = useSelector(state => state.userRegister);
    const { loading, error, loggedInUser } = user;

    useEffect(() => {
        if(loggedInUser){
            history.push(redirect)
        }
    },[loggedInUser,redirect,history])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage("Password Do Not Match!");
        }else{
            dispatch(register(name,email,password));
        }
    }

    const handleMessageClose = () => {
        setMessage('');
    }

    return (
        <>
        {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger" onClose={handleMessageClose}>{message}</Message>}
        {!loading && <FormContainer>
            <h1>Sign Up</h1>
            <hr/>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" required
                                value={name} onChange={e => setName(e.target.value)}>
                     </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" required
                                value={email} onChange={e => setEmail(e.target.value)}>
                     </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" required
                                value={password} onChange={e => setPassword(e.target.value)}>
                     </Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password"
                                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}>
                     </Form.Control>
                </Form.Group>
                <Button type="submit" className="btn-block" variant="primary">Register</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account ? {'  '}<Link to={redirect?`/login?redirect=${redirect}`:'/login?redirect="/"'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>}
        </>
    )
}

export default RegisterScreen;
