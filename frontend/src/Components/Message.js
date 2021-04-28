import React,{ useState,useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({variant,children,onClose}) => {
    const [showAlert,setShowAlert] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
            if(onClose){
                onClose();
            }
        },3500);

        return () => {
            clearTimeout(timer);
        }
        
    },[onClose]);
    const handleAlertClose = () => {
        setShowAlert(false);
        if(onClose){
            onClose();
        }
    }
    return (
         <Alert show={showAlert} variant={variant} dismissible onClose={handleAlertClose}>{children}</Alert>
    )
}

Message.defaultProps = {
    variant:'info'
}

export default Message
