
import React,{ useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Message from '../Components/Message';
import Loader from '../Components/Loader';

const ProfileScreen = ({location, history}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    //const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : '/';

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { loggedInUser } = userLogin;

    const userUpdate = useSelector(state => state.userUpdate);
    const { success } = userUpdate;

    

    useEffect(() => {
        if(!loggedInUser){
            history.push("/login")
        }else{
            if(!user.name){
                dispatch(getUserDetails("profile"));
            }else{
                setName(user.name);
                setEmail(user.email);
            }
        }
    },[loggedInUser,history,user,dispatch])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage("Password Do Not Match!");
        }else{
            // update the profile
            dispatch(updateUserProfile({name:name,email:email,password:password}))
        }
    }

    const handleMessageClose = () => {
        setMessage('');
    }

    return (
        <>
        {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated Successfully</Message>}
        {message && <Message variant="danger" onClose={handleMessageClose}>{message}</Message>}
        {!loading && <Row>
            <Col md={4}>
                <h1>User Profile</h1>
                <hr/>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name"
                                    value={name} onChange={e => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email"
                                    value={email} onChange={e => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"
                                    value={password} onChange={e => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password"
                                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" className="btn-block" variant="primary">Update</Button>
                </Form>
            </Col>
            <Col md={8}>
                <h1>MY ORDERS</h1>
                <hr/>
            </Col>
            
        </Row>}
        </>
    )
}

export default ProfileScreen;
