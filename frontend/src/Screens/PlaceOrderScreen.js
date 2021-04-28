import React,{ useEffect } from 'react';
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../Components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import Message from '../Components/Message';


const PlaceOrderScreen = ({history}) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;

    const itemsPrice = cartItems.reduce((acc,curr) => {
        return acc + (curr.qty * curr.price)
    },0);

    const shippingPrice = itemsPrice >= 100 ? 0 : 50;

    const taxPrice = (0.15 * itemsPrice);

    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    const orderState = useSelector(state => state.orderCreate);
    const { order, success, error } = orderState; 

    useEffect(() => {
        if(success){
            history.push(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    },[history,success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems:cartItems,
            shippingAddress:shippingAddress,
            paymentMethod:paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:- </strong>
                                {shippingAddress.address}, {shippingAddress.city},{' '}
                                {shippingAddress.postalcode},{' '}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Payment Method:- {paymentMethod}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? <h4>Your Cart is Empty.</h4> : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item,index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X {item.price} = ${(item.qty * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${itemsPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${shippingPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${taxPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice.toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={placeOrderHandler}>
                                        Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            
        </>
    )
}

export default PlaceOrderScreen
