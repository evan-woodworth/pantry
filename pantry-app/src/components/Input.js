import React from 'react';

const Input = (props) => {
    return (
        <div>
            <label htmlFor={props.name} />
            <input type={props.type} name={props.name} value={props.value} onChange={props.handler} /> 
        </div>
    )
}

export default Input;