import React from 'react'
import './Button.scss';
const Button = (props) => {
    return (
        <div>
           <button 
           className="glow-on-hover" 
           type="submit">
               {props.label}
               </button> 
        </div>
    )
}

export default Button
