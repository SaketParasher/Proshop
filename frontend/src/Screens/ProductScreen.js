import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../Components/Rating';
//import products from '../products'; 
import axios from 'axios';

const ProductScreen = ({match}) => {
    const [product, setProduct] = useState({});
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`/api/product/${match.params.id}`);
            setProduct(response.data);
        }
        fetchProduct();
    },[match]);

    //const product = products.find(p => p._id === match.params.id);
    const ratingArr = new Array(5).fill(10);
    return (
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
                            <ListGroup.Item>
                                <Button className="btn btn-dark btn-block" type="button" disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>   
        </>
    )
}

export default ProductScreen
