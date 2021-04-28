
import React,{ useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/userActions';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import FormContainer from '../Components/FormContainer';

const LoginScreen = ({location, history}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '/';

    const dispatch = useDispatch();
    const user = useSelector(state => state.userLogin);
    const { loading, error, loggedInUser } = user;

    useEffect(() => {
        if(loggedInUser){
            history.push(redirect)
        }
    },[loggedInUser,redirect,history])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email,password));
    }

    return (
        <>
        {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
        {!loading && <FormContainer>
            <h1>Sign In</h1>
            <hr/>
            <Form onSubmit={handleFormSubmit}>
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
                <Button type="submit" className="btn-block" variant="primary">Login</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer? {' '}<Link to={redirect?`/register?redirect=${redirect}`:'/register?redirect="/"'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>}
        </>
    )
}

export default LoginScreen
