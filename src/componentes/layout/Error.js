import React from 'react';

const Error = ({mensaje}) => {
    return (
        <div className="alert alert-danger text-center">
            {mensaje}
        </div>
    );
};

export default Error;