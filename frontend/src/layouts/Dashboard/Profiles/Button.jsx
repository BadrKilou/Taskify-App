import React from 'react'
import '../../Button/Button.scss';
const Button = (props) => {
    return (
        <div>
            <button class="glow-on-hover" onClick={props.show}>
                {props.label}
            </button>
        </div>
    )
}

export default Button
