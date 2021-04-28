import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import Rating from '../Components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../actions/productActions';
import Message from '../Components/Message';
import Loader from '../Components/Loader';

const ProductScreen = ({history,match}) => {
    
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const productDetail = useSelector( state => state.productDetails);
    const { loading, error, product } = productDetail;
    useEffect(() => {
        dispatch(productDetails(match.params.id))
    },[dispatch,match]);

    //const product = products.find(p => p._id === match.params.id);
    const ratingArr = new Array(5).fill(10);

    const addTocart = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <>
        { loading ? <Loader /> : error ? <Message>{error}</Message> : (
            <>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {ratingArr.map((val,index) => {
                                const rating = product.rating - (index);
                                if(rating >= 1 ){
                                    return <Rating key={Math.random().toFixed(5)} value={1}/>
                                }else if(rating === 0.5){
                                    return <Rating key={Math.random().toFixed(5)} value={0.5}/>
                                }else{
                                    return <Rating key={Math.random().toFixed(5)} value={0}/>
                                }
                            })} {product.numReviews} reviews
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Price:</strong> ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description:</strong> {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && <ListGroup.Item>
                                <Row style={{alignItems:'center'}}>
                                    <Col>Quantity</Col>
                                    <Col>
                                        <Form.Control as="select" value={qty} onChange={e => setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option key={x+1} value={x+1}>{x+1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            }
                            <ListGroup.Item>
                                <Button className="btn btn-dark btn-block" type="button" onClick={addTocart} disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>   
        </>

        )}
        </>
    )
}

export default ProductScreen
