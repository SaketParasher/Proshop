import React,{ useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../Components/CheckoutSteps';

const PaymentScreen = ({history}) => {

    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart);
    const {shippingAddress} = cartState;

    if(!shippingAddress){
        history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');


    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <hr/>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label as="legend"> Select Method </Form.Label>
                    <Col>
                        <Form.Check type="radio" label="Paypal or Credit Card" id="paypal" name="paymentMethod"
                         value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary" className="btn-block">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;
