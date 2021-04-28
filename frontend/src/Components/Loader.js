import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div style={{width:'100%',height:'60vh', display:'flex',alignItems:'center'}}>
        <Spinner animation="border" variant="dark" role="status"
                 style={{width:'100px',height:'100px', margin:'auto',display:'block'}}>
            <span className="sr-only">Loading...</span>
        </Spinner>
        </div>
    )
}

export default Loader
