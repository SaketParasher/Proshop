import React,{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addTocart, removeFromCart } from '../actions/cartActions';
import Message from '../Components/Message';
import { Row, Col, Card, Form, ListGroup, Image, Button } from 'react-bootstrap';

const CartScreen = ({location,match,history}) => {

    const dispatch = useDispatch();
    const productId = match.params.id;
    const qty = location.search ? +new URLSearchParams(location.search).get('qty') : 1;
    const cartState = useSelector(state => state.cart);
    const { cartItems } = cartState;

    const userLogin = useSelector(state => state.userLogin);
    const { loggedInUser } = userLogin;

    useEffect(() => {
        if(productId){
            dispatch(addTocart(productId,qty));
        }
    },[productId,dispatch,qty])

    const handleCartDelete = (pid) => {
        dispatch(removeFromCart(pid));
    }

    const checkoutHandler = () => {
        if(loggedInUser){
            history.push("/shipping")
        }else{
            history.push("/login?redirect=/shipping")
        }
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                <hr/>
                {cartItems.length === 0 ? <Message>Your Cart is empty. <Link to="/">Go Back</Link></Message> : (
                    <ListGroup variant="flush">
                        {cartItems.map( item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={3}>
                                        <Form.Control as="select" value={item.qty} onChange={e => dispatch(addTocart(item.product,Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x =>  (
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type="button" variant="light" onClick={() => handleCartDelete(item.product)}>
                                            <i className="fas fa-trash"/>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>Subtotal ({cartItems.reduce((acc,curr) => {return acc + curr.qty},0)}) Items</h4>
                            ${(cartItems.reduce((acc,curr) => { return acc + curr.qty * curr.price },0)).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                PROCCEED TO CHECKOUT
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
