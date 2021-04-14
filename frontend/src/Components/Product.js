import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({product}) => {
    const ratingArr = new Array(5).fill(10);
    return (
        <Card className="my-3 p-2 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img className="product-image" src={product.image}  />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
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
                        {/* {product.rating} from {product.numReviews} reviews */}
                    </div>
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>

            </Card.Body>
            
        </Card>
    )
}

export default Product
