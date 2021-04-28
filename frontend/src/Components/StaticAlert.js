import React from 'react';
import { Alert } from 'react-bootstrap';

const StaticAlert = ({variant,children,onClose}) => {
    
    return (
         <Alert variant={variant} >{children}</Alert>
    )
}

StaticAlert.defaultProps = {
    variant:'info'
}

export default StaticAlert;
