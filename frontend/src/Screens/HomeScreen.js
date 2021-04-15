import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import {Row,Col} from 'react-bootstrap';
//import Products from '../products';
import Product from '../Components/Product';

const HomeScreen = () => {
    const [Products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get("/api/product");
            setProducts(response.data);
        }
        fetchProducts();
    },[])
    
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {Products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
            
        </>
    )
}

export default HomeScreen
