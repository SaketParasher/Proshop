import React,{ useEffect } from 'react';
import { Button, Col, Row, ListGroup, Image, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import StaticAlert from '../Components/StaticAlert';


const OrderScreen = ({match}) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails; 

    useEffect(() => {
        if(!order || order._id !== orderId){
            dispatch(getOrderDetails(orderId))
        }
    },[order,orderId])

    return  loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <>
        <h1>Order {order._id}</h1>
        <hr/>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p>Email: <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address:- </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                            {order.shippingAddress.postalcode},{' '}
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <StaticAlert variant="success">Delivered at {order.deliveredAt}</StaticAlert> : <StaticAlert variant="danger">Not Delivered</StaticAlert>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p><strong>Payment Method:- {order.paymentMethod}</strong></p>
                        {order.isPaid ? <StaticAlert variant="success">Paid at {order.paidAt}</StaticAlert> : <StaticAlert variant="danger">Not Paid</StaticAlert>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <h4>Order is Empty.</h4> : (
                            <ListGroup variant="flush">
                                {order.orderItems.map((item,index) => (
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
                                <Col>${order.itemsPrice && order.itemsPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice && order.taxPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderScreen
