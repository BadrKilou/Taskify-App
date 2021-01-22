import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { useDetectOutsideClick } from '../../../assets/outsideClick/UseOutsideClick'
import './styles/DropDown.scss';


const DropdownMenu = (props) => {
   

    const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
    return (
        <div>
             <div className="menu-container">
        <button onMouseEnter={onClick} className="menu-trigger">
          
          {props.avatar ?
          <img
            src={props.avatar}
     
          /> : 
          <span>{props.user !== null && props.user.name.toUpperCase()}</span>
          }
        </button>
        <div className='dropdown'
          onMouseLeave={onClick}
          ref={dropdownRef}
          className={`dropdown-menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
            <Link to='notes'>{props.notes}</Link>
            </li>
            <li>
            <Link to='profile'>{props.profile}</Link>
            </li>
            <li>
            <Link onClick={props.logout}>{props.disconnect}</Link>
            </li>
          </ul>
        </div>
      </div>
        </div>
    )
}



export default  DropdownMenu
